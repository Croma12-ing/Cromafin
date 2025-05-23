
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const InfoCards = () => {
  return (
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
  );
};

export default InfoCards;
