import { useState, useEffect, useRef } from 'react'
import { Briefcase, Download, Github, Linkedin, Mail, MapPin, Brain, Code, BarChart, Users, Folder, Trophy, GraduationCap } from 'lucide-react'
import './index.css'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Home') // Tracks current page/button clicked
  const [scrollTop, setScrollTop] = useState(0) // Tracks scroll position of the Skills view
  const contactGlowRef = useRef(null)

  const handleContactMouseMove = (e) => {
    if (contactGlowRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      contactGlowRef.current.style.background = `radial-gradient(800px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.08), transparent 40%)`
    }
  }

  // Scroll Animation for Journey Timeline items
  useEffect(() => {
    if (activeTab === 'About') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
            }
          });
        },
        { threshold: 0.05 }
      )

      const items = document.querySelectorAll('.journey-timeline-grid')
      items.forEach((item) => observer.observe(item))

      return () => {
        items.forEach((item) => observer.unobserve(item))
      }
    }
  }, [activeTab])

  // Contact Page split glassmorphic form states
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactSubject, setContactSubject] = useState('')
  const [journeyScrollTop, setJourneyScrollTop] = useState(0)
  const [homeScrollTop, setHomeScrollTop] = useState(0)
  const [contactMessage, setContactMessage] = useState('')
  const [contactIsSent, setContactIsSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNavClick = (tabName) => {
    setActiveTab(tabName)
    setMobileMenuOpen(false) // Close mobile menu if open
    setScrollTop(0) // Reset scroll position when switching tabs
    setJourneyScrollTop(0) // Reset journey scroll position
  }

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  const handleJourneyScroll = (e) => {
    setJourneyScrollTop(e.currentTarget.scrollTop)
  }

  // Calculate cinematic zoom: Hero content scales up from 1 to 2, and fades out to 0
  const heroScale = 1 + (scrollTop / 220) * 1.0
  const heroOpacity = Math.max(0, 1 - scrollTop / 200)

  // Stagger card reveals when scrolled past the zoom threshold
  const showCards = scrollTop > 200

  // Journey scroll phase calculations (Quotes -> Education -> Certifications -> Internships)
  // Phase 1: Quotes
  const qOpacity = Math.max(0, 1 - journeyScrollTop / 350)
  const qScale = 1 + (journeyScrollTop / 350) * 0.8

  // Phase 2: Education (Enables progressive, scroll-staggered fades for elements)
  let edOpacity = 0
  if (journeyScrollTop >= 350) {
    if (journeyScrollTop < 400) {
      edOpacity = (journeyScrollTop - 350) / 50
    } else {
      edOpacity = 1
    }
  }

  // Header Animation: Fades in at the center, then moves up to the top
  let edHeaderOpacity = 0
  let edHeaderTranslateY = 35 // using vh units
  if (journeyScrollTop >= 350) {
    if (journeyScrollTop < 450) {
      // Fade in at center
      edHeaderOpacity = Math.max(0, Math.min(1, (journeyScrollTop - 350) / 100))
      edHeaderTranslateY = 35
    } else if (journeyScrollTop < 600) {
      // Move up to the top
      edHeaderOpacity = 1
      const progress = (journeyScrollTop - 450) / 150
      edHeaderTranslateY = 35 * (1 - progress)
    } else {
      edHeaderOpacity = 1
      edHeaderTranslateY = 0
    }
  }

  // Timeline Line Animation
  let edLineOpacity = 0
  if (journeyScrollTop >= 600) {
    edLineOpacity = Math.max(0, Math.min(1, (journeyScrollTop - 600) / 100))
  }

  // College Timeline Item
  let edItem1Opacity = 0
  let edItem1Translate = 30
  if (journeyScrollTop >= 650) {
    if (journeyScrollTop < 750) {
      const progress = (journeyScrollTop - 650) / 100
      edItem1Opacity = progress
      edItem1Translate = 30 * (1 - progress)
    } else {
      edItem1Opacity = 1
      edItem1Translate = 0
    }
  }

  // 12th Grade Timeline Item
  let edItem2Opacity = 0
  let edItem2Translate = 30
  if (journeyScrollTop >= 750) {
    if (journeyScrollTop < 850) {
      const progress = (journeyScrollTop - 750) / 100
      edItem2Opacity = progress
      edItem2Translate = 30 * (1 - progress)
    } else {
      edItem2Opacity = 1
      edItem2Translate = 0
    }
  }

  // 10th Grade Timeline Item
  let edItem3Opacity = 0
  let edItem3Translate = 30
  if (journeyScrollTop >= 850) {
    if (journeyScrollTop < 950) {
      const progress = (journeyScrollTop - 850) / 100
      edItem3Opacity = progress
      edItem3Translate = 30 * (1 - progress)
    } else {
      edItem3Opacity = 1
      edItem3Translate = 0
    }
  }

  // Timeline Global Translate Y to create scroll effect
  let timelineTranslateY = 0
  if (journeyScrollTop >= 700) {
    timelineTranslateY = -(journeyScrollTop - 700) * 0.9
  }

  // Certifications Section Animation
  let certHeaderOpacity = 0
  let certHeaderTranslateY = 30
  if (journeyScrollTop >= 1150) {
    if (journeyScrollTop < 1250) {
      const progress = (journeyScrollTop - 1150) / 100
      certHeaderOpacity = progress
      certHeaderTranslateY = 30 * (1 - progress)
    } else {
      certHeaderOpacity = 1
      certHeaderTranslateY = 0
    }
  }

  let certCard1Opacity = 0
  let certCard1TranslateY = 30
  if (journeyScrollTop >= 1250) {
    if (journeyScrollTop < 1350) {
      const progress = (journeyScrollTop - 1250) / 100
      certCard1Opacity = progress
      certCard1TranslateY = 30 * (1 - progress)
    } else {
      certCard1Opacity = 1
      certCard1TranslateY = 0
    }
  }

  let certCard2Opacity = 0
  let certCard2TranslateY = 30
  if (journeyScrollTop >= 1350) {
    if (journeyScrollTop < 1450) {
      const progress = (journeyScrollTop - 1350) / 100
      certCard2Opacity = progress
      certCard2TranslateY = 30 * (1 - progress)
    } else {
      certCard2Opacity = 1
      certCard2TranslateY = 0
    }
  }

  let certCard3Opacity = 0
  let certCard3TranslateY = 30
  if (journeyScrollTop >= 1450) {
    if (journeyScrollTop < 1550) {
      const progress = (journeyScrollTop - 1450) / 100
      certCard3Opacity = progress
      certCard3TranslateY = 30 * (1 - progress)
    } else {
      certCard3Opacity = 1
      certCard3TranslateY = 0
    }
  }

  let certCard4Opacity = 0
  let certCard4TranslateY = 30
  if (journeyScrollTop >= 1550) {
    if (journeyScrollTop < 1650) {
      const progress = (journeyScrollTop - 1550) / 100
      certCard4Opacity = progress
      certCard4TranslateY = 30 * (1 - progress)
    } else {
      certCard4Opacity = 1
      certCard4TranslateY = 0
    }
  }

  // Experience Section Animation
  let expHeaderOpacity = 0
  let expHeaderTranslateY = 30
  if (journeyScrollTop >= 1650) {
    if (journeyScrollTop < 1750) {
      const progress = (journeyScrollTop - 1650) / 100
      expHeaderOpacity = progress
      expHeaderTranslateY = 30 * (1 - progress)
    } else {
      expHeaderOpacity = 1
      expHeaderTranslateY = 0
    }
  }

  let expItem1Opacity = 0
  let expItem1TranslateY = 30
  if (journeyScrollTop >= 1750) {
    if (journeyScrollTop < 1850) {
      const progress = (journeyScrollTop - 1750) / 100
      expItem1Opacity = progress
      expItem1TranslateY = 30 * (1 - progress)
    } else {
      expItem1Opacity = 1
      expItem1TranslateY = 0
    }
  }

  let journeyFooterOpacity = 0
  let journeyFooterTranslateY = 30
  if (journeyScrollTop >= 1850) {
    if (journeyScrollTop < 1950) {
      const progress = (journeyScrollTop - 1850) / 100
      journeyFooterOpacity = progress
      journeyFooterTranslateY = 30 * (1 - progress)
    } else {
      journeyFooterOpacity = 1
      journeyFooterTranslateY = 0
    }
  }

  const edScale = 1 // 0.95 + (Math.max(0, Math.min(750, journeyScrollTop - 350)) / 750) * 0.25

  // --- HOME CINEMATIC MATH ---
  // Phase 1: 0 - 1000px -> Image shrinks/moves and Tickers zoom simultaneously
  const homeProgress = Math.min(1, homeScrollTop / 1000)
  
  const homeImageScale = 1 - (0.5 * homeProgress)
  const homeImageTranslateY = homeProgress * 500
  const homeImageOpacity = Math.max(0, 1 - (homeProgress * 1.2)) // Fades out as it moves down
  const homeTickerScale = 1 + (homeProgress * 15)
  
  // Phase 2: 800 - 1100px -> Main container fades out, About image fades in
  const fadeOutProgress = Math.max(0, Math.min(1, (homeScrollTop - 800) / 300))
  const homeMainOpacity = 1 - fadeOutProgress
  const aboutImageOpacity = fadeOutProgress
  
  // Phase 3: 1100 - 1400px -> About box fades in strictly AFTER the image is fully visible
  const aboutBoxOpacity = Math.max(0, Math.min(1, (homeScrollTop - 1100) / 300))
  
  // Staggered opacities for "one by one" effect on left/right columns
  const stagger1 = Math.max(0, Math.min(1, (aboutBoxOpacity - 0.0) * 2))
  const stagger2 = Math.max(0, Math.min(1, (aboutBoxOpacity - 0.2) * 2))
  const stagger3 = Math.max(0, Math.min(1, (aboutBoxOpacity - 0.4) * 2))
  const stagger4 = Math.max(0, Math.min(1, (aboutBoxOpacity - 0.6) * 2))



  return (
    <div className={`homepage-wrapper ${activeTab === 'Skills' ? 'dark-theme' : ''}`}>
      <header className={`capsule-header ${mobileMenuOpen ? 'expanded' : ''}`}>
        <div className="capsule-nav-container">
          {/* Left Links (Desktop) */}
          <div className="nav-group left-nav">
            <a
              href="#home"
              className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`}
              onClick={() => handleNavClick('Home')}
            >
              Home
            </a>
            <a
              href="#about"
              className={`nav-item ${activeTab === 'About' ? 'active' : ''}`}
              onClick={() => handleNavClick('About')}
            >
              Journey
            </a>
            <a
              href="#skills"
              className={`nav-item ${activeTab === 'Skills' ? 'active' : ''}`}
              onClick={() => handleNavClick('Skills')}
            >
              Skills
            </a>
          </div>

          {/* Logo (Center on Desktop) */}
          <div className="nav-logo">
            <div className="logo-circle">
              <img src="/Ma logo.png" alt="MA Logo" className="logo-img" />
            </div>
            <span className="logo-text">
              <span className="logo-short">AHAMED</span>
              <span className="logo-long">Muckthar Ahamed R</span>
            </span>
          </div>

          {/* Right Links (Desktop) */}
          <div className="nav-group right-nav">
            <a
              href="#project"
              className={`nav-item ${activeTab === 'Project' ? 'active' : ''}`}
              onClick={() => handleNavClick('Project')}
            >
              Project
            </a>
            <a
              href="#resume"
              className={`nav-item ${activeTab === 'Resume' ? 'active' : ''}`}
              onClick={() => handleNavClick('Resume')}
            >
              Resume
            </a>
            <a
              href="#contact"
              className={`nav-item ${activeTab === 'Contact' ? 'active' : ''}`}
              onClick={() => handleNavClick('Contact')}
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>

        {/* Mobile Dropdown Links */}
        <div className={`mobile-nav-links ${mobileMenuOpen ? 'show' : ''}`}>
          <a
            href="#home"
            className={`mobile-nav-item ${activeTab === 'Home' ? 'active' : ''}`}
            onClick={() => handleNavClick('Home')}
          >
            Home
          </a>
          <a
            href="#about"
            className={`mobile-nav-item ${activeTab === 'About' ? 'active' : ''}`}
            onClick={() => handleNavClick('About')}
          >
            Journey
          </a>
          <a
            href="#skills"
            className={`mobile-nav-item ${activeTab === 'Skills' ? 'active' : ''}`}
            onClick={() => handleNavClick('Skills')}
          >
            Skills
          </a>
          <a
            href="#project"
            className={`mobile-nav-item ${activeTab === 'Project' ? 'active' : ''}`}
            onClick={() => handleNavClick('Project')}
          >
            Project
          </a>
          <a
            href="#resume"
            className={`mobile-nav-item ${activeTab === 'Resume' ? 'active' : ''}`}
            onClick={() => handleNavClick('Resume')}
          >
            Resume
          </a>
          <a
            href="#contact"
            className={`mobile-nav-item ${activeTab === 'Contact' ? 'active' : ''}`}
            onClick={() => handleNavClick('Contact')}
          >
            Contact
          </a>
        </div>
      </header>

      {/* Global Fixed Vertical Social Links */}
      <div 
        className={`vertical-social-sidebar left-social ${activeTab !== 'Home' ? 'hidden' : ''}`}
        style={{ opacity: activeTab === 'Home' ? homeImageOpacity : 0, transition: 'opacity 0.2s ease-out' }}
      >
        <a href="https://www.instagram.com/_.ahmdz._/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
      </div>
      <div 
        className={`vertical-social-sidebar right-social ${activeTab !== 'Home' ? 'hidden' : ''}`}
        style={{ opacity: activeTab === 'Home' ? homeImageOpacity : 0, transition: 'opacity 0.2s ease-out' }}
      >
        <a href="https://www.linkedin.com/in/mucktharahamed-r-data-analyst" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
      </div>

      <main className="main-content">
        <div key={activeTab} className="tab-transition-wrapper">
          {activeTab === 'Skills' ? (
            <div className="skills-view" onScroll={handleScroll}>
              {/* 1. HERO INTRO VIEW (Zooms forward and fades out) */}
              <div
                className="skills-hero-section"
                style={{
                  opacity: heroOpacity,
                  transform: `scale(${heroScale})`,
                  visibility: heroOpacity === 0 ? 'hidden' : 'visible',
                  pointerEvents: 'none'
                }}
              >
                {/* Floating Technology Logo Icons in Background */}
                <div className="floating-tech-container">
                  <img src="/Icons/Python icon.png" alt="Python" className="tech-logo logo-py" />
                  <img src="/Icons/React.png" alt="React" className="tech-logo logo-react" />
                  <img src="/Icons/Js icon.webp" alt="JavaScript" className="tech-logo logo-js" />
                  <img src="/Icons/Node icon.jpg" alt="Node.js" className="tech-logo logo-node" />
                  <img src="/Icons/Mysql icon.png" alt="MySQL" className="tech-logo logo-sql" />
                  <img src="/Icons/Postgresql icon.jpg" alt="PostgreSQL" className="tech-logo logo-postgres" />
                  <img src="/Icons/Html icon.png" alt="HTML" className="tech-logo logo-html" />
                  <img src="/Icons/Css icon.png" alt="CSS" className="tech-logo logo-css" />
                  <img src="/Icons/Powerbi.webp" alt="Power BI" className="tech-logo logo-powerbi" />
                  <img src="/Icons/Tableau.png" alt="Tableau" className="tech-logo logo-tableau" />
                  <img src="/Icons/Chatgpt icon.png" alt="ChatGPT" className="tech-logo logo-chatgpt" />
                  <img src="/Icons/Railway icon.png" alt="Railway" className="tech-logo logo-railway" />
                  <img src="/Icons/Render icon.png" alt="Render" className="tech-logo logo-render" />
                  <img src="/Icons/Vercel.jpg" alt="Vercel" className="tech-logo logo-vercel" />
                  <img src="/Icons/Vs Code logo.png" alt="VS Code" className="tech-logo logo-vscode" />
                  <img src="/Icons/google_antigravity-logo.png" alt="Antigravity" className="tech-logo logo-antigravity" />
                </div>

                {/* Top-Right Tagline */}
                <div className="skills-tagline">
                  Experienced in Data Cleaning, Exploratory Data Analysis, <br />
                  and Relational Database Design
                </div>

                {/* Centered Main Title */}
                <h1 className="skills-main-title">
                  Skills that fuel my <br />
                  passion
                </h1>

                {/* Bottom-Left Quote */}
                <div className="skills-quote">
                  Without data, you're just another person with an opinion <br />
                  <span className="quote-author">— W. Edwards Deming</span>
                </div>

                {/* Scroll Down Indicator */}
                <div className="scroll-indicator">
                  <span>Scroll to explore</span>
                  <div className="indicator-arrow"></div>
                </div>
              </div>

              {/* Spacer to absorb scroll translation before cards grid appears */}
              <div className="skills-scroll-spacer"></div>

              {/* 2. SKILL CARDS GRID SECTION (Masonry Column Stacks) */}
              <div className={`skills-grid-section ${showCards ? 'active-cards' : ''}`}>
                <div className="skills-grid-columns">
                  {/* Column 1 */}
                  <div className="skills-column">
                    {/* Front-End Development (Black card) */}
                    <div className="skill-card" style={{ animationDelay: '0s' }}>
                      <div className="card-icons">
                        <img src="/Icons/Html icon.png" alt="HTML" />
                        <img src="/Icons/Css icon.png" alt="CSS" />
                        <img src="/Icons/Ts icon.svg" alt="TypeScript" />
                        <img src="/Icons/React.png" alt="React" />
                      </div>
                      <h3 className="card-title">Front-End Development</h3>
                      <p className="card-desc">Building engaging and user-friendly web interfaces using modern frameworks and technologies with expertise.</p>
                    </div>

                    {/* Programming Language (Black card) */}
                    <div className="skill-card" style={{ animationDelay: '0.18s' }}>
                      <div className="card-icons">
                        <img src="/Icons/Python icon.png" alt="Python" />
                        <img src="/Icons/R icon.svg" alt="R Language" />
                      </div>
                      <h3 className="card-title">Programming Language</h3>
                      <p className="card-desc">Proficient in problem-solving and applying programming languages to implement efficient data structures and algorithms.</p>
                    </div>

                    {/* Data Analytics & Visualization (Black card) */}
                    <div className="skill-card" style={{ animationDelay: '0.42s' }}>
                      <div className="card-icons">
                        <img src="/Icons/Powerbi.webp" alt="Power BI" />
                        <img src="/Icons/Tableau.png" alt="Tableau" />
                      </div>
                      <h3 className="card-title">Data Analytics & Visualization</h3>
                      <p className="card-desc">Analyzing complex datasets and building interactive business intelligence dashboards and visuals.</p>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="skills-column">
                    {/* Database Management (Black card) */}
                    <div className="skill-card" style={{ animationDelay: '0.06s' }}>
                      <div className="card-icons">
                        <img src="/Icons/Postgresql icon.jpg" alt="PostgreSQL" />
                        <img src="/Icons/Mysql icon.png" alt="MySQL" />
                        <img src="/Icons/Mongodb icon.svg" alt="MongoDB" />
                      </div>
                      <h3 className="card-title">Database Management</h3>
                      <p className="card-desc">Designing and managing databases to ensure secure and efficient data storage and retrieval.</p>
                    </div>

                    {/* Cloud & Deployment (Black card) */}
                    <div className="skill-card" style={{ animationDelay: '0.24s' }}>
                      <div className="card-icons">
                        <img src="/Icons/Render icon.png" alt="Render" />
                        <img src="/Icons/Vercel.jpg" alt="Vercel" />
                        <img src="/Icons/Railway icon.png" alt="Railway" />
                        <img src="/Icons/Aws icon.svg" alt="AWS" />
                        <img src="/Icons/Gcp icon.svg" alt="Google Cloud" />
                      </div>
                      <h3 className="card-title">Cloud & Deployment</h3>
                      <p className="card-desc">Experienced in deploying and managing applications using modern cloud platforms and tools.</p>
                    </div>

                    {/* Development Tools & AI (Black card) */}
                    <div className="skill-card" style={{ animationDelay: '0.48s' }}>
                      <div className="card-icons">
                        <img src="/Icons/Vs Code logo.png" alt="VS Code" />
                        <img src="/Icons/Chatgpt icon.png" alt="ChatGPT" />
                        <img src="/Icons/google_antigravity-logo.png" alt="Google Antigravity" />
                        <img src="/Icons/Gemini icon.svg" alt="Google Gemini" />
                        <img src="/Icons/Claude icon.svg" alt="Claude AI" />
                      </div>
                      <h3 className="card-title">Development Tools & AI</h3>
                      <p className="card-desc">Utilizing modern IDEs and AI coding assistants to optimize build speed and code quality.</p>
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div className="skills-column">
                    {/* Back-End Development (Black card) */}
                    <div className="skill-card" style={{ animationDelay: '0.12s' }}>
                      <div className="card-icons">
                        <img src="/Icons/Node icon.jpg" alt="Node.js" />
                      </div>
                      <h3 className="card-title">Back-End Development</h3>
                      <p className="card-desc">Developing robust server-side logic and APIs to power dynamic and scalable web applications.</p>
                    </div>

                    {/* Side-by-Side Wrapper (Version Control & Testing) */}
                    <div className="side-by-side-wrapper">
                      {/* Version Control & Collaboration (Black card) */}
                      <div className="skill-card" style={{ animationDelay: '0.3s' }}>
                        <div className="card-icons">
                          <img src="/Icons/Git icon.svg" alt="Git" />
                          <img src="/Icons/Github icon.svg" alt="GitHub" />
                        </div>
                        <h3 className="card-title">Version Control & Collaboration</h3>
                        <p className="card-desc">Effectively managing code and collaborating on projects to ensure teamwork.</p>
                      </div>

                      {/* Testing & Debugging (Black card) */}
                      <div className="skill-card" style={{ animationDelay: '0.36s' }}>
                        <div className="card-icons">
                          <img src="/Icons/Postman icon.svg" alt="Postman" />
                        </div>
                        <h3 className="card-title">Testing & Debugging</h3>
                        <p className="card-desc">Proficient in API testing, automation, and debugging solutions.</p>
                      </div>
                    </div>

                    {/* UI/UX Design (Black card) */}
                    <div className="skill-card" style={{ animationDelay: '0.54s' }}>
                      <div className="card-icons">
                        <img src="/Icons/Figma icon.svg" alt="Figma" />
                        <img src="/Icons/Canva icon.svg" alt="Canva" />
                      </div>
                      <h3 className="card-title">UI/UX Design</h3>
                      <p className="card-desc">Designing user-centric interfaces that are intuitive, visually appealing, and easy to navigate.</p>
                    </div>

                    {/* Personal Development (Black card) */}
                    <div className="skill-card" style={{ animationDelay: '0.6s' }}>
                      <div className="card-tags">
                        <span className="card-tag">Problem Solving</span>
                        <span className="card-tag">Communication</span>
                        <span className="card-tag">Leadership</span>
                        <span className="card-tag">Stress Tolerance</span>
                        <span className="card-tag">Detail Oriented & Logical Thinking</span>
                        <span className="card-tag">Proactiveness</span>
                      </div>
                      <h3 className="card-title">Personal Development</h3>
                      <p className="card-desc">Committed to continuous learning and personal development to deliver exceptional results.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. PROFESSIONAL ENDING FOOTER */}
              <div className="skills-footer">
                <div className="footer-top">
                  <p className="footer-subtitle">That's all for now.</p>
                  <h2 className="footer-title">Got a project in mind?<br />Let's talk</h2>
                </div>

                <div className="footer-divider-container">
                  <div className="footer-divider-line"></div>
                  <button className="footer-get-in-touch-btn" onClick={() => handleNavClick('Contact')}>
                    Get in touch
                  </button>
                </div>

                <div className="footer-bottom">
                  <div className="footer-contact-item">
                    <span className="footer-contact-label">Email:</span>
                    <a href="mailto:ahamed.muckthar.r@gmail.com" className="footer-contact-value">ahamed.muckthar.r@gmail.com</a>
                  </div>
                  <div className="footer-contact-item">
                    <span className="footer-contact-label">Phone</span>
                    <a href="tel:+919150364212" className="footer-contact-value">(+91) 9150364212</a>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'About' ? (
            <div className="journey-page-container" onScroll={handleJourneyScroll}>
              <div className="journey-scroll-track">
                <div className="journey-sticky-viewport">

                  {/* 1. HERO INTRO VIEW (Zooms forward and fades out) */}
                  <div
                    className="journey-sticky-section quotes-section"
                    style={{
                      opacity: qOpacity,
                      transform: `scale(${qScale})`,
                      visibility: qOpacity === 0 ? 'hidden' : 'visible',
                      pointerEvents: qOpacity === 0 ? 'none' : 'auto'
                    }}
                  >


                    {/* Top-Right Tagline */}
                    <div className="skills-tagline">
                      Every great milestone begins with the choice to learn, <br />
                      the drive to solve, and courage to build.
                    </div>

                    {/* Centered Main Title */}
                    <h1 className="skills-main-title">
                      The Journal of a Student <br />
                      who dareed to Build
                    </h1>

                    {/* Bottom-Left Quote */}
                    <div className="skills-quote">
                      This is the Timeline from <br />
                      Classroom to Career.
                    </div>

                    {/* Scroll Down Indicator */}
                    <div className="scroll-indicator">
                      <span>Scroll to explore</span>
                      <div className="indicator-arrow"></div>
                    </div>
                  </div>

                  {/* 2. EDUCATION TIMELINE MAP */}
                  <div
                    className="journey-sticky-section education-section"
                    style={{
                      opacity: edOpacity,
                      transform: `scale(${edScale})`,
                      visibility: edOpacity === 0 ? 'hidden' : 'visible',
                      pointerEvents: edOpacity === 0 ? 'none' : 'auto'
                    }}
                  >
                      <div 
                        className="journey-minimal-content"
                        style={{
                          transform: `translateY(${timelineTranslateY}px)`,
                          transition: 'transform 0.1s ease-out'
                        }}
                      >
                      <h2 
                        className="journey-title-minimal"
                        style={{
                          opacity: edHeaderOpacity,
                          transform: `translateY(${edHeaderTranslateY}vh) scale(${0.9 + edHeaderOpacity * 0.1})`,
                          transition: 'opacity 0.1s ease, transform 0.1s ease'
                        }}
                      >
                        Educational Qualification
                      </h2>
                      <div className="journey-timeline-map">
                        <div 
                          className="journey-timeline-line"
                          style={{
                            opacity: edLineOpacity,
                            transition: 'opacity 0.1s ease'
                          }}
                        ></div>

                        {/* College */}
                        <div 
                          className="journey-timeline-grid"
                          style={{
                            opacity: edItem1Opacity,
                            transform: `translateY(${edItem1Translate}px)`,
                            transition: 'opacity 0.1s ease, transform 0.1s ease'
                          }}
                        >
                          <div className="timeline-badge-group left-align">
                            <span className="timeline-year">Sep 2023 - Present</span>
                            <div className="timeline-circle-badge orange-theme">
                              <img src="/Icons/Svcet.png" alt="SVCET" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                            </div>
                            <div className="timeline-connector-line"></div>
                          </div>
                          <div className="timeline-center-node orange-theme">
                            <div className="timeline-dot-inner"></div>
                          </div>
                          <div className="timeline-text-content right-align">
                            <h3 className="timeline-item-title">Bachelor of Technology in Computer Science and Engineering</h3>
                            <p className="timeline-item-institution">Sri Venkateshwaraa College of Engineering and Technology</p>
                            <p className="timeline-item-details">Expected Graduation : 2027 | CGPA : 7.6</p>
                          </div>
                        </div>

                        {/* 12th Grade */}
                        <div 
                          className="journey-timeline-grid alternate"
                          style={{
                            opacity: edItem2Opacity,
                            transform: `translateY(${edItem2Translate}px)`,
                            transition: 'opacity 0.1s ease, transform 0.1s ease'
                          }}
                        >
                          <div className="timeline-text-content left-align">
                            <h3 className="timeline-item-title">Higher Secondary Education (Class XII)</h3>
                            <p className="timeline-item-institution">Aristo Public School</p>
                            <p className="timeline-item-details">Passed out Year: 2023 | Percentage : 64%</p>
                          </div>
                          <div className="timeline-center-node teal-theme">
                            <div className="timeline-dot-inner"></div>
                          </div>
                          <div className="timeline-badge-group right-align">
                            <div className="timeline-connector-line"></div>
                            <div className="timeline-circle-badge teal-theme">
                              <img src="/Icons/Aps avenue.png" alt="APS Avenue" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                            </div>
                            <span className="timeline-year">Mar 2022 - Sep 2023</span>
                          </div>
                        </div>

                        {/* 10th Grade */}
                        <div 
                          className="journey-timeline-grid"
                          style={{
                            opacity: edItem3Opacity,
                            transform: `translateY(${edItem3Translate}px)`,
                            transition: 'opacity 0.1s ease, transform 0.1s ease'
                          }}
                        >
                          <div className="timeline-badge-group left-align">
                            <span className="timeline-year">Jun 2020 - May 2021</span>
                            <div className="timeline-circle-badge blue-theme">
                              <img src="/Icons/Aps avenue.png" alt="APS Avenue" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                            </div>
                            <div className="timeline-connector-line"></div>
                          </div>
                          <div className="timeline-center-node blue-theme">
                            <div className="timeline-dot-inner"></div>
                          </div>
                          <div className="timeline-text-content right-align">
                            <h3 className="timeline-item-title">Secondary Education (Class X)</h3>
                            <p className="timeline-item-institution">Aristo Public School</p>
                            <p className="timeline-item-details">Passed out Year: 2021</p>
                          </div>
                        </div>
                      </div>

                      {/* Certifications Section */}
                      <div className="journey-certifications">
                        <h2 
                          className="journey-title-minimal"
                          style={{
                            opacity: certHeaderOpacity,
                            transform: `translateY(${certHeaderTranslateY}px)`,
                            transition: 'opacity 0.1s ease, transform 0.1s ease',
                            visibility: certHeaderOpacity === 0 ? 'hidden' : 'visible'
                          }}
                        >
                          Certifications
                        </h2>
                        
                        <div className="cert-cards-container">
                          {/* Card 1 */}
                          <div 
                            className="cert-card"
                            style={{
                              opacity: certCard1Opacity,
                              transform: `translateY(${certCard1TranslateY}px)`,
                              transition: 'opacity 0.1s ease, transform 0.1s ease',
                              visibility: certCard1Opacity === 0 ? 'hidden' : 'visible'
                            }}
                          >
                            <div className="cert-card-icon">
                              <img src="/Icons/Forage.jpg" alt="Forage Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <h3 className="cert-card-title">Data Analytics Job Simulation</h3>
                            <p className="cert-card-issuer">Forage</p>
                            <p className="cert-card-desc">Completed a Deloitte job simulation involving data analysis and forensic technology. Created a data dashboard using Tableau. Used Excel to classify data and draw business conclusions.</p>
                            <a 
                              href="https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_696a1d6e2e40c7c03cf057a2_1768740179732_completion_certificate.pdf" 
                              target="_blank" 
                              rel="noreferrer"
                              className="cert-credential-btn"
                            >
                              Show credentials
                            </a>
                          </div>
                          
                          {/* Card 2 */}
                          <div 
                            className="cert-card"
                            style={{
                              opacity: certCard2Opacity,
                              transform: `translateY(${certCard2TranslateY}px)`,
                              transition: 'opacity 0.1s ease, transform 0.1s ease',
                              visibility: certCard2Opacity === 0 ? 'hidden' : 'visible'
                            }}
                          >
                            <div className="cert-card-icon">
                              <img src="/Icons/Anthropy.jpg" alt="Anthropic Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <h3 className="cert-card-title">AI Fluency Framework & Foundations</h3>
                            <p className="cert-card-issuer">Anthropic</p>
                            <p className="cert-card-desc">Mastered fundamental AI concepts including large language models, generative AI, and prompt engineering frameworks. Gained hands-on understanding of ethical AI practices and how to leverage AI tools for practical problem-solving.</p>
                            <a 
                              href="https://verify.skilljar.com/c/k5mng655m8vt" 
                              target="_blank" 
                              rel="noreferrer"
                              className="cert-credential-btn"
                            >
                              Show credentials
                            </a>
                          </div>
                          
                          {/* Card 3 */}
                          <div 
                            className="cert-card"
                            style={{
                              opacity: certCard3Opacity,
                              transform: `translateY(${certCard3TranslateY}px)`,
                              transition: 'opacity 0.1s ease, transform 0.1s ease',
                              visibility: certCard3Opacity === 0 ? 'hidden' : 'visible'
                            }}
                          >
                            <div className="cert-card-icon">
                              <img src="/Icons/Variablz.jpg" alt="Variablz Technologies Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <h3 className="cert-card-title">Python Essentials</h3>
                            <p className="cert-card-issuer">Variablz Technologies</p>
                            <p className="cert-card-desc">Gained foundational proficiency in Python, focusing on core syntax, control structures, functions, and writing clean, efficient code through practical exercises.</p>
                            <a 
                              href="https://variablz.com/wp-content/uploads/2025/06/C24-0019.pdf" 
                              target="_blank" 
                              rel="noreferrer"
                              className="cert-credential-btn"
                            >
                              Show credentials
                            </a>
                          </div>
                          
                          {/* Card 4 */}
                          <div 
                            className="cert-card"
                            style={{
                              opacity: certCard4Opacity,
                              transform: `translateY(${certCard4TranslateY}px)`,
                              transition: 'opacity 0.1s ease, transform 0.1s ease',
                              visibility: certCard4Opacity === 0 ? 'hidden' : 'visible'
                            }}
                          >
                            <div className="cert-card-icon">
                              <img src="/Icons/Variablz.jpg" alt="Variablz Technologies Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <h3 className="cert-card-title">PostgreSQL Essentials</h3>
                            <p className="cert-card-issuer">Variablz Technologies</p>
                            <p className="cert-card-desc">Gained foundational knowledge of PostgreSQL, including relational database concepts, SQL querying, table design, and data manipulation.</p>
                            <a 
                              href="https://variablz.com/wp-content/uploads/2025/06/C24-0018.pdf" 
                              target="_blank" 
                              rel="noreferrer"
                              className="cert-credential-btn"
                            >
                              Show credentials
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Experience Section */}
                      <div className="journey-experience" style={{ marginTop: '100px', paddingBottom: '100px', width: '100%' }}>
                        <h2 
                          className="journey-title-minimal"
                          style={{
                            opacity: expHeaderOpacity,
                            transform: `translateY(${expHeaderTranslateY}px)`,
                            transition: 'opacity 0.1s ease, transform 0.1s ease',
                            visibility: expHeaderOpacity === 0 ? 'hidden' : 'visible',
                            textAlign: 'center'
                          }}
                        >
                          Experience
                        </h2>
                        
                        <div className="journey-timeline-map" style={{ marginTop: '60px' }}>
                          <div className="journey-timeline-line" style={{ opacity: expHeaderOpacity }}></div>
                          
                          {/* Experience Item 1 */}
                          <div 
                            className="journey-timeline-grid"
                            style={{
                              opacity: expItem1Opacity,
                              transform: `translateY(${expItem1TranslateY}px)`,
                              transition: 'opacity 0.1s ease, transform 0.1s ease',
                              visibility: expItem1Opacity === 0 ? 'hidden' : 'visible',
                              marginBottom: 0
                            }}
                          >
                            <div className="timeline-text-content left-align">
                              <h3 className="timeline-item-title">
                                <a 
                                  href="/Backend Intern Certificate.pdf" 
                                  target="_blank" 
                                  rel="noreferrer"
                                  style={{ color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                  Back-End Developer [Intern]
                                </a>
                              </h3>
                              <p className="timeline-item-institution">SmartGoNext Software Solution</p>
                              <div className="timeline-item-details" style={{ marginTop: '15px' }}>
                                <p style={{ margin: 0, color: 'rgba(18, 18, 18, 0.8)', fontSize: '1rem', lineHeight: '1.6' }}>
                                  Worked on Data Handling and Database Management System. Optimized Queries and APIs for efficient data processing. Supported basic data analysis for decision making.
                                </p>
                              </div>
                            </div>
                            <div className="timeline-center-node orange-theme">
                              <div className="timeline-dot-inner"></div>
                            </div>
                            <div className="timeline-badge-group right-align">
                              <div className="timeline-connector-line"></div>
                              <div className="timeline-circle-badge orange-theme">
                                <svg viewBox="0 0 24 24" className="timeline-icon"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" fill="currentColor"/></svg>
                              </div>
                              <span className="timeline-year">Nov 2025 - Jan 2026</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 3. JOURNEY ENDING FOOTER */}
                      <div 
                        className="journey-footer"
                        style={{
                          opacity: journeyFooterOpacity,
                          transform: `translateY(${journeyFooterTranslateY}px)`,
                          transition: 'opacity 0.1s ease, transform 0.1s ease',
                          visibility: journeyFooterOpacity === 0 ? 'hidden' : 'visible'
                        }}
                      >
                        <div className="footer-top">
                          <p className="footer-subtitle">THAT'S ALL FOR NOW.</p>
                          <h2 className="footer-title">Got a project in mind?<br />Let's talk</h2>
                        </div>
        
                        <div className="footer-divider-container">
                          <div className="footer-divider-line"></div>
                          <button className="footer-get-in-touch-btn" onClick={() => handleNavClick('Contact')}>
                            Get in touch
                          </button>
                        </div>
        
                        <div className="footer-bottom">
                          <div className="footer-contact-item">
                            <span className="footer-contact-label">EMAIL</span>
                            <a href="mailto:ahamed.muckthar.r@gmail.com" className="footer-contact-value">ahamed.muckthar.r@gmail.com</a>
                          </div>
                          <div className="footer-contact-item">
                            <span className="footer-contact-label">PHONE</span>
                            <a href="tel:+919150364212" className="footer-contact-value">(+91) 9150364212</a>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>


                </div>
              </div>
            </div>
          ) : activeTab === 'Project' ? (
            <div className="project-view" style={{ backgroundColor: '#fff', width: '100vw', height: '100vh' }}>
              {/* Blank white project tab as requested */}
            </div>
          ) : activeTab === 'Contact' ? (
            <div className="contact-page-container" onMouseMove={handleContactMouseMove}>
              <div className="contact-mouse-glow" ref={contactGlowRef}></div>
              <div className="contact-card-wrapper">
                {/* Left Side: Contact Info Panel */}
                <div className="contact-info-panel">
                  <h2 className="contact-info-title stagger-fade-in" style={{ animationDelay: '0.2s' }}>Let's discuss your Project</h2>
                  <p className="contact-info-desc stagger-fade-in" style={{ animationDelay: '0.3s' }}>
                    Whether you have a question, a project idea, or just want to say hi, I'm always open to new opportunities.
                  </p>

                  <div className="contact-info-block stagger-fade-in" style={{ animationDelay: '0.4s' }}>
                    <div className="contact-icon-circle">
                      <svg viewBox="0 0 24 24" className="icon-svg-mail">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="contact-info-text">
                      <span className="contact-info-label">EMAIL ME</span>
                      <a href="mailto:ahamed.muckthar.r@gmail.com" className="contact-info-value">
                        ahamed.muckthar.r@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="contact-follow-block stagger-fade-in" style={{ animationDelay: '0.5s' }}>
                    <span className="contact-follow-label">FOLLOW ME</span>
                    <div className="contact-social-row">
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon-circle">
                        <svg viewBox="0 0 24 24" className="social-icon-svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z" fill="currentColor" /></svg>
                      </a>
                      <a href="https://www.linkedin.com/in/mucktharahamed-r-data-analyst" target="_blank" rel="noopener noreferrer" className="social-icon-circle">
                        <svg viewBox="0 0 24 24" className="social-icon-svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="currentColor" /></svg>
                      </a>
                      <a href="https://www.instagram.com/_.ahmdz._/" target="_blank" rel="noopener noreferrer" className="social-icon-circle">
                        <svg viewBox="0 0 24 24" className="social-icon-svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor" /></svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Side: Contact Form Panel */}
                <div className="contact-form-panel">
                  {!contactIsSent ? (
                    <form
                      className="contact-split-form"
                      onSubmit={async (e) => {
                        e.preventDefault()
                        if (contactName.trim() && contactEmail.trim() && contactSubject.trim() && contactMessage.trim()) {
                          setIsSubmitting(true)
                          try {
                            const res = await fetch("https://api.web3forms.com/submit", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                              },
                              body: JSON.stringify({
                                access_key: "f70dde7f-73c2-4b1d-a8a6-dda22bc21ca8",
                                name: contactName,
                                email: contactEmail,
                                subject: contactSubject,
                                message: contactMessage,
                              }),
                            })
                            const result = await res.json()
                            if (result.success) {
                              setContactIsSent(true)
                            } else {
                              alert("Oops! Something went wrong. Please try again.")
                            }
                          } catch (error) {
                            console.error(error)
                            alert("Oops! Network error. Please try again.")
                          } finally {
                            setIsSubmitting(false)
                          }
                        }
                      }}
                    >
                      <div className="form-row-half">
                        <div className="form-group stagger-fade-in" style={{ animationDelay: '0.3s' }}>
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            className="form-input-field"
                            placeholder="John Doe"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group stagger-fade-in" style={{ animationDelay: '0.4s' }}>
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-input-field"
                            placeholder="john@example.com"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group full-width stagger-fade-in" style={{ animationDelay: '0.5s' }}>
                        <label className="form-label">Subject</label>
                        <input
                          type="text"
                          className="form-input-field"
                          placeholder="Project Discussion"
                          value={contactSubject}
                          onChange={(e) => setContactSubject(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group full-width stagger-fade-in" style={{ animationDelay: '0.6s' }}>
                        <label className="form-label">Message</label>
                        <textarea
                          className="form-input-field form-textarea-field"
                          placeholder="Tell me about your project..."
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          required
                        ></textarea>
                      </div>

                      <button type="submit" className="contact-submit-btn stagger-fade-in" style={{ animationDelay: '0.7s' }} disabled={isSubmitting}>
                        <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                        {!isSubmitting && (
                          <svg viewBox="0 0 24 24" className="icon-svg-plane">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor" />
                          </svg>
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="contact-success-view">
                      <div className="success-icon-badge">
                        <svg viewBox="0 0 24 24" className="success-checkmark-icon">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
                        </svg>
                      </div>
                      <h3 className="success-title">Message Transmitted!</h3>
                      <p className="success-desc">
                        Thank you, <strong>{contactName}</strong>! Your message regarding <em>"{contactSubject}"</em> has been successfully routed. I will follow up at <strong>{contactEmail}</strong> within 24 hours.
                      </p>
                      <button
                        className="success-reset-btn"
                        onClick={() => {
                          setContactName('')
                          setContactEmail('')
                          setContactSubject('')
                          setContactMessage('')
                          setContactIsSent(false)
                        }}
                      >
                        Send Another Message
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="home-scroll-track" onScroll={(e) => setHomeScrollTop(e.target.scrollTop)}>
              <div className="home-sticky-viewport">
                
                {/* The Cinematic Container */}
                <div className="center-container" style={{ opacity: homeMainOpacity, transition: 'opacity 0.2s ease-out' }}>
                  <div className="background-ticker-container" style={{ transform: `scale(${homeTickerScale})`, transformOrigin: 'center center', marginTop: '-12vh', transition: 'transform 0.2s ease-out' }}>
                    <div className="background-ticker ticker-left">
                      <div className="ticker-track">
                        <span className="ticker-item color-white">DATA SCIENTIST</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-black">FULL STACK DEVELOPER</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-white">FREELANCER</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-black">DATA ANALYST</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-white">DATA SCIENTIST</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-black">FULL STACK DEVELOPER</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-white">FREELANCER</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-black">DATA ANALYST</span>
                        <span className="ticker-bullet">•</span>
                      </div>
                    </div>
                    <div className="background-ticker ticker-right">
                      <div className="ticker-track">
                        <span className="ticker-item color-black">DATA SCIENTIST</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-white">FULL STACK DEVELOPER</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-black">FREELANCER</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-white">DATA ANALYST</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-black">DATA SCIENTIST</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-white">FULL STACK DEVELOPER</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-black">FREELANCER</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-white">DATA ANALYST</span>
                        <span className="ticker-bullet">•</span>
                      </div>
                    </div>
                  </div>

                  <div className="animate-fade-in-up" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', position: 'absolute', bottom: 0, zIndex: 10 }}>
                    <img 
                      src="/home.png" 
                      alt="Ahamed Portrait" 
                      className="centered-image" 
                      style={{ 
                        opacity: homeImageOpacity,
                        transform: `scale(${homeImageScale}) translateY(${homeImageTranslateY}px)`, 
                        transformOrigin: 'bottom center',
                        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                  </div>
                </div>

                {/* The About Canvas (3-Column Layout) */}
                <div 
                  className="about-split-layout"
                  style={{
                    opacity: aboutImageOpacity,
                    pointerEvents: aboutImageOpacity > 0 ? 'auto' : 'none',
                    transition: 'opacity 0.2s ease-out',
                    transform: `translateY(${50 * (1 - aboutImageOpacity)}px)`
                  }}
                >
                  {/* LEFT COLUMN */}
                  <div className="about-content-left">
                    <div className="about-section-label" style={{ opacity: stagger1, transform: `translateY(${20 * (1 - stagger1)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                      ABOUT ME <span className="label-line"></span>
                    </div>
                    
                    <h1 className="about-name-title" style={{ opacity: stagger1, transform: `translateY(${20 * (1 - stagger1)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>R. Muckthar<br/>Ahamed</h1>
                    
                    <h3 className="about-subtitle" style={{ opacity: stagger2, transform: `translateY(${20 * (1 - stagger2)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>AI Engineer • Data Scientist • Full Stack Developer</h3>
                    
                    <p className="about-description" style={{ opacity: stagger2, transform: `translateY(${20 * (1 - stagger2)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                      As a hybrid Data Analyst and Full-Stack Developer, I specialize in the intersection of data science and web technologies. From engineering robust PostgreSQL databases to developing intuitive React interfaces, I am passionate about building end-to-end products powered by intelligent data.
                    </p>
                    
                    <div className="about-action-row" style={{ opacity: stagger3, transform: `translateY(${20 * (1 - stagger3)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                      <button className="btn-dark" onClick={() => handleNavClick('Project')}>
                        <Briefcase size={18} /> View Projects
                      </button>
                    </div>
                    
                    <div className="about-divider" style={{ opacity: stagger3, transition: 'opacity 0.2s' }}></div>
                    
                    <div className="about-connect-label" style={{ opacity: stagger4, transform: `translateY(${20 * (1 - stagger4)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>Connect with me</div>
                    
                    <div className="about-social-row" style={{ opacity: stagger4, transform: `translateY(${20 * (1 - stagger4)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                      <a href="#" className="social-icon-btn"><Github size={20} /></a>
                      <a href="#" className="social-icon-btn"><Linkedin size={20} /></a>
                      <a href="#" className="social-icon-btn"><Mail size={20} /></a>
                      
                      <div className="status-pill">
                        <span className="status-dot"></span> Available for Internship
                      </div>
                    </div>
                  </div>
                  
                  {/* CENTER COLUMN (Portrait) */}
                  <div className="about-image-center">
                    <img src="/about.png" alt="About Me" className="about-portrait-bw" />
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="about-content-right">
                    <div className="about-section-label" style={{ opacity: stagger1, transform: `translateY(${20 * (1 - stagger1)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                      WHAT I DO <span className="label-line"></span>
                    </div>

                    <div className="what-i-do-stack">
                      <div className="neumorphic-card row-card" style={{ opacity: stagger2, transform: `translateY(${20 * (1 - stagger2)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                        <div className="card-icon-wrapper"><Brain size={20} /></div>
                        <div className="card-text">
                          <h4>AI & Machine Learning</h4>
                          <p>Building intelligent models and data-driven solutions.</p>
                        </div>
                      </div>
                      <div className="neumorphic-card row-card" style={{ opacity: stagger2, transform: `translateY(${20 * (1 - stagger2)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                        <div className="card-icon-wrapper"><Code size={20} /></div>
                        <div className="card-text">
                          <h4>Full Stack Development</h4>
                          <p>Developing scalable web apps with modern stacks.</p>
                        </div>
                      </div>
                      <div className="neumorphic-card row-card" style={{ opacity: stagger3, transform: `translateY(${20 * (1 - stagger3)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                        <div className="card-icon-wrapper"><BarChart size={20} /></div>
                        <div className="card-text">
                          <h4>Data Analytics</h4>
                          <p>Turning data into insights and actionable decisions.</p>
                        </div>
                      </div>
                      <div className="neumorphic-card row-card" style={{ opacity: stagger3, transform: `translateY(${20 * (1 - stagger3)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                        <div className="card-icon-wrapper"><Users size={20} /></div>
                        <div className="card-text">
                          <h4>Leadership & Teamwork</h4>
                          <p>Leading teams, winning hackathons, delivering results.</p>
                        </div>
                      </div>
                    </div>

                    <div className="about-section-label" style={{ marginTop: '25px', opacity: stagger4, transform: `translateY(${20 * (1 - stagger4)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                      AT A GLANCE <span className="label-line"></span>
                    </div>

                    <div className="glance-grid">
                      <div className="neumorphic-card grid-card" style={{ opacity: stagger4, transform: `translateY(${20 * (1 - stagger4)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                        <div className="card-icon-wrapper"><Code size={18} /></div>
                        <div className="card-text">
                          <h4>35+</h4>
                          <p>Technologies</p>
                        </div>
                      </div>
                      <div className="neumorphic-card grid-card" style={{ opacity: stagger4, transform: `translateY(${20 * (1 - stagger4)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                        <div className="card-icon-wrapper"><Trophy size={18} /></div>
                        <div className="card-text">
                          <h4>2</h4>
                          <p>Hackathons</p>
                        </div>
                      </div>
                      <div className="neumorphic-card grid-card" style={{ opacity: stagger4, transform: `translateY(${20 * (1 - stagger4)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                        <div className="card-icon-wrapper"><GraduationCap size={18} /></div>
                        <div className="card-text">
                          <h4>B.Tech CSE</h4>
                          <p>2027 Passout</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
