/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../language/LanguageContext';
import { AIService, AIScanResult } from '../ai/AIService';
import { 
  Camera, ArrowLeft, Zap, ZapOff, RotateCw, RefreshCw, 
  Target, Aperture, AlertTriangle, Check 
} from 'lucide-react';

interface ScannerScreenProps {
  onBack: () => void;
  onAnalysisComplete: (result: AIScanResult, image?: string) => void;
}

export const ScannerScreen: React.FC<ScannerScreenProps> = ({ 
  onBack, 
  onAnalysisComplete 
}) => {
  const { t, language } = useLanguage();
  
  // States
  const [hasPermission, setHasPermission] = useState<boolean | null>(true); // Simulated granted for Phase 1
  const [torch, setTorch] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [isCapturing, setIsCapturing] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Shoes');
  
  // Tracking box motion simulator states
  const [boxCoords, setBoxCoords] = useState({ x: 30, y: 35, width: 40, height: 30 });
  const [stableCount, setStableCount] = useState(0);

  // Periodically fluctuate the bounding box coordinates to simulate live "lightweight tracking"
  useEffect(() => {
    if (isCapturing) return;

    const interval = setInterval(() => {
      setBoxCoords((prev) => {
        // Drift coordinates slightly to mimic hand tremor/tracking
        const driftX = (Math.random() - 0.5) * 1.5;
        const driftY = (Math.random() - 0.5) * 1.5;
        
        // Boundaries
        const nextX = Math.max(15, Math.min(45, prev.x + driftX));
        const nextY = Math.max(20, Math.min(50, prev.y + driftY));
        
        return {
          ...prev,
          x: nextX,
          y: nextY,
        };
      });

      setStableCount((prev) => {
        if (prev >= 6) {
          // Flip categories to keep the youth curious!
          const cats = ['Phones', 'Shoes', 'Organic Matcha Green Tea', 'Gadgets', 'Text', 'QR Code'];
          const randomCat = cats[Math.floor(Math.random() * cats.length)];
          setActiveCategory(randomCat);
          return 0;
        }
        return prev + 1;
      });

    }, 600);

    return () => clearInterval(interval);
  }, [isCapturing]);

  // Handle Capture Action (Smart Crop + AI trigger)
  const handleCapture = async () => {
    setIsCapturing(true);

    try {
      // Simulate beautiful "Smart Crop" flashing border
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Analyze mock image
      const result = await AIService.analyzeImage('placeholder');
      
      // Overwrite the returned model matching our simulated category
      if (activeCategory === 'Phones') {
        result.name = 'iPhone 15 Pro Max';
        result.category = 'Phones & Gadgets';
        result.brand = 'Apple';
        result.model = '15 Pro Max';
        result.confidence = 'high';
        result.confidencePercentage = 98;
      } else if (activeCategory === 'Shoes') {
        result.name = 'Nike Air Max Aura';
        result.category = 'Shoes';
        result.brand = 'Nike';
        result.model = 'Air Max Series';
        result.confidence = 'high';
        result.confidencePercentage = 94;
      } else if (activeCategory.includes('Matcha') || activeCategory === 'Drinks') {
        result.name = 'Organic Matcha Green Tea';
        result.category = 'Food & Drinks';
        result.brand = 'Uji Koyama';
        result.model = 'Ceremonial Grade Matcha';
        result.confidence = 'medium';
        result.confidencePercentage = 82;
      }

      onAnalysisComplete(result);
    } catch (e) {
      alert(t.somethingWentWrong);
    } finally {
      setIsCapturing(false);
    }
  };

  // Toggle permission simulation to show how errors look
  const triggerDeniedState = () => {
    setHasPermission(false);
  };

  return (
    <div className="relative flex flex-col h-full bg-black text-slate-100 select-none overflow-hidden">
      
      {/* Immersive Camera Viewfinder Background */}
      <div className="absolute inset-0 z-0 bg-slate-950 flex flex-col items-center justify-center">
        
        {/* Futuristic lens backdrop pattern */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-green-950/20" />
        
        {/* Floating Scanner grid matrix lines */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08)_0%,transparent_75%)]" />

        {/* Diagnostic info at the background */}
        <div className="text-center p-6 max-w-[280px] space-y-2 z-10 opacity-40">
          <Camera size={28} className="mx-auto text-slate-600 animate-pulse" />
          <p className="text-[10px] font-bold tracking-wider font-mono uppercase text-slate-500">
            {language === 'ne' ? 'क्यामेरा लाइभ फिड' : 'Camera Live Viewfinder'}
          </p>
          <p className="text-[9px] text-slate-600 leading-relaxed">
            {language === 'ne' 
              ? 'फेस २ मा यहाँ वास्तविक क्यामेरा स्ट्रिम जोडिनेछ।' 
              : 'Phase 2 will mount active getUserMedia() streams inside this viewport frame.'}
          </p>
        </div>
      </div>

      {/* COMPACT STICKY VIEWPORT HEADER ZONE */}
      <header className="relative z-20 flex items-center justify-between px-4 h-14 bg-gradient-to-b from-black/80 to-transparent shrink-0">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full bg-black/40 text-slate-400 hover:text-white transition-all active:scale-95"
        >
          <ArrowLeft size={20} />
        </button>
        
        {/* Dynamic State Banner */}
        <div className="bg-black/50 border border-slate-900 px-3.5 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-ping shrink-0" />
          <span className="text-[10px] font-mono tracking-wider font-bold text-slate-200">
            {isCapturing ? t.scanning : t.readyToScan}
          </span>
        </div>

        {/* Torch / Flash Trigger */}
        <button
          onClick={() => setTorch(!torch)}
          className={`flex items-center justify-center w-10 h-10 -mr-2 rounded-full transition-all active:scale-95 shrink-0 ${
            torch ? 'bg-green-500 text-slate-950' : 'bg-black/40 text-slate-400'
          }`}
          title={torch ? t.torchOff : t.torchOn}
        >
          {torch ? <Zap size={18} /> : <ZapOff size={18} />}
        </button>
      </header>

      {/* TRACKING PORTAL OVERLAY CONTAINER (Natural stretch zone) */}
      <div className="flex-1 relative z-10 flex items-center justify-center">
        
        {/* Bounding Box Indicator: drifts and updates automatically */}
        {!isCapturing && hasPermission && (
          <div 
            style={{
              left: `${boxCoords.x}%`,
              top: `${boxCoords.y}%`,
              width: `${boxCoords.width}%`,
              height: `${boxCoords.height}%`
            }}
            className="absolute rounded-xl border-2 border-green-400/90 shadow-[0_0_15px_rgba(34,197,94,0.15)] flex flex-col justify-between transition-all duration-300 ease-out p-2.5 bg-green-500/5 select-none touch-none animate-pulse"
          >
            {/* Corner Bracket Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-green-400 -mt-1 -ml-1 rounded-tl-md" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-green-400 -mt-1 -mr-1 rounded-tr-md" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-green-400 -mb-1 -ml-1 rounded-bl-md" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-green-400 -mb-1 -mr-1 rounded-br-md" />

            {/* Target Reticle Centered */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <Target size={20} className="text-green-400 rotate-45" />
            </div>

            {/* Top Tag Label */}
            <div className="flex items-start justify-between">
              <span className="bg-green-500 text-slate-950 px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase font-mono tracking-wider">
                {activeCategory}
              </span>
            </div>

            {/* Bottom Stable Prompt */}
            <div className="flex items-center justify-center w-full">
              <span className="bg-slate-950/90 text-green-400 px-2 py-0.5 rounded-full text-[8px] font-bold border border-green-400/20 whitespace-nowrap">
                {stableCount > 3 ? '✓ STABLE TARGET' : '🎯 DETECTING...'}
              </span>
            </div>
          </div>
        )}

        {/* Scanning Sweep Laser Line */}
        {isCapturing && (
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_0_10px_#22c55e] animate-[bounce_1.5s_infinite]" />
        )}

        {/* Standard Permission Error explanation Modal Overlay */}
        {!hasPermission && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-14 h-14 bg-red-500/10 text-red-400 rounded-2xl flex items-center justify-center mb-4">
              <AlertTriangle size={26} />
            </div>
            <h3 className="text-base font-bold text-slate-100">
              {language === 'ne' ? 'क्यामेरा अनुमति आवश्यक छ' : 'Camera Permission Required'}
            </h3>
            <p className="text-xs text-slate-400 mt-2 max-w-[240px] leading-relaxed">
              {t.cameraExplanation}
            </p>
            <div className="mt-6 flex flex-col gap-2 w-full max-w-[200px]">
              <button
                onClick={() => setHasPermission(true)}
                className="py-2.5 bg-green-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 hover:bg-green-400 active:scale-95 transition-all min-h-[44px]"
              >
                {t.cameraGrantButton}
              </button>
              <button
                onClick={onBack}
                className="py-2.5 bg-slate-900 border border-slate-800 text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-800 active:scale-95 transition-all min-h-[44px]"
              >
                {language === 'ne' ? 'पछाडि जानुहोस्' : 'Go Back'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* COMPACT BOTTOM CONTROLS ZONE (Ergonomic Thumb Area) */}
      <footer className="relative z-20 flex flex-col items-center justify-end px-6 pb-8 bg-gradient-to-t from-black via-black/90 to-transparent shrink-0">
        
        {/* Info Helper Line */}
        <div className="text-[10px] text-slate-400 font-medium mb-5 px-4 text-center max-w-[240px]">
          {isCapturing ? t.scanning : t.tapToCapture}
        </div>

        {/* Layout Row containing Shutter, Switch, diagnostics */}
        <div className="flex items-center justify-between w-full max-w-[280px]">
          
          {/* Debug Simulator Toggle */}
          <button
            onClick={triggerDeniedState}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-white transition-all active:scale-95"
            title="Simulate Denied Permission"
          >
            <AlertTriangle size={17} />
          </button>

          {/* Large Tactile Capture Shutter Button */}
          <button
            onClick={handleCapture}
            disabled={isCapturing || !hasPermission}
            className={`flex items-center justify-center rounded-full p-1 border-4 transition-all duration-200 active:scale-90 ${
              isCapturing 
                ? 'border-slate-800 bg-slate-950 w-20 h-20' 
                : 'border-green-500/20 bg-green-500 hover:bg-green-400 text-slate-950 w-20 h-20 shadow-[0_0_20px_rgba(34,197,94,0.25)]'
            }`}
          >
            {isCapturing ? (
              <RefreshCw className="animate-spin text-green-500" size={24} />
            ) : (
              <Aperture size={36} strokeWidth={2.2} />
            )}
          </button>

          {/* Switch Camera */}
          <button
            onClick={() => setFacingMode(prev => prev === 'user' ? 'environment' : 'user')}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-white transition-all active:scale-95"
            title={t.switchCamera}
          >
            <RotateCw size={17} />
          </button>
        </div>
      </footer>
    </div>
  );
};
