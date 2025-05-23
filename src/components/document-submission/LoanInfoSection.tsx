
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LoanInfoSectionProps {
  loanType: string;
  loanAmount: string;
  onChangeLoanType: (value: string) => void;
  onChangeLoanAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoanInfoSection = ({
  loanType,
  loanAmount,
  onChangeLoanType,
  onChangeLoanAmount
}: LoanInfoSectionProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <Label htmlFor="loanType">Loan Type</Label>
        <Select value={loanType} onValueChange={onChangeLoanType}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select loan type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal">Personal Loan</SelectItem>
            <SelectItem value="business">Business Loan</SelectItem>
            <SelectItem value="home">Home Loan</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
        <Input
          id="loanAmount"
          type="number"
          required
          value={loanAmount}
          onChange={onChangeLoanAmount}
          className="mt-1"
          placeholder="Enter loan amount"
        />
      </div>
    </div>
  );
};

export default LoanInfoSection;
