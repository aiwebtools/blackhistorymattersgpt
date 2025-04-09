
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal/70 border-t border-primary-purple/20 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="w-full flex justify-center mb-6">
          <a 
            href="https://time-machine-gpt.lovable.app/?via=aiwebtools"
            className="button-glow text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            You May Also Like TIME MACHINE GPT <ExternalLink size={16} />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary-purple mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://chatgpt.com/g/g-67f5b059be608191a9faa94c7d8dfb81-native-american-history-time-machine-of-destiny" 
                  className="text-light-gray hover:text-primary-purple transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Speak to Geronimo and Experience Native American History like Never Before <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="text-light-gray hover:text-primary-purple transition-colors">
                  Disclaimer
                </a>
              </li>
              <li>
                <a 
                  href="https://time-machine-gpt.lovable.app/?via=aiwebtools" 
                  className="text-light-gray hover:text-primary-purple transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try Standard Time Machine GPT <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.aiwebtools.ai" 
                  className="text-light-gray hover:text-primary-purple transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More AI Tools <ExternalLink size={14} />
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-primary-purple mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://openai.com/policies/privacy-policy/" 
                  className="text-light-gray hover:text-primary-purple transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a 
                  href="https://aiwebtools.ai/terms-of-services" 
                  className="text-light-gray hover:text-primary-purple transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service <ExternalLink size={14} />
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-primary-purple mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="tel:+14758008096" 
                  className="text-light-gray hover:text-primary-purple transition-colors"
                >
                  (475) 800-8096
                </a>
              </li>
              <li>
                <a 
                  href="mailto:Contact@ai-webtools.com" 
                  className="text-light-gray hover:text-primary-purple transition-colors"
                >
                  Contact@ai-webtools.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-primary-purple/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-light-gray/50 text-sm">
            © {new Date().getFullYear()} Native American History Time Machine Of Destiny. All rights reserved.
          </p>
          
          <a
            href="https://www.aiwebtools.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 button-glow text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2"
          >
            More AI Tools <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
