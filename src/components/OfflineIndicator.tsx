/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useOnlineStatus } from '../utils/useOnlineStatus';
import { useLanguage } from '../language/LanguageContext';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const { t } = useLanguage();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 flex items-center gap-3 rounded-2xl bg-amber-500 text-slate-950 p-3.5 shadow-xl border border-amber-400/30 animate-pulse">
      <div className="p-1.5 bg-slate-950/15 rounded-lg shrink-0">
        <WifiOff size={16} />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold leading-tight">{t.networkUnavailable}</span>
      </div>
    </div>
  );
};
