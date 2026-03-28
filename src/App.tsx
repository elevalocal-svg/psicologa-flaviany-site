import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  Menu, 
  X, 
  Heart, 
  Users, 
  Globe, 
  ArrowRight, 
  Instagram, 
  Linkedin, 
  CheckCircle2,
  Quote,
  Sparkles,
  Clock,
  Timer,
  Flame,
  Lock,
  AlertCircle,
  ZapOff,
  Eye,
  Link as LinkIcon,
  Compass,
  MessageSquareOff,
  Swords,
  HeartOff,
  Search,
  Wind,
  Waves,
  ShieldAlert,
  CloudRain,
  Zap,
  Star
} from 'lucide-react';

// --- Constants & Types ---
const WHATSAPP_NUMBER = "5571992646557";
const INSTAGRAM_LINK = "https://www.instagram.com/flavianyleonardo";

const getWhatsAppLink = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

const MESSAGES = {
  GENERAL: "Oi, tudo bem? Eu vim através do Site e quero saber mais informações sobre os tratamentos. Pode me ajudar?",
  APPOINTMENT: "Oi, tudo bem? Eu vim através do Site e queria agendar uma consulta com a Flaviany Leonardo. Pode me ajudar?",
  ONLINE: "Oi, tudo bem? Eu vim através do Site e gostaria de agendar uma sessão de Terapia Online com a Flaviany Leonardo. Pode me ajudar?",
  PRESENTIAL: "Oi, tudo bem? Eu vim através do Site e gostaria de agendar uma sessão de Terapia Presencial com a Flaviany Leonardo em Salvador. Pode me ajudar?",
};

// Image URLs from uploaded files
const LOGO_URL = "https://i.imgur.com/qWEvQFE.png";
const HERO_IMAGE = "https://i.imgur.com/VNXVvQZ.png";
const ABOUT_IMAGE = "https://i.imgur.com/tE74ymo.png";
const SPECIALTIES_IMAGE = "https://i.imgur.com/PHFP8e8.png";

const SERVICES = [
  {
    title: "Psicoterapia Individual",
    description: "Processo para trabalhar questões emocionais, bloqueios, traumas e desejos. Focado na construção de uma vida mais funcional, leve e consciente.",
    details: "Sessões semanais com duração de aproximadamente 45 min.",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    title: "Terapia de Casal",
    description: "Foco na relação e na dinâmica do casal: finanças, sexo, filhos, tarefas, carreira e tempo livre.",
    details: "Sessões semanais com duração de aproximadamente 45 min.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Terapia Sexual",
    description: "Foco em questões sexuais de origem psicogênica para recuperar a autonomia do corpo e (re)descobrir o prazer.",
    details: "Atendimentos individuais ou em casal, aproximadamente 45 min.",
    icon: <CheckCircle2 className="w-6 h-6" />,
  },
  {
    title: "Grupo Terapêutico",
    description: "Exclusivo para sexualidade feminina. Trabalha emoções ligadas ao sexo e disfunções sexuais em ambiente de acolhimento.",
    details: "4 encontros de 80 min, grupo de 4 a 11 pessoas. Valor acessível.",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    title: "Consultoria para Casal",
    description: "Sessões pontuais com foco em situações específicas para casais com boa dinâmica entre si.",
    details: "Média de até 3 sessões de 1h cada.",
    icon: <MessageCircle className="w-6 h-6" />,
  }
];

const SPECIALTIES = {
  sexual: [
    { name: "Anorgasmia", desc: "Dificuldade de orgasmo", icon: <Sparkles className="w-4 h-4" /> },
    { name: "Ejaculação Retardada", desc: "", icon: <Clock className="w-4 h-4" /> },
    { name: "Ejaculação Precoce", desc: "", icon: <Timer className="w-4 h-4" /> },
    { name: "Desejo Hipoativo", desc: "", icon: <Flame className="w-4 h-4" /> },
    { name: "Vaginismo", desc: "Dificuldade na penetração", icon: <Lock className="w-4 h-4" /> },
    { name: "Dispareunia", desc: "Dor na relação sexual", icon: <AlertCircle className="w-4 h-4" /> },
    { name: "Disfunção Erétil", desc: "", icon: <ZapOff className="w-4 h-4" /> },
    { name: "Vulvodinia", desc: "Queimação ou dor crônica na vulva", icon: <Flame className="w-4 h-4" /> }
  ],
  casal: [
    { name: "Ciúmes", icon: <Eye className="w-4 h-4" /> },
    { name: "Dependência", icon: <LinkIcon className="w-4 h-4" /> },
    { name: "Planos de vida desalinhados", icon: <Compass className="w-4 h-4" /> },
    { name: "Falhas na comunicação", icon: <MessageSquareOff className="w-4 h-4" /> },
    { name: "Brigas constantes", icon: <Swords className="w-4 h-4" /> },
    { name: "Superação pós-término", icon: <HeartOff className="w-4 h-4" /> }
  ],
  psicoterapia: [
    { name: "Análise", icon: <Search className="w-4 h-4" /> },
    { name: "Estresse", icon: <Wind className="w-4 h-4" /> },
    { name: "Ansiedade", icon: <Waves className="w-4 h-4" /> },
    { name: "Insegurança", icon: <ShieldAlert className="w-4 h-4" /> },
    { name: "Instabilidade de humor", icon: <CloudRain className="w-4 h-4" /> },
    { name: "Transtorno do pânico", icon: <Zap className="w-4 h-4" /> }
  ]
};

const TESTIMONIALS = [
  {
    text: "A Flaviany tem uma sensibilidade incrível. As sessões me ajudaram a entender padrões que eu nem percebia.",
    author: "M.S., 32 anos"
  },
  {
    text: "Nossa relação mudou completamente após a terapia de casal. Aprendemos a nos ouvir de verdade.",
    author: "R. & L."
  },
  {
    text: "Excelente profissional, ética e muito acolhedora. Recomendo a todos que buscam equilíbrio.",
    author: "A.P., 45 anos"
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#home" },
    { name: "Quem Sou", href: "#about" },
    { name: "Serviços", href: "#services" },
    { name: "Especialidades", href: "#specialties" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Logo Flaviany Leonardo" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />
          <span className="text-2xl font-serif italic text-stone-800 font-bold tracking-tight">
            Flaviany Leonardo
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm uppercase tracking-widest text-stone-600 hover:text-stone-900 transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={getWhatsAppLink(MESSAGES.APPOINTMENT)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stone-800 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-stone-700 transition-all"
          >
            Agendar Sessão
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-stone-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 md:hidden flex flex-col space-y-6"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-serif italic text-stone-800"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href={getWhatsAppLink(MESSAGES.APPOINTMENT)}
              className="bg-stone-800 text-white py-4 rounded-xl text-center font-medium"
              onClick={() => setIsOpen(false)}
            >
              Agendar via WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#f5f5f0]">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-100 -z-10 rounded-l-[100px] hidden lg:block" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-stone-200/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 bg-stone-200 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6">
            Psicóloga & Sexóloga Clínica
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-light leading-tight text-stone-900 mb-6">
            Cuidando da sua <br />
            <span className="italic font-normal">Saúde Emocional</span> <br />
            e Sexual.
          </h1>
          <p className="text-lg text-stone-600 mb-10 max-w-lg leading-relaxed">
            Acolhimento especializado para indivíduos e casais que buscam superar desafios, 
            fortalecer vínculos e viver com mais plenitude. Atendimento online e presencial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={getWhatsAppLink(MESSAGES.APPOINTMENT)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-800 text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-stone-700 transition-all shadow-lg shadow-stone-200 group"
            >
              Agendar Sessão
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#about"
              className="px-8 py-4 rounded-full border border-stone-300 text-stone-800 flex items-center justify-center hover:bg-stone-50 transition-all"
            >
              Conhecer abordagem
            </a>
          </div>
          <p className="mt-8 text-xs text-stone-400 font-mono uppercase tracking-tighter">
            CRP 03/21426 • Salvador, BA & Online
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl relative z-10">
            <img 
              src={HERO_IMAGE} 
              alt="Flaviany Leonardo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-stone-300 rounded-full -z-0" />
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl z-20 hidden sm:block border border-stone-100"
          >
            <div className="flex items-center gap-4 relative">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center">
                <MessageCircle className="text-stone-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Atendimento</p>
                <p className="text-sm font-serif italic text-stone-800">Humanizado e Ético</p>
              </div>
              {/* Balão tail */}
              <div className="absolute -bottom-8 left-6 w-4 h-4 bg-white rotate-45 border-r border-b border-stone-100" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">Quem Sou</h2>
            <h3 className="text-4xl font-serif text-stone-900 mb-8 leading-snug">
              Olá, sou <span className="italic">Flaviany Leonardo</span>.
            </h3>
            <div className="space-y-6 text-stone-600 leading-relaxed text-lg">
              <p>
                Sou Psicóloga Clínica (CRP 03/21426) especializada em sexologia, atuando na área da terapia sexual com foco nas disfunções sexuais, além da terapia de casais, consultoria para casais e psicoterapia individual.
              </p>
              <p>
                Estudo a mente e o comportamento humano há mais de 8 anos, com mais de 2 mil horas de atendimento clínico, online e presencial, tanto em Salvador quanto em São Paulo, através do Instituto de Psicologia da USP (IPUSP).
              </p>
              <p>
                Utilizo o viés da psicanálise para possibilitar uma visão dos reais desejos, entendimentos internos e compreensão dos nossos comportamentos e pensamentos inconscientes. No entanto, utilizo técnicas de outras abordagens quando necessário, respeitando a unicidade de cada ser humano.
              </p>
            </div>
            <div className="mt-10 pt-10 border-t border-stone-100 grid grid-cols-2 gap-8">
              <div>
                <p className="text-2xl font-serif italic text-stone-800">2.000+</p>
                <p className="text-xs uppercase tracking-widest text-stone-400">Horas Clínicas</p>
              </div>
              <div>
                <p className="text-2xl font-serif italic text-stone-800">8+ Anos</p>
                <p className="text-xs uppercase tracking-widest text-stone-400">De Estudo</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img 
                src={ABOUT_IMAGE} 
                alt="Flaviany Leonardo" 
                className="rounded-[40px] shadow-2xl z-10 relative w-full aspect-[4/5] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-stone-100 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-[#f9f9f7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">Tipos de Atendimento</h2>
          <h3 className="text-4xl font-serif text-stone-900">Com você a cada passo do caminho</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col"
            >
              <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-600 mb-8">
                {service.icon}
              </div>
              <h4 className="text-2xl font-serif text-stone-900 mb-4">{service.title}</h4>
              <p className="text-stone-500 text-sm leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>
              <div className="pt-6 border-t border-stone-50">
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">Duração</p>
                <p className="text-sm text-stone-700 italic">{service.details}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-10 bg-stone-800 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="text-2xl font-serif italic mb-2">Modalidades de Atendimento</h4>
            <p className="text-stone-400 max-w-md">Ambiente seguro, sigiloso e acolhedor, seguindo o Código de Ética do Psicólogo.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/10">
              <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Presencial</p>
              <p className="font-medium">Salvador, BA</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/10">
              <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Online</p>
              <p className="font-medium">Google Meet</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Specialties = () => {
  return (
    <section id="specialties" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          <div className="lg:w-1/3">
            <h2 className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">Especialidades</h2>
            <h3 className="text-4xl font-serif text-stone-900 mb-6">Tratamento especializado e ético</h3>
            <p className="text-stone-500 leading-relaxed">
              Cada atendimento é único, respeitando a subjetividade e o tempo de cada paciente, 
              seja no formato individual ou em casal.
            </p>
          </div>
          <div className="lg:w-2/3">
            <div className="aspect-[16/9] rounded-[40px] overflow-hidden shadow-xl">
              <img 
                src={SPECIALTIES_IMAGE} 
                alt="Consultório Flaviany Leonardo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Terapia Sexual */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-serif italic">Terapia Sexual</h4>
            </div>
            <div className="space-y-3">
              {SPECIALTIES.sexual.map((spec, i) => (
                <div key={i} className="p-4 rounded-2xl bg-stone-50 border border-stone-100 hover:bg-stone-100 transition-colors flex items-start gap-3">
                  <div className="mt-1 text-stone-400">
                    {spec.icon}
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">{spec.name}</p>
                    {spec.desc && <p className="text-xs text-stone-500 mt-1">{spec.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terapia de Casal */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-600">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-serif italic">Terapia de Casal</h4>
            </div>
            <div className="space-y-3">
              {SPECIALTIES.casal.map((spec, i) => (
                <div key={i} className="p-4 rounded-2xl bg-stone-50 border border-stone-100 hover:bg-stone-100 transition-colors flex items-center gap-3">
                  <div className="text-stone-400">
                    {spec.icon}
                  </div>
                  <p className="font-medium text-stone-800">{spec.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Psicoterapia */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-600">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-serif italic">Psicoterapia</h4>
            </div>
            <div className="space-y-3">
              {SPECIALTIES.psicoterapia.map((spec, i) => (
                <div key={i} className="p-4 rounded-2xl bg-stone-50 border border-stone-100 hover:bg-stone-100 transition-colors flex items-center gap-3">
                  <div className="text-stone-400">
                    {spec.icon}
                  </div>
                  <p className="font-medium text-stone-800">{spec.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <Quote className="w-12 h-12 text-stone-600 mb-6" />
          <h2 className="text-4xl font-serif italic">O que dizem os pacientes</h2>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <a 
              href="https://maps.app.goo.gl/cMLFhxKKjfACucu58" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-stone-400 hover:text-white transition-colors underline underline-offset-4"
            >
              Ver 5.0 estrelas no Google
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="p-8 rounded-3xl bg-stone-800/50 border border-stone-700">
              <p className="text-stone-300 italic mb-6 leading-relaxed">"{t.text}"</p>
              <p className="text-sm font-bold tracking-widest uppercase text-stone-500">{t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Location = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">Localização</h2>
            <h3 className="text-4xl font-serif text-stone-900 mb-6">Onde estamos</h3>
            <p className="text-stone-600 mb-8 leading-relaxed">
              Atendimento presencial no Salvador Trade Center, um ambiente preparado para oferecer o máximo de conforto, privacidade e acessibilidade.
            </p>
            <div className="flex items-center gap-4 p-6 bg-stone-50 rounded-3xl border border-stone-100">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-yellow-500 shadow-sm">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="font-bold text-stone-800">Avaliações no Google</p>
                <a 
                  href="https://maps.app.goo.gl/cMLFhxKKjfACucu58" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-stone-500 hover:text-stone-900 underline underline-offset-4"
                >
                  Ver perfil no Google Meu Negócio
                </a>
              </div>
            </div>
          </div>
          <div className="rounded-[40px] overflow-hidden shadow-2xl h-[400px] border border-stone-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.813038181689!2d-38.45622642492315!3d-12.983806887332701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x434444a36ef17085%3A0x395827d75de8cb71!2sFlaviany%20Leonardo%20-%20Psic%C3%B3loga%20e%20Sex%C3%B3loga%20Online!5e0!3m2!1spt-BR!2sbr!4v1774719675098!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-[#f5f5f0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">Contato / Agendamento</h2>
            <h3 className="text-5xl font-serif text-stone-900 mb-8">Vamos conversar?</h3>
            <p className="text-stone-600 text-lg mb-12 leading-relaxed">
              Dê o primeiro passo em direção ao seu bem-estar. Estou aqui para te ouvir e auxiliar na sua jornada de transformação, seja presencialmente ou online.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-stone-600 shadow-sm">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">Endereço</p>
                  <p className="text-stone-800 leading-relaxed">
                    Clínica MultiSer<br />
                    Av. Tancredo Neves, nº1632<br />
                    Edf. Salvador Trade Center<br />
                    Torre Norte - SL510<br />
                    Caminho das Árvores, Salvador - BA
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-stone-600 shadow-sm">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">WhatsApp</p>
                  <a href={getWhatsAppLink(MESSAGES.GENERAL)} className="text-stone-800 font-bold hover:text-stone-600 transition-colors">(71) 99264-6557</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-xl border border-stone-100">
            <h4 className="text-2xl font-serif italic mb-6">Agende sua sessão</h4>
            <div className="space-y-4">
              <a 
                href={getWhatsAppLink(MESSAGES.ONLINE)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-lg shadow-green-100 font-bold text-lg"
              >
                <MessageCircle className="w-6 h-6" />
                Terapia Online
              </a>
              <a 
                href={getWhatsAppLink(MESSAGES.PRESENTIAL)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-stone-800 text-white py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-lg shadow-stone-200 font-bold text-lg"
              >
                <Users className="w-6 h-6" />
                Terapia Presencial
              </a>
              <div className="pt-6 text-center">
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-4">Siga nas redes sociais</p>
                <div className="flex justify-center gap-6">
                  <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors">
                    <Instagram className="w-8 h-8" />
                  </a>
                  <a href="#" className="text-stone-400 hover:text-stone-900 transition-colors">
                    <Linkedin className="w-8 h-8" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <p className="text-xl font-serif italic text-stone-800 font-bold">Flaviany Leonardo</p>
          <p className="text-xs text-stone-400 uppercase tracking-widest mt-1">Psicóloga & Sexóloga • CRP 03/21426</p>
        </div>
        
        <div className="text-sm text-stone-500">
          © {new Date().getFullYear()} Flaviany Leonardo. Todos os direitos reservados.
        </div>

        <div className="flex gap-6 text-xs uppercase tracking-widest font-bold text-stone-400">
          <a href="#" className="hover:text-stone-900">Privacidade</a>
          <a href="#" className="hover:text-stone-900">Termos</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans text-stone-900 selection:bg-stone-200 selection:text-stone-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Specialties />
        <Testimonials />
        <Location />
        <Contact />
      </main>
      <Footer />
      
      {/* Floating WhatsApp for Mobile */}
      <a 
        href={getWhatsAppLink(MESSAGES.GENERAL)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl z-50 md:hidden hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-8 h-8" />
      </a>
    </div>
  );
}
