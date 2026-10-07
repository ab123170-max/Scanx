/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AIScanResult } from '../ai/AIService';

export interface SavedScan {
  id: string;
  timestamp: number;
  image?: string; // Base64 thumbnail or placeholder
  result: AIScanResult;
  notes?: string;
}

const STORAGE_KEY = 'scanx_saved_discoveries';

export class HistoryService {
  static getHistory(): SavedScan[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  static saveScan(result: AIScanResult, image?: string): SavedScan {
    const history = this.getHistory();
    const newScan: SavedScan = {
      id: `scan_${Date.now()}`,
      timestamp: Date.now(),
      image,
      result,
    };
    history.unshift(newScan);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return newScan;
  }

  static deleteScan(id: string): void {
    const history = this.getHistory();
    const filtered = history.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }

  static clearHistory(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
