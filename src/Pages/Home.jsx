import React, { useState, useEffect, useCallback, memo } from "react"
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Memoized Components
const MainTitle = memo(() => (
  <div className="space-y-2 sm:space-y-3" data-aos="fade-up" data-aos-delay="600">
    <h1 className="
      text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
      font-bold tracking-tight leading-tight
    ">
      {/* FIRST LINE */}
      <span className="relative inline-block whitespace-nowrap">
        <span className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-xl sm:blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Full-Stack 
        </span>
      </span>
      <br />
      {/* SECOND LINE */}
      <span className="relative inline-block mt-1 sm:mt-2">
        <span className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-xl sm:blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Web Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-xs sm:text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[120px] sm:w-[140px] md:w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-9 sm:h-10 md:h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm group-hover:gap-2 sm:group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-200 ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-2 sm:p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-1.5 sm:p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Full-Stack Developer","Emerging Data Analyst","Tech Enthusiast","Hackathon Winner","Automation Developer"];
const TECH_STACK = ["React", "Node.js", "Tailwind",
  "TypeScript",
  "MongoDB",
  "MySQL",
  "Python",
  "Figma",
  "AWS",
  "Git",
  "SQL",
  "Pandas",
  "Data Visualization",
  "Accessibility (WCAG)"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/Akshata-Mahajan" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/akshata-mahajan22/" }
];

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
       
      });
    };

    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // Lottie configuration
  const lottieOptions = {
    src: "https://lottie.host/58753882-bb6a-49f5-a2c0-950eda1e135a/NLbpVqGegK.lottie",
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      progressiveLoad: true,
    },
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-700 ease-out ${
      isHovering 
        ? "scale-[120%] sm:scale-[115%] md:scale-[110%] lg:scale-[105%] xl:scale-[100%]" 
        : "scale-[115%] sm:scale-[110%] md:scale-[105%] lg:scale-[100%] xl:scale-[95%]"
    }`
  };

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden px-4 sm:px-6 md:px-8 lg:px-[10%] mb-6 sm:mb-8 md:mb-10" id="Home">
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto min-h-screen">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen md:justify-between gap-8 sm:gap-12 lg:gap-20 pt-8 sm:pt-12 lg:pt-0">
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1"
              data-aos="fade-right"
              data-aos-delay="200">
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <MainTitle />

                {/* Typing Effect */}
                <div className="h-6 sm:h-8 flex items-center justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="800">
                  <span className="text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[2px] sm:w-[3px] h-4 sm:h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xs sm:max-w-sm md:max-w-xl leading-relaxed font-light px-2 sm:px-0"
                  data-aos="fade-up"
                  data-aos-delay="1000">
                  Crafting accessible, data-driven products that combine innovative design with impactful digital solutions.
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="1200">
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-row gap-2 sm:gap-3 w-full justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="1400">
                  <CTAButton href="#Portfolio" text="Projects" icon={ExternalLink} />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} />
                </div>

                {/* Social Links */}
                <div className="flex sm:hidden gap-3 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="1600">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
                
                <div className="hidden sm:flex gap-3 sm:gap-4 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="1600">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Optimized Lottie Animation */}
            <div className="w-full py-8 sm:py-12 lg:py-0 lg:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-1 lg:order-2"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600">
              <div className="relative w-full h-full opacity-90">
                <div className={`absolute inset-0 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                  isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
                }`}>
                </div>

                <div className={`relative lg:left-12 z-10 w-full h-full opacity-90 transform transition-transform duration-700 ease-out ${
                  isHovering ? "scale-102" : "scale-100"
                }`}>
                  <DotLottieReact {...lottieOptions} />
                </div>

                <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ease-out ${
                  isHovering ? "opacity-40" : "opacity-15"
                }`}>
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl animate-[pulse_8s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ease-out ${
                    isHovering ? "scale-105" : "scale-100"
                  }`}>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);