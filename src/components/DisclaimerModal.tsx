import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, BookOpen, Shield } from "lucide-react";

const DisclaimerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [hasReadTerms, setHasReadTerms] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('disclaimerAccepted');
    if (!hasAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    if (hasAgreed && hasReadTerms) {
      localStorage.setItem('disclaimerAccepted', 'true');
      setIsOpen(false);
    }
  };

  const handleDecline = () => {
    // Redirect away from the site
    window.location.href = 'https://www.aiwebtools.ai';
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-black border border-primary-purple/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl text-primary-purple">
            <AlertTriangle className="text-amber-500" size={28} />
            Legal Disclaimer & Terms of Use
          </DialogTitle>
          <DialogDescription className="text-light-gray/80">
            Please read carefully before using the Black History Matters AI Time Machine
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm text-light-gray">
            
            {/* Educational Purpose Section */}
            <div className="p-4 bg-amber-600/10 border border-amber-600/20 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="text-amber-600" size={20} />
                <h3 className="font-semibold text-amber-600">EDUCATIONAL AND INFORMATIONAL PURPOSES ONLY</h3>
              </div>
              <p className="mb-2">
                This AI tool is designed exclusively for educational, informational, and research purposes. It is intended to facilitate learning about Black history and historical events through interactive AI technology.
              </p>
              <p className="font-medium text-amber-600">
                This tool is NOT intended for professional historical research, academic citations, or as a primary source of historical information.
              </p>
            </div>

            {/* AI Limitations Section */}
            <div className="p-4 bg-red-600/10 border border-red-600/20 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="text-red-400" size={20} />
                <h3 className="font-semibold text-red-400">AI LIMITATIONS AND ACCURACY DISCLAIMER</h3>
              </div>
              <p className="mb-2">
                <strong>IMPORTANT:</strong> Artificial Intelligence may produce inaccurate, incomplete, outdated, or misleading information. AI responses are generated based on training data and may contain:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Historical inaccuracies or misrepresentations</li>
                <li>Biased or incomplete perspectives</li>
                <li>Fictional or speculative content presented as fact</li>
                <li>Outdated or incorrect information</li>
                <li>Inappropriate or offensive content despite safety measures</li>
              </ul>
              <p className="mt-2 font-medium text-red-400">
                You MUST independently verify all information before relying on it for any purpose.
              </p>
            </div>

            {/* Full Legal Waiver */}
            <div className="p-4 bg-primary-purple/10 border border-primary-purple/20 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="text-primary-purple" size={20} />
                <h3 className="font-semibold text-primary-purple">COMPLETE LEGAL WAIVER AND LIMITATION OF LIABILITY</h3>
              </div>
              
              <div className="space-y-3">
                <p><strong>1. NO WARRANTIES:</strong> This service is provided "AS IS" without any warranties of any kind, express or implied, including but not limited to warranties of accuracy, completeness, or fitness for a particular purpose.</p>
                
                <p><strong>2. LIMITATION OF LIABILITY:</strong> AiWebTools.ai, its owners, operators, developers, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of this service, including but not limited to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Reliance on inaccurate AI-generated information</li>
                  <li>Educational or professional consequences</li>
                  <li>Emotional distress or offense</li>
                  <li>Loss of data or interruption of service</li>
                  <li>Any damages whatsoever, even if advised of the possibility</li>
                </ul>

                <p><strong>3. INDEMNIFICATION:</strong> You agree to indemnify and hold harmless AiWebTools.ai and its affiliates from any claims, damages, or expenses arising from your use of this service.</p>

                <p><strong>4. USER RESPONSIBILITY:</strong> You acknowledge that you are solely responsible for:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Verifying all information independently</li>
                  <li>Using the service appropriately and legally</li>
                  <li>Any decisions made based on AI-generated content</li>
                  <li>Compliance with applicable laws and regulations</li>
                </ul>

                <p><strong>5. AGE RESTRICTION:</strong> You must be at least 13 years old to use this service. If under 18, you must have parental consent.</p>

                <p><strong>6. GOVERNING LAW:</strong> These terms are governed by the laws of the United States. Any disputes shall be resolved in accordance with applicable jurisdiction.</p>

                <p><strong>7. MODIFICATIONS:</strong> We reserve the right to modify these terms at any time without notice.</p>
              </div>
            </div>

            {/* Data Collection Notice */}
            <div className="p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
              <h3 className="font-semibold text-blue-400 mb-2">PRIVACY AND DATA COLLECTION</h3>
              <p>
                By using this service, you acknowledge that conversations may be processed by third-party AI providers (including OpenAI) subject to their privacy policies. We do not store personal conversations, but you should avoid sharing sensitive personal information.
              </p>
            </div>

            <div className="p-4 bg-gray-600/10 border border-gray-600/20 rounded-lg">
              <p className="text-center font-medium">
                BY CLICKING "I AGREE AND ACCEPT ALL TERMS," YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY ALL THE ABOVE TERMS AND CONDITIONS.
              </p>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="read-terms"
                checked={hasReadTerms}
                onCheckedChange={(checked) => setHasReadTerms(checked === true)}
              />
              <label htmlFor="read-terms" className="text-sm text-light-gray">
                I have read and understood the complete disclaimer and terms above
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agree-terms"
                checked={hasAgreed}
                onCheckedChange={(checked) => setHasAgreed(checked === true)}
              />
              <label htmlFor="agree-terms" className="text-sm text-light-gray">
                I agree to all terms and accept full responsibility for my use of this educational AI tool
              </label>
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <Button
              onClick={handleDecline}
              variant="outline"
              className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              Decline & Leave
            </Button>
            <Button
              onClick={handleAccept}
              disabled={!hasAgreed || !hasReadTerms}
              className="flex-1 rainbow-button-glow"
            >
              I Agree & Accept All Terms
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DisclaimerModal;