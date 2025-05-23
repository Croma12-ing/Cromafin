import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { FileText, QrCode } from 'lucide-react';
import { addLoanApplication } from '@/utils/dataService';

const DocumentSubmission = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>(null);
  const [formData, setFormData] = useState({
    loanType: '',
    loanAmount: '',
    panCard: '',
    aadhaarCard: '',
    mobileNumber: '',
    photo: null as File | null,
    qrCode: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('userData');
    
    if (!token || !user) {
      navigate('/login');
      return;
    }
    
    setUserData(JSON.parse(user));
  }, [navigate]);

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

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Document Submission</h1>
            <p className="text-xl text-gray-600">Complete your loan application by submitting required documents</p>
          </div>

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
                {/* Loan Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="loanType">Loan Type</Label>
                    <Select value={formData.loanType} onValueChange={(value) => setFormData({...formData, loanType: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal Loan</SelectItem>
                        <SelectItem value="business">Business Loan</SelectItem>
                        <SelectItem value="home">Home Loan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      required
                      value={formData.loanAmount}
                      onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                      className="mt-1"
                      placeholder="Enter loan amount"
                    />
                  </div>
                </div>

                {/* Document Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="panCard">PAN Card Number</Label>
                    <Input
                      id="panCard"
                      type="text"
                      required
                      value={formData.panCard}
                      onChange={(e) => setFormData({...formData, panCard: e.target.value.toUpperCase()})}
                      className="mt-1"
                      placeholder="ABCDE1234F"
                      pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                    />
                    <p className="text-sm text-gray-500 mt-1">Format: ABCDE1234F</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="aadhaarCard">Aadhaar Card Number</Label>
                    <Input
                      id="aadhaarCard"
                      type="text"
                      required
                      value={formData.aadhaarCard}
                      onChange={(e) => setFormData({...formData, aadhaarCard: e.target.value})}
                      className="mt-1"
                      placeholder="1234 5678 9012"
                      pattern="[0-9]{4}\s[0-9]{4}\s[0-9]{4}"
                    />
                    <p className="text-sm text-gray-500 mt-1">Format: 1234 5678 9012</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <Input
                    id="mobileNumber"
                    type="tel"
                    required
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                    className="mt-1"
                    placeholder="9876543210"
                    pattern="[0-9]{10}"
                  />
                  <p className="text-sm text-gray-500 mt-1">10-digit mobile number</p>
                </div>

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

                {/* QR Code Section */}
                <div>
                  <Label className="flex items-center mb-2">
                    <QrCode className="w-4 h-4 mr-2" />
                    QR Code Verification
                  </Label>
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <div className="bg-white p-4 rounded-lg inline-block mb-4">
                      <img 
                        src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=200&fit=crop" 
                        alt="QR Code for verification"
                        className="w-32 h-32 mx-auto"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Scan this QR code with your mobile app and enter the verification code</p>
                    <Input
                      type="text"
                      required
                      value={formData.qrCode}
                      onChange={(e) => setFormData({...formData, qrCode: e.target.value})}
                      placeholder="Enter QR verification code"
                      className="max-w-xs mx-auto"
                    />
                  </div>
                </div>

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

          {/* Information Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600 text-lg">⚡ Quick Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Your application will be processed within 24 hours</p>
              </CardContent>
            </Card>
            
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-600 text-lg">🔒 Secure & Safe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">All your documents are encrypted and stored securely</p>
              </CardContent>
            </Card>
            
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-600 text-lg">📞 Support Available</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Call 1800-123-4567 for any assistance</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DocumentSubmission;
