
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyDetail = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">Your privacy is important to us</p>
          <p className="text-gray-500 mt-2">Last updated: September 28, 2025</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              We collect information you provide directly to us, such as when you create an account, 
              Advice for a loan, or contact us for support.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Personal identification information (Name, Email, Phone number)</li>
              <li>Financial information (Income, Employment details, Bank statements)</li>
              <li>Government-issued ID documents (PAN, Aadhaar)</li>
              <li>Credit score and credit history information</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To process loan applications and provide our services</li>
              <li>To verify identity and assess creditworthiness</li>
              <li>To communicate with you about your account and services</li>
              <li>To comply with legal and regulatory requirements</li>
              <li>To improve our services and customer experience</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Information Sharing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              We do not sell or rent your personal information. 
              We may share your information only with trusted service providers, 
              financial partners, regulatory authorities, or as required by law.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Information Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. We use industry-standard 
              encryption and secure data storage practices.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>User Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              You may request access, correction, or deletion of your personal information by contacting us. 
              We will respond in accordance with applicable laws and regulations.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us at <strong>privacy@cromafin.com</strong> or through our website's contact page.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyDetail;
