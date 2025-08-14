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
import { AlertTriangle, BookOpen } from "lucide-react";

const DisclaimerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('disclaimerAccepted');
    if (!hasAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    if (hasAgreed) {
      localStorage.setItem('disclaimerAccepted', 'true');
      setIsOpen(false);
    }
  };

  const handleDecline = () => {
    window.location.href = 'https://www.aiwebtools.ai';
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl max-h-[95vh] bg-black border border-primary-purple/30 mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg text-primary-purple">
            <AlertTriangle className="text-amber-500" size={24} />
            Legal Disclaimer & Terms
          </DialogTitle>
          <DialogDescription className="text-light-gray/80 text-sm">
            Educational AI Tool - Please Review Before Use
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-2">
          <div className="space-y-4 text-sm text-light-gray">
            
            <div className="p-3 bg-amber-600/10 border border-amber-600/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="text-amber-600" size={16} />
                <h3 className="font-semibold text-amber-600 text-sm">EDUCATIONAL USE ONLY</h3>
              </div>
              <p className="text-xs">
                This AI tool is for educational and informational purposes only. <strong>AI may produce inaccurate information - verify independently.</strong>
              </p>
            </div>

            <div className="p-3 bg-red-600/10 border border-red-600/20 rounded-lg">
              <h3 className="font-semibold text-red-400 text-sm mb-2">AI LIMITATIONS</h3>
              <p className="text-xs mb-2">AI responses may contain inaccuracies, biases, outdated information, or inappropriate content.</p>
              <p className="text-xs font-medium text-red-400">Always verify information before relying on it.</p>
            </div>

            <div className="p-3 bg-primary-purple/10 border border-primary-purple/20 rounded-lg">
              <h3 className="font-semibold text-primary-purple text-sm mb-2">FULL LEGAL WAIVER</h3>
              <div className="text-xs space-y-2">
                <p><strong>No Warranties:</strong> Service provided "AS IS" without warranties of accuracy or fitness.</p>
                <p><strong>Limitation of Liability:</strong> AiWebTools.ai and affiliates are not liable for any damages from your use, including reliance on AI information, educational consequences, or emotional distress.</p>
                <p><strong>Your Responsibility:</strong> You must verify all information independently and use the service legally and appropriately.</p>
                <p><strong>Age Requirement:</strong> 13+ years old (parental consent if under 18).</p>
                <p><strong>Privacy:</strong> Conversations processed by third-party AI providers subject to their privacy policies.</p>
                <p><strong>Governing Law:</strong> US laws apply. Terms may change without notice.</p>
              </div>
            </div>

            <div className="p-3 bg-gray-600/10 border border-gray-600/20 rounded-lg text-center">
              <p className="text-xs font-medium">
                By clicking "I Agree," you accept all terms and acknowledge full responsibility for your use of this educational AI tool.
              </p>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="agree-all"
              checked={hasAgreed}
              onCheckedChange={(checked) => setHasAgreed(checked === true)}
            />
            <label htmlFor="agree-all" className="text-sm text-light-gray flex-1">
              I have read and agree to all terms above and accept full responsibility
            </label>
          </div>

          <div className="flex gap-3 w-full">
            <Button
              onClick={handleDecline}
              variant="outline"
              className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10 text-sm"
            >
              Decline
            </Button>
            <Button
              onClick={handleAccept}
              disabled={!hasAgreed}
              className="flex-1 rainbow-button-glow text-sm"
            >
              I Agree & Continue
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DisclaimerModal;