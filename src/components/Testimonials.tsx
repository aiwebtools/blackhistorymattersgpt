
import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah J.",
      role: "History Teacher",
      quote: "The Black History Time Machine of Truth has liberated my teaching approach. My students experience a profound awakening when they witness the hidden truths Dr. King reveals through this powerful tool.",
      stars: 5
    },
    {
      name: "Michael T.",
      role: "Cultural Researcher",
      quote: "This tool breaks through historical deception like nothing I've seen. Dr. King's guidance reveals suppressed truths that have been hidden for generations. It's not just learning—it's liberation.",
      stars: 5
    },
    {
      name: "Elena R.",
      role: "Student",
      quote: "I was drowning in lies and distorted history until Dr. King's voice liberated my understanding. Now I see the truth clearly—this tool awakened my mind to what they tried to hide.",
      stars: 4
    },
    {
      name: "David K.",
      role: "History Enthusiast",
      quote: "The Test of the Sacred Times shattered my illusions about the future! Dr. King's wisdom showed me how moral choices shape destiny. This isn't just education—it's spiritual awakening through truth.",
      stars: 5
    }
  ];

  return (
    <section className="py-16 bg-charcoal/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-glow mb-6">
          Voices of Liberation & Awakening
        </h2>
        
        <p className="text-center text-light-gray max-w-3xl mx-auto mb-12">
          Hear from those who have experienced truth liberation and historical awakening through Dr. King's guidance.
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
                    className={`w-5 h-5 ${i < testimonial.stars ? 'text-amber-600 fill-amber-600' : 'text-gray-400'}`} 
                  />
                ))}
              </div>
              
              <blockquote className="text-light-gray italic mb-4">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="mt-auto">
                <div className="font-semibold text-amber-600">
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
