/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../language/LanguageContext';
import { HistoryService } from '../history/HistoryService';
import { ArrowLeft, Languages, User, Trash2, Shield, Info, Check, Smartphone } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
  onNavigatePrivacy: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, onNavigatePrivacy }) => {
  const { t, language, setLanguage } = useLanguage();
  const [nickname, setNickname] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('scanx_nickname') || '';
    setNickname(saved);
  }, []);

  const handleSaveNickname = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('scanx_nickname', nickname.trim());
    setSuccessMsg(language === 'ne' ? 'नाम अपडेट भयो!' : 'Name updated!');
    setTimeout(() => setSuccessMsg(''), 2000);
  };

  const handleClearHistory = () => {
    if (window.confirm(t.deleteConfirm)) {
      HistoryService.clearHistory();
      alert(language === 'ne' ? 'स्क्यान इतिहास खाली गरियो!' : 'Scan history cleared!');
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 select-none">
      {/* Sticky Compact Top Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 h-14 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-slate-900 active:scale-95 text-slate-400 hover:text-white transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-sm font-bold tracking-tight text-slate-100">{t.settings}</h1>
        <div className="w-10"></div> {/* Balanced offset */}
      </header>

      {/* Settings Scroller */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24 space-y-6">
        {/* Language Selection Card */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 flex items-center gap-2">
            <Languages size={15} className="text-green-400" />
            {t.language}
          </label>
          <div className="grid grid-cols-2 gap-2.5 p-1 bg-slate-900 rounded-2xl border border-slate-800">
            <button
              onClick={() => setLanguage('en')}
              className={`py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 min-h-[44px] ${
                language === 'en'
                  ? 'bg-green-500 text-slate-950 shadow-md shadow-green-500/10 scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              English
              {language === 'en' && <Check size={12} strokeWidth={3} />}
            </button>
            <button
              onClick={() => setLanguage('ne')}
              className={`py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 min-h-[44px] ${
                language === 'ne'
                  ? 'bg-green-500 text-slate-950 shadow-md shadow-green-500/10 scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              नेपाली
              {language === 'ne' && <Check size={12} strokeWidth={3} />}
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 flex items-center gap-2">
            <User size={15} className="text-green-400" />
            {language === 'ne' ? 'तपाईंको नाम' : 'Your Greet Nickname'}
          </label>
          <form onSubmit={handleSaveNickname} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder={language === 'ne' ? 'उदा. सरोज' : 'e.g. Saroj'}
                maxLength={20}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-green-500 transition-colors min-h-[44px]"
              />
              <button
                type="submit"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-3 rounded-xl text-xs whitespace-nowrap active:scale-95 transition-all min-h-[44px]"
              >
                {language === 'ne' ? 'बचत' : 'Save'}
              </button>
            </div>
            {successMsg && (
              <p className="text-[11px] text-green-400 font-medium animate-pulse">{successMsg}</p>
            )}
          </form>
        </div>

        {/* System Operations */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-2">
            <Info size={15} className="text-green-400" />
            {language === 'ne' ? 'प्रणाली विवरण' : 'Application Diagnostics'}
          </span>
          <div className="bg-slate-900/60 border border-slate-900 rounded-2xl p-4 space-y-3.5">
            {/* Version */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">{language === 'ne' ? 'एप संस्करण' : 'App Version'}</span>
              <span className="font-bold text-slate-300 font-mono">1.0.0 (PWA)</span>
            </div>
            
            {/* Network */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">{language === 'ne' ? 'नेटवर्क' : 'Connection'}</span>
              <span className="font-bold text-green-400 font-mono">Secure (HTTPS)</span>
            </div>

            {/* Privacy */}
            <button
              onClick={onNavigatePrivacy}
              className="w-full flex items-center justify-between text-xs py-1.5 text-left border-t border-slate-800/60 pt-3 text-slate-300 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <Shield size={14} className="text-slate-400" />
                {t.privacyPolicy}
              </span>
              <span className="text-slate-600">→</span>
            </button>
          </div>
        </div>

        {/* Destructive Actions */}
        <div className="pt-4">
          <button
            onClick={handleClearHistory}
            className="w-full py-3.5 px-4 bg-red-950/40 hover:bg-red-950/70 text-red-400 hover:text-red-300 border border-red-900/40 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-98 min-h-[44px]"
          >
            <Trash2 size={15} />
            {language === 'ne' ? 'इतिहास मेटाउनुहोस्' : 'Clear Saved Scan History'}
          </button>
        </div>
      </div>
    </div>
  );
};
