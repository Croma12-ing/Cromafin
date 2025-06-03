
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

interface FormData {
  loanType: string;
  loanAmount: string;
  panCard: string;
  aadhaarCard: string;
  mobileNumber: string;
  qrCode: string;
  photoUrl?: string;
}

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData | null>(null);

  // Function to generate a CIBIL score below 600
  const getDisplayCibilScore = (): number => {
    const lowScores = [520, 535, 545, 560, 575, 580, 585, 590, 595];
    return lowScores[Math.floor(Math.random() * lowScores.length)];
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const state = location.state as { formData: FormData } | null;
    if (state?.formData) {
      setFormData(state.formData);
    } else {
      navigate('/document-submission');
    }
  }, [user, location.state, navigate]);

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  const getLoanTypeDisplay = (type: string) => {
    switch (type) {
      case 'personal': return 'Personal Loan';
      case 'business': return 'Business Loan';
      case 'home': return 'Home Loan';
      default: return type;
    }
  };

  const displayCibilScore = getDisplayCibilScore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h1>
            <p className="text-xl text-gray-600">Your loan application has been received and is being processed.</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-green-600">Submitted Application Details</CardTitle>
              <CardDescription>Please review your submitted information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Loan Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Loan Type</h3>
                  <p className="text-gray-900">{getLoanTypeDisplay(formData.loanType)}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Loan Amount</h3>
                  <p className="text-gray-900">₹{parseFloat(formData.loanAmount).toLocaleString()}</p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">PAN Card Number</h3>
                  <p className="text-gray-900 font-mono">{formData.panCard}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Aadhaar Card Number</h3>
                  <p className="text-gray-900 font-mono">{formData.aadhaarCard}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Mobile Number</h3>
                <p className="text-gray-900">{formData.mobileNumber}</p>
              </div>

              {/* Photo */}
              {formData.photoUrl && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Uploaded Photo</h3>
                  <img 
                    src={formData.photoUrl} 
                    alt="Uploaded passport photo" 
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}

              {/* QR Code */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">QR Verification Code</h3>
                <p className="text-gray-900 font-mono">{formData.qrCode}</p>
              </div>

              {/* CIBIL Score Status */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-700 mb-2">Credit Score Status</h3>
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="text-red-600 font-bold text-lg">CIBIL Score: {displayCibilScore}</p>
                    <p className="text-red-500 text-sm">⚠️ Your CIBIL score is currently low. This may affect loan approval terms.</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-700 mb-2">Application Status</h3>
                <p className="text-yellow-600">Your application is currently under review. Due to your current credit score, we will contact you within 24-48 hours with special loan options and improvement recommendations.</p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-x-4">
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="px-8"
            >
              Back to Home
            </Button>
            <Button 
              onClick={() => navigate('/profile')}
              className="bg-blue-500 hover:bg-blue-600 px-8"
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ConfirmationPage;
