/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLanguage } from '../language/LanguageContext';
import { Shield, Eye, Lock, Camera, Check, ArrowLeft } from 'lucide-react';

interface PrivacyScreenProps {
  onBack: () => void;
}

export const PrivacyScreen: React.FC<PrivacyScreenProps> = ({ onBack }) => {
  const { t, language } = useLanguage();

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
        <h1 className="text-sm font-bold tracking-tight text-slate-100">{t.privacyPolicy}</h1>
        <div className="w-10"></div> {/* Balanced offset */}
      </header>

      {/* Content Scroller */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24 space-y-8">
        {/* Banner */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-14 h-14 bg-green-500/10 text-green-400 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/5">
            <Shield size={28} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-100">
              {language === 'ne' ? 'तपाईंको गोपनीयता, हाम्रो वाचा' : 'Your Privacy is Locked'}
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-[280px] mx-auto leading-relaxed">
              {language === 'ne' 
                ? 'हामी तपाईंको अनुमति बिना कहिल्यै पनि तपाईंको तस्विरहरू सुरक्षित वा अरूसँग साझा गर्दैनौं।' 
                : 'We believe you should control your data. Here is exactly how we handle your scans.'}
            </p>
          </div>
        </div>

        {/* Highlight Cards */}
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-900 flex gap-3.5">
            <div className="p-2 bg-green-500/10 text-green-400 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
              <Camera size={20} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-100">
                {language === 'ne' ? '१. क्यामेरा लाइभ प्रशोधन' : '1. On-Device Real-Time Processing'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'ne'
                  ? 'क्यामेरा फिड मात्र लाइभ स्क्यान गर्न र बारकोड खोजीका लागि मात्र प्रयोग गरिन्छ। हामी कहिल्यै पनि भिडियो रेकर्ड गर्दैनौं।'
                  : 'The camera preview is strictly used for real-time item matching and crop targeting. We never record or save your raw streams.'}
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-900 flex gap-3.5">
            <div className="p-2 bg-green-500/10 text-green-400 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
              <Eye size={20} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-100">
                {language === 'ne' ? '२. कुनै स्थायी क्लाउड भण्डारण छैन' : '2. No Hidden Cloud Uploads'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'ne'
                  ? 'तपाईंका स्क्यान गरिएका फाइलहरू स्थानीय रूपमा तपाईंको फोनमा मात्र बस्छन्। यसलाई मेट्ने पूर्ण अधिकार तपाईंसँग छ।'
                  : 'Your scanned history remains stored inside your local phone memory. Your camera frames are analyzed instantly and discarded.'}
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-900 flex gap-3.5">
            <div className="p-2 bg-green-500/10 text-green-400 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
              <Lock size={20} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-100">
                {language === 'ne' ? '३. पारदर्शी एआई खोज' : '3. Ethical AI Guidelines'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'ne'
                  ? 'हाम्रो एआईले तपाईंको फोनमा भएका संवेदनशील वा व्यक्तिगत जानकारीहरू सङ्कलन गर्दैन।'
                  : 'Our AI model scans objects and text only. We enforce low-confidence indicators so you never receive fabricated information.'}
              </p>
            </div>
          </div>
        </div>

        {/* Commitment Points */}
        <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-900">
          <h4 className="text-xs font-bold text-slate-300">
            {language === 'ne' ? 'हाम्रा मुख्य प्रतिबद्धताहरू:' : 'Our Core Privacy Guarantees:'}
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center gap-2.5">
              <Check size={14} className="text-green-400 shrink-0" />
              <span>{language === 'ne' ? 'कुनै विज्ञापन ट्र्याकिङ छैन' : 'Zero advertisement trackers.'}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check size={14} className="text-green-400 shrink-0" />
              <span>{language === 'ne' ? '१००% अफलाइन नियन्त्रण सम्भव' : '100% control over local histories.'}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check size={14} className="text-green-400 shrink-0" />
              <span>{language === 'ne' ? 'सुरक्षित क्यामेरा जडान (HTTPS)' : 'Encrypted secure connections (HTTPS).'}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
