/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePWAInstall } from '../utils/usePWAInstall';
import { useLanguage } from '../language/LanguageContext';
import { ArrowDown, Smartphone, X } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { t } = useLanguage();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // If already running as an installed PWA or manually dismissed, don't show
  if (isInstalled || dismissed) {
    return null;
  }

  // Render trigger if installable on Chrome/Android/Desktop
  if (isInstallable) {
    return (
      <div className="mx-4 my-2 p-4 bg-slate-900 text-white rounded-2xl flex flex-col gap-3 relative shadow-lg">
        <button 
          onClick={() => setDismissed(true)} 
          className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-full transition-colors"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
        <div className="flex items-start gap-3 pr-6">
          <div className="p-2.5 bg-green-500/20 text-green-400 rounded-xl shrink-0">
            <Smartphone size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-slate-100">{t.appName}</h4>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{t.pwaInstallPrompt}</p>
          </div>
        </div>
        <button
          onClick={install}
          className="w-full py-2.5 px-4 bg-green-500 hover:bg-green-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-98 min-h-[44px]"
        >
          <ArrowDown size={14} />
          {t.installApp}
        </button>
      </div>
    );
  }

  // Render iOS installation banner
  if (isIOS) {
    return (
      <>
        <div className="mx-4 my-2 p-4 bg-slate-900 text-white rounded-2xl flex flex-col gap-3 relative shadow-lg">
          <button 
            onClick={() => setDismissed(true)} 
            className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-full transition-colors"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
          <div className="flex items-start gap-3 pr-6">
            <div className="p-2.5 bg-green-500/20 text-green-400 rounded-xl shrink-0">
              <Smartphone size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-100">{t.appName}</h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{t.pwaInstallPrompt}</p>
            </div>
          </div>
          <button
            onClick={() => setShowIOSGuide(true)}
            className="w-full py-2.5 px-4 bg-green-500 hover:bg-green-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-98 min-h-[44px]"
          >
            <ArrowDown size={14} />
            {t.installiOS}
          </button>
        </div>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-t-3xl sm:rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl relative animate-slide-up">
              <button 
                onClick={() => setShowIOSGuide(false)} 
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full bg-slate-800 transition-colors"
              >
                <X size={18} />
              </button>
              
              <div className="flex flex-col items-center text-center mt-2">
                <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25 mb-4">
                  <span className="font-extrabold text-2xl text-slate-950 tracking-tight">X</span>
                </div>
                <h3 className="text-lg font-bold text-slate-100">{t.installiOS}</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-[260px]">{t.tagline}</p>
              </div>

              <div className="mt-6 space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800/60">
                <p className="text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed">
                  <span className="flex items-center justify-center w-5 h-5 bg-green-500/20 text-green-400 rounded-full text-[10px] font-bold shrink-0 mt-0.5">1</span>
                  <span>{t.iosInstructionsStep1}</span>
                </p>
                <p className="text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed">
                  <span className="flex items-center justify-center w-5 h-5 bg-green-500/20 text-green-400 rounded-full text-[10px] font-bold shrink-0 mt-0.5">2</span>
                  <span>{t.iosInstructionsStep2}</span>
                </p>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-sm transition-colors min-h-[44px]"
              >
                {t.close}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
