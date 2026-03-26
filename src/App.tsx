/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { Instagram, MessageCircle, ChevronDown, MonitorPlay, Zap, ShieldCheck, Tv, Clapperboard, Sparkles, Library } from "lucide-react";
import { useRef, ReactNode } from "react";

const Section = ({ children, id, className = "" }: { children: ReactNode; id: string; className?: string }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-screen flex flex-col justify-center items-center px-6 py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const topics = [
    { icon: <Tv size={20} />, label: "Canais" },
    { icon: <Clapperboard size={20} />, label: "Filmes" },
    { icon: <Sparkles size={20} />, label: "Doramas" },
    { icon: <Library size={20} />, label: "Séries HD/4k" },
  ];

  return (
    <div ref={containerRef} className="relative bg-black text-white selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 backdrop-blur-md bg-black/50 border-b border-white/10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/logozdr.png" alt="ZDR PLAY" className="h-10 w-auto" referrerPolicy="no-referrer" />
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest">
          <button onClick={() => scrollTo('quem-somos')} className="hover:text-white/60 transition-colors">Quem Somos</button>
          <button onClick={() => scrollTo('planos')} className="hover:text-white/60 transition-colors">Planos</button>
          <button onClick={() => scrollTo('contatos')} className="hover:text-white/60 transition-colors">Contatos</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <motion.div 
          style={{ opacity, scale }}
          className="z-10 flex flex-col items-center"
        >
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src="/logozdr.png" 
            alt="ZDR PLAY Logo" 
            className="w-64 md:w-[500px] mb-12 drop-shadow-[0_0_50px_rgba(255,255,255,0.15)]"
            referrerPolicy="no-referrer"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6 md:gap-12"
          >
            {topics.map((topic, index) => (
              <div key={index} className="flex items-center gap-3 group">
                <div className="text-white/40 group-hover:text-white transition-colors duration-300">
                  {topic.icon}
                </div>
                <span className="text-sm md:text-base font-display font-bold uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors duration-300">
                  {topic.label}
                </span>
              </div>
            ))}
          </motion.div>
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
          onClick={() => scrollTo('quem-somos')}
        >
          <ChevronDown size={32} className="text-white/40" />
        </motion.div>
      </section>

      {/* Quem Somos */}
      <Section id="quem-somos" className="bg-white text-black">
        <div className="max-w-4xl w-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-black/10" />
            <span className="text-sm font-bold tracking-[0.3em] uppercase opacity-50">01 / Quem Somos</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-12 leading-tight">
            ZDR PLAY — <span className="italic font-light">Fundada em 2026</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 text-lg leading-relaxed font-light">
            <p>
              A ZDR PLAY nasceu em 2026 com um propósito claro: elevar o padrão de qualidade no mundo do streaming. 
              Mesmo sendo uma empresa recente, já chega ao mercado com uma visão sólida e foco total em desempenho, 
              estabilidade e experiência do usuário.
            </p>
            <p>
              Em um cenário onde muitos serviços falham, a ZDR PLAY foi criada para fazer diferente desde o primeiro dia. 
              Nosso compromisso é simples: entregar transmissões fluidas, com alta qualidade de imagem e um serviço confiável.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-black/5 rounded-2xl bg-black/5 flex flex-col gap-4">
              <MonitorPlay size={32} />
              <h3 className="font-display font-bold text-xl uppercase tracking-tighter">Transmissão Fluida</h3>
              <p className="text-sm opacity-60">Sem complicações, sem travamentos e sem promessas vazias.</p>
            </div>
            <div className="p-8 border border-black/5 rounded-2xl bg-black/5 flex flex-col gap-4">
              <Zap size={32} />
              <h3 className="font-display font-bold text-xl uppercase tracking-tighter">Alta Performance</h3>
              <p className="text-sm opacity-60">Foco total em desempenho e estabilidade para sua diversão.</p>
            </div>
            <div className="p-8 border border-black/5 rounded-2xl bg-black/5 flex flex-col gap-4">
              <ShieldCheck size={32} />
              <h3 className="font-display font-bold text-xl uppercase tracking-tighter">Serviço Confiável</h3>
              <p className="text-sm opacity-60">Qualidade não é um diferencial, é obrigação para nós.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Planos */}
      <Section id="planos" className="bg-black text-white">
        <div className="max-w-5xl w-full">
          <div className="flex items-center gap-4 mb-16">
            <span className="text-sm font-bold tracking-[0.3em] uppercase opacity-50 whitespace-nowrap">02 / Nossos Planos</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Plano Mensal */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative p-12 border border-white/10 rounded-3xl bg-white/5 overflow-hidden transition-all hover:border-white/30"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <MonitorPlay size={120} />
              </div>
              <h3 className="text-2xl font-display font-bold uppercase tracking-widest mb-2">Mensal</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-sm opacity-50">R$</span>
                <span className="text-6xl font-display font-bold tracking-tighter">29,99</span>
                <span className="text-sm opacity-50">/mês</span>
              </div>
              <ul className="space-y-4 mb-12 text-white/60">
                <li className="flex items-center gap-3"><div className="w-1 h-1 bg-white rounded-full" /> Acesso Completo</li>
                <li className="flex items-center gap-3"><div className="w-1 h-1 bg-white rounded-full" /> Qualidade Ultra HD</li>
                <li className="flex items-center gap-3"><div className="w-1 h-1 bg-white rounded-full" /> Suporte 24/7</li>
              </ul>
              <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-white/90 transition-colors">
                Assinar Agora
              </button>
            </motion.div>

            {/* Plano Anual */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative p-12 border border-white/10 rounded-3xl bg-white text-black overflow-hidden transition-all"
            >
              <div className="absolute top-4 right-8 bg-black text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Melhor Valor
              </div>
              <h3 className="text-2xl font-display font-bold uppercase tracking-widest mb-2">Anual</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-sm opacity-50">R$</span>
                <span className="text-6xl font-display font-bold tracking-tighter">300</span>
                <span className="text-sm opacity-50">/ano</span>
              </div>
              <ul className="space-y-4 mb-12 text-black/60">
                <li className="flex items-center gap-3"><div className="w-1 h-1 bg-black rounded-full" /> Acesso Completo</li>
                <li className="flex items-center gap-3"><div className="w-1 h-1 bg-black rounded-full" /> Economia de 2 meses</li>
                <li className="flex items-center gap-3"><div className="w-1 h-1 bg-black rounded-full" /> Qualidade Ultra HD</li>
                <li className="flex items-center gap-3"><div className="w-1 h-1 bg-black rounded-full" /> Suporte Prioritário</li>
              </ul>
              <button className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest rounded-xl hover:bg-black/90 transition-colors">
                Assinar Agora
              </button>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Contatos */}
      <Section id="contatos" className="bg-white text-black">
        <div className="max-w-4xl w-full text-center">
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="h-px w-12 bg-black/10" />
            <span className="text-sm font-bold tracking-[0.3em] uppercase opacity-50">03 / Contatos</span>
            <div className="h-px w-12 bg-black/10" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter">VAMOS CONECTAR?</h2>
          <p className="text-xl text-black/60 mb-16 font-light">Estamos prontos para oferecer a melhor experiência de streaming para você.</p>
          
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <a 
              href="https://wa.me/5544988048355" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-4 px-10 py-6 border border-black rounded-2xl hover:bg-black hover:text-white transition-all group"
            >
              <MessageCircle size={24} />
              <div className="text-left">
                <p className="text-xs uppercase font-bold opacity-50">WhatsApp</p>
                <p className="text-lg font-display font-bold">+55 44 98804-8355</p>
              </div>
            </a>
            
            <a 
              href="https://www.instagram.com/zdrplay/?utm_source=ig_web_button_share_sheet" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-4 px-10 py-6 border border-black rounded-2xl hover:bg-black hover:text-white transition-all group"
            >
              <Instagram size={24} />
              <div className="text-left">
                <p className="text-xs uppercase font-bold opacity-50">Instagram</p>
                <p className="text-lg font-display font-bold">@zdrplay</p>
              </div>
            </a>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-20 px-8 border-t border-white/10 text-center bg-black text-white/40 text-sm uppercase tracking-[0.2em]">
        <div className="mb-8 flex justify-center">
          <img src="/logozdr.png" alt="ZDR PLAY" className="h-12 w-auto opacity-80" referrerPolicy="no-referrer" />
        </div>
        <p>&copy; 2026 ZDR PLAY. Todos os direitos reservados.</p>
        <p className="mt-2 text-[10px] opacity-30">Qualidade que você vê. Confiança que você sente.</p>
      </footer>
    </div>
  );
}
