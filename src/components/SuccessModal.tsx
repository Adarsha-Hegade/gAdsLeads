import React from 'react';
import { Download, ExternalLink, CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  catalogueUrl: string;
  websiteUrl: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ catalogueUrl, websiteUrl }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all">
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-gray-900 mb-2">
            Thank You!
          </h2>
          <p className="text-gray-600">
            Your exclusive access is ready. Choose your preferred next step:
          </p>
        </div>
        
        <div className="space-y-4">
          <a
            href={catalogueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-[#1a5f7a] text-white px-6 py-4 rounded-full hover:bg-[#2c3e50] transition-all duration-300 group"
          >
            <Download size={20} className="group-hover:scale-110 transition-transform duration-300" />
            Download Premium Catalogue
          </a>
          
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 border-2 border-[#1a5f7a] text-[#1a5f7a] px-6 py-4 rounded-full hover:bg-[#1a5f7a] hover:text-white transition-all duration-300 group"
          >
            <ExternalLink size={20} className="group-hover:scale-110 transition-transform duration-300" />
            Explore Our Collection
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal