import { useState, useEffect } from 'react';
import { X, Cookie, Settings, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ApiService } from 'Backend/src/services/api';

const CookieConsentBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailed, setIsDetailed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    checkCookieStatus();
  }, []);

  const checkCookieStatus = async () => {
    try {
      const result = await ApiService.checkCookieStatus();
      if (!result.preferencesSet) {
        setTimeout(() => setIsOpen(true), 1500);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to check cookie status:', error);
      setIsLoading(false);
    }
  };

  const handleAcceptAll = async () => {
    await savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    });
  };

  const handleRejectAll = async () => {
    await savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    });
  };

  const handleSavePreferences = async () => {
    await savePreferences(preferences);
  };

  const savePreferences = async (prefs: any) => {
    setIsSaving(true);
    
    try {
      const result = await ApiService.saveCookiePreferences(prefs);
      
      if (result.success) {
        toast.success(result.message || 'Cookie preferences saved successfully');
        setIsOpen(false);
        window.location.reload();
      } else {
        toast.error(result.message || 'Failed to save preferences');
      }
    } catch (error: any) {
      console.error('Save preferences error:', error);
      if (error.message?.includes('NetworkError') || error.message?.includes('Failed to fetch')) {
        toast.error("Cannot connect to server. Please check if the backend is running.");
      } else {
        toast.error('Network error. Please check your connection.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 animate-in slide-in-from-bottom duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Cookie className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Cookie Preferences</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We use cookies to enhance your experience
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
            disabled={isSaving}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Simple View */}
        {!isDetailed && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              We use necessary cookies for website functionality. You can choose to accept analytics 
              and marketing cookies to help us improve your experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAcceptAll}
                disabled={isSaving}
                className="flex-1 bg-primary hover:bg-primary/90 transition-all"
              >
                {isSaving ? (
                  "Processing..."
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Accept All Cookies
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleRejectAll}
                disabled={isSaving}
                variant="outline"
                className="flex-1"
              >
                Reject All
              </Button>
              
              <Button
                onClick={() => setIsDetailed(true)}
                variant="ghost"
                className="flex-1"
                disabled={isSaving}
              >
                <Settings className="mr-2 h-4 w-4" />
                Customize
              </Button>
            </div>
          </div>
        )}

        {/* Detailed View */}
        {isDetailed && (
          <div className="space-y-6">
            <div className="space-y-4">
              {/* Necessary Cookies */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Label className="font-semibold text-base">Necessary Cookies</Label>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Always Active</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Required for the website to function properly
                  </p>
                </div>
                <Switch checked={true} disabled />
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="space-y-1">
                  <Label className="font-semibold text-base">Analytics Cookies</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Help us understand how visitors use our site
                  </p>
                </div>
                <Switch
                  checked={preferences.analytics}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, analytics: checked })
                  }
                  disabled={isSaving}
                />
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="space-y-1">
                  <Label className="font-semibold text-base">Marketing Cookies</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Used to show relevant advertisements
                  </p>
                </div>
                <Switch
                  checked={preferences.marketing}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, marketing: checked })
                  }
                  disabled={isSaving}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleSavePreferences}
                disabled={isSaving}
                className="flex-1 bg-primary hover:bg-primary/90 transition-all"
              >
                {isSaving ? "Saving..." : "Save Preferences"}
              </Button>
              
              <Button
                onClick={() => setIsDetailed(false)}
                variant="outline"
                className="flex-1"
                disabled={isSaving}
              >
                Back to Simple View
              </Button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By continuing to use our site, you agree to our{' '}
            <a 
              href="/cookie-policy" 
              className="text-primary hover:underline font-medium"
              onClick={() => setIsOpen(false)}
            >
              Cookie Policy
            </a>
            . Learn more about how we use cookies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;