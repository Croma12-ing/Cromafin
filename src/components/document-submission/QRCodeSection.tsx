
import { QrCode } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface QRCodeSectionProps {
  qrCode: string;
  onChangeQrCode: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const QRCodeSection = ({ qrCode, onChangeQrCode }: QRCodeSectionProps) => {
  return (
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
          value={qrCode}
          onChange={onChangeQrCode}
          placeholder="Enter QR verification code"
          className="max-w-xs mx-auto"
        />
      </div>
    </div>
  );
};

export default QRCodeSection;
