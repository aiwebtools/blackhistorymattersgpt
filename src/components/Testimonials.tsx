
import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah J.",
      role: "History Teacher",
      quote: "The Native American History Time Machine has transformed how I teach indigenous history. My students are far more engaged when they can 'experience' historical events through this immersive storytelling.",
      stars: 5
    },
    {
      name: "Michael T.",
      role: "Cultural Researcher",
      quote: "The historical accuracy and attention to detail is impressive. I've studied Native American cultures for years, and this tool provides insights that bring forgotten stories to life.",
      stars: 5
    },
    {
      name: "Elena R.",
      role: "Student",
      quote: "I was struggling with my Native American studies course until I found this. Being able to 'visit' different time periods makes learning so much more interesting and meaningful.",
      stars: 4
    },
    {
      name: "David K.",
      role: "History Enthusiast",
      quote: "The Future Tests are mind-blowing! They really make you think about how today's choices affect tomorrow. The storytelling feels authentic and respectful of Native cultures.",
      stars: 5
    }
  ];

  return (
    <section className="py-16 bg-charcoal/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-glow mb-6">
          What Time Travelers Say
        </h2>
        
        <p className="text-center text-light-gray max-w-3xl mx-auto mb-12">
          Hear from those who have journeyed through Native American history with the Cherokee Chief of Destiny.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="cyberpunk-card p-6 flex flex-col"
            >
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.stars ? 'text-primary-purple fill-primary-purple' : 'text-gray-400'}`} 
                  />
                ))}
              </div>
              
              <blockquote className="text-light-gray italic mb-4">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="mt-auto">
                <div className="font-semibold text-primary-purple">
                  {testimonial.name}
                </div>
                <div className="text-sm text-light-gray/70">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
