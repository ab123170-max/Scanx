/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LanguageCode = 'en' | 'ne';

export interface Translations {
  appName: string;
  tagline: string;
  taglineSecondary: string;
  greeting: string;
  scanAnything: string;
  recentScans: string;
  savedDiscoveries: string;
  settings: string;
  language: string;
  privacyPolicy: string;
  scanning: string;
  readyToScan: string;
  tapToCapture: string;
  cameraExplanation: string;
  cameraGrantButton: string;
  cameraRetryButton: string;
  torchOn: string;
  torchOff: string;
  switchCamera: string;
  whatIsThis: string;
  aiExplanation: string;
  quickDetails: string;
  saveDiscovery: string;
  saved: string;
  share: string;
  scanAgain: string;
  copyLink: string;
  possibleAlternatives: string;
  somethingWentWrong: string;
  objectNotClear: string;
  networkUnavailable: string;
  lowConfidence: string;
  pwaInstallPrompt: string;
  installApp: string;
  installiOS: string;
  iosInstructionsStep1: string;
  iosInstructionsStep2: string;
  close: string;
  historyEmpty: string;
  brand: string;
  category: string;
  model: string;
  opinion: string;
  opinionGoodFor: string;
  opinionStrengths: string;
  opinionWeaknesses: string;
  opinionCaution: string;
  fashionGoesWellWith: string;
  curiosityFact: string;
  curiosityUse: string;
  confidenceHigh: string;
  confidenceMedium: string;
  confidenceLow: string;
  deleteConfirm: string;
  shareTitle: string;
}

export const translations: Record<LanguageCode, Translations> = {
  en: {
    appName: 'ScanX',
    tagline: 'Scan anything. Discover everything.',
    taglineSecondary: 'Nepali: कुनै पनि कुरा स्क्यान गर। बुझ। खोज। Share गर।',
    greeting: 'Hello, Scanner 👋',
    scanAnything: 'Scan Anything',
    recentScans: 'Recent Scans',
    savedDiscoveries: 'Saved Discoveries',
    settings: 'Settings',
    language: 'Language',
    privacyPolicy: 'Privacy & Data Protection',
    scanning: 'Scanning Frame...',
    readyToScan: 'Ready to scan',
    tapToCapture: 'Tap to capture & analyze',
    cameraExplanation: 'ScanX requires camera access to detect items and extract barcodes. Images are only processed in real-time and never stored remotely.',
    cameraGrantButton: 'Grant Camera Access',
    cameraRetryButton: 'Retry Connection',
    torchOn: 'Torch On',
    torchOff: 'Torch Off',
    switchCamera: 'Switch Camera',
    whatIsThis: 'What is this?',
    aiExplanation: 'AI Analysis',
    quickDetails: 'Quick Information',
    saveDiscovery: 'Save Discovery',
    saved: 'Saved to History',
    share: 'Share Scan',
    scanAgain: 'Scan Again',
    copyLink: 'Copy Link',
    possibleAlternatives: 'Possible Alternatives',
    somethingWentWrong: 'Something went wrong. Please try again.',
    objectNotClear: 'Item is not clear. Move a bit closer or improve lighting and scan again.',
    networkUnavailable: 'Network connection unavailable. Offline mode active.',
    lowConfidence: "I'm not confident enough to identify this item precisely.",
    pwaInstallPrompt: 'Install ScanX to your home screen for rapid scanning and full offline capability.',
    installApp: 'Install ScanX App',
    installiOS: 'Install on iOS Safari',
    iosInstructionsStep1: '1. Tap the Share icon in Safari toolbar.',
    iosInstructionsStep2: '2. Scroll down and tap "Add to Home Screen".',
    close: 'Close',
    historyEmpty: 'Your scanned item history will appear here. Start scanning!',
    brand: 'Brand',
    category: 'Category',
    model: 'Model',
    opinion: 'AI Perspective',
    opinionGoodFor: 'Recommended for',
    opinionStrengths: 'Key Strengths',
    opinionWeaknesses: 'Considerations',
    opinionCaution: 'Think twice if',
    fashionGoesWellWith: 'Complements nicely with',
    curiosityFact: 'Mind-Blowing Fact',
    curiosityUse: 'Primary Utility',
    confidenceHigh: 'High Confidence',
    confidenceMedium: 'Medium Confidence',
    confidenceLow: 'Low Confidence',
    deleteConfirm: 'Are you sure you want to delete this scan?',
    shareTitle: 'ScanX Discovery',
  },
  ne: {
    appName: 'ScanX',
    tagline: 'कुनै पनि कुरा स्क्यान गर। बुझ। खोज। Share गर।',
    taglineSecondary: 'Scan anything. Discover everything.',
    greeting: 'नमस्ते, स्क्यानर 👋',
    scanAnything: 'स्क्यान गर्नुहोस्',
    recentScans: 'भर्खरका स्क्यानहरू',
    savedDiscoveries: 'बचत गरिएका खोजहरू',
    settings: 'सेटिङहरू',
    language: 'भाषा',
    privacyPolicy: 'गोपनीयता र डेटा सुरक्षा',
    scanning: 'फ्रेम विश्लेषण हुँदैछ...',
    readyToScan: 'स्क्यान गर्न तयार',
    tapToCapture: 'विश्लेषण गर्न ट्याप गर्नुहोस्',
    cameraExplanation: 'वस्तुहरू पहिचान गर्न र बारकोड पढ्न ScanX लाई क्यामेराको अनुमति चाहिन्छ। तस्विरहरू यन्त्रमै विश्लेषण गरिन्छ र सर्भरमा सुरक्षित हुँदैनन्।',
    cameraGrantButton: 'क्यामेराको अनुमति दिनुहोस्',
    cameraRetryButton: 'पुनः प्रयास गर्नुहोस्',
    torchOn: 'टर्च अन',
    torchOff: 'टर्च अफ',
    switchCamera: 'क्यामेरा स्विच',
    whatIsThis: 'यो के हो?',
    aiExplanation: 'AI विश्लेषण र व्याख्या',
    quickDetails: 'द्रुत विवरण',
    saveDiscovery: 'बचत गर्नुहोस्',
    saved: 'इतिहासमा बचत गरियो',
    share: 'साझा गर्नुहोस्',
    scanAgain: 'फेरि स्क्यान गर्नुहोस्',
    copyLink: 'लिंक कपि गर्नुहोस्',
    possibleAlternatives: 'सम्भावित विकल्पहरू',
    somethingWentWrong: 'केही गल्ती भयो। कृपया फेरि प्रयास गर्नुहोस्।',
    objectNotClear: 'यो वस्तु स्पष्ट देखिएन। अलि नजिक गएर वा उज्यालो मिलाएर फेरि स्क्यान गर्नुहोस्।',
    networkUnavailable: 'नेटवर्क जडान उपलब्ध छैन। अफलाइन मोड सक्रिय छ।',
    lowConfidence: 'म यो वस्तु पहिचान गर्न पूर्ण रूपमा विश्वस्त हुन सकिन।',
    pwaInstallPrompt: 'छिटो स्क्यान र अफलाइन सञ्चालनको लागि ScanX आफ्नो होम स्क्रिनमा थप्नुहोस्।',
    installApp: 'ScanX एप स्थापना गर्नुहोस्',
    installiOS: 'iOS सफारीमा इन्स्टल गर्नुहोस्',
    iosInstructionsStep1: '१. सफारी टुलबारमा रहेको Share बटन ट्याप गर्नुहोस्।',
    iosInstructionsStep2: '२. तल स्क्रोल गरेर "Add to Home Screen" रोज्नुहोस्।',
    close: 'बन्द गर्नुहोस्',
    historyEmpty: 'तपाईंले स्क्यान गर्नुभएका सामग्री यहाँ देखिनेछन्। स्क्यान सुरु गर्नुहोस्!',
    brand: 'ब्रान्ड',
    category: 'श्रेणी',
    model: 'मोडेल',
    opinion: 'AI दृष्टिकोण र राय',
    opinionGoodFor: 'यसको लागि उत्तम',
    opinionStrengths: 'मुख्य सबल पक्षहरू',
    opinionWeaknesses: 'ध्यान दिनुपर्ने पक्षहरू',
    opinionCaution: 'दुई पटक सोच्नुहोस् यदि',
    fashionGoesWellWith: 'यससँग राम्रो सुहाउँछ',
    curiosityFact: 'रोचक तथ्य',
    curiosityUse: 'मुख्य उपयोगिता',
    confidenceHigh: 'उच्च आत्मविश्वास (High Confidence)',
    confidenceMedium: 'मध्यम आत्मविश्वास (Medium Confidence)',
    confidenceLow: 'न्यून आत्मविश्वास (Low Confidence)',
    deleteConfirm: 'के तपाईं यो स्क्यान मेटाउन चाहनुहुन्छ?',
    shareTitle: 'ScanX खोज',
  },
};
