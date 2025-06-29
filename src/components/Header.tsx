
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Home } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="ml-2 text-2xl font-bold text-gray-900">CromaFin</span>
            </div>
            <div>Loading...</div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="ml-2 text-2xl font-bold text-gray-900">CromaFin</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-red-500 transition-colors flex items-center"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </button>
            <button 
              onClick={() => navigate('/business-loan')}
              className="text-gray-700 hover:text-blue-500 transition-colors"
            >
              Business Loan
            </button>
            <button 
              onClick={() => navigate('/home-loan')}
              className="text-gray-700 hover:text-green-500 transition-colors"
            >
              Home Loan
            </button>
            <button 
              onClick={() => navigate('/emi-calculator')}
              className="text-gray-700 hover:text-yellow-500 transition-colors"
            >
              EMI Calculator
            </button>
            <button 
              onClick={() => navigate('/about-us')}
              className="text-gray-700 hover:text-purple-500 transition-colors"
            >
              About Us
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="text-gray-700 hover:text-red-500 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/profile')}
                  className="flex items-center"
                >
                  <User className="w-4 h-4 mr-1" />
                  Profile
                </Button>
                <Button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/login')}
                  className="border-blue-500 text-blue-500 hover:bg-blue-50"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => navigate('/signup')}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
