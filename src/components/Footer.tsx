
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  rainbow?: boolean;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, className, external = false, rainbow = false }) => {
  return (
    <a 
      href={href}
      className={cn(
        "transition-all duration-300 flex items-center gap-1",
        rainbow 
          ? "rainbow-button-glow px-4 py-2 rounded-full font-semibold text-white hover:scale-105" 
          : "text-light-gray hover:text-primary-purple",
        className
      )}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
      {external && <ExternalLink size={14} />}
    </a>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-primary-purple/20 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="w-full flex justify-center mb-6">
          <FooterLink 
            href="https://time-machine-gpt.lovable.app/?via=aiwebtools"
            className="button-glow text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2"
            external
            rainbow
          >
            You May Also Like TIME MACHINE GPT
          </FooterLink>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary-purple mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <FooterLink 
                  href="https://chatgpt.com/g/g-67f5b059be608191a9faa94c7d8dfb81-native-american-history-time-machine-of-destiny"
                  external
                  rainbow
                >
                  Speak to Geronimo and Experience Native American History like Never Before
                </FooterLink>
              </li>
              <li>
                <FooterLink href="#disclaimer" rainbow>
                  Disclaimer
                </FooterLink>
              </li>
              <li>
                <FooterLink 
                  href="https://time-machine-gpt.lovable.app/?via=aiwebtools" 
                  external
                  rainbow
                >
                  Try Standard Time Machine GPT
                </FooterLink>
              </li>
              <li>
                <FooterLink 
                  href="https://www.aiwebtools.ai" 
                  external
                  rainbow
                >
                  More AI Tools
                </FooterLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-primary-purple mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <FooterLink 
                  href="https://openai.com/policies/privacy-policy/" 
                  external
                >
                  Privacy Policy
                </FooterLink>
              </li>
              <li>
                <FooterLink 
                  href="https://aiwebtools.ai/terms-of-services" 
                  external
                >
                  Terms of Service
                </FooterLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-primary-purple mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <FooterLink href="tel:+14758008096">
                  (475) 800-8096
                </FooterLink>
              </li>
              <li>
                <FooterLink href="mailto:Contact@ai-webtools.com">
                  Contact@ai-webtools.com
                </FooterLink>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-primary-purple/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-light-gray/50 text-sm">
            © {new Date().getFullYear()} Native American History Time Machine Of Destiny. All rights reserved.
          </p>
          
          <FooterLink
            href="https://www.aiwebtools.ai"
            external
            rainbow
            className="mt-4 md:mt-0"
          >
            More AI Tools
          </FooterLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
