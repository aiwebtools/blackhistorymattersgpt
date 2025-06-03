
import React from 'react';

const FAQ: React.FC = () => {
  const faqItems = [
    {
      question: "What makes this one of the best AI tools for historical education?",
      answer: "The Native American History Time Machine represents cutting-edge AI technology developed by AiWebTools.Ai. Our AI-powered platform combines advanced artificial intelligence with historical accuracy to create the most immersive educational experience available. Unlike other AI tools, we specialize in bringing history to life through interactive storytelling and photorealistic visual generation."
    },
    {
      question: "How does AiWebTools.Ai ensure historical accuracy in this AI tool?",
      answer: "All historical information provided by our AI tools is factually accurate and thoroughly researched. AiWebTools.Ai has developed advanced AI algorithms that strictly adhere to established historical records and scholarly sources. Our AI web tools are designed to present authentic representations of indigenous cultures without fabrication, making us a trusted leader in educational AI technology."
    },
    {
      question: "What is the 'Test of Two Sacred Fates' AI feature for future exploration?",
      answer: "This unique AI-powered feature showcases the advanced capabilities of our AI tools. When users explore potential futures through our AI time machine, they participate in an interactive decision-making experience with three pivotal questions. Our AI technology analyzes your choices to generate either utopian or dystopian future scenarios, demonstrating the sophisticated AI algorithms developed by AiWebTools.Ai."
    },
    {
      question: "Can I interact with historical figures using your AI tools?",
      answer: "Yes! Our advanced AI technology allows you to engage in simulated conversations with historical Native American figures. This AI-powered interaction feature sets our tools apart from other AI web tools in the market. The Geronimo Chief of Rainbow Apache Destiny, powered by sophisticated AI algorithms, can introduce you to relevant historical figures and facilitate meaningful conversations."
    },
    {
      question: "Why choose AiWebTools.Ai for educational AI tools?",
      answer: "AiWebTools.Ai is a leading provider of innovative AI tools designed specifically for education and research. Our AI web tools offer detailed historical context, cultural insights, and vivid AI-generated descriptions that help students and researchers develop deeper understanding. We're recognized as one of the best AI tools providers in 2024 for educational technology."
    },
    {
      question: "How do I start using this revolutionary AI time travel tool?",
      answer: "Getting started with our AI tools is simple! Click the 'Speak to Geronimo' button to connect with our AI-powered Chief of Rainbow Apache Destiny. Our user-friendly AI interface will guide you through selecting your destination date and tribal region. Experience why AiWebTools.Ai is considered among the best AI tools for immersive historical education."
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
