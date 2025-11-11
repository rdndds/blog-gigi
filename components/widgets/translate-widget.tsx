'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Languages } from 'lucide-react';

export default function TranslateWidget() {
  const translateConfig = {
    enabled: true,
    defaultLanguage: "id",
    languages: ["id", "en"],
    showLanguageSelector: true
  };

  const [currentLang, setCurrentLang] = useState(translateConfig.defaultLanguage);
  const [isTranslating, setIsTranslating] = useState(false);

  if (!translateConfig.enabled) {
    return null;
  }

  const handleTranslate = (targetLang: string) => {
    if (targetLang === currentLang) return;

    setIsTranslating(true);

    // Google Translate implementation
    const googleTranslateCombo = document.createElement('select');
    googleTranslateCombo.innerHTML = `
      <option value=""></option>
      <option value="id">Indonesian</option>
      <option value="en">English</option>
    `;
    googleTranslateCombo.value = targetLang;

    // Trigger Google Translate
    const event = new Event('change');
    googleTranslateCombo.dispatchEvent(event);

    // Add Google Translate Element if not exists
    if (!document.querySelector('.goog-te-banner-frame')) {
      const gtScript = document.createElement('script');
      gtScript.type = 'text/javascript';
      gtScript.async = true;
      gtScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(gtScript);

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement({
          pageLanguage: 'id',
          includedLanguages: 'id,en',
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element');
      };
    }

    setTimeout(() => {
      setCurrentLang(targetLang);
      setIsTranslating(false);
    }, 1000);
  };

  return (
    <Card className="border-0 shadow-soft hover:shadow-large transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Languages className="w-4 h-4 text-primary-600" />
          Translate Widget
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div id="google_translate_element" className="hidden"></div>

        <div className="space-y-2">
          <p className="text-xs text-gray-600 mb-3">
            Translate this page to your preferred language
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => handleTranslate('id')}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                currentLang === 'id'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              disabled={isTranslating}
            >
              🇮🇩 ID
            </button>

            <button
              onClick={() => handleTranslate('en')}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                currentLang === 'en'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              disabled={isTranslating}
            >
              🇬🇧 EN
            </button>
          </div>

          {isTranslating && (
            <div className="text-center py-2">
              <div className="inline-flex items-center gap-2 text-xs text-primary-600">
                <div className="w-3 h-3 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                Translating...
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}