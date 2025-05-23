
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Home } from 'lucide-react';

const HomeLoan = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleApply = () => {
    if (isLoggedIn) {
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
                <Home className="inline w-12 h-12 text-green-500 mr-2" />
                Home Loans
                <span className="text-green-500"> Up to ₹2 Crores</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Make your dream home a reality with our comprehensive home loan solutions. 
                Competitive rates, flexible terms, and hassle-free processing.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  <span>Interest rates starting from 8.5% per annum</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  <span>Loan tenure up to 30 years</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  <span>Up to 90% of property value financing</span>
                </div>
              </div>
              <Button 
                onClick={handleApply}
                className="mt-8 bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg"
              >
                Apply Now
              </Button>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop" 
                alt="Beautiful modern home"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Home Loans?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-green-200 hover:border-green-400 transition-colors">
              <CardHeader>
                <CardTitle className="text-green-600">🏠 Easy Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Pre-approved home loans with quick documentation and fast processing.</p>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader>
                <CardTitle className="text-blue-600">💸 Low Interest</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Competitive interest rates starting from 8.5% per annum with flexible terms.</p>
              </CardContent>
            </Card>
            
            <Card className="border-yellow-200 hover:border-yellow-400 transition-colors">
              <CardHeader>
                <CardTitle className="text-yellow-600">🎯 High LTV</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Finance up to 90% of your property value with minimal down payment.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Home Loan Types</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-green-600">Purchase Loan</CardTitle>
                <CardDescription>Up to ₹2 Crores</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Finance your new home purchase with our competitive home loans.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Up to 90% LTV ratio</li>
                  <li>• Tenure up to 30 years</li>
                  <li>• Tax benefits available</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-600">Home Improvement</CardTitle>
                <CardDescription>Up to ₹50 Lakhs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Renovate and improve your existing home with our improvement loans.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Quick approval process</li>
                  <li>• Flexible repayment terms</li>
                  <li>• No collateral required</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-yellow-600">Plot + Construction</CardTitle>
                <CardDescription>Up to ₹1.5 Crores</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Buy a plot and construct your dream home with our composite loans.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Staged disbursement</li>
                  <li>• Construction monitoring</li>
                  <li>• Flexible payment schedule</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Tax Benefits & More</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-green-600">Tax Savings</h3>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-700">Section 24(b)</h4>
                  <p className="text-green-600">Deduction up to ₹2 lakhs on interest paid</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700">Section 80C</h4>
                  <p className="text-blue-600">Deduction up to ₹1.5 lakhs on principal repayment</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-700">Additional Benefit</h4>
                  <p className="text-yellow-600">First-time homebuyers can save up to ₹50,000 extra</p>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=400&fit=crop" 
                alt="Tax calculation"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeLoan;
