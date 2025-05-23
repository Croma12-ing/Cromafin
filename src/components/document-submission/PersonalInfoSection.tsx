
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface PersonalInfoSectionProps {
  panCard: string;
  aadhaarCard: string;
  mobileNumber: string;
  onChangePanCard: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAadhaarCard: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMobileNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoSection = ({
  panCard,
  aadhaarCard,
  mobileNumber,
  onChangePanCard,
  onChangeAadhaarCard,
  onChangeMobileNumber
}: PersonalInfoSectionProps) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="panCard">PAN Card Number</Label>
          <Input
            id="panCard"
            type="text"
            required
            value={panCard}
            onChange={onChangePanCard}
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
            value={aadhaarCard}
            onChange={onChangeAadhaarCard}
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
          value={mobileNumber}
          onChange={onChangeMobileNumber}
          className="mt-1"
          placeholder="9876543210"
          pattern="[0-9]{10}"
        />
        <p className="text-sm text-gray-500 mt-1">10-digit mobile number</p>
      </div>
    </>
  );
};

export default PersonalInfoSection;
