import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

const BusinessLoan = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const handleApply = () => {
    if (user) {
      navigate('/document-submission');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Business Loans
                <span className="text-blue-500"> Up to ₹50 Lakhs</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Fuel your business growth with our flexible business loans. 
                Quick approval, competitive rates, and minimal documentation.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mr-3"></span>
                  <span>Interest rates starting from 14% per annum</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mr-3"></span>
                  <span>Flexible repayment terms up to 5 years</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mr-3"></span>
                  <span>No collateral required for loans up to ₹10 lakhs</span>
                </div>
              </div>
              <Button 
                onClick={handleApply}
                className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Apply Now'}
              </Button>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=400&fit=crop" 
                alt="Business professional working"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Business Loans?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader>
                <CardTitle className="text-blue-600">🚀 Quick Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Get your business loan approved in just 24 hours with minimal documentation.</p>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 hover:border-green-400 transition-colors">
              <CardHeader>
                <CardTitle className="text-green-600">💰 Competitive Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Best-in-market interest rates starting from 14% per annum.</p>
              </CardContent>
            </Card>
            
            <Card className="border-yellow-200 hover:border-yellow-400 transition-colors">
              <CardHeader>
                <CardTitle className="text-yellow-600">📋 Flexible Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Choose repayment terms that suit your business cash flow.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Business Loan Types</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-600">Working Capital Loan</CardTitle>
                <CardDescription>₹1 Lakh - ₹25 Lakhs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Manage your day-to-day business expenses with our working capital loans.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Quick disbursement within 24 hours</li>
                  <li>• Flexible repayment options</li>
                  <li>• Minimal documentation required</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-green-600">Equipment Finance</CardTitle>
                <CardDescription>₹5 Lakhs - ₹50 Lakhs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Finance new equipment and machinery for your business growth.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Up to 90% financing of equipment cost</li>
                  <li>• Competitive interest rates</li>
                  <li>• Equipment acts as collateral</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Eligibility Criteria</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Basic Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                  <span>Business operational for at least 2 years</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                  <span>Annual turnover of at least ₹10 lakhs</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                  <span>Age between 25-65 years</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                  <span>Good credit score (650+)</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">Required Documents</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                  <span>PAN Card & Aadhaar Card</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                  <span>Business registration documents</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                  <span>Bank statements (6 months)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                  <span>ITR for last 2 years</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessLoan;
