/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './language/LanguageContext';
import { HomeScreen } from './pages/HomeScreen';
import { ScannerScreen } from './pages/ScannerScreen';
import { ResultScreen } from './pages/ResultScreen';
import { SettingsScreen } from './pages/SettingsScreen';
import { PrivacyScreen } from './pages/PrivacyScreen';
import { AIScanResult } from './ai/AIService';
import { SavedScan } from './history/HistoryService';
import { Sparkles, Camera } from 'lucide-react';

type PageState = 'splash' | 'home' | 'scanner' | 'result' | 'settings' | 'privacy';

function MainAppShell() {
  const [currentPage, setCurrentPage] = useState<PageState>('splash');
  const [activeResult, setActiveResult] = useState<AIScanResult | null>(null);
  const [capturedThumbnail, setCapturedThumbnail] = useState<string | undefined>(undefined);
  const { t, language } = useLanguage();

  // Simulate premium PWA native Cold Startup Splash Intro
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setCurrentPage('home');
    }, 1800);
    return () => clearTimeout(splashTimer);
  }, []);

  const handleStartScan = () => {
    setCurrentPage('scanner');
  };

  const handleAnalysisComplete = (result: AIScanResult, image?: string) => {
    setActiveResult(result);
    setCapturedThumbnail(image);
    setCurrentPage('result');
  };

  const handleSelectSavedScan = (scan: SavedScan) => {
    setActiveResult(scan.result);
    setCapturedThumbnail(scan.image);
    setCurrentPage('result');
  };

  const handleScanAgain = () => {
    setCurrentPage('scanner');
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'splash':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-slate-950 text-slate-100 p-6 relative select-none">
            {/* Top right design glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/10 rounded-full blur-3xl" />
            
            <div className="flex flex-col items-center space-y-4 animate-fade-in">
              {/* Glowing futuristic app icon logo */}
              <div className="w-20 h-20 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-500/25 relative animate-pulse">
                <span className="font-extrabold text-3xl text-slate-950 tracking-tighter">X</span>
                <div className="absolute -inset-0.5 border border-green-400/40 rounded-3xl animate-ping opacity-30" />
              </div>
              
              <div className="text-center space-y-1">
                <h1 className="text-2xl font-extrabold tracking-tight text-white">
                  <span className="text-green-500">Scan</span>X
                </h1>
                <p className="text-[10px] font-bold text-slate-500 tracking-wide uppercase font-mono">
                  {language === 'ne' ? 'नवीनतम एआई स्क्यानर' : 'Next-Gen AI Scanner'}
                </p>
              </div>
            </div>

            {/* Bottom Tagline & Progress Indicator */}
            <div className="absolute bottom-12 text-center space-y-4">
              <p className="text-xs text-slate-400 font-medium px-6 max-w-[280px]">
                {t.tagline}
              </p>
              <div className="w-12 h-1 bg-slate-900 rounded-full mx-auto overflow-hidden">
                <div className="h-full w-1/2 bg-green-500 rounded-full animate-[loading_1.2s_infinite]" />
              </div>
            </div>
          </div>
        );

      case 'home':
        return (
          <HomeScreen
            onStartScan={handleStartScan}
            onNavigateSettings={() => setCurrentPage('settings')}
            onNavigatePrivacy={() => setCurrentPage('privacy')}
            onSelectSavedScan={handleSelectSavedScan}
          />
        );

      case 'scanner':
        return (
          <ScannerScreen
            onBack={() => setCurrentPage('home')}
            onAnalysisComplete={handleAnalysisComplete}
          />
        );

      case 'result':
        if (!activeResult) {
          setCurrentPage('home');
          return null;
        }
        return (
          <ResultScreen
            scanResult={activeResult}
            capturedImage={capturedThumbnail}
            onBack={() => setCurrentPage('home')}
            onScanAgain={handleScanAgain}
          />
        );

      case 'settings':
        return (
          <SettingsScreen
            onBack={() => setCurrentPage('home')}
            onNavigatePrivacy={() => setCurrentPage('privacy')}
          />
        );

      case 'privacy':
        return (
          <PrivacyScreen
            onBack={() => setCurrentPage('home')}
          />
        );

      default:
        return null;
    }
  };

  return (
    /* 
     * Desktop Framing Wrapper Container:
     * - Responsive layout maps standard phone width on large displays,
     *   centering the experience visually.
     * - Occupies true 100% full screen viewport directly on actual mobile devices.
     */
    <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center p-0 md:p-6 lg:p-8 font-sans antialiased text-slate-200">
      <div className="relative w-full max-w-md h-full md:h-[840px] md:max-h-[92vh] bg-slate-950 md:rounded-[40px] md:border-[10px] md:border-slate-800 md:shadow-2xl overflow-hidden flex flex-col transition-all duration-300 md:ring-1 md:ring-slate-800">
        
        {/* Android status notch replica on Desktop only */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl hidden md:flex items-center justify-center z-50 pointer-events-none">
          <div className="w-3 h-3 rounded-full bg-slate-950 mr-2" />
          <div className="w-12 h-1.5 bg-slate-950 rounded-full" />
        </div>

        {/* Viewport content */}
        <div className="flex-1 overflow-hidden h-full">
          {renderActivePage()}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainAppShell />
    </LanguageProvider>
  );
}
