
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DocumentForm from '@/components/document-submission/DocumentForm';
import InfoCards from '@/components/document-submission/InfoCards';

const DocumentSubmission = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('userData');
    
    if (!token || !user) {
      navigate('/login');
      return;
    }
    
    setUserData(JSON.parse(user));
  }, [navigate]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Document Submission</h1>
            <p className="text-xl text-gray-600">Complete your loan application by submitting required documents</p>
          </div>

          <DocumentForm userData={userData} />
          <InfoCards />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DocumentSubmission;
