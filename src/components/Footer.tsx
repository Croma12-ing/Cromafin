
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">Q</span>
              </div>
              <span className="ml-2 text-xl font-bold">QuickCredit</span>
            </div>
            <p className="text-gray-400">
              Your trusted partner for instant loans and financial solutions.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Loan Products</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Personal Loan</li>
              <li>Business Loan</li>
              <li>Home Loan</li>
              <li>Education Loan</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Blog</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 QuickCredit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
