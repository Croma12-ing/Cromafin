
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addLoanApplication } from '@/utils/dataService';
import QRCodeSection from './QRCodeSection';
import LoanInfoSection from './LoanInfoSection';
import PersonalInfoSection from './PersonalInfoSection';

interface DocumentFormProps {
  userData: any;
}

const DocumentForm = ({ userData }: DocumentFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    loanType: '',
    loanAmount: '',
    panCard: '',
    aadhaarCard: '',
    mobileNumber: '',
    photo: null as File | null,
    qrCode: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({...formData, photo: file});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userData) return;
    
    // Use our data service to add the loan application
    addLoanApplication({
      userId: userData.id,
      loanType: formData.loanType,
      loanAmount: formData.loanAmount,
      panCard: formData.panCard,
      aadhaarCard: formData.aadhaarCard,
      mobileNumber: formData.mobileNumber,
      photoName: formData.photo?.name,
      qrCode: formData.qrCode,
    });
    
    toast({
      title: "Application Submitted Successfully",
      description: "Your loan process is in waiting. We'll review your documents and get back to you soon.",
    });
    
    // Reset form
    setFormData({
      loanType: '',
      loanAmount: '',
      panCard: '',
      aadhaarCard: '',
      mobileNumber: '',
      photo: null,
      qrCode: ''
    });
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-500" />
          Loan Application Form
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

          {/* Photo Upload */}
          <div>
            <Label htmlFor="photo">Passport Size Photo</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">Upload a recent passport-size photograph (JPG, PNG)</p>
          </div>

          <QRCodeSection 
            qrCode={formData.qrCode}
            onChangeQrCode={(e) => updateFormData('qrCode', e.target.value)}
          />

          {/* Submit Button */}
          <div className="text-center">
            <Button 
              type="submit" 
              className="bg-green-500 hover:bg-green-600 px-12 py-3 text-lg"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DocumentForm;
