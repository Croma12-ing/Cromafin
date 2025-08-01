
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { User, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  created_at: string;
  cibil_score: number | null;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading, signOut } = useAuth();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Function to generate a CIBIL score below 600
  const getDisplayCibilScore = (actualScore: number | null): number => {
    // Always return a score between 500-599
    const lowScores = [520, 535, 545, 560, 575, 580, 585, 590, 595];
    return lowScores[Math.floor(Math.random() * lowScores.length)];
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      fetchUserProfile();
    }
  }, [user, loading, navigate]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to fetch profile data",
          variant: "destructive"
        });
        return;
      }

      if (profile) {
        setUserData(profile);
        setFormData({
          name: profile.name || '',
          email: profile.email || '',
          phone: profile.phone || ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user || !userData) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update profile",
          variant: "destructive"
        });
        return;
      }

      const updatedUser = { 
        ...userData, 
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      };
      setUserData(updatedUser);
      setIsEditing(false);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    }
  };

  const getEMIHistory = () => {
    return JSON.parse(localStorage.getItem('emiHistory') || '[]').slice(-5);
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    // Confirm deletion
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    
    if (!confirmed) return;

    try {
      setIsDeleting(true);

      // Delete profile from database
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);

      if (profileError) {
        throw profileError;
      }

      // Clear local storage
      localStorage.removeItem('emiHistory');
      
      // Sign out the user
      await signOut();
      
      // Show success message
      toast({
        title: "Account Deleted",
        description: "Your profile has been deleted successfully.",
        variant: "default"
      });

      // Redirect to home page
      navigate('/');
      
    } catch (error) {
      console.error('Error deleting account:', error);
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user || !userData) {
    return null;
  }

  const displayCibilScore = getDisplayCibilScore(userData.cibil_score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
            <p className="text-xl text-gray-600">Manage your account and view your loan applications</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-500" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Your account details</CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="flex space-x-4">
                        <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
                          Save Changes
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({
                              name: userData.name || '',
                              email: userData.email || '',
                              phone: userData.phone || ''
                            });
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label>Full Name</Label>
                        <p className="text-lg font-semibold">{userData.name}</p>
                      </div>
                      
                      <div>
                        <Label>Email</Label>
                        <p className="text-lg">{userData.email}</p>
                      </div>
                      
                      <div>
                        <Label>Phone</Label>
                        <p className="text-lg">{userData.phone || 'Not provided'}</p>
                      </div>
                      
                      <div>
                        <Label>CIBIL Score</Label>
                        <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                          <p className="text-lg font-semibold text-red-600">{displayCibilScore}</p>
                          <p className="text-sm text-red-500 mt-1">⚠️ Your CIBIL score is currently low. Please take necessary action.</p>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Member Since</Label>
                        <p className="text-lg">{new Date(userData.created_at).toLocaleDateString()}</p>
                      </div>
                      
                      <Button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-600">
                        Edit Profile
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent EMI Calculations */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Recent EMI Calculations</CardTitle>
                  <CardDescription>Your last 5 EMI calculations</CardDescription>
                </CardHeader>
                <CardContent>
                  {getEMIHistory().length > 0 ? (
                    <div className="space-y-4">
                      {getEMIHistory().map((calc: any, index: number) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Loan Amount</p>
                              <p className="font-semibold">₹{calc.principal?.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">EMI</p>
                              <p className="font-semibold text-green-600">₹{calc.emi?.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Rate</p>
                              <p className="font-semibold">{calc.rate}%</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Tenure</p>
                              <p className="font-semibold">{calc.tenure} months</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No EMI calculations yet</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={() => navigate('/document-submission')}
                    className="w-full bg-red-500 hover:bg-red-600"
                  >
                    Apply for Loan
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/emi-calculator')}
                    variant="outline"
                    className="w-full"
                  >
                    Calculate EMI
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/contact')}
                    variant="outline"
                    className="w-full"
                  >
                    Contact Support
                  </Button>
                  
                  <Button 
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    variant="destructive"
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {isDeleting ? 'Deleting...' : 'Delete Account'}
                  </Button>
                </CardContent>
              </Card>

              {/* Account Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Account Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg text-center border border-red-200">
                      <p className="text-red-600 font-semibold">CIBIL Score</p>
                      <p className="text-2xl font-bold text-red-700">{displayCibilScore}</p>
                      <p className="text-xs text-red-500 mt-1">Action Required</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-green-600 font-semibold">EMI Calculations</p>
                      <p className="text-2xl font-bold text-green-700">{getEMIHistory().length}</p>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <p className="text-yellow-600 font-semibold">Account Age</p>
                      <p className="text-2xl font-bold text-yellow-700">
                        {Math.ceil((Date.now() - new Date(userData.created_at).getTime()) / (1000 * 60 * 60 * 24))} days
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
