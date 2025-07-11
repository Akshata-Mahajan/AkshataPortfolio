import { Home as HomeIcon, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] mb-4 animate-pulse">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] mx-auto rounded-full"></div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-base text-slate-400 max-w-md mx-auto leading-relaxed">
            The page you’re looking for might have been moved, deleted, or never existed. Let’s get you back on track.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-full flex items-center justify-center mb-6">
            <div className="text-6xl">🔍</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-6 py-3 border border-[#6366f1] rounded-lg text-[#6366f1] hover:bg-[#6366f1]/10 transition duration-300"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>

          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-lg hover:opacity-80 transition duration-300"
          >
            <HomeIcon size={20} />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
