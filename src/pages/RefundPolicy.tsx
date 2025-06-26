
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund and Cancellation Policy</h1>
          <p className="text-xl text-gray-600">Understand our refund and cancellation terms</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Application Fees</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              The application processing fee of ₹349 is charged to cover the cost of document verification, 
              credit checks, and application processing services.
            </p>
            <p className="text-gray-700 font-semibold">
              This fee is non-refundable once the application processing has begun.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Loan Cancellation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              You may cancel your loan application before the loan amount is disbursed. However, 
              the application processing fee will not be refunded.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Cancellation requests must be submitted in writing</li>
              <li>Once loan is disbursed, standard loan terms and conditions apply</li>
              <li>Pre-payment charges may apply as per loan agreement</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Refund Process</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              In exceptional cases where a refund is approved:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Refund will be processed within 7-10 business days</li>
              <li>Refund will be credited to the original payment method</li>
              <li>Bank processing charges, if any, will be deducted from the refund amount</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact for Refunds</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              For any refund-related queries, please contact our customer support team at 
              support@cromafin.com or call our helpline. Please include your application 
              reference number for faster processing.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default RefundPolicy;
