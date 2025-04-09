
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

const FAQ: React.FC = () => {
  const faqItems = [
    {
      question: "What is the Native American History Time Machine of Destiny?",
      answer: "The Native American History Time Machine of Destiny is an AI-powered interactive experience that allows users to virtually 'travel' to any point in Native American history. Guided by the Geronimo Chief of Rainbow Apache Destiny, users receive historically accurate, immersive storytelling about the time period they choose to visit, complete with photorealistic visual representations of their surroundings."
    },
    {
      question: "How accurate is the historical information provided?",
      answer: "All historical information provided is factually accurate and thoroughly researched. The Native American History Time Machine is committed to presenting authentic representations of indigenous cultures, traditions, and historical events without fabrication. When presenting historical content, the AI strictly adheres to established historical records and scholarly sources."
    },
    {
      question: "What is the 'Test of Two Sacred Fates' for future travel?",
      answer: "When users choose to explore potential futures, they participate in the 'Test of Two Sacred Fates.' This consists of three pivotal questions, each offering a choice between two paths (the 'Red Pill' and 'Blue Pill'). The choices made regarding resources, technology use, and human interactions determine whether the user experiences a utopian or dystopian future scenario. This feature is designed to encourage reflection on how present-day decisions might impact our collective future."
    },
    {
      question: "Can I interact with historical Native American figures?",
      answer: "Yes, the Geronimo Chief of Rainbow Apache Destiny may introduce you to historical Native figures relevant to your chosen time period. You can engage in simulated conversations with these figures, learning about their perspectives and experiences in an interactive way that brings history to life."
    },
    {
      question: "Is this experience appropriate for educational purposes?",
      answer: "Yes, the Native American History Time Machine is designed to be educational and can be a valuable supplementary tool for teaching indigenous history. It provides detailed historical context, cultural insights, and vivid descriptions that can help students develop a deeper understanding and appreciation of Native American cultures and histories."
    },
    {
      question: "How do I start my time travel journey?",
      answer: "To begin your journey, simply click the 'Speak to Geronimo' button, which will connect you to the Geronimo Chief of Rainbow Apache Destiny. You'll be asked to specify what date you'd like to teleport to and which tribal land or region you wish to visit. The Chief will then guide you through the time travel sequence and begin your immersive historical experience."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center rainbow-text-glow mb-6">
          Frequently Asked Questions
        </h2>
        
        <p className="text-center text-light-gray max-w-3xl mx-auto mb-12">
          Find answers to common questions about the Native American History Time Machine of Destiny.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="rainbow-cyberpunk-card mb-4 overflow-hidden"
              >
                <AccordionTrigger className="text-left px-6 py-4 rainbow-text font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 text-light-gray/80">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
