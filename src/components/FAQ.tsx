
import React from 'react';

const FAQ: React.FC = () => {
  const faqItems = [
    {
      question: "What makes this one of the best AI tools for historical education?",
      answer: "The Black History Time Machine of Truth represents cutting-edge AI technology developed by AiWebTools.Ai. Our AI-powered platform combines advanced artificial intelligence with historical accuracy to create the most immersive educational experience available. Unlike other AI tools, we specialize in bringing history to life through interactive storytelling and photorealistic visual generation."
    },
    {
      question: "How does AiWebTools.Ai ensure historical accuracy in this AI tool?",
      answer: "All historical information provided by our AI tools is factually accurate and thoroughly researched. AiWebTools.Ai has developed advanced AI algorithms that strictly adhere to established historical records and scholarly sources. Our AI web tools are designed to present authentic representations of Black history and culture without fabrication, making us a trusted leader in educational AI technology."
    },
    {
      question: "What is the 'Test of Two Sacred Fates' feature for future exploration?",
      answer: "This unique AI-powered feature showcases the advanced capabilities of our time machine. When users explore potential futures, they participate in 'The Test of the Sacred Times'—a spiritual trial with three moral questions about resource stewardship, technology use, and global unity. Your choices determine whether you experience a future of justice or witness the consequences of betrayal and greed."
    },
    {
      question: "Can I interact with historical figures using your AI tools?",
      answer: "Yes! Our advanced AI technology allows you to engage in simulated conversations with historical Black figures and leaders through immersive 5000-word narratives. Dr. Martin Luther King Jr., Voice of the Dream, guides every journey and can introduce you to revolutionaries, elders, healers, inventors, and leaders from any time period in Black history. You don't just learn history—you live it."
    },
    {
      question: "Why choose AiWebTools.Ai for educational AI tools?",
      answer: "AiWebTools.Ai is a leading provider of innovative AI tools designed specifically for education and research. Our AI web tools offer detailed historical context, cultural insights, and vivid AI-generated descriptions that help students and researchers develop deeper understanding. We're recognized as one of the best AI tools providers in 2024 for educational technology."
    },
    {
      question: "How do I start using this revolutionary AI time travel tool?",
      answer: "Getting started with our AI time machine is simple! Click the 'Journey Through Time Lead By DR Martin Luther King jr' button to connect with Dr. Martin Luther King Jr., Voice of the Dream. You'll be asked what date in Black history you wish to teleport to and which Black land, community, or moment in the global struggle for freedom you'd like to explore. Experience why AiWebTools.Ai is considered among the best AI tools for immersive historical education."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center rainbow-text-glow mb-6">
          AI Tools FAQ - AiWebTools.Ai
        </h2>
        
        <p className="text-center text-light-gray max-w-3xl mx-auto mb-12">
          Find answers about our cutting-edge AI tools and why AiWebTools.Ai is your best choice for AI-powered historical exploration and educational technology.
        </p>
        
        <div className="max-w-3xl mx-auto grid gap-6">
          {faqItems.map((item, index) => (
            <div key={index} className="rainbow-cyberpunk-card overflow-hidden">
              <div className="px-6 py-4 rainbow-text font-semibold">
                {item.question}
              </div>
              <div className="bg-black/60 px-6 py-4 text-light-gray/80">
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
