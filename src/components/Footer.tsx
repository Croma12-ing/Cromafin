
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="ml-2 text-xl font-bold">CromaFin</span>
            </div>
            <p className="text-gray-400">
              Your trusted partner for instant loans and financial solutions.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Loan Products</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => navigate('/personal-loan')} className="hover:text-white transition-colors">
                  Personal Loan
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/business-loan')} className="hover:text-white transition-colors">
                  Business Loan
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/home-loan')} className="hover:text-white transition-colors">
                  Home Loan
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/emi-calculator')} className="hover:text-white transition-colors">
                  EMI Calculator
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => navigate('/about-us')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/privacy-policy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms-and-conditions')} className="hover:text-white transition-colors">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">
                  Help Center
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/refund-policy')} className="hover:text-white transition-colors">
                  Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms-and-conditions')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 CromaFin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
