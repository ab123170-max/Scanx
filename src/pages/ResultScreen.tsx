/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../language/LanguageContext';
import { HistoryService } from '../history/HistoryService';
import { AIScanResult } from '../ai/AIService';
import { 
  ArrowLeft, Share2, Bookmark, BookmarkCheck, RefreshCw, 
  Sparkles, CheckCircle2, AlertTriangle, HelpCircle, 
  TrendingUp, ThumbsUp, ThumbsDown, AlertOctagon, Shirt, Copy, Check 
} from 'lucide-react';

interface ResultScreenProps {
  scanResult: AIScanResult;
  capturedImage?: string; // Optional raw cropped thumbnail
  onBack: () => void;
  onScanAgain: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ 
  scanResult, 
  capturedImage, 
  onBack, 
  onScanAgain 
}) => {
  const { t, language } = useLanguage();
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Check if scan matches something saved to render correct save state indicator
  useEffect(() => {
    const saved = HistoryService.getHistory();
    const match = saved.some(item => item.result.name === scanResult.name);
    setIsSaved(match);
  }, [scanResult]);

  const handleSaveToggle = () => {
    if (!isSaved) {
      HistoryService.saveScan(scanResult, capturedImage);
      setIsSaved(true);
    }
  };

  const handleCopyLink = () => {
    const shareText = `ScanX Discovery 🔍\n${scanResult.name} (${scanResult.brand})\n${scanResult.explanation}\nScan and discover anything with ScanX!`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareSocial = (platform: string) => {
    const shareText = encodeURIComponent(
      `ScanX Discovery 🔍: Look what I found: ${scanResult.name}! ${scanResult.explanation}`
    );
    let url = '';
    if (platform === 'whatsapp') {
      url = `https://api.whatsapp.com/send?text=${shareText}`;
    } else if (platform === 'facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${shareText}`;
    } else {
      handleCopyLink();
      return;
    }
    window.open(url, '_blank');
  };

  // Determine Confidence style
  const getConfidenceBadge = () => {
    if (scanResult.confidence === 'high') {
      return (
        <div className="flex items-center gap-1.5 text-xs font-bold text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
          <CheckCircle2 size={13} />
          <span>{t.confidenceHigh} ({scanResult.confidencePercentage}%)</span>
        </div>
      );
    } else if (scanResult.confidence === 'medium') {
      return (
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
          <AlertTriangle size={13} />
          <span>{t.confidenceMedium} ({scanResult.confidencePercentage}%)</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20">
          <AlertOctagon size={13} />
          <span>{t.confidenceLow} ({scanResult.confidencePercentage}%)</span>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 select-none">
      {/* Sticky Compact Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 h-14 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-slate-900 active:scale-95 text-slate-400 hover:text-white transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-sm font-bold text-slate-100">{t.whatIsThis}</span>
        <button
          onClick={() => setShowShareModal(true)}
          className="flex items-center justify-center w-10 h-10 -mr-2 rounded-full hover:bg-slate-900 active:scale-95 text-slate-400 hover:text-white transition-all"
        >
          <Share2 size={19} />
        </button>
      </header>

      {/* Main Analysis Scroller */}
      <div className="flex-1 overflow-y-auto pb-28">
        
        {/* Cropped Image Capture Spotlight (Aesthetics-First) */}
        <div className="relative w-full aspect-4/3 bg-slate-900 overflow-hidden shrink-0 flex items-center justify-center border-b border-slate-900">
          {capturedImage ? (
            <img 
              src={capturedImage} 
              alt={scanResult.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            /* Immersive placeholder mesh if no cropped image was available */
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-emerald-950/50 flex flex-col items-center justify-center p-6 text-center">
              <Sparkles className="w-10 h-10 text-green-500/30 animate-pulse mb-3" />
              <span className="text-xs text-slate-500 max-w-[200px] leading-relaxed">
                {language === 'ne' ? 'स्क्यान गरिएको तस्विर' : 'Scanned Object Silhouette'}
              </span>
            </div>
          )}

          {/* Floaters */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            {getConfidenceBadge()}
            
            <button
              onClick={handleSaveToggle}
              disabled={isSaved}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border min-h-[36px] ${
                isSaved 
                  ? 'bg-green-500 text-slate-950 border-green-500 shadow-md shadow-green-500/10' 
                  : 'bg-slate-950/80 text-white border-slate-800 backdrop-blur-md active:scale-95'
              }`}
            >
              {isSaved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
              <span>{isSaved ? t.saved : t.saveDiscovery}</span>
            </button>
          </div>
        </div>

        {/* Identification Cards */}
        <div className="px-6 py-6 space-y-6">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-green-400 tracking-wider uppercase font-mono">
              {scanResult.category}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight leading-tight">
              {scanResult.name}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              {scanResult.explanation}
            </p>
          </div>

          {/* Quick Technical Specifications Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400">{t.quickDetails}</h4>
            <div className="bg-slate-900/60 border border-slate-900 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">{t.brand}</span>
                <span className="font-semibold text-slate-200">{scanResult.brand}</span>
              </div>
              <div className="flex justify-between items-center text-xs border-t border-slate-800/40 pt-3">
                <span className="text-slate-500">{t.model}</span>
                <span className="font-semibold text-slate-200">{scanResult.model}</span>
              </div>
              <div className="flex justify-between items-center text-xs border-t border-slate-800/40 pt-3">
                <span className="text-slate-500">{language === 'ne' ? 'मुख्य विशेषताहरू' : 'Primary Traits'}</span>
                <span className="font-semibold text-slate-200 text-right truncate max-w-[180px]">
                  {scanResult.characteristics.join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Low Confidence Alert Indicator */}
          {scanResult.confidence === 'low' && (
            <div className="p-4 bg-red-950/20 border border-red-900/40 text-red-400 rounded-2xl flex items-start gap-3">
              <AlertTriangle className="shrink-0 mt-0.5" size={16} />
              <p className="text-xs leading-relaxed">{t.lowConfidence}</p>
            </div>
          )}

          {/* Youth curiosity Module */}
          {scanResult.curiosity && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <HelpCircle size={15} className="text-green-400" />
                {language === 'ne' ? 'जिज्ञासा र तथ्य (Curiosity Mode)' : 'Youth Curiosity Insights'}
              </h4>
              <div className="p-4.5 bg-slate-900/40 border border-slate-900 rounded-2xl space-y-3.5">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-green-400 uppercase font-mono tracking-wider">
                    {t.curiosityFact}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {scanResult.curiosity.interestingFact}
                  </p>
                </div>
                <div className="space-y-1 border-t border-slate-800/50 pt-3.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">
                    {t.curiosityUse}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {scanResult.curiosity.whatIsItUsedFor}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* AI Opinion / Worth-It Module */}
          {scanResult.worthIt && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <TrendingUp size={15} className="text-green-400" />
                {t.opinion}
              </h4>
              <div className="p-4.5 bg-slate-900/40 border border-slate-900 rounded-2xl space-y-4">
                
                {/* Recommended */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-green-400 uppercase font-mono tracking-wider">
                    {t.opinionGoodFor}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {scanResult.worthIt.recommendedFor.map((item, idx) => (
                      <span key={idx} className="text-xs text-slate-300">
                        {item}{idx < scanResult.worthIt!.recommendedFor.length - 1 ? ' · ' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Strengths */}
                <div className="space-y-1.5 border-t border-slate-800/50 pt-3.5">
                  <span className="text-[10px] font-bold text-green-400 uppercase font-mono tracking-wider flex items-center gap-1">
                    <ThumbsUp size={11} />
                    {t.opinionStrengths}
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {scanResult.worthIt.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                {scanResult.worthIt.weaknesses.length > 0 && (
                  <div className="space-y-1.5 border-t border-slate-800/50 pt-3.5">
                    <span className="text-[10px] font-bold text-amber-400 uppercase font-mono tracking-wider flex items-center gap-1">
                      <ThumbsDown size={11} />
                      {t.opinionWeaknesses}
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {scanResult.worthIt.weaknesses.map((w, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-400 mt-0.5">•</span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Caution */}
                {scanResult.worthIt.thinkTwiceIf && (
                  <div className="space-y-1 border-t border-slate-800/50 pt-3.5">
                    <span className="text-[10px] font-bold text-red-400 uppercase font-mono tracking-wider">
                      {t.opinionCaution}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {scanResult.worthIt.thinkTwiceIf}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Fashion Integration Module */}
          {scanResult.fashion && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <Shirt size={15} className="text-green-400" />
                {language === 'ne' ? 'फेसन विष्लेषण (Fashion Module)' : 'Fashion Coordination'}
              </h4>
              <div className="p-4.5 bg-slate-900/40 border border-slate-900 rounded-2xl space-y-3.5">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">{language === 'ne' ? 'शैली / स्टाइल' : 'Style'}</span>
                    <span className="font-bold text-slate-200 mt-0.5 block">{scanResult.fashion.style}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">{language === 'ne' ? 'रंग' : 'Detected Color'}</span>
                    <span className="font-bold text-slate-200 mt-0.5 block">{scanResult.fashion.color}</span>
                  </div>
                </div>
                <div className="space-y-1.5 border-t border-slate-800/50 pt-3.5">
                  <span className="text-[10px] font-bold text-green-400 uppercase font-mono tracking-wider">
                    {t.fashionGoesWellWith}
                  </span>
                  <div className="flex flex-col gap-1 text-xs text-slate-300">
                    {scanResult.fashion.goesWellWith.map((item, idx) => (
                      <span key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Possible Alternatives */}
          {scanResult.alternatives.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400">{t.possibleAlternatives}</h4>
              <div className="flex flex-wrap gap-2">
                {scanResult.alternatives.map((alt, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs bg-slate-900 border border-slate-800/80 px-3.5 py-2 rounded-xl text-slate-300"
                  >
                    {alt}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent pt-8 z-40">
        <button
          onClick={onScanAgain}
          className="w-full py-3.5 px-4 bg-green-500 hover:bg-green-400 text-slate-950 font-bold rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/10 active:scale-[0.98] min-h-[48px]"
        >
          <RefreshCw size={15} />
          {t.scanAgain}
        </button>
      </div>

      {/* Attractive Youth Share Modal Sheet */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-t-3xl sm:rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl relative animate-slide-up">
            
            {/* Grab Handle for bottom sheet feel */}
            <div className="w-10 h-1 bg-slate-800 rounded-full mx-auto mb-4 sm:hidden" />
            
            <button 
              onClick={() => setShowShareModal(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>
            
            <h3 className="text-sm font-extrabold text-slate-100">{t.share}</h3>
            
            {/* Attractive Live Preview Card */}
            <div className="my-5 p-4 bg-slate-950 border border-slate-800/60 rounded-2xl flex flex-col gap-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-xl" />
              <span className="text-[9px] font-extrabold tracking-widest text-green-400 uppercase font-mono">{t.appName} 🔍</span>
              <h4 className="text-sm font-bold text-slate-200 mt-1">{scanResult.name}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">{scanResult.explanation}</p>
              <span className="text-[10px] text-slate-500 mt-1">Verified via ScanX AI</span>
            </div>

            {/* Quick Share Grid */}
            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => handleShareSocial('whatsapp')}
                className="flex flex-col items-center justify-center p-3 bg-slate-950 hover:bg-slate-800/50 border border-slate-800 rounded-xl text-center transition-colors min-h-[70px]"
              >
                <span className="text-xs font-bold text-green-400 mb-1">WhatsApp</span>
                <span className="text-[9px] text-slate-500">Share Directly</span>
              </button>
              <button
                onClick={() => handleShareSocial('facebook')}
                className="flex flex-col items-center justify-center p-3 bg-slate-950 hover:bg-slate-800/50 border border-slate-800 rounded-xl text-center transition-colors min-h-[70px]"
              >
                <span className="text-xs font-bold text-blue-400 mb-1">Facebook</span>
                <span className="text-[9px] text-slate-500">Post Link</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center justify-center p-3 bg-slate-950 hover:bg-slate-800/50 border border-slate-800 rounded-xl text-center transition-colors relative min-h-[70px]"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-green-400 mb-1" />
                    <span className="text-[10px] font-bold text-green-400">{language === 'ne' ? 'कपि भयो!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} className="text-slate-400 mb-1" />
                    <span className="text-[10px] font-bold text-slate-300">{language === 'ne' ? 'कपि' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="mt-6 w-full py-3.5 bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold rounded-xl text-xs transition-colors min-h-[44px]"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// SVG helper to reuse inside list
const X = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
