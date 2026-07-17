import React, { useEffect, useRef, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Check, FileText, CheckSquare, Lock, PenTool, Play, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VisionWeaverForm = React.lazy(() => import('./components/VisionWeaverForm'));

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const fadeLeftVariant = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

function Button({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`bg-brand-gold text-brand-charcoal font-bold rounded px-9 py-[18px] transition hover:bg-brand-gold-light w-full md:w-auto ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const sampleImgRef = useRef<HTMLImageElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we are on success route directly (should render form route)
    const urlParams = new URLSearchParams(window.location.search);
    if (window.location.pathname.includes('/vision-weaver/success') || urlParams.get('session_id')) {
      setIsFormOpen(true);
    }
  }, []);
  
  useEffect(() => {
    if (isFormOpen) return;
    
    // Nav shadow
    ScrollTrigger.create({
      start: "top -80px",
      onUpdate: (self) => {
        if (navRef.current) {
          if (self.progress > 0) {
            navRef.current.style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)";
          } else {
            navRef.current.style.boxShadow = "none";
          }
        }
      }
    });

    // Parallax hero
    if (heroBgRef.current) {
      gsap.to(heroBgRef.current, {
        backgroundPositionY: "40%",
        ease: "none",
        scrollTrigger: {
          trigger: heroBgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Number counters
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target') || '0');
      ScrollTrigger.create({
        trigger: numbersRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            innerHTML: target,
            duration: 1.5,
            snap: { innerHTML: 1 },
            onUpdate: function() {
              if (counter.getAttribute('data-suffix')) {
                counter.innerHTML = Math.round(this.targets()[0].innerHTML) + counter.getAttribute('data-suffix')!;
              } else if (counter.getAttribute('data-prefix')) {
                 // skip
              }
            }
          });
        }
      });
    });

    // Sample reveal blur
    if (sampleImgRef.current) {
      gsap.to(sampleImgRef.current, {
        filter: "blur(2px)",
        scrollTrigger: {
          trigger: sampleImgRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: true
        }
      });
    }
  }, []);

  if (isFormOpen) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#F9F6F1]" />}>
        <VisionWeaverForm onClose={() => setIsFormOpen(false)} />
      </Suspense>
    );
  }

  return (
    <div className="font-sans text-brand-charcoal bg-white antialiased overflow-hidden">
      {/* SECTION 1 — STICKY NAV */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-heading font-bold text-xl md:text-2xl text-brand-charcoal">Vision Weaver</div>
          <button onClick={() => setIsFormOpen(true)} className="bg-brand-gold text-brand-charcoal font-bold rounded px-6 py-3 transition hover:bg-brand-gold-light text-sm md:text-base">
            <span className="hidden md:inline">Get My Vision — $47</span>
            <span className="inline md:hidden">$47 — Start Now</span>
          </button>
        </div>
      </nav>

      {/* SECTION 2 — HERO */}
      <section className="relative w-full min-h-[90vh] md:min-h-screen flex items-center pt-20">
        <div 
          ref={heroBgRef}
          className="absolute inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80')] bg-cover bg-center"
          style={{ 
            backgroundPositionY: "0%",
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 100%), url('https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80')" 
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:items-start items-center text-center md:text-left">
          <motion.div 
            className="max-w-[680px]"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p variants={fadeUpVariant} className="text-brand-gold font-medium text-[13px] tracking-[0.12em] mb-4 uppercase">
              Vision Weaver — Powered by AI Design
            </motion.p>
            <motion.h1 variants={fadeUpVariant} className="font-heading font-extrabold text-[36px] md:text-[56px] text-white leading-[1.1] mb-6">
              See Your Dream Bathroom<br className="hidden md:block"/> Before You Spend a<br className="hidden md:block"/> Dollar on Renovation.
            </motion.h1>
            <motion.p variants={fadeUpVariant} className="text-[16px] md:text-[18px] text-white/85 max-w-[520px] mb-10 md:mb-12">
              Tell us about your current space, your style, and what you want. Our team creates a personalised video walkthrough of your transformed bathroom — ready in 48 hours.
            </motion.p>
            <motion.div variants={fadeUpVariant} className="flex flex-col md:items-start items-center w-full">
              <Button onClick={() => setIsFormOpen(true)} className="text-lg w-full md:w-auto px-12 py-[18px]">Get My Dream Vision — $47</Button>
              <p className="text-[13px] text-white/70 mt-4 text-center md:text-left">
                Secure payment via Stripe · Delivered within 48 hours · Australian-made service
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — SOCIAL PROOF BAR */}
      <section ref={numbersRef} className="bg-brand-charcoal py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 md:divide-x md:divide-white/10">
          <div className="flex flex-col items-center text-center md:px-12 w-full md:w-auto pb-6 md:pb-0 border-b border-white/10 md:border-b-0">
            <div className="font-heading font-bold text-[22px] text-brand-gold flex">
              <span className="stat-number" data-target="48">0</span>&nbsp;Hours
            </div>
            <div className="text-[13px] text-white font-normal mt-1">Average delivery time</div>
          </div>
          <div className="flex flex-col items-center text-center md:px-12 w-full md:w-auto pb-6 md:pb-0 border-b border-white/10 md:border-b-0">
            <div className="font-heading font-bold text-[22px] text-brand-gold flex">
              <span className="stat-number" data-target="100" data-suffix="%">0</span>
            </div>
            <div className="text-[13px] text-white font-normal mt-1">Built around your space</div>
          </div>
          <div className="flex flex-col items-center text-center md:px-12 w-full md:w-auto">
            <div className="font-heading font-bold text-[22px] text-brand-gold">Australian Made</div>
            <div className="text-[13px] text-white font-normal mt-1">Every vision handcrafted locally</div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW IT WORKS */}
      <section className="bg-brand-warm-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <p className="text-brand-gold font-medium text-[13px] tracking-[0.12em] mb-4 uppercase">The Process</p>
            <h2 className="font-heading font-extrabold text-[28px] md:text-[40px] text-brand-charcoal leading-[1.2]">
              Three Simple Steps to Your<br className="hidden md:block"/> Dream Room.
            </h2>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            {[
              {
                num: "01",
                icon: <PenTool className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />,
                title: "Tell Us About Your Space",
                body: "Fill out a short 5-minute form about your current bathroom — size, style, fixtures you love, and what you want to change. Upload a photo if you have one."
              },
              {
                num: "02",
                icon: <Play className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />,
                title: "We Create Your Vision",
                body: "Our team uses professional AI design tools to build a realistic video of your transformed space — tailored to your exact preferences, not a generic template."
              },
              {
                num: "03",
                icon: <Eye className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />,
                title: "Your Dream Room Revealed",
                body: "You'll receive an SMS and email the moment your vision is ready. Log in to your private portal to watch your dream bathroom come to life."
              }
            ].map((step, idx) => (
              <motion.div key={idx} variants={fadeUpVariant} className="relative flex flex-col items-center text-center">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-heading font-extrabold text-[72px] text-brand-gold opacity-10 pointer-events-none select-none">
                  {step.num}
                </div>
                <div className="relative z-10 mb-6 bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  {step.icon}
                </div>
                <h3 className="font-heading font-bold text-xl mb-4">{step.title}</h3>
                <p className="text-brand-charcoal-mid text-[15px] leading-relaxed max-w-sm">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — WHAT YOU GET */}
      <section className="bg-brand-cream py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-24 text-center md:text-left">
            <p className="text-brand-gold font-medium text-[13px] tracking-[0.12em] mb-4 uppercase">What's Included</p>
            <h2 className="font-heading font-extrabold text-[28px] md:text-[40px] text-brand-charcoal leading-[1.2] max-w-2xl">
              Everything You Need to<br className="hidden md:block"/> Plan Your Renovation Confidently.
            </h2>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            {/* Left Column */}
            <motion.div variants={fadeUpVariant} className="bg-white rounded p-8 md:p-12 border border-[#E0D9CE] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-center">
              <svg className="w-8 h-8 text-brand-gold mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <h3 className="font-heading font-bold text-[22px] mb-4">Your Personalised Vision Video</h3>
              <p className="text-brand-charcoal-mid text-[15px] leading-relaxed mb-8">
                A fully rendered, realistic video walkthrough of your transformed space — built around your actual bathroom dimensions, your preferred style, and your must-have features. This isn't AI guesswork. It's a genuine visualisation of what your renovation could look like.
              </p>
              <div className="self-start px-4 py-2 bg-brand-gold/10 text-brand-gold-dark text-[13px] font-semibold uppercase tracking-wider rounded-full">
                The main event
              </div>
            </motion.div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              {[
                {
                  icon: <FileText className="w-6 h-6 text-brand-gold flex-shrink-0" />,
                  title: "Kitchen & Bathroom Renovation Blueprint",
                  body: "The complete planning guide — what to budget, what to ask, what to avoid. Valued at $97. Yours free."
                },
                {
                  icon: <CheckSquare className="w-6 h-6 text-brand-gold flex-shrink-0" />,
                  title: "Pre-Renovation Checklist",
                  body: "Everything to prepare before work starts — so nothing gets missed and no money gets wasted."
                },
                {
                  icon: <Lock className="w-6 h-6 text-brand-gold flex-shrink-0" />,
                  title: "Exclusive Insider Offer",
                  body: "Vision Weaver clients receive a special offer inside their portal — access to vetted local renovation specialists and a founding-rate offer. Revealed only after your vision is delivered."
                }
              ].map((item, idx) => (
                <motion.div key={idx} variants={fadeUpVariant} className="bg-white rounded p-6 md:p-8 border border-[#E0D9CE] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex gap-5 items-start">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-heading font-bold text-[17px] mb-2">{item.title}</h4>
                    <p className="text-brand-charcoal-mid text-[14px] leading-relaxed">{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6 — SAMPLE REVEAL */}
      <section className="bg-brand-charcoal py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <p className="text-brand-gold font-medium text-[13px] tracking-[0.12em] mb-4 uppercase">Example Vision</p>
          <h2 className="font-heading font-extrabold text-[28px] md:text-[40px] text-white leading-[1.2]">
            This Is What Awaits You.
          </h2>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="relative rounded overflow-hidden aspect-[4/3] md:aspect-[16/9]">
            <img 
              ref={sampleImgRef}
              src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80" 
              alt="Sample Renovation Render" 
              className="w-full h-full object-cover"
              style={{ filter: "blur(8px)" }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-brand-charcoal/20">
              <div className="bg-brand-gold text-brand-charcoal font-semibold px-5 py-2.5 rounded-full text-sm flex items-center gap-2 shadow-lg">
                <Lock className="w-4 h-4" />
                Your vision will look something like this
              </div>
            </div>
          </div>
          <p className="text-white/60 text-[14px] italic text-center mt-4 mb-10">
            Actual client vision — blurred to protect privacy.
          </p>
          <div className="flex justify-center">
            <Button onClick={() => setIsFormOpen(true)}>Unlock My Vision — $47</Button>
          </div>
        </div>
      </section>

      {/* SECTION 7 — WHO THIS IS FOR */}
      <section className="bg-brand-warm-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-20 text-center">
            <p className="text-brand-gold font-medium text-[13px] tracking-[0.12em] mb-4 uppercase">Is This For You?</p>
            <h2 className="font-heading font-extrabold text-[26px] md:text-[38px] text-brand-charcoal leading-[1.2]">
              Perfect If You're...
            </h2>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {[
              {
                title: "Thinking about renovating in the next 6–12 months",
                body: "You want to see what's possible before committing to anything."
              },
              {
                title: "Frustrated by vague renovation quotes that don't match your vision",
                body: "A visual reference changes the entire conversation with your tradesperson."
              },
              {
                title: "Not sure where to start or what style suits your space",
                body: "We help you find your direction — without the expensive design consult."
              },
              {
                title: "Tired of scrolling Pinterest without a clear picture of YOUR bathroom",
                body: "This is personalised to your space. Not someone else's."
              }
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeLeftVariant} className="bg-brand-cream rounded p-8 flex items-start gap-4">
                <div className="bg-white p-1 rounded-full text-brand-gold mt-1 flex-shrink-0">
                  <Check className="w-5 h-5" strokeWidth={3} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-[17px] mb-2">{item.title}</h4>
                  <p className="text-brand-charcoal-mid text-[15px]">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 8 — FAQ */}
      <section className="bg-brand-cream py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-brand-gold font-medium text-[13px] tracking-[0.12em] mb-4 uppercase">Questions</p>
            <h2 className="font-heading font-extrabold text-[26px] md:text-[38px] text-brand-charcoal leading-[1.2]">
              Everything You're Wondering.
            </h2>
          </div>

          <div className="flex flex-col border-t border-[#E0D9CE]">
            {[
              {
                q: "What information do I need to provide?",
                a: "Basic details about your current space — approximate size, your style preferences, fixtures you love, and what you want to change. You can also upload a photo of your current bathroom. The whole form takes about 5 minutes."
              },
              {
                q: "How realistic is the visualisation?",
                a: "Very. We use professional-grade AI design tools to build a video that reflects your actual preferences, fixture choices, and style direction. It's not a generic render — it's built specifically around your bathroom."
              },
              {
                q: "How long does it take?",
                a: "You'll receive your dream vision within 24–48 hours of submitting your form. We'll notify you by both email and SMS the moment it's ready."
              },
              {
                q: "Is my $47 payment secure?",
                a: "Yes — payment is processed securely via Stripe. We never store your card details. Your $47 is fully protected."
              },
              {
                q: "What happens after I see my vision?",
                a: "You'll receive your video plus your free resources. Inside the portal, you'll also receive a special exclusive offer — no obligation, just an opportunity if you're ready to take the next step toward your renovation."
              },
              {
                q: "What if I want to change something in my vision?",
                a: "We offer one round of feedback included in your $47. Simply reply to your delivery email with your changes and we'll update it."
              }
            ].map((faq, idx) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <section className="bg-brand-charcoal py-[120px]">
        <motion.div 
          className="max-w-4xl mx-auto px-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.p variants={fadeUpVariant} className="text-brand-gold font-medium text-[13px] tracking-[0.12em] mb-6 uppercase">
            Ready to See It?
          </motion.p>
          <motion.h2 variants={fadeUpVariant} className="font-heading font-extrabold text-[32px] md:text-[48px] text-white leading-[1.1] mb-8">
            Your Dream Bathroom<br className="hidden md:block"/> Is Waiting to Be Revealed.
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="text-[17px] text-white/75 mb-10 max-w-2xl mx-auto">
            Join Australian homeowners who are planning their renovation with confidence — because they've already seen what's possible.<br className="hidden md:block"/> For $47, your vision will be ready in 48 hours.
          </motion.p>
          <motion.div variants={fadeUpVariant} className="flex flex-col items-center">
            <Button onClick={() => setIsFormOpen(true)} className="text-lg px-12 py-[18px]">Get My Dream Bathroom Vision — $47</Button>
            <p className="text-[13px] text-white/50 mt-4">
              Secure checkout · 48-hour delivery · Australian team
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 10 — FOOTER */}
      <footer className="bg-[#333333] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[13px] text-white/50">
            Vision Weaver by BookedoutBuilder
          </div>
          <div className="text-[12px] text-white/40 flex items-center gap-6">
            <a href="#" className="hover:text-white/70 transition">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition">Terms of Service</a>
          </div>
          <div className="text-[12px] text-white/40 text-center md:text-right">
            © 2026 BookedoutBuilder. All rights reserved.<br/> ABN XX XXX XXX XXX
          </div>
        </div>
      </footer>
    </div>
  );
}

const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#E0D9CE]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left min-h-[48px] focus:outline-none"
      >
        <span className="font-heading font-bold text-[17px] pr-8">{question}</span>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-brand-gold flex-shrink-0"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-brand-charcoal-mid text-[15px] leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
