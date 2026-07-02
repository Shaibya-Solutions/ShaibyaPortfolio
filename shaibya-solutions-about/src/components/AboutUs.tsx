import { motion } from 'motion/react';
import { 
  Building2, 
  Lightbulb, 
  Target, 
  Users, 
  Globe2, 
  Rocket, 
  ChevronRight,
  Sparkles,
  Award
} from 'lucide-react';

const timeline = [
  {
    year: 'The Inception',
    title: 'A Spark of Innovation',
    description: 'Shaibya Solutions was born out of a simple observation: businesses were struggling to bridge the gap between complex technological capabilities and real-world operational needs. Our founders set out to create a consultancy that prioritized practical, scalable solutions.',
    icon: Lightbulb,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
  },
  {
    year: 'Building the Foundation',
    title: 'Assembling the Experts',
    description: 'We started small, focusing on localized impact. By gathering a core team of passionate technologists and strategists, Shaibya established its foundational ethos: delivering uncompromising quality and building lasting partnerships.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800'
  },
  {
    year: 'Expansion & Growth',
    title: 'Scaling New Heights',
    description: 'As our reputation for excellence grew, so did our footprint. We expanded our service offerings to encompass enterprise digital transformation, cloud architecture, and cutting-edge data analytics.',
    icon: Rocket,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'
  },
  {
    year: 'Present Day',
    title: 'A Global Solutions Partner',
    description: 'Today, Shaibya Solutions stands as a beacon of technological empowerment. We continue to drive innovation, helping organizations worldwide navigate the complexities of the digital age with confidence.',
    icon: Globe2,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
  }
];

const values = [
  {
    title: 'Integrity First',
    description: 'We believe in transparent, honest partnerships. Our word is our bond.',
    icon: Building2
  },
  {
    title: 'Relentless Innovation',
    description: 'We constantly push the boundaries of what is possible, embracing new technologies.',
    icon: Sparkles
  },
  {
    title: 'Client-Centric',
    description: 'Your success is our success. We measure our impact by the value we create for you.',
    icon: Target
  },
  {
    title: 'Excellence Delivered',
    description: 'We hold ourselves to the highest standards of quality, ensuring every solution we provide is robust and effective.',
    icon: Award
  }
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#F4F1EE] text-[#1A1A1A] font-sans">
      
      {/* Navigation (Placeholder) */}
      <nav className="fixed w-full bg-[#F4F1EE] z-50 border-b border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1A1A1A] flex items-center justify-center">
              <span className="text-[#F4F1EE] font-bold text-xl font-serif">S</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-[#1A1A1A]">SHAIBYA.</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-[#1A1A1A] opacity-80">
            <a href="#" className="hover:opacity-100 transition-opacity">Home</a>
            <a href="#" className="opacity-100 border-b-2 border-[#1A1A1A] pb-1 transition-opacity">About Us</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Services</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Contact</a>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        
        {/* Hero Section */}
        <section className="relative px-4 py-32 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-[#1A1A1A] mb-8 font-serif leading-none">
              Empowering the Future, <br className="hidden md:block" />
              <span className="italic font-light">One Solution at a Time.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#1A1A1A] opacity-80 mb-8 leading-relaxed font-serif max-w-3xl mx-auto">
              We are more than just a technology company. Shaibya Solutions is a collective of visionaries, engineers, and strategists dedicated to transforming how businesses operate in the digital era.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-96 md:h-[32rem] overflow-hidden border border-[#1A1A1A]"
          >
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
              alt="Shaibya Office" 
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>
        </section>

        {/* What is Shaibya Section */}
        <section className="bg-[#F4F1EE] py-24 border-y border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xs font-bold tracking-[0.2em] text-[#1A1A1A] opacity-60 uppercase mb-4">Who We Are</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-8 font-serif">
                  What is Shaibya Solutions?
                </h3>
                <div className="space-y-6 text-[#1A1A1A] opacity-80 text-lg leading-relaxed font-serif border-l-2 border-[#1A1A1A] pl-6">
                  <p>
                    Shaibya Solutions is a premier technology consulting and implementation firm. We specialize in identifying operational bottlenecks and deploying bespoke, scalable digital solutions that drive efficiency and growth.
                  </p>
                  <p>
                    Our name, Shaibya, reflects our commitment to truth, resilience, and unwavering dedication to our clients' success. We bridge the gap between legacy systems and forward-looking innovations, ensuring our partners are always a step ahead of the curve.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1A1A1A] border border-[#1A1A1A]"
              >
                {values.map((value, idx) => (
                  <div key={idx} className="bg-[#F4F1EE] p-8 group hover:bg-[#1A1A1A] transition-colors duration-300">
                    <value.icon className="w-8 h-8 text-[#1A1A1A] mb-6 group-hover:text-[#F4F1EE] transition-colors" />
                    <h4 className="text-xl font-bold text-[#1A1A1A] mb-3 font-serif group-hover:text-[#F4F1EE] transition-colors">{value.title}</h4>
                    <p className="text-[#1A1A1A] opacity-70 group-hover:text-[#F4F1EE] transition-colors font-serif text-sm">{value.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* The Founding Story Section */}
        <section className="py-24 bg-[#1A1A1A] text-[#F4F1EE] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20 border-b border-[#F4F1EE]/20 pb-12">
              <h2 className="text-xs font-bold tracking-[0.2em] text-[#F4F1EE] opacity-60 uppercase mb-4">Our History</h2>
              <h3 className="text-5xl md:text-7xl font-bold mb-6 font-serif tracking-tight">The Shaibya Story</h3>
              <p className="text-[#F4F1EE] opacity-80 text-xl font-serif italic">
                Every great enterprise starts with a vision. Here is how Shaibya Solutions evolved from a bold idea into a driving force in technology.
              </p>
            </div>

            <div className="relative">
              {/* Vertical Line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#F4F1EE]/20 transform -translate-x-1/2"></div>

              <div className="space-y-16">
                {timeline.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="relative flex flex-col md:flex-row items-center gap-8"
                  >
                    {/* Timeline Node */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#1A1A1A] border border-[#F4F1EE]/40 items-center justify-center z-10">
                      <item.icon className="w-5 h-5 text-[#F4F1EE]" />
                    </div>

                    {/* Left Column */}
                    <div className="w-full md:w-1/2 md:pr-16 md:text-right">
                       {idx % 2 === 0 ? (
                           <div className="p-8 border border-[#F4F1EE]/20 hover:border-[#F4F1EE]/60 transition-colors bg-[#1A1A1A]">
                             <span className="text-[#F4F1EE] opacity-60 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">{item.year}</span>
                             <h4 className="text-3xl font-bold mb-4 font-serif">{item.title}</h4>
                             <p className="text-[#F4F1EE] opacity-80 leading-relaxed font-serif text-lg">{item.description}</p>
                           </div>
                       ) : (
                           <div className="aspect-video w-full overflow-hidden border border-[#F4F1EE]/20 bg-[#1A1A1A]">
                             <motion.img 
                                 whileHover={{ scale: 1.05 }}
                                 transition={{ duration: 0.6 }}
                                 src={item.image} 
                                 alt={item.title}
                                 className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0"
                             />
                           </div>
                       )}
                    </div>

                    {/* Right Column */}
                    <div className="w-full md:w-1/2 md:pl-16 md:text-left">
                       {idx % 2 === 1 ? (
                           <div className="p-8 border border-[#F4F1EE]/20 hover:border-[#F4F1EE]/60 transition-colors bg-[#1A1A1A]">
                             <span className="text-[#F4F1EE] opacity-60 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">{item.year}</span>
                             <h4 className="text-3xl font-bold mb-4 font-serif">{item.title}</h4>
                             <p className="text-[#F4F1EE] opacity-80 leading-relaxed font-serif text-lg">{item.description}</p>
                           </div>
                       ) : (
                           <div className="aspect-video w-full overflow-hidden border border-[#F4F1EE]/20 bg-[#1A1A1A]">
                             <motion.img 
                                 whileHover={{ scale: 1.05 }}
                                 transition={{ duration: 0.6 }}
                                 src={item.image} 
                                 alt={item.title}
                                 className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0"
                             />
                           </div>
                       )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-[#F4F1EE] text-[#1A1A1A] text-center border-b border-[#1A1A1A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-5xl md:text-7xl font-bold mb-8 font-serif tracking-tight">Be Part of Our Next Chapter</h2>
              <p className="text-[#1A1A1A] opacity-80 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-serif italic">
                Whether you are looking to transform your business or join a team of innovators, Shaibya Solutions is ready to welcome you.
              </p>
              <button className="bg-[#1A1A1A] text-[#F4F1EE] px-10 py-5 font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center gap-3 hover:bg-[#F4F1EE] hover:text-[#1A1A1A] border border-[#1A1A1A] transition-colors">
                Connect With Us <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#F4F1EE] py-16 text-center text-[#1A1A1A] border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-8 h-8 bg-[#1A1A1A] flex items-center justify-center">
                <span className="text-[#F4F1EE] font-bold text-lg font-serif">S</span>
             </div>
             <span className="font-bold text-xl tracking-widest text-[#1A1A1A]">SHAIBYA.</span>
          </div>
          <p className="text-xs uppercase tracking-widest opacity-60 font-bold">© {new Date().getFullYear()} Shaibya Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
