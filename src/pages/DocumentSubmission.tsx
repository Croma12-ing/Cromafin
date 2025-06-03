
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DocumentForm from '@/components/document-submission/DocumentForm';
import InfoCards from '@/components/document-submission/InfoCards';
import { useAuth } from '@/contexts/AuthContext';

const DocumentSubmission = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.log('User not authenticated, redirecting to login');
        navigate('/login');
      } else {
        console.log('User authenticated:', user.email);
        setPageLoading(false);
      }
    }
  }, [user, loading, navigate]);

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Document Submission</h1>
            <p className="text-xl text-gray-600">Complete your loan application by submitting required documents</p>
            <p className="text-sm text-gray-500 mt-2">Welcome, {user.email}</p>
          </div>

          <DocumentForm />
          <InfoCards />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DocumentSubmission;
