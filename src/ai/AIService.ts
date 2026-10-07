/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AIScanResult {
  name: string;
  category: string;
  brand: string;
  model: string;
  confidence: 'high' | 'medium' | 'low';
  confidencePercentage: number;
  explanation: string;
  characteristics: string[];
  alternatives: string[];
  
  // Specific Modules
  curiosity?: {
    whatIsItUsedFor: string;
    interestingFact: string;
  };
  worthIt?: {
    recommendedFor: string[];
    strengths: string[];
    weaknesses: string[];
    thinkTwiceIf: string;
  };
  fashion?: {
    style: string;
    color: string;
    pattern: string;
    goesWellWith: string[];
  };
}

export class AIService {
  /**
   * Stub endpoint to analyze raw base64 cropped image.
   * In Phase 5, this will make real Gemini API calls using @google/genai SDK on the server-side.
   */
  static async analyzeImage(base64Image: string): Promise<AIScanResult> {
    // Simulate short network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Choose a realistic mock analysis based on typical scanned inputs or randomize
    const mockOptions: AIScanResult[] = [
      {
        name: 'Nike Air Max Aura',
        category: 'Shoes',
        brand: 'Nike',
        model: 'Air Max Series',
        confidence: 'high',
        confidencePercentage: 94,
        explanation: 'A popular high-performance lifestyle and running sneaker combining Nike Air Max cushioning with durable leather overlay designs.',
        characteristics: ['Max Air cushioning unit', 'Split grain leather details', 'Responsive rubber sole'],
        alternatives: ['Adidas Ultraboost', 'Puma RS-X', 'New Balance 574'],
        curiosity: {
          whatIsItUsedFor: 'Designed originally as a high-performance running shoe, it is now primarily worn as a stylish daily streetwear sneaker.',
          interestingFact: 'The Nike Air Max technology was first introduced in 1987 by aerospace engineer Marion Franklin Rudy and designer Tinker Hatfield.'
        },
        worthIt: {
          recommendedFor: ['Streetwear enthusiasts', 'Daily commuters looking for comfort', 'Casual runners'],
          strengths: ['Unmatched heel cushioning', 'Timeless retro-modern silhouette', 'Highly breathable tongue mesh'],
          weaknesses: ['Bulky heel profile', 'Stiff upper leather during initial break-in period'],
          thinkTwiceIf: 'You prefer extremely lightweight barefoot-style running shoes.'
        },
        fashion: {
          style: 'Athletic Casual / Streetwear',
          color: 'Volt Green & Cosmic Black',
          pattern: 'Panelled Grid Upper',
          goesWellWith: ['Loose fit cargo joggers', 'Clean white crew socks', 'Oversized fleece hoodie']
        }
      },
      {
        name: 'iPhone 15 Pro Max',
        category: 'Phones & Gadgets',
        brand: 'Apple',
        model: '15 Pro Max',
        confidence: 'high',
        confidencePercentage: 98,
        explanation: 'A cutting-edge smartphone featuring an aerospace-grade titanium frame, an advanced A17 Pro system-on-chip, and a powerful 5x telephoto camera.',
        characteristics: ['Grade 5 Titanium finish', 'Action Button interface', 'USB-C high speed port'],
        alternatives: ['Samsung Galaxy S24 Ultra', 'Google Pixel 8 Pro', 'OnePlus 12'],
        curiosity: {
          whatIsItUsedFor: 'Used for mobile computing, high-fidelity mobile photography, gaming, and connected communications.',
          interestingFact: 'The titanium alloy used in this phone frame is the exact same high-strength alloy used in Martian exploration spacecraft!'
        },
        worthIt: {
          recommendedFor: ['Power users', 'Mobile content creators', 'Mobile gamers looking for top-tier GPU performance'],
          strengths: ['Remarkable telephoto camera zoom', 'Superb battery life and standby time', 'Luxurious lightweight handfeel'],
          weaknesses: ['Extremely expensive replacement parts', 'Slow wired charging speed limit'],
          thinkTwiceIf: 'You prefer smaller single-handed screens or are on a strict budget.'
        }
      },
      {
        name: 'Organic Matcha Green Tea',
        category: 'Food & Drinks',
        brand: 'Uji Koyama',
        model: 'Ceremonial Grade Matcha',
        confidence: 'medium',
        confidencePercentage: 82,
        explanation: 'Finely ground powder of specially grown and processed green tea leaves, highly prized for high antioxidant content and natural focus.',
        characteristics: ['Ceremonial stone-ground', 'Vibrant emerald green color', 'Rich umami notes'],
        alternatives: ['Sencha Loose Leaf Tea', 'Chai Latte Mix', 'Hojicha roasted tea'],
        curiosity: {
          whatIsItUsedFor: 'Brewing calming ceremonial beverages, matcha lattes, and healthy superfood smoothie additions.',
          interestingFact: 'Unlike standard brewed tea bags where you discard the leaves, drinking matcha means consuming the entire leaf stone-ground into water!'
        },
        worthIt: {
          recommendedFor: ['Health-conscious beverage lovers', 'Coffee alternatives', 'Mindful morning rituals'],
          strengths: ['Rich in L-Theanine for calm alertness', 'High concentration of EGCG antioxidants', 'No crash associated with caffeine'],
          weaknesses: ['Requires a bamboo whisk for optimal texture', 'Can be bitter if brewed with boiling water'],
          thinkTwiceIf: 'You dislike earthy, vegetal flavors or expect sweet instant mix flavors.'
        }
      }
    ];

    // Pick random or matching sample for visual completeness
    const randomIdx = Math.floor(Math.random() * mockOptions.length);
    return mockOptions[randomIdx];
  }

  /**
   * Lookup barcode in simulated database.
   */
  static async lookupBarcode(code: string): Promise<AIScanResult | null> {
    // Simulate brief network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simple test cases
    if (code === '019028102283' || code.includes('978') || code.length > 5) {
      return {
        name: 'The Creative Act: A Way of Being',
        category: 'Books & Media',
        brand: 'Rick Rubin / Penguin Press',
        model: 'First Edition Hardcover',
        confidence: 'high',
        confidencePercentage: 99,
        explanation: 'A beautiful and profound distillation of the creative process from legendary music producer Rick Rubin, exploring how to bring creativity into everyday life.',
        characteristics: ['Hardcover linen cloth binding', '432 pages of insights', 'Minimalist graphic design'],
        alternatives: ['Atomic Habits by James Clear', 'Show Your Work by Austin Kleon'],
        curiosity: {
          whatIsItUsedFor: 'Personal inspiration, artistic coaching, philosophical guidance, and reading room display.',
          interestingFact: 'Rick Rubin does not play instruments or operate recording consoles; his entire musical career is based on his creative intuition.'
        },
        worthIt: {
          recommendedFor: ['Artists, designers, and writers', 'Rick Rubin fans', 'Anyone stuck in a creative rut'],
          strengths: ['Extremely short, approachable chapters', 'Timeless and non-dogmatic advice', 'Beautiful premium cover feel'],
          weaknesses: ['May read as too abstract or spiritual for people looking for concrete step-by-step business blueprints'],
          thinkTwiceIf: 'You are looking for specific legal or technical guides on commercializing products.'
        }
      };
    }

    return null;
  }
}
