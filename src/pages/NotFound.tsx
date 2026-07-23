import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // 404 route accessed
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] font-['Urbanist',sans-serif] antialiased relative flex flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4 py-40">
        <p className="text-[#10b981] text-[14px] font-medium tracking-widest uppercase mb-4">
          404 — Page Not Found
        </p>
        <h1 className="text-[56px] md:text-[88px] font-medium tracking-tighter text-[#0a0a0a] leading-[1.1] mb-6">
          Nothing here.
        </h1>
        <p className="text-[18px] text-[#64748b] font-normal max-w-md mb-12">
          The page you're looking for doesn't exist, was moved, or the URL is incorrect.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[#10b981] text-white font-medium text-[17px] shadow-md hover:bg-[#0d9668] transition-colors"
        >
          Back to Home <span>→</span>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
