/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../language/LanguageContext';
import { HistoryService, SavedScan } from '../history/HistoryService';
import { PWAInstallButton } from '../components/PWAInstallButton';
import { OfflineIndicator } from '../components/OfflineIndicator';
import { 
  Camera, Settings, Shield, History, Globe, 
  ArrowRight, Sparkles, Trash2, Search, ExternalLink 
} from 'lucide-react';

interface HomeScreenProps {
  onStartScan: () => void;
  onNavigateSettings: () => void;
  onNavigatePrivacy: () => void;
  onSelectSavedScan: (scan: SavedScan) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartScan,
  onNavigateSettings,
  onNavigatePrivacy,
  onSelectSavedScan,
}) => {
  const { t, language, setLanguage } = useLanguage();
  const [nickname, setNickname] = useState('');
  const [scans, setScans] = useState<SavedScan[]>([]);

  // Reload history and name on activation
  useEffect(() => {
    const savedName = localStorage.getItem('scanx_nickname') || '';
    setNickname(savedName);
    setScans(HistoryService.getHistory());
  }, []);

  const handleDeleteScan = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(t.deleteConfirm)) {
      HistoryService.deleteScan(id);
      setScans(HistoryService.getHistory());
    }
  };

  const getGreeting = () => {
    if (nickname) {
      return language === 'ne' 
        ? `नमस्ते, ${nickname} 👋` 
        : `Hello, ${nickname} 👋`;
    }
    return t.greeting;
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 select-none">
      
      {/* 3-Zone Top Bar Navigation Contract */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-5 h-14 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 shrink-0">
        
        {/* Zone 1: Single element wordmark */}
        <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
          <span className="text-green-500">Scan</span>X
        </span>

        {/* Zone 2: Balanced micro tagline */}
        <span className="text-[10px] text-slate-500 hidden sm:inline-block max-w-[150px] truncate">
          {t.tagline}
        </span>

        {/* Zone 3: Settings link */}
        <div className="flex items-center gap-1">
          <button
            onClick={onNavigateSettings}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-900 active:scale-95 text-slate-400 hover:text-white transition-all"
            aria-label="Settings"
          >
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-24">
        
        {/* In-App PWA Install Banner */}
        <PWAInstallButton />

        {/* Greetings Panel */}
        <div className="px-5 pt-4 pb-2">
          <h2 className="text-xl font-extrabold text-slate-100 leading-tight">
            {getGreeting()}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {t.tagline}
          </p>
        </div>

        {/* HERO SCAN ACTION CARD (Aesthetics-First, Natural Thumb Zone) */}
        <div className="px-5 py-3">
          <div 
            onClick={onStartScan}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-900 to-green-950/40 border border-slate-800/80 p-6 flex flex-col justify-between min-h-[190px] shadow-xl hover:border-slate-700/80 active:scale-[0.99] transition-all cursor-pointer group"
          >
            {/* Pulsing light overlay glow effect */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
            
            <div className="space-y-1.5 z-10">
              <span className="text-[9px] font-extrabold tracking-wider text-green-400 uppercase font-mono bg-green-500/10 px-2 py-0.5 rounded-md inline-block">
                AI Vision Matcher
              </span>
              <h3 className="text-lg font-extrabold text-white">
                {t.scanAnything}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">
                {language === 'ne' 
                  ? 'वस्तुहरू, बारकोड, कपडाहरू, वा ग्याजेटहरू तुरुन्त स्क्यान गरी बुझ्नुहोस्।' 
                  : 'Instantly identify products, books, clothes, barcodes or other items.'}
              </p>
            </div>

            {/* Pulsing Capture Trigger Shutter inside natural reach */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800/60 z-10">
              <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 group-hover:text-green-400 transition-colors">
                {language === 'ne' ? 'क्यामेरा खोल्न ट्याप गर्नुहोस्' : 'Tap to trigger scanner'}
                <ArrowRight size={12} />
              </span>
              <div className="w-12 h-12 rounded-full bg-green-500 text-slate-950 flex items-center justify-center shadow-lg shadow-green-500/15 group-hover:scale-105 transition-transform active:scale-90 shrink-0">
                <Camera size={20} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>

        {/* QUICK LANGUAGE BAR */}
        <div className="px-5 py-1.5">
          <div className="flex items-center justify-between bg-slate-900/60 border border-slate-900/80 p-3 rounded-2xl">
            <span className="text-xs text-slate-400 flex items-center gap-2">
              <Globe size={14} className="text-slate-500" />
              {t.language}
            </span>
            <div className="flex gap-1">
              <button 
                onClick={() => setLanguage('en')}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors ${language === 'en' ? 'bg-green-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('ne')}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors ${language === 'ne' ? 'bg-green-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                NE
              </button>
            </div>
          </div>
        </div>

        {/* SAVED HISTORY SCANS LOGS SECTION */}
        <div className="px-5 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-slate-400 flex items-center gap-1.5">
              <History size={14} className="text-green-400" />
              {t.recentScans}
            </h4>
            {scans.length > 0 && (
              <span className="text-[10px] font-bold text-slate-500 bg-slate-900 px-2 py-0.5 rounded-full font-mono">
                {scans.length}
              </span>
            )}
          </div>

          {scans.length === 0 ? (
            /* Immersive empty logs prompt */
            <div className="p-8 bg-slate-900/30 border border-slate-900 border-dashed rounded-3xl text-center flex flex-col items-center justify-center space-y-2.5">
              <div className="p-3 bg-slate-950 border border-slate-900 rounded-2xl text-slate-500 animate-pulse">
                <Search size={20} />
              </div>
              <p className="text-xs font-semibold text-slate-400">
                {language === 'ne' ? 'कुनै स्क्यान रेकर्ड छैन' : 'No scans found'}
              </p>
              <p className="text-[10px] text-slate-500 max-w-[200px] leading-relaxed mx-auto">
                {t.historyEmpty}
              </p>
            </div>
          ) : (
            /* Custom list views */
            <div className="space-y-2.5">
              {scans.map((scan) => (
                <div
                  key={scan.id}
                  onClick={() => onSelectSavedScan(scan)}
                  className="p-3.5 bg-slate-900 hover:bg-slate-850 border border-slate-900/60 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all active:scale-99"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {/* Dummy thumbnail mockup */}
                    <div className="w-11 h-11 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center shrink-0 text-slate-500 text-xs font-bold font-mono">
                      {scan.result.category.charAt(0)}
                    </div>
                    
                    <div className="overflow-hidden space-y-0.5">
                      <span className="text-[9px] text-slate-500 uppercase tracking-wide font-mono font-bold block truncate">
                        {scan.result.category}
                      </span>
                      <h5 className="text-xs font-bold text-slate-200 truncate leading-tight">
                        {scan.result.name}
                      </h5>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-1">
                    <button
                      onClick={(e) => handleDeleteScan(scan.id, e)}
                      className="p-2 text-slate-600 hover:text-red-400 rounded-lg bg-slate-950/40 hover:bg-red-500/10 transition-colors shrink-0"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                    <span className="text-[10px] text-slate-600 font-mono">
                      {new Date(scan.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Persistent Diagnostics footer */}
      <footer className="sticky bottom-0 inset-x-0 z-20 py-4 bg-slate-950/85 backdrop-blur-md border-t border-slate-900 text-center flex items-center justify-center gap-3 shrink-0">
        <button 
          onClick={onNavigatePrivacy}
          className="text-[10px] font-bold text-slate-500 hover:text-slate-300 flex items-center gap-1"
        >
          <Shield size={11} />
          {t.privacyPolicy}
        </button>
        <span className="text-slate-700">|</span>
        <span className="text-[10px] text-slate-600 font-mono">ScanX PWA © 2026</span>
      </footer>

      {/* Online/Offline status toast banner */}
      <OfflineIndicator />
    </div>
  );
};
