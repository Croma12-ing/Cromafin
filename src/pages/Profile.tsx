
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { User } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('userData');
    
    if (!token || !user) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(user);
    setUserData(parsedUser);
    setFormData({
      name: parsedUser.name || '',
      email: parsedUser.email || '',
      phone: parsedUser.phone || ''
    });
  }, [navigate]);

  const handleSave = () => {
    const updatedUser = { ...userData, ...formData };
    setUserData(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === userData.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const getLoanApplications = () => {
    return JSON.parse(localStorage.getItem('loanApplications') || '[]')
      .filter((app: any) => app.userId === userData?.id);
  };

  const getEMIHistory = () => {
    return JSON.parse(localStorage.getItem('emiHistory') || '[]').slice(-5);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

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
                        <p className="text-lg">{userData.phone}</p>
                      </div>
                      
                      <div>
                        <Label>Member Since</Label>
                        <p className="text-lg">{new Date(userData.createdAt).toLocaleDateString()}</p>
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
                </CardContent>
              </Card>

              {/* Account Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Account Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-blue-600 font-semibold">Loan Applications</p>
                      <p className="text-2xl font-bold text-blue-700">{getLoanApplications().length}</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-green-600 font-semibold">EMI Calculations</p>
                      <p className="text-2xl font-bold text-green-700">{getEMIHistory().length}</p>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <p className="text-yellow-600 font-semibold">Account Age</p>
                      <p className="text-2xl font-bold text-yellow-700">
                        {Math.ceil((Date.now() - new Date(userData.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days
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
