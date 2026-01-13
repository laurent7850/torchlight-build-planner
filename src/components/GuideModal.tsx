import React from 'react';
import { X, Heart, Clock, MapPin, Palette, MessageCircle } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-none sm:rounded-xl shadow-2xl max-w-4xl w-full h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sm:rounded-t-xl" style={{ borderColor: '#5A5A5A' }}>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center">
              <img 
                src="/Nostalgie-RVB copy.svg" 
                alt="Nostalgie" 
                className="h-6 sm:h-8 w-auto"
                style={{ maxWidth: '100px' }}
              />
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors"
            style={{ color: '#5A5A5A' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8">
          {/* Nouveau contenu du guide */}
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6" style={{ color: '#5A5A5A', fontFamily: 'serif' }}>
              🎵 Guide pour voyager dans le Labo Nostalgie
            </h1>
            
            <div className="rounded-xl p-6 sm:p-8 border text-left space-y-4" style={{ background: 'linear-gradient(to right, #facc5e10, #facc5e15)', borderColor: '#5A5A5A' }}>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#5A5A5A' }}>
                C'est ici que la magie se fabrique. Nous allons vous poser quelques questions afin de créer une playlist à l'image de votre vie.
              </p>
              
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#5A5A5A' }}>
                N'ayez pas peur de raconter les moments forts de votre existence avec émotion et détails. Au plus vos souvenirs sont racontés intensément et précisément au plus la playlist devrait vous ressembler.
              </p>
              
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#5A5A5A' }}>
                Mais avant toute chose, nous vous souhaitons surtout de vous amuser et de passer un bon moment à l'intérieur du Labo Nostalgie.
              </p>
              
              <p className="text-sm sm:text-base leading-relaxed font-medium" style={{ color: '#5A5A5A' }}>
                Nous vous remercions pour votre participation à cette expérience unique !
              </p>
              
              <p className="text-sm sm:text-base leading-relaxed font-semibold text-right" style={{ color: '#facc5e' }}>
                L'équipe de Nostalgie
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="mt-6 px-6 sm:px-8 py-3 sm:py-4 bg-white rounded-lg text-sm sm:text-base font-semibold transition-colors shadow-md"
              style={{ color: '#facc5e' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#facc5e10'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              Commencer l'expérience
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};