
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600">Learn more about CromaFin and our mission</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Our Company</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              Our company provides services for checking CIBIL scores, calculating EMIs, and assisting with loan applications.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                To make financial services accessible to everyone by providing quick, reliable, and transparent loan solutions 
                with minimal documentation and competitive rates.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                To become India's most trusted digital lending platform, empowering individuals and businesses 
                to achieve their financial goals with ease and confidence.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-green-600">Why Choose CromaFin?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Quick Processing</h3>
                <p className="text-gray-600">Get your loan approved in just 2 minutes with our AI-powered system</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Minimal Documentation</h3>
                <p className="text-gray-600">Simple process with just basic documents required</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Competitive Rates</h3>
                <p className="text-gray-600">Best interest rates starting from 12% per annum</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
