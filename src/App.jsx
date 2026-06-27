import { useState, useEffect } from 'react'
import './App.css'

const CALENDLY_URL = 'https://calendar.app.google/wN8366ubbwmXKxxw8'

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const el = document.documentElement
      const scrolled = el.scrollTop || document.body.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="scroll-track">
      <div className="scroll-thumb" style={{ height: `${progress}%` }} />
    </div>
  )
}

function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (value.toLowerCase().trim() === 'ready') {
      onUnlock()
    } else {
      setError(true)
      setValue('')
    }
  }

  return (
    <div className="gate">
      <div className="gate__inner">
        <div className="gate__logo">Reimagined by Mira <svg className="logo-bulb" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18.5 8.7 18.5 7a6.5 6.5 0 0 0-13 0c0 1.7.8 3.2 2 4.2.8.8 1.3 1.4 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg></div>
        <form className="gate__form" onSubmit={handleSubmit}>
          <input
            className={`gate__input${error ? ' gate__input--error' : ''}`}
            type="password"
            placeholder="Enter password"
            value={value}
            autoFocus
            onChange={e => { setValue(e.target.value); setError(false) }}
          />
          {error && <p className="gate__error">Incorrect password. Try again.</p>}
          <button className="btn-primary gate__btn" type="submit">Enter</button>
        </form>
      </div>
    </div>
  )
}

function Nav() {
  return (
    <nav className="nav">
      <div className="nav__inner">
        <div className="nav__logo">Reimagined<br />by Mira <svg className="logo-bulb" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18.5 8.7 18.5 7a6.5 6.5 0 0 0-13 0c0 1.7.8 3.2 2 4.2.8.8 1.3 1.4 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg></div>
        <a href={CALENDLY_URL} className="btn-outline" target="_blank" rel="noopener noreferrer">
          Book your Free Discovery Call
        </a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <h1 className="hero__headline">
          Career growth doesn&apos;t have to cost your authenticity.
        </h1>
        <p className="hero__subtext">
          I help ambitious professionals build careers, networks, and personal brands that create opportunity without burning themselves out.
        </p>
        <div className="hero__typewriter">
          <TypewriterSection />
        </div>
        <div className="hero__cta">
          <a
            href={CALENDLY_URL}
            className="btn-primary btn-primary--large"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book your Free Discovery Call
          </a>
        </div>
      </div>
    </section>
  )
}

const serviceIcons = {
  'Career Strategy': (
    <svg className="service-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
      <line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
    </svg>
  ),
  'Networking': (
    <svg className="service-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
      <line x1="12" y1="7" x2="5" y2="17"/><line x1="12" y1="7" x2="19" y2="17"/><line x1="5" y1="19" x2="19" y2="19"/>
    </svg>
  ),
  'Personal Brand': (
    <svg className="service-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  'Resilience & Change': (
    <svg className="service-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12"/><path d="M12 12C12 12 8 10 8 6a4 4 0 0 1 8 0c0 4-4 6-4 6z"/>
      <path d="M12 12C12 12 16 10 16 6"/><path d="M9 22h6"/>
    </svg>
  ),
}

const services = [
  {
    title: 'Career Strategy',
    items: ['Promotions & advancement', 'Career transitions', 'Leadership growth'],
  },
  {
    title: 'Networking',
    items: ['Strategic relationship building', 'Internal influence', 'Executive visibility'],
  },
  {
    title: 'Personal Brand',
    items: ['Confidence & presence', 'Communicating your value', 'Professional storytelling'],
  },
  {
    title: 'Resilience & Change',
    items: ['Difficult managers', 'Organizational politics', 'Career setbacks'],
  },
]

const typewriterPhrases = [
  'earn more.',
  'land your next role.',
  'navigate your next career move.',
  'build confidence.',
  'rebrand your professional story.',
]

function TypewriterSection() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState('typing')
  const [animOpacity, setAnimOpacity] = useState(1)

  function replay() {
    setPhrase(0)
    setDisplayed('')
    setAnimOpacity(1)
    setPhase('typing')
  }

  function setPhrase(i) {
    setPhraseIndex(i)
  }

  useEffect(() => {
    const current = typewriterPhrases[phraseIndex]
    let timeout

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55)
      } else if (phraseIndex < typewriterPhrases.length - 1) {
        timeout = setTimeout(() => setPhase('erasing'), 3000)
      } else {
        timeout = setTimeout(() => setPhase('final-fade'), 3000)
      }
    } else if (phase === 'erasing') {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30)
      } else {
        setPhraseIndex(phraseIndex + 1)
        setPhase('typing')
      }
    } else if (phase === 'final-fade') {
      setAnimOpacity(0)
      timeout = setTimeout(() => setPhase('final'), 700)
    }

    return () => clearTimeout(timeout)
  }, [displayed, phase, phraseIndex])

  if (phase === 'final') {
    return (
      <div className="typewriter-section__final">
        <p className="typewriter-section__final-line">I can be your trusted thought partner.</p>
        <a
          href={CALENDLY_URL}
          className="btn-primary btn-primary--large"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book your Free Discovery Call
        </a>
        <button className="typewriter-section__replay" onClick={replay}>
          Replay prompts
        </button>
      </div>
    )
  }

  return (
    <div className="typewriter-section__animated" style={{ opacity: animOpacity, transition: 'opacity 0.7s ease' }}>
      <p className="typewriter-section__fixed">I can help you&hellip;</p>
      <p className="typewriter-section__phrase" aria-live="polite" aria-atomic="true">
        {displayed}<span className="typewriter-section__cursor" aria-hidden="true">|</span>
      </p>
    </div>
  )
}

function Services() {
  return (
    <section className="services">
      <div className="services__inner">
        <h2 className="section-headline">What I Help With</h2>
        <div className="services__grid">
          {services.map((s, i) => (
            <div key={i} className="service-item">
              <h3 className="service-item__title">{serviceIcons[s.title]}{s.title}</h3>
              <ul className="service-item__list">
                {s.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyIStarted() {
  return (
    <section className="why-started">
      <div className="why-started__inner">
        <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18.5 8.7 18.5 7a6.5 6.5 0 0 0-13 0c0 1.7.8 3.2 2 4.2.8.8 1.3 1.4 1.5 2.5"/>
          <path d="M9 18h6"/><path d="M10 22h4"/>
        </svg>
        <h2 className="section-headline">Why Reimagined Mira</h2>
        <p><strong className="why-started__hook">I&apos;m obsessed with career strategy:</strong> positioning, networking, personal brand, and career growth. <em>I dream about this stuff so you don&apos;t have to.</em></p>
        <p>I&apos;ve reinvented my own career more than once, from business school to clinical nutrition to digital health. Along the way, I&apos;ve learned that career paths are rarely linear and that feeling stuck doesn&apos;t have to be permanent.</p>
        <p>Most commonly, people aren&apos;t lacking talent. They&apos;re often lacking perspective, accountability, and a trusted sounding board.</p>
        <p>That&apos;s why I created Reimagined by Mira.</p>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about">
      <div className="about__inner">
        <div className="about__left">
          <div className="about__avatar" aria-hidden="true">
            <span className="about__avatar-initials">M</span>
          </div>
        </div>
        <div className="about__right">
          <h2 className="section-headline">About Mira</h2>
          <p className="about__role">Healthcare Product Leader · Strategic Partnerships Lead,<br />Heart &amp; Stroke Foundation</p>
          <p className="about__body">
            For the past 8+ years, I&apos;ve worked across healthcare strategy, digital health, and product leadership while helping professionals navigate career growth, networking, personal brand, and change.
          </p>        </div>
      </div>
    </section>
  )
}


const caseStudies = [
  {
    tag: 'Early Career',
    title: 'Breaking Through Unemployment',
    challenge: 'Recent graduate unemployed for 6+ months, struggling to transition into a new field.',
    work: 'Resume positioning, transferable skills, interview preparation, and professional storytelling.',
    outcome: 'Secured a role in their target field within 3 months.',
  },
  {
    tag: 'Mid-Career',
    title: 'Navigating Compensation Conversations',
    challenge: 'Felt undercompensated and unsure how to navigate a salary conversation.',
    work: 'Identifying contributions, framing impact, and preparing for a confident compensation discussion.',
    outcome: 'Successfully negotiated an increase in salary.',
  },
  {
    tag: 'Experienced Professional',
    title: 'Beyond the Plateau',
    challenge: 'A professional with 30+ years of experience felt stuck and uncertain about what comes next.',
    work: 'Networking, relationship building, and exploring new opportunities.',
    outcome: 'Identified and pursued meaningful opportunities aligned with their goals.',
  },
]

function CaseStudies() {
  return (
    <section className="case-studies">
      <div className="case-studies__inner">
        <h2 className="section-headline">Case Studies</h2>
        <div className="case-studies__list">
          {caseStudies.map((c, i) => (
            <div key={i} className="case-study">
              <div className="case-study__tag">{c.tag}</div>
              <h3 className="case-study__title">{c.title}</h3>
              <dl className="case-study__dl">
                <dt>Challenge</dt><dd>{c.challenge}</dd>
                <dt>What We Worked On</dt><dd>{c.work}</dd>
                <dt>Outcome</dt><dd>{c.outcome}</dd>
              </dl>
            </div>
          ))}
        </div>
        <p className="case-studies__note">Details anonymized for confidentiality.</p>
      </div>
    </section>
  )
}

const testimonials = [
  {
    quote: 'Mira has a unique ability to balance practical career strategy with genuine curiosity about the person behind the career. I left feeling understood, challenged, and more confident in my next steps.',
    name: 'Senior Network Engineer',
  },
  {
    quote: 'What stood out most was Mira\'s ability to challenge my thinking while still making me feel supported. She helped me see opportunities and perspectives I hadn\'t considered on my own.',
    name: 'Director of Business Development',
  },
  {
    quote: 'Mira helped me refine my career story, strengthen how I positioned my experience, and approach networking and interviews with confidence. The advice was practical, actionable, and tailored to me.',
    name: 'Film & Media Studies Graduate',
  },
]

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonials__inner">
        <h2 className="section-headline">What It&apos;s Like to<br />Work Together</h2>
        <div className="testimonials__list">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial">
              <p className="testimonial__quote">{t.quote}</p>
              <p className="testimonial__name">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Closing() {
  return (
    <section className="closing">
      <div className="closing__inner">
        <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <h2 className="section-headline">Enough Thinking</h2>
        <p><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book your Free Discovery Call</a> and let&apos;s have a conversation. There is no pressure or obligation to work together.</p>
        <p style={{marginTop: '32px'}}><strong className="why-started__hook">I&apos;m ready to meet you when you are.</strong></p>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="final-cta" id="contact">
      <div className="final-cta__inner">
        <a
          href={CALENDLY_URL}
          className="btn-outline-light btn-primary--large"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book your Free Discovery Call
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copy">&copy; 2026 Reimagined by Mira <svg className="logo-bulb" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18.5 8.7 18.5 7a6.5 6.5 0 0 0-13 0c0 1.7.8 3.2 2 4.2.8.8 1.3 1.4 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg></p>
    </footer>
  )
}

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CaseStudies />
        <Services />
        <WhyIStarted />
        <Testimonials />
        <About />
        <Closing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

export default App
