
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calculator } from 'lucide-react';

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(12);
  const [loanTenure, setLoanTenure] = useState<number>(24);
  const [result, setResult] = useState<any>(null);

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    const calculationData = {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principal,
      rate: interestRate,
      tenure: loanTenure,
      calculatedAt: new Date().toISOString()
    };

    setResult(calculationData);

    // Store calculation history
    const history = JSON.parse(localStorage.getItem('emiHistory') || '[]');
    history.push(calculationData);
    localStorage.setItem('emiHistory', JSON.stringify(history));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">EMI Calculator</h1>
            <p className="text-xl text-gray-600">Calculate your Equated Monthly Installment</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-blue-500" />
                  Loan Details
                </CardTitle>
                <CardDescription>Enter your loan information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="amount">Loan Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="mt-1"
                  />
                  <div className="mt-2">
                    <input
                      type="range"
                      min="50000"
                      max="5000000"
                      step="10000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>₹50K</span>
                      <span>₹50L</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="rate">Interest Rate (% per annum)</Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="mt-1"
                  />
                  <div className="mt-2">
                    <input
                      type="range"
                      min="8"
                      max="25"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>8%</span>
                      <span>25%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tenure">Loan Tenure (Months)</Label>
                  <Input
                    id="tenure"
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="mt-1"
                  />
                  <div className="mt-2">
                    <input
                      type="range"
                      min="6"
                      max="360"
                      step="6"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>6 months</span>
                      <span>30 years</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={calculateEMI}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  Calculate EMI
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">EMI Calculation Results</CardTitle>
                <CardDescription>Your loan breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-50 p-4 rounded-lg text-center">
                        <p className="text-red-600 font-semibold">Monthly EMI</p>
                        <p className="text-2xl font-bold text-red-700">₹{result.emi.toLocaleString()}</p>
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-lg text-center">
                        <p className="text-yellow-600 font-semibold">Total Interest</p>
                        <p className="text-2xl font-bold text-yellow-700">₹{result.totalInterest.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-green-600 font-semibold">Total Payment</p>
                      <p className="text-3xl font-bold text-green-700">₹{result.totalPayment.toLocaleString()}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Principal Amount:</span>
                        <span className="font-semibold">₹{result.principal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest Rate:</span>
                        <span className="font-semibold">{result.rate}% p.a.</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Loan Tenure:</span>
                        <span className="font-semibold">{result.tenure} months</span>
                      </div>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Payment Breakdown</h4>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className="bg-blue-500 h-4 rounded-full" 
                          style={{width: `${(result.principal/result.totalPayment)*100}%`}}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2 text-sm">
                        <span>Principal: {((result.principal/result.totalPayment)*100).toFixed(1)}%</span>
                        <span>Interest: {((result.totalInterest/result.totalPayment)*100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Enter loan details and click calculate to see your EMI breakdown</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EMICalculator;
