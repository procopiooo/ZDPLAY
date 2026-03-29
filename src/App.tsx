/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Instagram, MessageCircle, ChevronDown, MonitorPlay, Zap, ShieldCheck, Tv, Clapperboard, Sparkles, Library, Menu, X } from "lucide-react";
import { useRef, ReactNode, useState, useEffect } from "react";
import { PLANS, CONTACTS } from "./constants";

const Section = ({ children, id, className = "" }: { children: ReactNode; id: string; className?: string }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-16 sm:py-24 shadow-[inset_0_0_150px_rgba(0,0,0,0.3)] ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  // Anti-inspection protection
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const topics = [
    { icon: <Tv size={32} />, label: "Canais" },
    { icon: <Clapperboard size={32} />, label: "Filmes" },
    { icon: <Sparkles size={32} />, label: "Doramas" },
    { icon: <Library size={32} />, label: "Séries" },
  ];

  const navLinks = [
    { id: 'quem-somos', label: 'Quem Somos' },
    { id: 'planos', label: 'Planos' },
    { id: 'contatos', label: 'Contatos' },
  ];

  return (
    <div ref={containerRef} className="relative bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] flex justify-center items-center px-6 sm:px-10 py-2 sm:py-4 backdrop-blur-md bg-black/50 border-b border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
        {/* Logo - Absolute left on desktop, centered on mobile */}
        <div className="md:absolute md:left-10 flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/logozdr.png" alt="ZDR PLAY" className="h-24 sm:h-28 w-auto" referrerPolicy="no-referrer" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-12 text-xs font-bold uppercase tracking-[0.2em]">
          {navLinks.map(link => (
            <button key={link.id} onClick={() => scrollTo(link.id)} className="hover:text-white/60 transition-colors">
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden absolute right-6 text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-black flex flex-col items-center justify-center gap-10 md:hidden"
          >
            <div className="absolute top-10 flex items-center">
              <img src="/logozdr.png" alt="ZDR PLAY" className="h-28 w-auto" referrerPolicy="no-referrer" />
            </div>
            {navLinks.map(link => (
              <button 
                key={link.id} 
                onClick={() => scrollTo(link.id)} 
                className="text-2xl font-display font-bold uppercase tracking-widest hover:text-white/60 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        <motion.div 
          style={{ opacity, scale }}
          className="z-10 flex flex-col items-center w-full"
        >
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-7xl sm:text-9xl md:text-[10rem] mb-4"
          >
            <span className="jaro-regular text-white">ZDR</span> <span className="jaro-regular text-white/90">Play</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-2xl text-white max-w-2xl font-aesthetic font-normal italic tracking-wide"
          >
            Qualidade que você vê. Confiança que você sente.
          </motion.p>
        </motion.div>

        {/* Background Grid/Effect */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
          <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 cursor-pointer"
          onClick={() => scrollTo('features')}
        >
          <ChevronDown size={32} className="text-white/40" />
        </motion.div>
      </section>

      {/* Quem Somos */}
      <Section id="quem-somos" className="bg-white text-black">
        <div className="max-w-4xl w-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-black/10" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50 whitespace-nowrap">Nossa História</span>
            <div className="h-px flex-1 bg-black/10" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold mb-8 sm:mb-12 tracking-tighter uppercase">
            <span className="font-zdr">ZDR</span> <span className="font-play text-black/60">PLAY</span> — <span className="italic font-normal font-aesthetic normal-case">Fundada em 2026</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 text-base sm:text-lg leading-relaxed font-normal">
            <p>
              A <span className="font-zdr">ZDR</span> <span className="font-play">PLAY</span> nasceu em 2026 com um propósito claro: elevar o padrão de qualidade no mundo do streaming. 
              Mesmo sendo uma empresa recente, já chega ao mercado com uma visão sólida e foco total em desempenho, 
              estabilidade e experiência do usuário.
            </p>
            <p>
              Em um cenário onde muitos serviços falham, a <span className="font-zdr">ZDR</span> <span className="font-play">PLAY</span> foi criada para fazer diferente desde o primeiro dia. 
              Nosso compromisso é simples: entregar transmissões fluidas, com alta qualidade de imagem e um serviço confiável.
            </p>
          </div>
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 sm:p-8 border border-black/5 rounded-2xl bg-black/5 flex flex-col gap-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]">
              <MonitorPlay size={28} className="drop-shadow-sm" />
              <h3 className="font-display font-bold text-lg sm:text-xl uppercase tracking-tighter">Transmissão Fluida</h3>
              <p className="text-xs sm:text-sm opacity-60">Sem complicações, sem travamentos e sem promessas vazias.</p>
            </div>
            <div className="p-6 sm:p-8 border border-black/5 rounded-2xl bg-black/5 flex flex-col gap-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]">
              <Zap size={28} className="drop-shadow-sm" />
              <h3 className="font-display font-bold text-lg sm:text-xl uppercase tracking-tighter">Alta Performance</h3>
              <p className="text-xs sm:text-sm opacity-60">Foco total em desempenho e estabilidade para sua diversão.</p>
            </div>
            <div className="p-6 sm:p-8 border border-black/5 rounded-2xl bg-black/5 flex flex-col gap-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]">
              <ShieldCheck size={28} className="drop-shadow-sm" />
              <h3 className="font-display font-bold text-lg sm:text-xl uppercase tracking-tighter">Serviço Confiável</h3>
              <p className="text-xs sm:text-sm opacity-60">Qualidade não é um diferencial, é obrigação para nós.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Topics / Features Section */}
      <Section id="features" className="bg-black text-white">
        <div className="max-w-6xl w-full">
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50 whitespace-nowrap">O que oferecemos</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold mb-16 tracking-tighter uppercase text-center">CONTEÚDO COMPLETO</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {topics.map((topic, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.3)", backgroundColor: "rgba(255,255,255,0.08)" }}
                className="p-10 sm:p-14 border border-white/10 rounded-3xl bg-white/5 flex flex-col items-center justify-center text-center gap-6 transition-all duration-300 shadow-[inset_0_0_40px_rgba(255,255,255,0.05)]"
              >
                <div className="hidden sm:block text-white/80">
                  {topic.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-widest">
                  {topic.label}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Planos */}
      <Section id="planos" className="bg-black text-white">
        <div className="max-w-5xl w-full">
          <div className="flex items-center gap-4 mb-12 sm:mb-16">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50 whitespace-nowrap">Nossos Planos</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold mb-12 sm:mb-16 tracking-tighter uppercase text-center">Escolha seu Plano</h2>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {PLANS.map((plan) => (
              <motion.div 
                key={plan.id}
                whileHover={{ y: -10 }}
                className={`group relative p-8 sm:p-12 border border-white/10 rounded-3xl overflow-hidden transition-all ${
                  plan.isFeatured ? 'bg-white text-black' : 'bg-white/5 hover:border-white/30'
                }`}
              >
                {plan.badge && (
                  <div className={`absolute top-4 right-6 sm:right-8 px-3 sm:px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    plan.isFeatured ? 'bg-black text-white' : 'bg-white text-black'
                  }`}>
                    {plan.badge}
                  </div>
                )}
                
                {!plan.isFeatured && (
                  <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <MonitorPlay size={100} />
                  </div>
                )}

                <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-widest mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6 sm:mb-8">
                  <span className="text-xs sm:text-sm opacity-50">R$</span>
                  <span className="text-5xl sm:text-6xl font-display font-bold tracking-tighter">{plan.price}</span>
                  <span className="text-xs sm:text-sm opacity-50">{plan.period}</span>
                </div>
                <ul className={`space-y-3 sm:space-y-4 mb-8 sm:mb-12 text-sm sm:text-base ${
                  plan.isFeatured ? 'text-black/60' : 'text-white/60'
                }`}>
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className={`w-1 h-1 rounded-full ${plan.isFeatured ? 'bg-black' : 'bg-white'}`} /> 
                      {feature}
                    </li>
                  ))}
                </ul>
                <a 
                  href={plan.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-4 text-center font-bold uppercase tracking-widest rounded-xl transition-colors text-xs sm:text-sm ${
                    plan.isFeatured ? 'bg-black text-white hover:bg-black/90' : 'bg-white text-black hover:bg-white/90'
                  }`}
                >
                  {plan.buttonText}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contatos */}
      <Section id="contatos" className="bg-white text-black">
        <div className="max-w-4xl w-full text-center">
          <div className="flex items-center justify-center gap-4 mb-12 sm:mb-16">
            <div className="h-px flex-1 bg-black/10" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50 whitespace-nowrap">Contatos</span>
            <div className="h-px flex-1 bg-black/10" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-7xl titan-one mb-6 sm:mb-8 tracking-tighter uppercase">VAMOS CONECTAR?</h2>
          <p className="text-lg sm:text-xl text-black/60 mb-12 sm:mb-16 font-normal px-4">Estamos prontos para oferecer a melhor experiência de streaming para você.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 px-4">
            <a 
              href={CONTACTS.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-6 px-8 sm:px-12 py-5 sm:py-6 border border-black rounded-2xl hover:bg-black hover:text-white transition-all group"
            >
              <MessageCircle size={24} />
              <span className="text-base sm:text-lg font-display font-bold uppercase tracking-[0.2em]">WhatsApp</span>
            </a>
            
            <a 
              href={CONTACTS.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-6 px-8 sm:px-12 py-5 sm:py-6 border border-black rounded-2xl hover:bg-black hover:text-white transition-all group"
            >
              <Instagram size={24} />
              <span className="text-base sm:text-lg font-display font-bold uppercase tracking-[0.2em]">Instagram</span>
            </a>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-16 sm:py-20 px-6 sm:px-8 border-t border-white/10 text-center bg-black text-white/40 text-[10px] sm:text-xs uppercase tracking-[0.2em] shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
        <p>&copy; 2026 <span className="font-zdr text-white/60">ZDR</span> <span className="font-play text-white/40">PLAY</span>. Todos os direitos reservados.</p>
        <p className="mt-6 text-sm sm:text-base font-aesthetic font-normal italic normal-case tracking-normal text-white/80">
          Qualidade que você vê. Confiança que você sente.
        </p>
      </footer>
    </div>
  );
}
