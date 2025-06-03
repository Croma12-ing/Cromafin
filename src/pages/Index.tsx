
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const handleApplyNow = () => {
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
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Get Instant Loans
                <span className="text-red-500"> Up to ₹5 Lakhs</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Quick approval, minimal documentation, and competitive interest rates. 
                Your financial freedom is just a click away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleApplyNow}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Apply Now'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/emi-calculator')}
                  className="border-blue-500 text-blue-500 hover:bg-blue-50 px-8 py-4 text-lg"
                >
                  Calculate EMI
                </Button>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop" 
                alt="Woman using laptop for loan application"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-yellow-200 hover:border-yellow-400 transition-colors">
              <CardHeader>
                <CardTitle className="text-yellow-600">⚡ Instant Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Get loan approval in just 2 minutes with our AI-powered system.</p>
              </CardContent>
            </Card>
            <Card className="border-green-200 hover:border-green-400 transition-colors">
              <CardHeader>
                <CardTitle className="text-green-600">📋 Minimal Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Just PAN, Aadhaar, and bank statements. No complex paperwork needed.</p>
              </CardContent>
            </Card>
            <Card className="border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader>
                <CardTitle className="text-blue-600">💰 Best Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Competitive interest rates starting from 12% per annum.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Loan Products */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Loan Products</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/personal-loan')}>
              <CardHeader>
                <CardTitle className="text-red-600">Personal Loan</CardTitle>
                <CardDescription>Up to ₹5 Lakhs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Quick personal loans for any purpose. No collateral required.</p>
                <Button className="w-full mt-4 bg-red-500 hover:bg-red-600">Apply Now</Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/business-loan')}>
              <CardHeader>
                <CardTitle className="text-blue-600">Business Loan</CardTitle>
                <CardDescription>Up to ₹50 Lakhs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Fuel your business growth with our flexible business loans.</p>
                <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">Apply Now</Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/home-loan')}>
              <CardHeader>
                <CardTitle className="text-green-600">Home Loan</CardTitle>
                <CardDescription>Up to ₹2 Crores</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Make your dream home a reality with our home loans.</p>
                <Button className="w-full mt-4 bg-green-500 hover:bg-green-600">Apply Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-500 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">10L+</h3>
              <p>Happy Customers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">₹5000Cr+</h3>
              <p>Loans Disbursed</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">2 Min</h3>
              <p>Approval Time</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">4.8★</h3>
              <p>App Store Rating</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;
