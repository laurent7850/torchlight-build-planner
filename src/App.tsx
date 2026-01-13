import React, { useState, useEffect, useRef } from 'react';
import { Send, User, HelpCircle } from 'lucide-react';
import { GuideModal } from './components/GuideModal';

// Configuration N8N - URL du webhook
const webhookUrl = 'https://distr-action.app.n8n.cloud/webhook/5606fa54-4c95-4253-abf1-3672df91ced0';

// Variables globales pour la gestion de session DJ Lyric
let djLyricSession = null;
let sessionId = null;

// Fonction pour initialiser une session
function initializeSession() {
  sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  djLyricSession = null;
}

interface Message {
  content: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface ChatStatus {
  message: string;
  type: 'success' | 'error';
}

interface UserProfile {
  email: string;
  firstName: string;
  phoneNumber: string;
  locality: string;
  hasProvidedEmail: boolean;
  hasCompletedForm: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<ChatStatus | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    email: '',
    firstName: '',
    phoneNumber: '',
    locality: '',
    hasProvidedEmail: false,
    hasCompletedForm: false
  });
  const [showGuide, setShowGuide] = useState(false);
  const [showUserForm, setShowUserForm] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    phoneNumber: '',
    locality: '',
    acceptPrivacy: false
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initialiser la session DJ Lyric
    initializeSession();

    // Vérifier si les données utilisateur sont déjà stockées
    const storedUserData = sessionStorage.getItem('djlyric_user_data');
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        setUserProfile({
          email: userData.email || '',
          firstName: userData.firstName || '',
          phoneNumber: userData.phoneNumber || '',
          locality: userData.locality || '',
          hasProvidedEmail: !!userData.email,
          hasCompletedForm: true
        });
        setShowUserForm(false);
        
        // Message de bienvenue avec le prénom
        setMessages([{
          content: `Bonjour ${userData.firstName || 'cher auditeur'} et bienvenue dans le Labo Nostalgie. Sur base de 18 questions, les laborantins Nostalgie vont tenter de vous cerner. On y va ?`,
          sender: 'bot',
          timestamp: new Date()
        }]);
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur:', error);
      }
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const showStatus = (message: string, type: 'success' | 'error') => {
    setStatus({ message, type });
    setTimeout(() => setStatus(null), 3000);
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.email.trim()) {
      errors.email = 'L\'email est requis pour recevoir votre playlist';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Veuillez entrer un email valide';
    }
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'Le prénom est requis pour personnaliser votre expérience';
    }
    
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Le numéro de téléphone est requis';
    }
    
    if (!formData.locality.trim()) {
      errors.locality = 'La localité est requise';
    }
    
    if (!formData.acceptPrivacy) {
      errors.acceptPrivacy = 'Vous devez accepter la politique de confidentialité pour continuer';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStartConversation = () => {
    if (!validateForm()) {
      return;
    }

    const userData = {
      email: formData.email.trim(),
      firstName: formData.firstName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      locality: formData.locality.trim(),
      sessionId: sessionId
    };

    // Stocker les données utilisateur
    sessionStorage.setItem('djlyric_user_data', JSON.stringify(userData));
    
    // Mettre à jour le profil utilisateur
    setUserProfile({
      email: userData.email,
      firstName: userData.firstName,
      phoneNumber: userData.phoneNumber,
      locality: userData.locality,
      hasProvidedEmail: true,
      hasCompletedForm: true
    });

    // Masquer le formulaire et afficher le chat
    setShowUserForm(false);
    
    // Message de bienvenue personnalisé
    setMessages([{
      content: `Bonjour ${userData.firstName} et bienvenue dans le Labo Nostalgie. Sur base de 18 questions, les laborantins Nostalgie vont tenter de vous cerner. On y va ?`,
      sender: 'bot',
      timestamp: new Date()
    }]);

    showStatus(`Bienvenue ${userData.firstName} ! Votre expérience personnalisée commence.`, 'success');
  };

  const callN8NWebhook = async (message: string) => {
    // Récupérer les données utilisateur stockées
    const storedUserData = sessionStorage.getItem('djlyric_user_data');
    
    // Vérification de la connectivité réseau (important pour Safari/Mac)
    if (!navigator.onLine) {
      console.warn('⚠️ Pas de connexion réseau détectée');
      return {
        response: "Il semble que vous n'ayez pas de connexion internet. Veuillez vérifier votre connexion et réessayer.",
        sessionId: sessionId || 'offline_session',
        session: djLyricSession
      };
    }

    // Timeout pour éviter les blocages sur Mac/Safari
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 secondes
    
    let userData = {};
    
    if (storedUserData) {
      try {
        userData = JSON.parse(storedUserData);
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur:', error);
      }
    }

    const requestBody = {
      chatInput: message,
      sessionId: sessionId,
      timestamp: new Date().toISOString(),
      firstName: userData.firstName || '',
      userEmail: userData.email || '',
      phoneNumber: userData.phoneNumber || '',
      locality: userData.locality || ''
    };

    // CRITIQUE: Ajouter la session seulement si elle existe
    if (djLyricSession) {
      requestBody.session = djLyricSession;
    }

    console.log('🚀 Envoi de la requête POST vers:', webhookUrl);
    console.log('📦 Payload envoyé:', requestBody);
    console.log('🆔 SessionId utilisé:', sessionId);
    console.log('🔄 Session DJ Lyric:', djLyricSession ? 'Existante' : 'Nouvelle');

    try {
      // Configuration spécifique pour améliorer la compatibilité Mac/Safari
      const response = await fetch(webhookUrl, {
        method: 'POST', // Majuscule pour une meilleure compatibilité
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
          'User-Agent': navigator.userAgent || 'ChatApp/1.0'
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
        // Options pour Safari/Mac
        mode: 'cors',
        credentials: 'omit'
      });

      clearTimeout(timeoutId);

      console.log('📡 Statut de la réponse:', response.status);
      console.log('📋 Headers de la réponse:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        console.warn(`⚠️ Erreur HTTP ${response.status} du webhook N8N, utilisation du fallback`);
        return {
          response: "Bonjour ! Je suis votre Assistant. Il semble y avoir un problème de connexion temporaire, mais je suis là pour vous aider à créer votre playlist personnalisée. Parlez-moi de vos goûts musicaux !",
          sessionId: sessionId || 'fallback_session',
          session: djLyricSession
        };
      }

      const responseText = await response.text();
      console.log('📋 Réponse brute:', responseText);
      console.log('📋 Type de réponse:', typeof responseText);
      console.log('📋 Longueur de la réponse:', responseText.length);
      
      try {
        const responseData = JSON.parse(responseText);
        console.log('✅ JSON parsé avec succès:', responseData);
        console.log('🔍 Structure de la réponse:', JSON.stringify(responseData, null, 2));
        console.log('🔍 Clés disponibles:', Object.keys(responseData));
        
        // CRITIQUE: Sauvegarder la session reçue dans la réponse
        if (responseData.session) {
          djLyricSession = responseData.session;
          console.log('💾 Session DJ Lyric sauvegardée:', djLyricSession);
        }
        
        return responseData;
      } catch (parseError) {
        console.warn('⚠️ Erreur parsing JSON, retour texte:', parseError);
        console.log('📝 Réponse en tant que texte brut:', responseText);
        return { response: responseText, sessionId: sessionId, session: djLyricSession };
      }

    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        console.error('❌ Timeout de la requête (30s)');
        return {
          response: "La connexion prend trop de temps. Cela peut être dû à votre connexion internet. Voulez-vous réessayer ?",
          sessionId: sessionId || 'timeout_session',
          session: djLyricSession
        };
      }
      
      console.error('❌ Erreur de connexion au webhook N8N:', error instanceof Error ? error.message : 'Erreur inconnue');
      console.error('❌ Stack trace:', error);
      
      // Message d'erreur spécifique pour Mac/Safari
      const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
      const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      
      let errorMessage = "Bonjour ! Je suis votre Assistant. Il semble y avoir un problème de connexion temporaire, mais je suis là pour vous aider à créer votre playlist personnalisée. Parlez-moi de vos goûts musicaux !";
      
      if (isMac || isSafari) {
        errorMessage = "Bonjour ! Je détecte que vous utilisez un Mac/Safari. Il peut y avoir des restrictions de sécurité. Essayez de rafraîchir la page ou d'utiliser un autre navigateur. En attendant, je peux vous aider avec votre playlist !";
      }
      
      // ✅ FALLBACK : Simuler une réponse DJ Lyric
      return {
        response: errorMessage,
        sessionId: sessionId || 'fallback_session',
        session: djLyricSession
      };
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = inputValue.trim();
    if (!message || isLoading) return;

    // Ajouter le message utilisateur
    const userMessage: Message = {
      content: message,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      console.log('💬 Envoi du message:', message);
      console.log('🆔 Session ID:', sessionId);
      
      const response = await callN8NWebhook(message);
      console.log('🎯 Réponse complète reçue:', response);
      console.log('🎯 Type de la réponse:', typeof response);
      
      // Vérification spéciale pour les erreurs de CORS (fréquent sur Mac/Safari)
      if (response && typeof response === 'object' && response.sessionId === 'fallback_session') {
        const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
        if (isMac) {
          showStatus('Mode compatibilité Mac activé', 'error');
        } else {
          showStatus('Mode hors ligne - Assistant simule les réponses', 'error');
        }
      }
      
      // Extraire la réponse
      let botResponse = '';
     
      // Analyser différents formats de réponse possibles
      if (response && typeof response === 'object') {
        console.log('🔍 Analyse de l\'objet réponse...');
        
        // Essayer différentes propriétés possibles
        if (response.response) {
          botResponse = response.response;
          console.log('✅ Trouvé dans response.response:', botResponse);
        } else if (response.message) {
          botResponse = response.message;
          console.log('✅ Trouvé dans response.message:', botResponse);
        } else if (response.output) {
          botResponse = response.output;
          console.log('✅ Trouvé dans response.output:', botResponse);
        } else if (response.text) {
          botResponse = response.text;
          console.log('✅ Trouvé dans response.text:', botResponse);
        } else if (response.data) {
          botResponse = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
          console.log('✅ Trouvé dans response.data:', botResponse);
        } else {
          // Si aucune propriété connue, afficher l'objet entier
          botResponse = JSON.stringify(response, null, 2);
          console.log('⚠️ Structure inconnue, affichage de l\'objet complet:', botResponse);
        }
      } else if (typeof response === 'string') {
        botResponse = response;
        console.log('✅ Réponse directe en string:', botResponse);
      } else {
        botResponse = "Je suis DJ Lyric ! Comment puis-je vous aider avec votre playlist ?";
        botResponse = "Je suis votre Assistant ! Comment puis-je vous aider avec votre playlist ?";
        console.log('⚠️ Format de réponse non reconnu, utilisation du message par défaut');
      }
      
      if (botResponse && botResponse.trim() !== '') {
        const botMessage: Message = {
          content: botResponse,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        
      } else {
        console.warn('⚠️ Réponse vide ou invalide reçue');
        const errorMessage: Message = {
          content: "J'ai reçu une réponse vide. Pouvez-vous reformuler votre question ?",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }

    } catch (error) {
      console.error('❌ Erreur de connexion:', error);
      
      // Message d'erreur convivial
      const errorMessage: Message = {
        content: "Je suis désolé, je rencontre des difficultés techniques. Essayons de continuer : pouvez-vous me parler de vos artistes préférés ?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      showStatus('Problème de connexion', 'error');
    } finally {
      setIsLoading(false);
      // Remettre le focus sur le champ de saisie après la fin du traitement
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const TypingIndicator = () => (
    <div className="flex items-start mb-4">
      <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3 border" style={{ borderColor: '#facc5e' }}>
        <span className="text-sm font-bold" style={{ fontFamily: 'serif', color: '#facc5e' }}>
          N
        </span>
      </div>
      <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border max-w-xs" style={{ borderColor: '#facc5e' }}>
        <div className="flex items-center gap-2 text-sm" style={{ color: '#facc5e' }}>
          L'Assistant réfléchit
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full animate-bounce" style={{ backgroundColor: '#facc5e' }}></div>
            <div className="w-1 h-1 rounded-full animate-bounce" style={{ backgroundColor: '#facc5e', animationDelay: '0.2s' }}></div>
            <div className="w-1 h-1 rounded-full animate-bounce" style={{ backgroundColor: '#facc5e', animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 flex items-center justify-center p-2 sm:p-4">
      {/* Formulaire de collecte des données utilisateur */}
      {showUserForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src="/Nostalgie-RVB copy.svg" 
                  alt="Nostalgie" 
                  className="h-10 w-auto"
                  style={{ maxWidth: '150px' }}
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: '#5A5A5A' }}>
                🎵 Le labo Nostalgie
              </h2>
              <p className="text-sm text-gray-600">
                Pour vous offrir la meilleure expérience, nous avons besoin de ces quelques informations.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5A5A5A' }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="votre.email@exemple.com"
                  className={`w-full px-4 py-3 border rounded-lg outline-none transition-all text-sm ${
                    formErrors.email 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100'
                  }`}
                  style={{ color: '#5A5A5A' }}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5A5A5A' }}>
                  Prénom *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  placeholder="Votre prénom"
                  className={`w-full px-4 py-3 border rounded-lg outline-none transition-all text-sm ${
                    formErrors.firstName 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100'
                  }`}
                  style={{ color: '#5A5A5A' }}
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5A5A5A' }}>
                  Téléphone *
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  placeholder="+32 XXX XX XX XX"
                  className={`w-full px-4 py-3 border rounded-lg outline-none transition-all text-sm ${
                    formErrors.phoneNumber 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100'
                  }`}
                  style={{ color: '#5A5A5A' }}
                />
                {formErrors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.phoneNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5A5A5A' }}>
                  Localité *
                </label>
                <input
                  type="text"
                  value={formData.locality}
                  onChange={(e) => setFormData({...formData, locality: e.target.value})}
                  placeholder="Votre ville"
                  className={`w-full px-4 py-3 border rounded-lg outline-none transition-all text-sm ${
                    formErrors.locality 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100'
                  }`}
                  style={{ color: '#5A5A5A' }}
                />
                {formErrors.locality && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.locality}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptPrivacy || false}
                  onChange={(e) => setFormData({...formData, acceptPrivacy: e.target.checked})}
                  className="mt-1 w-4 h-4 rounded border-2 border-gray-300 text-yellow-400 focus:ring-2 focus:ring-yellow-100 focus:border-yellow-400"
                  style={{ accentColor: '#facc5e' }}
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  J'accepte que mes données personnelles soient utilisées pour personnaliser mon expérience.{' '}
                  <a 
                    href="https://www.ngroup.be/legal/privacy.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                    style={{ color: '#facc5e' }}
                  >
                    Politique de confidentialité
                  </a>
                </span>
              </label>
              {formErrors.acceptPrivacy && (
                <p className="text-red-500 text-xs mt-1 ml-7">{formErrors.acceptPrivacy}</p>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={handleStartConversation}
                className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all shadow-md hover:shadow-lg text-sm"
                style={{ backgroundColor: '#facc5e' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6b84f'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#facc5e'}
              >
                🎵 Commencer mon expérience musicale
              </button>
              
              <button
                onClick={() => setShowGuide(true)}
                className="w-full py-2 px-4 rounded-lg font-medium transition-all text-sm border"
                style={{ 
                  color: '#5A5A5A',
                  borderColor: '#5A5A5A',
                  background: 'transparent'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                ℹ️ En savoir plus sur l'expérience
              </button>
            </div>

          </div>
        </div>
      )}

      <div className="w-full max-w-4xl h-[100vh] sm:h-[90vh] bg-white sm:rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header - Design Nostalgie */}
        <div className="bg-white border-b px-3 sm:px-6 py-3 sm:py-4" style={{ borderColor: '#5A5A5A' }}>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Logo Nostalgie */}
            <div className="flex items-center">
              <div className="flex items-center">
                <img 
                  src="/Nostalgie-RVB copy.svg" 
                  alt="Nostalgie" 
                  className="h-8 sm:h-10 w-auto"
                  style={{ maxWidth: '120px' }}
                />
              </div>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-semibold" style={{ color: '#5A5A5A' }}>
                Le labo Nostalgie
                {userProfile.hasCompletedForm && userProfile.firstName && (
                  <span className="text-sm font-normal ml-2">- {userProfile.firstName}</span>
                )}
              </h1>
            </div>
            <div className="ml-auto hidden sm:block">
              <button
                onClick={() => setShowGuide(true)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all text-xs sm:text-sm font-medium border"
                style={{ 
                  background: 'linear-gradient(to right, #facc5e20, #facc5e30)',
                  color: '#5A5A5A',
                  borderColor: '#5A5A5A'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, #facc5e30, #facc5e40)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, #facc5e20, #facc5e30)';
                }}
              >
                <HelpCircle className="w-4 h-4" />
                Comment créer la playlist de votre vie
              </button>
            </div>
            <div className="ml-auto sm:hidden">
              <button
                onClick={() => setShowGuide(true)}
                className="p-2 rounded-lg transition-all border"
                style={{ 
                  background: 'linear-gradient(to right, #facc5e20, #facc5e30)',
                  color: '#5A5A5A',
                  borderColor: '#5A5A5A'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #facc5e30, #facc5e40)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #facc5e20, #facc5e30)'}
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages - Hiérarchie visuelle claire */}
        <div className={`flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 ${showUserForm ? 'opacity-50 pointer-events-none' : ''}`} style={{ background: 'linear-gradient(to bottom, #facc5e08, #facc5e05)' }}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 sm:gap-3 ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar avec design cohérent */}
              <div className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border ${
                message.sender === 'user' 
                  ? 'bg-gradient-to-br from-gray-500 to-gray-600 border-gray-500' 
                  : 'bg-white'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                ) : (
                  <span className="text-xs font-bold" style={{ fontFamily: 'serif', color: '#facc5e' }}>
                    N
                  </span>
                )}
              </div>
              
              {/* Bulles de message optimisées pour la lisibilité */}
              <div className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 max-w-[280px] sm:max-w-md text-xs sm:text-sm leading-relaxed shadow-sm ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                  : 'bg-white border'
              }`}>
                <span style={{ color: message.sender === 'bot' ? '#5A5A5A' : 'white' }}>
                {message.content}
                </span>
              </div>
            </div>
          ))}

          {isLoading && <TypingIndicator />}

          {/* Status avec design discret */}
          {status && (
            <div className={`text-center py-2 px-3 sm:px-4 mx-auto max-w-xs sm:max-w-sm rounded-lg text-xs font-medium ${
              status.type === 'success' 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200'
                : 'bg-gradient-to-r from-red-50 to-orange-50 text-red-700 border border-red-200'
            }`}>
              {status.message}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input - Design minimaliste et accessible */}
        <div className={`bg-white p-3 sm:p-6 border-t ${showUserForm ? 'opacity-50 pointer-events-none' : ''}`} style={{ borderColor: '#5A5A5A' }}>
          <form onSubmit={sendMessage} className="flex gap-2 sm:gap-3">
            <input
              type="text"
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Partagez vos goûts musicaux..."
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border rounded-xl outline-none transition-all text-sm bg-white"
              style={{ 
                borderColor: '#5A5A5A',
                color: '#5A5A5A',
                '--tw-ring-color': '#facc5e20'
              }}
              placeholder="Partagez vos goûts musicaux..."
              onFocus={(e) => {
                e.target.style.borderColor = '#facc5e';
                e.target.style.boxShadow = `0 0 0 2px #facc5e20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#5A5A5A';
                e.target.style.boxShadow = 'none';
              }}
              disabled={isLoading || showUserForm}
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim() || showUserForm}
              className="px-4 sm:px-6 py-2 sm:py-3 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all flex items-center gap-1 sm:gap-2 text-xs sm:text-sm shadow-sm hover:shadow-md"
              style={{ backgroundColor: isLoading || !inputValue.trim() || showUserForm ? undefined : '#facc5e' }}
              onMouseEnter={(e) => {
                if (!isLoading && inputValue.trim() && !showUserForm) {
                  e.currentTarget.style.backgroundColor = '#e6b84f';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading && inputValue.trim() && !showUserForm) {
                  e.currentTarget.style.backgroundColor = '#facc5e';
                }
              }}
            >
              {isLoading || showUserForm ? (
                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Envoyer</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Guide Modal */}
      <GuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </div>
  );
}

export default App;