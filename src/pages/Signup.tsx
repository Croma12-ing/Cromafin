
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState<'form' | 'otp'>('form');
  const [formLoading, setFormLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormLoading(true);
    
    try {
      // Send OTP to phone number
      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: { phoneNumber: formData.phone.replace(/\D/g, '') }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "OTP Sent",
        description: "Please check your phone for the verification code.",
      });

      setCurrentStep('otp');
    } catch (error) {
      console.error('OTP sending error:', error);
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive"
      });
    }
    
    setFormLoading(false);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP.",
        variant: "destructive"
      });
      return;
    }
    
    setOtpLoading(true);
    
    try {
      // Verify OTP first
      const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-otp', {
        body: { 
          phoneNumber: formData.phone.replace(/\D/g, ''), 
          otp: otp 
        }
      });

      if (verifyError) {
        throw verifyError;
      }

      // If OTP is valid, create the account
      const { error: signUpError } = await signUp(
        formData.email.trim(),
        formData.password,
        formData.name.trim(),
        formData.phone.replace(/\D/g, '')
      );
      
      if (signUpError) {
        let errorMessage = 'Account creation failed. Please try again.';
        
        if (signUpError.message.includes('already registered')) {
          errorMessage = 'An account with this email already exists. Please sign in instead.';
        } else if (signUpError.message.includes('Password should be')) {
          errorMessage = 'Password is too weak. Please choose a stronger password.';
        } else if (signUpError.message.includes('Invalid email')) {
          errorMessage = 'Please enter a valid email address.';
        }
        
        toast({
          title: "Signup Failed",
          description: errorMessage,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Account Created Successfully",
          description: "Please sign in with your credentials.",
        });
        
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (error: any) {
      console.error('OTP verification error:', error);
      let errorMessage = "OTP verification failed. Please try again.";
      
      if (error.message?.includes('expired')) {
        errorMessage = "OTP has expired. Please request a new one.";
      } else if (error.message?.includes('Invalid OTP')) {
        errorMessage = "Invalid OTP. Please check and try again.";
      }
      
      toast({
        title: "Verification Failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
    
    setOtpLoading(false);
  };

  const handleResendOtp = async () => {
    setFormLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: { phoneNumber: formData.phone.replace(/\D/g, '') }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "OTP Resent",
        description: "A new verification code has been sent to your phone.",
      });
    } catch (error) {
      console.error('OTP resending error:', error);
      toast({
        title: "Error",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive"
      });
    }
    
    setFormLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <div className="flex items-center justify-center py-20 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {currentStep === 'form' ? 'Create Account' : 'Verify Phone Number'}
            </CardTitle>
            <CardDescription>
              {currentStep === 'form' ? 'Sign up to get started' : 'Enter the OTP sent to your phone'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 'form' ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`mt-1 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="Create a password (min. 6 characters)"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`mt-1 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-red-500 hover:bg-red-600"
                  disabled={loading || formLoading}
                >
                  {loading || formLoading ? 'Sending OTP...' : 'Send OTP'}
                </Button>
                
                <div className="text-center">
                  <span className="text-gray-600">Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Enter 6-digit OTP</Label>
                  <p className="text-sm text-gray-600">
                    We sent a verification code to {formData.phone}
                  </p>
                  <div className="flex justify-center">
                    <InputOTP
                      value={otp}
                      onChange={setOtp}
                      maxLength={6}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-red-500 hover:bg-red-600"
                  disabled={loading || otpLoading || otp.length !== 6}
                >
                  {loading || otpLoading ? 'Verifying...' : 'Verify & Create Account'}
                </Button>
                
                <div className="text-center space-y-2">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={formLoading}
                    className="text-blue-500 hover:text-blue-600 font-medium disabled:opacity-50"
                  >
                    {formLoading ? 'Sending...' : 'Resend OTP'}
                  </button>
                  <div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep('form')}
                      className="text-gray-500 hover:text-gray-600 font-medium"
                    >
                      Back to form
                    </button>
                  </div>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Signup;
