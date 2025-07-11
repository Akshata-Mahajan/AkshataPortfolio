"use client"

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Github, Globe, User } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const HeroIcon = ({ Icon, delay = 0 }) => (
  <motion.div
    className="relative"
    initial={{ scale: 0, rotateY: -180, opacity: 0 }}
    animate={{ scale: 1, rotateY: 0, opacity: 1 }}
    transition={{ delay: delay * 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
  >
    <motion.div
      className="relative p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-full border border-indigo-500/30"
      whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(99, 102, 241, 0.5)" }}
      transition={{ duration: 0.3 }}
    >
      <Icon className="w-10 h-10 text-indigo-400" />
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-purple-500/20"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: delay * 0.3 }}
      />
    </motion.div>
  </motion.div>
);

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 260);
    return () => clearInterval(timer);
  }, [text]);

  return <span className="inline-block">{displayText}<span className="animate-pulse">|</span></span>;
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-purple-600/10 blur-2xl animate-float" />
  </div>
);

const IconButton = ({ Icon }) => (
  <div className="relative group hover:scale-110 transition-transform duration-300">
    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-2 sm:p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
    </div>
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showIcons, setShowIcons] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: false });
    const sequence = [
      { delay: 1000, action: () => setShowIcons(true) },
      { delay: 2500, action: () => setShowName(true) },
      { delay: 4000, action: () => setShowTitle(true) },
      {
        delay: 6000,
        action: () => {
          setIsLoading(false);
          setTimeout(() => onLoadingComplete?.(), 1000);
        },
      },
    ];
    const timers = sequence.map(({ delay, action }) => setTimeout(action, delay));
    return () => timers.forEach(clearTimeout);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#030014]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, transition: { duration: 1, ease: "easeInOut" } }}
        >
          <BackgroundEffect />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.1)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />

          <div className="relative min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto text-center">
              {showIcons && (
                <motion.div
                  className="flex justify-center gap-12 mb-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {[Code2, User, Github, Globe].map((Icon, index) => (
                    <HeroIcon key={index} Icon={Icon} delay={index} />
                  ))}
                </motion.div>
              )}

              {showName && (
                <motion.div className="mb-8" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                  <motion.h1 className="text-6xl md:text-8xl font-black tracking-wider" initial={{ letterSpacing: "0.5em", opacity: 0 }} animate={{ letterSpacing: "0.1em", opacity: 1 }} transition={{ duration: 1.5 }}>
                    <motion.span className="inline-block bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent" initial={{ rotateX: -90 }} animate={{ rotateX: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
                      AKSHATA
                    </motion.span>
                    <br />
                    <motion.span className="inline-block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" initial={{ rotateX: -90 }} animate={{ rotateX: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
                      MAHAJAN
                    </motion.span>
                  </motion.h1>
                </motion.div>
              )}

              {showTitle && (
                <motion.div className="mb-12" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
                  <motion.div className="text-2xl md:text-4xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">FULL-STACK DEVELOPER</span>
                    <span className="text-white/80"> & </span>
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">INNOVATOR</span>
                  </motion.div>
                  <motion.div className="w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.8 }} />
                  <motion.p className="text-lg text-white/70 mt-6 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}>
                    Crafting digital experiences with passion, precision, and cutting-edge technology
                  </motion.p>
                  <motion.div className="flex justify-center mt-8 gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}>
                    {[...Array(3)].map((_, i) => (
                      <motion.div key={i} className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }} />
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
