import { Component, useEffect, useState, useRef, useCallback, lazy, Suspense } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  MapPin,
  Phone,
  Mail,
  Instagram,
  MessageCircle,
  Music,
  Sparkles,
  Crown,
  Users,
  Gift,
  Shield,
  Zap,
  ChevronDown,
  Quote,
} from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';
import portfolioWedding from '@/assets/portfolio-wedding.jpg';
import portfolioCorporate from '@/assets/portfolio-corporate.jpg';
import portfolioPrivate from '@/assets/portfolio-private.jpg';
import trustedBallin from '@/assets/trusted/ballin.png';
import trustedBettsFirm from '@/assets/trusted/betts-firm.png';
import trustedEminence from '@/assets/trusted/eminence.png';
import trustedMTI from '@/assets/trusted/mti.png';
import trustedTHOA from '@/assets/trusted/thoa.webp';
import trustedTourism from '@/assets/trusted/tourism.png';
import trustedWorldLink from '@/assets/trusted/world-link.png';

const Scene3D = lazy(() => import('./Scene3D'));
const GalaxyBackground = lazy(() => import('./GalaxyBackground'));

class Scene3DErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(_error: Error, _info: ErrorInfo) {}
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const logoUrl = '/brand/korbz-logo.png';
const whatsappLink = 'https://wa.me/23279000040';

const trustedCompanies = [
  { name: 'Ballin Freetown', logo: trustedBallin },
  { name: 'The Betts Firm Consult', logo: trustedBettsFirm },
  { name: 'Eminence Africa', logo: trustedEminence },
  { name: 'Ministry of Trade and Industry', logo: trustedMTI },
  { name: 'THOA', logo: trustedTHOA },
  { name: 'Ministry of Tourism & Cultural Affairs', logo: trustedTourism },
  { name: 'World-Link Communications', logo: trustedWorldLink },
];

const testimonials = [
  {
    quote: 'Working with Korbz Solution on the Paint n Party project was an absolute pleasure. She was incredibly hands-on throughout the entire process and went far above and beyond her scope of work to ensure the event was successful. From connecting us with reliable vendors to constantly offering support and solutions, she treated the project as though it were her own even in moments where she wasn’t obligated to step in.',
    name: 'CEO, Paint n Party SL',
    role: 'Brand Activation',
  },
  {
    quote: 'Korbz Solution brings such positive energy to every aspect of the event planning process, making even the busiest moments feel light, joyful, and manageable. What stands out most is her willingness to always find an alternative solution whenever challenges arise. Her dedication, professionalism, and genuine passion for creating great experiences gave me complete confidence in her abilities. She is truly amazing to work with, and after this experience, I would choose to work with her again anytime, any day. I highly recommend her to anyone looking for an event planner who is supportive, proactive, resourceful, and deeply committed to delivering excellence.',
    name: 'CEO, Bett Firm',
    role: 'Corporate Event',
  },
  {
    quote: 'Korbz, you were absolutely the best wedding planner anyone could ever ask for. You helped me throughout the planning process and I was so pleased with how everything turned out. Keep doing what you do and keep advancing your craft. I will definitely recommend you and thank you for all you did at my wedding ❤️',
    name: 'Abby',
    role: 'Wedding',
  },
  {
    quote: 'Korbz Solutions made our wedding absolutely magical. Every detail was perfect, and we could actually enjoy our special day!',
    name: 'Sarah & Michael',
    role: 'Elegant Wedding',
  },
  {
    quote: 'Professional, creative, and flawless execution. Our product launch exceeded all expectations thanks to their expertise.',
    name: 'James Davidson',
    role: 'Corporate Launch',
  },
  {
    quote: 'The emergency shopping service was incredible! They found everything we needed in record time for our last-minute gala.',
    name: 'Amanda Peters',
    role: 'Corporate Gala',
  },
  {
    quote: 'From concept to execution, Korbz Solutions transformed our vision into a stunning anniversary celebration we\'ll never forget.',
    name: 'Robert & Diana',
    role: 'Anniversary Party',
  },
  {
    quote: 'Their attention to detail is unmatched. Every vendor was coordinated perfectly for our charity fundraiser.',
    name: 'Emily Thompson',
    role: 'Charity Event',
  },
  {
    quote: 'Best decision we made was hiring Korbz for our birthday bash. Stress-free and absolutely spectacular!',
    name: 'Marcus Johnson',
    role: 'Birthday Celebration',
  },
  {
    quote: 'The team went above and beyond for our corporate retreat. Every team member was impressed with the organization.',
    name: 'Jennifer Walsh',
    role: 'Corporate Retreat',
  },
  {
    quote: 'Outstanding service from start to finish. Our product reveal event was the talk of the industry!',
    name: 'David Chen',
    role: 'Product Launch',
  },
];

const services = [
  {
    icon: Crown,
    title: 'Event Concept\nConsulting',
    description: 'Transform your ideas into stunning, cohesive event experiences with our creative expertise.',
    accent: 'coral' as const,
  },
  {
    icon: Users,
    title: 'Full-Service\nCoordination',
    description: 'Complete end-to-end management from initial planning to flawless day-of execution.',
    accent: 'gold' as const,
  },
  {
    icon: Gift,
    title: 'Emergency &\nPersonal Shopping',
    description: 'Last-minute needs and personal touches handled with precision and care.',
    accent: 'coral' as const,
  },
];

const steps = [
  { number: '01', title: 'Book a Free\nConsultation', description: 'Connect with our team to discuss your vision, timeline, and requirements.' },
  { number: '02', title: 'Share Your\nVision', description: 'Collaborate on concepts or select from our curated event packages.' },
  { number: '03', title: 'Relax — We\nHandle It All', description: 'Sit back and enjoy while we bring your perfect event to life.' },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'surface-glass py-3'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        <img
          src={logoUrl}
          alt="Korbz Solutions"
          className="h-14 sm:h-20 lg:h-24 w-auto cursor-pointer flex-shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {['services', 'portfolio', 'about', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="font-display text-xs tracking-[0.12em] uppercase text-[hsl(var(--color-fg-muted))] hover:text-[hsl(var(--color-cream))] transition-colors duration-300 cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary !py-2 !px-4 sm:!py-2.5 sm:!px-5 !text-[0.7rem] sm:!text-xs flex-shrink-0"
        >
          Let's Talk
          <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </a>
      </div>
    </nav>
  );
}

function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          transform: `translateY(${scrollY * 0.25}px) scale(1.1)`,
        }}
      />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, hsl(20 14% 7% / 0.85), hsl(20 14% 7% / 0.78) 35%, hsl(20 14% 7% / 0.9) 70%, hsl(20 14% 7%))'
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, hsl(20 14% 7% / 0.4) 60%, hsl(20 14% 7% / 0.7) 100%)'
      }} />

      <Scene3DErrorBoundary>
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </Scene3DErrorBoundary>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto pt-24 sm:pt-20 pb-16">
        <div className="mb-5 sm:mb-6">
          <span className="section-label justify-center" style={{ marginBottom: '1rem' }}>
            Premium Event Curation
          </span>
        </div>

        <h1
          className="text-[clamp(2rem,9vw,6.5rem)] leading-[1] sm:leading-[0.95] font-extrabold tracking-[-0.035em] sm:tracking-[-0.04em] mb-5 sm:mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="block text-[hsl(var(--color-cream))]">Your Vision,</span>
          <span className="block mt-1">
            <span className="font-accent italic font-normal text-[hsl(var(--color-coral))]" style={{ fontFamily: 'var(--font-accent)' }}>
              Flawlessly
            </span>{' '}
            <span className="text-[hsl(var(--color-cream))]">Executed</span>
          </span>
        </h1>

        <p className="text-sm sm:text-base lg:text-lg text-[hsl(var(--color-fg-muted))] max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light px-2">
          We curate events that impress — from product launches to private celebrations,
          Korbz Solutions handles every detail so you don't have to.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !text-sm sm:!text-base !px-6 sm:!px-8 !py-3.5 sm:!py-4 justify-center"
          >
            Book Free Consultation
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline !text-sm sm:!text-base !px-6 sm:!px-8 !py-3.5 sm:!py-4 justify-center"
          >
            View Our Work
          </button>
        </div>
      </div>

      <button
        onClick={() => document.getElementById('trusted')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[hsl(var(--color-fg-subtle))] hover:text-[hsl(var(--color-coral))] transition-colors duration-300 cursor-pointer"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </button>
    </section>
  );
}

function TrustedSection() {
  const { ref, isVisible } = useInView(0.3);
  const doubled = [...trustedCompanies, ...trustedCompanies];

  return (
    <section id="trusted" className="py-10 sm:py-14 border-y border-[hsl(var(--color-border))]" ref={ref}>
      <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
        <p className="font-display text-[0.6rem] sm:text-[0.65rem] text-center tracking-[0.2em] uppercase text-[hsl(var(--color-fg-subtle))] mb-6 sm:mb-8 px-4">
          Trusted By Leading Organizations
        </p>
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {doubled.map((company, i) => (
              <div key={i} className="flex items-center justify-center flex-shrink-0 px-5 sm:px-10">
                <img
                  src={company.logo}
                  alt={company.name}
                  className={`w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 ${
                    company.name === 'Eminence Africa'
                      ? 'h-14 sm:h-20 lg:h-24 max-w-[180px] sm:max-w-[240px]'
                      : 'h-10 sm:h-14 lg:h-16 max-w-[130px] sm:max-w-[180px]'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function USPSection() {
  const { ref, isVisible } = useInView();
  const usps = [
    { icon: Shield, label: 'Stress-Free Planning', desc: 'Complete peace of mind with comprehensive event management' },
    { icon: Sparkles, label: 'Tailored Concepts', desc: 'Unique designs crafted specifically for your vision and style' },
    { icon: Zap, label: 'Emergency Concierge', desc: '24/7 assistance to handle any last-minute changes or needs' },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-28" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {usps.map((usp, i) => (
            <div
              key={usp.label}
              className={`surface-card p-6 sm:p-7 lg:p-8 group fade-up ${isVisible ? 'visible' : ''} stagger-${i + 1}`}
            >
              <usp.icon className="w-8 h-8 mb-5 text-[hsl(var(--color-coral))] group-hover:text-[hsl(var(--color-gold))] transition-colors duration-300" />
              <h3 className="font-display text-base font-semibold mb-2 text-[hsl(var(--color-cream))]">{usp.label}</h3>
              <p className="text-sm text-[hsl(var(--color-fg-muted))] leading-relaxed">{usp.desc}</p>
            </div>
          ))}
        </div>

        <div className={`mt-12 sm:mt-16 lg:mt-20 max-w-3xl mx-auto text-center fade-up ${isVisible ? 'visible' : ''} stagger-4`}>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-[-0.03em] mb-5 sm:mb-6">
            Tired of Event Planning{' '}
            <span className="font-accent italic font-normal text-[hsl(var(--color-coral))]" style={{ fontFamily: 'var(--font-accent)' }}>
              Stress?
            </span>
          </h2>
          <p className="text-[hsl(var(--color-fg-muted))] text-sm sm:text-base lg:text-lg leading-relaxed mb-4">
            From vendor coordination nightmares to timeline management chaos, event planning
            can quickly become overwhelming. What should be a celebration becomes a source of anxiety.
          </p>
          <div className="divider-line my-6 sm:my-8" />
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[hsl(var(--color-cream))]">
            <span className="text-gradient-coral font-semibold">Korbz Solutions</span> transforms your vision into reality
            while you focus on what matters most — enjoying your special moment.
          </p>
          <div className="mt-6 sm:mt-8">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-primary !text-xs sm:!text-sm">
              Let's Plan Something Memorable
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { ref, isVisible } = useInView();

  return (
    <section id="services" className="py-14 sm:py-20 lg:py-28 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--color-bg-elevated)/0.5)] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-14 fade-up ${isVisible ? 'visible' : ''}`}>
          <span className="section-label">What We Do</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-tight">
            Our <span className="text-gradient-coral">Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`surface-card p-6 sm:p-8 lg:p-10 group cursor-pointer fade-up ${isVisible ? 'visible' : ''} stagger-${i + 1}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                service.accent === 'coral'
                  ? 'bg-[hsl(var(--color-coral)/0.12)]'
                  : 'bg-[hsl(var(--color-gold)/0.12)]'
              } group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className={`w-6 h-6 ${
                  service.accent === 'coral'
                    ? 'text-[hsl(var(--color-coral))]'
                    : 'text-[hsl(var(--color-gold))]'
                }`} />
              </div>
              <h3
                className="font-display text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[hsl(var(--color-cream))] leading-tight"
              >
                {service.title.replace('\n', ' ')}
              </h3>
              <p className="text-[hsl(var(--color-fg-muted))] text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const { ref, isVisible } = useInView();

  const works = [
    { img: portfolioWedding, title: 'Romantic Garden Wedding', tag: 'Weddings', span: 'md:col-span-2' },
    { img: portfolioCorporate, title: 'Tech Product Launch', tag: 'Corporate', span: '' },
    { img: portfolioPrivate, title: 'Intimate Anniversary', tag: 'Private', span: '' },
  ];

  return (
    <section id="portfolio" className="py-14 sm:py-20 lg:py-28" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-14 fade-up ${isVisible ? 'visible' : ''}`}>
          <span className="section-label">Selected Work</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-tight">
            Our <span className="text-gradient-gold">Portfolio</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {works.map((work, i) => (
            <div
              key={work.title}
              className={`img-treatment aspect-[4/3] ${work.span} group cursor-pointer fade-up ${isVisible ? 'visible' : ''} stagger-${i + 1}`}
            >
              <img
                src={work.img}
                alt={work.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-8">
                <span className="font-display text-[0.65rem] tracking-[0.15em] uppercase text-[hsl(var(--color-coral))] mb-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {work.tag}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-[hsl(var(--color-cream))] opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400">
                  {work.title}
                </h3>
              </div>
              <div className="absolute inset-0 border border-transparent group-hover:border-[hsl(var(--color-coral)/0.3)] rounded-[var(--radius)] transition-all duration-500 z-20 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { ref, isVisible } = useInView();
  const [hovered, setHovered] = useState(false);
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-14 sm:py-20 lg:py-28 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--color-bg-elevated)/0.5)] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-14 fade-up ${isVisible ? 'visible' : ''}`}>
          <span className="section-label">Client Love</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-tight">
            What They <span className="font-accent italic font-normal" style={{ fontFamily: 'var(--font-accent)', color: 'hsl(var(--color-gold))' }}>Say</span>
          </h2>
        </div>

        <div
          className={`relative h-[380px] sm:h-[480px] lg:h-[520px] overflow-hidden rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-bg-elevated)/0.5)] fade-up ${isVisible ? 'visible' : ''} stagger-2`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[hsl(var(--color-bg))] to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[hsl(var(--color-bg))] to-transparent z-10 pointer-events-none" />

          <div className={`testimonial-scroll-container ${hovered ? 'paused' : ''}`}>
            {doubled.map((t, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 lg:p-8 mx-3 sm:mx-5 my-3 rounded-xl border border-[hsl(var(--color-border))] hover:border-[hsl(var(--color-border-hover))] bg-[hsl(var(--color-bg-elevated)/0.8)] transition-all duration-300"
              >
                <Quote className="w-5 h-5 text-[hsl(var(--color-coral)/0.4)] mb-3" />
                <p className="text-sm sm:text-base leading-relaxed text-[hsl(var(--color-cream)/0.9)] mb-5">
                  {t.quote}
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 text-[hsl(var(--color-gold))] fill-current" />
                    ))}
                  </div>
                  <div className="w-px h-4 bg-[hsl(var(--color-border))] hidden sm:block" />
                  <div className="min-w-0">
                    <span className="text-xs font-display font-semibold text-[hsl(var(--color-cream))]">{t.name}</span>
                    <span className="text-xs text-[hsl(var(--color-fg-subtle))] ml-2">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MethodSection() {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-14 sm:py-20 lg:py-28" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 fade-up ${isVisible ? 'visible' : ''}`}>
          <span className="section-label justify-center">How It Works</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-tight">
            The <span className="text-gradient-coral">Korbz Method</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`surface-card p-6 sm:p-8 lg:p-10 text-center group fade-up ${isVisible ? 'visible' : ''} stagger-${i + 1}`}
            >
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gradient-coral opacity-30 group-hover:opacity-60 transition-opacity duration-500 block mb-3 sm:mb-4">
                {step.number}
              </span>
              <h3 className="font-display text-base sm:text-lg font-semibold text-[hsl(var(--color-cream))] mb-2 sm:mb-3 leading-tight">
                {step.title.replace('\n', ' ')}
              </h3>
              <p className="text-sm text-[hsl(var(--color-fg-muted))] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CuratorSection() {
  const { ref, isVisible } = useInView();

  return (
    <section id="about" className="py-14 sm:py-20 lg:py-28 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--color-bg-elevated)/0.3)] to-transparent" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 fade-up ${isVisible ? 'visible' : ''}`}>
          <div className="w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-2 border-[hsl(var(--color-coral)/0.3)] flex-shrink-0 relative bg-gradient-to-br from-[hsl(var(--color-coral)/0.15)] to-[hsl(var(--color-gold)/0.15)]">
            <img
              src="/corbola-abigail-king.png"
              alt="Corbola Abigail King"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[hsl(var(--color-bg)/0.3)] to-transparent pointer-events-none" />
          </div>

          <div className="text-center md:text-left min-w-0">
            <span className="section-label md:justify-start">Meet The Curator</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-[hsl(var(--color-cream))] mb-2 leading-tight">
              Corbola Abigail King
            </h2>
            <p className="font-accent italic text-base sm:text-lg text-[hsl(var(--color-gold))]" style={{ fontFamily: 'var(--font-accent)' }}>
              Founder & Lead Event Curator
            </p>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[hsl(var(--color-fg-muted))] leading-relaxed max-w-lg">
              With an eye for detail and a passion for creating unforgettable moments,
              Corbola brings a unique blend of creativity, precision, and warmth to every event
              she curates. From intimate gatherings to grand celebrations, her vision transforms
              ordinary spaces into extraordinary experiences.
            </p>
            <div className="mt-6 flex gap-3 justify-center md:justify-start">
              <a
                href="https://www.instagram.com/korbz_solutions?igsh=MThvbDQ1YnEyZnV1dw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[hsl(var(--color-border))] flex items-center justify-center text-[hsl(var(--color-fg-muted))] hover:border-[hsl(var(--color-coral)/0.5)] hover:text-[hsl(var(--color-coral))] transition-all duration-300 cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[hsl(var(--color-border))] flex items-center justify-center text-[hsl(var(--color-fg-muted))] hover:border-[hsl(var(--color-gold)/0.5)] hover:text-[hsl(var(--color-gold))] transition-all duration-300 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { ref, isVisible } = useInView();

  return (
    <section id="contact" className="py-14 sm:py-20 lg:py-28 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--color-bg-elevated)/0.5)] to-transparent" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`surface-card p-6 sm:p-10 lg:p-14 text-center fade-up ${isVisible ? 'visible' : ''}`}>
          <span className="section-label justify-center">Get In Touch</span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-6 sm:mb-8 leading-tight">
            Ready to Create Something{' '}
            <span className="font-accent italic font-normal text-[hsl(var(--color-coral))]" style={{ fontFamily: 'var(--font-accent)' }}>
              Extraordinary?
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-8 sm:mb-10">
            {[
              { icon: MapPin, label: 'Address', value: '18J Hennenson Street, New England', color: 'coral' },
              { icon: Phone, label: 'Phone', value: '+232 79 000040', color: 'gold' },
              { icon: Mail, label: 'Email', value: 'Kingcorbola@gmail.com', color: 'coral' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 text-left">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  item.color === 'coral'
                    ? 'bg-[hsl(var(--color-coral)/0.1)] text-[hsl(var(--color-coral))]'
                    : 'bg-[hsl(var(--color-gold)/0.1)] text-[hsl(var(--color-gold))]'
                }`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-xs font-semibold tracking-wider uppercase text-[hsl(var(--color-fg-subtle))] mb-0.5">{item.label}</p>
                  <p className="text-sm text-[hsl(var(--color-cream))] break-words">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !text-sm sm:!text-base lg:!text-lg !px-6 sm:!px-10 !py-3.5 sm:!py-4 w-full sm:w-auto justify-center"
          >
            Start Your Consultation
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-[hsl(var(--color-border))] relative bg-[hsl(20,14%,7%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <img src={logoUrl} alt="Korbz Solutions" className="h-16 sm:h-20 w-auto mb-3 mx-auto md:mx-0" />
            <p className="text-sm text-[hsl(var(--color-fg-subtle))]">
              Creating unforgettable experiences, one event at a time.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-3">
              {[
                { href: 'https://www.instagram.com/korbz_solutions?igsh=MThvbDQ1YnEyZnV1dw==', icon: Instagram },
                { href: whatsappLink, icon: MessageCircle },
                { href: 'https://www.tiktok.com/@korbzsolutions?_t=ZM-8y6L4EMzOQY&_r=1', icon: Music },
              ].map(({ href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[hsl(var(--color-border))] flex items-center justify-center text-[hsl(var(--color-fg-muted))] hover:border-[hsl(var(--color-coral)/0.5)] hover:text-[hsl(var(--color-coral))] transition-all duration-300 cursor-pointer"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-xs text-[hsl(var(--color-fg-subtle))]">
              &copy; 2026 Korbz Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function GalaxySection({ children }: { children: ReactNode }) {
  return (
    <div className="galaxy-section">
      <div className="galaxy-bg-wrap" aria-hidden="true">
        <div className="galaxy-inner">
          <div className="galaxy-stars" />
          <div className="galaxy-stars-bright" />
          <Scene3DErrorBoundary>
            <Suspense fallback={null}>
              <GalaxyBackground />
            </Suspense>
          </Scene3DErrorBoundary>
        </div>
      </div>
      <div className="galaxy-content">{children}</div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen relative">
      <div className="grain-overlay" />

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/25 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/35 transition-all duration-300 cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>

      <NavBar />
      <HeroSection />
      <GalaxySection>
        <TrustedSection />
        <USPSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <MethodSection />
        <CuratorSection />
        <ContactSection />
      </GalaxySection>
      <Footer />
    </div>
  );
}
