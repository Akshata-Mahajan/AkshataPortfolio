"use client"

import { useState, useEffect, useCallback } from "react"
import { Menu, X, Eye, Sparkles } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("Home")
  const [visitCount, setVisitCount] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const navItems = [
    { href: "#Home", label: "Home", icon: "🏠" },
    { href: "#About", label: "About", icon: "👨‍💻" },
    { href: "#Portfolio", label: "Portfolio", icon: "💼" },
    { href: "#Achievements", label: "Achievements", icon: "🏆" },
    { href: "#Contact", label: "Contact", icon: "📧" },
  ]

  // Visit counter logic
  useEffect(() => {
    const getVisitCount = () => {
      const stored = localStorage.getItem("portfolio-visits")
      const today = new Date().toDateString()
      const lastVisit = localStorage.getItem("portfolio-last-visit")

      if (lastVisit !== today) {
        const newCount = stored ? Number.parseInt(stored) + 1 : 1
        localStorage.setItem("portfolio-visits", newCount.toString())
        localStorage.setItem("portfolio-last-visit", today)
        setVisitCount(newCount)
      } else {
        setVisitCount(stored ? Number.parseInt(stored) : 1)
      }
    }

    getVisitCount()
  }, [])

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Enhanced scroll handling with navbar hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)

      // Background blur effect
      setScrolled(currentScrollY > 20)

      // Active section detection
      const sections = navItems
        .map((item) => {
          const section = document.querySelector(item.href)
          if (section) {
            return {
              id: item.href.replace("#", ""),
              offset: section.offsetTop - 150,
              height: section.offsetHeight,
            }
          }
          return null
        })
        .filter(Boolean)

      const active = sections.find(
        (section) => currentScrollY >= section.offset && currentScrollY < section.offset + section.height,
      )

      if (active) {
        setActiveSection(active.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Body scroll lock for mobile menu
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const scrollToSection = useCallback((e, href) => {
    e.preventDefault()
    const section = document.querySelector(href)
    if (section) {
      const top = section.offsetTop - 100
      window.scrollTo({
        top: top,
        behavior: "smooth",
      })
    }
    setIsOpen(false)
  }, [])

  const formatVisitCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }

  return (
    <>
      {/* Interactive Background Particle */}
      <div
        className="fixed pointer-events-none z-40 w-32 h-32 bg-gradient-to-r from-[#6366f1]/5 to-[#a855f7]/5 rounded-full blur-xl transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
          opacity: scrolled ? 0.3 : 0.1,
        }}
      />

      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isOpen
            ? "bg-[#030014] shadow-2xl"
            : scrolled
              ? "bg-[#030014]/80 backdrop-blur-2xl border-b border-white/5 shadow-lg"
              : "bg-transparent"
        }`}
      >
        <div className="mx-auto px-[5%] sm:px-[5%] lg:px-[10%]">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Enhanced Logo */}
            <div className="flex-shrink-0 group">
              <a
                href="#Home"
                onClick={(e) => scrollToSection(e, "#Home")}
                className="flex items-center space-x-3 transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative w-10 h-10 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white animate-pulse" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-xl font-bold bg-gradient-to-r from-[#a855f7] via-[#8b5cf6] to-[#6366f1] bg-clip-text text-transparent">
                    Akshata Mahajan
                  </div>
                  <div className="text-xs text-gray-400 -mt-1">Full-Stack Developer</div>
                </div>
              </a>
            </div>

            {/* Visit Counter & Stats */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                {/* Visit Counter */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative px-3 py-1.5 bg-black/40 backdrop-blur-xl rounded-lg border border-white/10 group-hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-[#6366f1]" />
                      <span className="text-sm text-gray-300 font-medium">{formatVisitCount(visitCount)}</span>
                      <span className="text-xs text-gray-500">visits</span>
                    </div>
                  </div>
                </div>

                {/* Online Status */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative px-3 py-1.5 bg-black/40 backdrop-blur-xl rounded-lg border border-white/10 group-hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-300 font-medium">Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="group relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
                  >
                    {/* Background glow effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                        activeSection === item.href.substring(1) ? "opacity-50" : ""
                      }`}
                    ></div>

                    {/* Content */}
                    <div className="relative flex items-center space-x-2">
                      <span className="text-lg">{item.icon}</span>
                      <span
                        className={`transition-all duration-300 ${
                          activeSection === item.href.substring(1)
                            ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                            : "text-gray-300 group-hover:text-white"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    {/* Active indicator */}
                    <div
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full transition-all duration-300 ${
                        activeSection === item.href.substring(1)
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                      }`}
                    ></div>
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button & Stats */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Mobile Visit Counter */}
              <div className="flex items-center space-x-2 px-2 py-1 bg-black/40 backdrop-blur-xl rounded-lg border border-white/10">
                <Eye className="w-3 h-3 text-[#6366f1]" />
                <span className="text-xs text-gray-300 font-medium">{formatVisitCount(visitCount)}</span>
              </div>

              {/* Hamburger Menu */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-300 hover:text-white transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  {isOpen ? (
                    <X className="w-6 h-6 transform rotate-90 transition-transform duration-300" />
                  ) : (
                    <Menu className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? "max-h-screen opacity-100 backdrop-blur-2xl" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-8 bg-gradient-to-b from-[#030014] to-[#030014]/95 border-t border-white/5">
            {/* Mobile Stats */}
            <div className="flex items-center justify-center space-x-6 mb-8 pb-6 border-b border-white/10">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Eye className="w-4 h-4 text-[#6366f1]" />
                  <span className="text-lg font-semibold text-white">{formatVisitCount(visitCount)}</span>
                </div>
                <span className="text-xs text-gray-400">Total Visits</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-lg font-semibold text-white">Live</span>
                </div>
                <span className="text-xs text-gray-400">Status</span>
              </div>
            </div>

            {/* Mobile Navigation Items */}
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`group block px-6 py-4 text-lg font-medium transition-all duration-300 rounded-xl ${
                    activeSection === item.href.substring(1)
                      ? "bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 border border-white/20"
                      : "hover:bg-white/5 border border-transparent hover:border-white/10"
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    transform: isOpen ? "translateX(0)" : "translateX(50px)",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{item.icon}</span>
                    <span
                      className={`transition-colors duration-300 ${
                        activeSection === item.href.substring(1)
                          ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                          : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {activeSection === item.href.substring(1) && (
                    <div className="mt-2 w-full h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full"></div>
                  )}
                </a>
              ))}
            </div>

            {/* Mobile Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-gray-400">© 2024 Akshata Mahajan. All rights reserved.</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/20 z-40">
        <div
          className="h-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] transition-all duration-300 ease-out"
          style={{
            width: `${Math.min(
              100,
              (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
            )}%`,
          }}
        ></div>
      </div>
    </>
  )
}

export default Navbar
