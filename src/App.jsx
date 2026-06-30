import { useState, useEffect, useRef, createContext, useContext } from 'react'
import { createPortal } from 'react-dom'
import './App.css'

const CALENDLY_URL = 'https://calendar.app.google/wN8366ubbwmXKxxw8'

const SparkCtx = createContext(null)

function BulbIcon({ large = false, onActive }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  const onActiveRef = useRef(onActive)
  useEffect(() => { onActiveRef.current = onActive }, [onActive])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(false)
        requestAnimationFrame(() => requestAnimationFrame(() => {
          setActive(true)
          if (onActiveRef.current) onActiveRef.current(ref.current)
        }))
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <span className={`bulb-wrap${large ? ' bulb-wrap--large' : ''}${active ? ' bulb-wrap--active' : ''}`} ref={ref} aria-hidden="true">
      <svg className={large ? 'section-icon' : 'logo-bulb'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18.5 8.7 18.5 7a6.5 6.5 0 0 0-13 0c0 1.7.8 3.2 2 4.2.8.8 1.3 1.4 1.5 2.5"/>
        <path d="M9 18h6"/><path d="M10 22h4"/>
      </svg>
      <span className="bulb-spark bulb-spark--1" />
      <span className="bulb-spark bulb-spark--2" />
      <span className="bulb-spark bulb-spark--3" />
    </span>
  )
}

function SparkFlight({ bulbRect, dotRects }) {
  if (!bulbRect) return null
  const cx = bulbRect.left + bulbRect.width / 2
  const sy = bulbRect.top + bulbRect.height / 2
  // Fan start positions slightly so sparks spread from the bulb before converging
  const startOffsets = [-7, 0, 7]

  return createPortal(
    <>
      {dotRects.map((dotRect, i) => {
        if (!dotRect) return null
        const sx = cx + startOffsets[i]
        const ex = dotRect.left + dotRect.width / 2
        const ey = dotRect.top + dotRect.height / 2
        return (
          <span
            key={i}
            className="spark-flight"
            style={{
              left: `${sx}px`,
              top: `${sy}px`,
              '--ex': `${ex - sx}px`,
              '--ey': `${ey - sy}px`,
              animationDelay: `${i * 180}ms`,
            }}
          />
        )
      })}
    </>,
    document.body
  )
}

function ClosingSparkFlight({ bulbRect, headingRect }) {
  if (!bulbRect || !headingRect) return null
  const sx = bulbRect.left + bulbRect.width / 2
  const sy = bulbRect.top + bulbRect.height / 2

  // 3 sparks spread across the heading width
  const targets = [0.2, 0.5, 0.8].map(frac => ({
    x: headingRect.left + headingRect.width * frac,
    y: headingRect.top + headingRect.height / 2,
  }))

  return createPortal(
    <>
      {targets.map((target, i) => (
        <span
          key={i}
          className="spark-flight spark-flight--slow"
          style={{
            left: `${sx}px`,
            top: `${sy}px`,
            '--ex': `${target.x - sx}px`,
            '--ey': `${target.y - sy}px`,
            animationDelay: `${i * 180}ms`,
          }}
        />
      ))}
    </>,
    document.body
  )
}

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
        <div className="gate__logo">Reimagined by Mira <BulbIcon /></div>
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
  const ctx = useContext(SparkCtx)

  function handleBulbActive(el) {
    if (ctx?.handlerRef?.current) ctx.handlerRef.current(el)
  }

  return (
    <nav className="nav">
      <div className="nav__inner">
        <div className="nav__logo">Reimagined<br />by Mira <BulbIcon onActive={handleBulbActive} /></div>
        <a href={CALENDLY_URL} className="btn-outline" target="_blank" rel="noopener noreferrer">
          <span className="nav__cta-full">Book your Free Discovery Call</span>
          <span className="nav__cta-short">Book Now</span>
        </a>
      </div>
    </nav>
  )
}

function Hero() {
  const [typewriterDone, setTypewriterDone] = useState(false)

  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__content">
          <h1 className="hero__headline">
            Your next career move deserves more than <span style={{color: 'var(--color-green)'}}>generic advice.</span>
          </h1>
          <p className="hero__subtext">
            Sometimes advice isn&apos;t enough. You need someone to help you see your career differently. Together, we&apos;ll build a strategy that fits you.
          </p>
          <div className="hero__typewriter">
            <TypewriterSection onDone={() => setTypewriterDone(true)} onReplay={() => setTypewriterDone(false)} />
          </div>
          {!typewriterDone && (
            <div className="hero__cta">
              <a href={CALENDLY_URL} className="btn-primary btn-primary--large" target="_blank" rel="noopener noreferrer">
                Book your Free Discovery Call
              </a>
            </div>
          )}
        </div>
        <div className="hero__visual" aria-hidden="true">
          <svg viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="240" cy="240" r="220" fill="#EEF4F0"/>
            <circle cx="240" cy="240" r="186" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="7 11" opacity="0.22"/>
            <circle cx="240" cy="240" r="150" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="5 9" opacity="0.17"/>
            <circle cx="240" cy="240" r="112" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="4 8" opacity="0.12"/>
            <circle cx="240" cy="240" r="72" stroke="#1B4332" strokeWidth="1" strokeDasharray="2 7" opacity="0.09"/>
            <path d="M 52 415 C 115 360 175 338 222 300 C 268 260 302 202 352 152 C 382 120 415 98 458 72"
                  stroke="#1B4332" strokeWidth="2.5" strokeLinecap="round" opacity="0.36"/>
            <circle cx="52" cy="415" r="5" fill="#1B4332" opacity="0.28"/>
            <circle cx="222" cy="300" r="7" fill="#1B4332" opacity="0.5"/>
            <circle cx="352" cy="152" r="9" fill="#1B4332" opacity="0.72"/>
            <circle cx="458" cy="72" r="10" fill="#1B4332" opacity="0.9"/>
            <circle cx="305" cy="122" r="3" fill="#2d6a4f" opacity="0.55"/>
            <circle cx="145" cy="192" r="2.5" fill="#2d6a4f" opacity="0.4"/>
            <circle cx="395" cy="262" r="2" fill="#2d6a4f" opacity="0.35"/>
            <circle cx="172" cy="388" r="2.5" fill="#2d6a4f" opacity="0.3"/>
            <g transform="translate(228,229)" opacity="0.22" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18.5 8.7 18.5 7a6.5 6.5 0 0 0-13 0c0 1.7.8 3.2 2 4.2.8.8 1.3 1.4 1.5 2.5"/>
              <path d="M9 18h6"/><path d="M10 22h4"/>
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}

const serviceIcons = {
  "I want to grow but don’t know how.": (
    <svg className="service-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
      <line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
    </svg>
  ),
  "I’m not being seen or recognised.": (
    <svg className="service-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
      <line x1="12" y1="7" x2="5" y2="17"/><line x1="12" y1="7" x2="19" y2="17"/><line x1="5" y1="19" x2="19" y2="19"/>
    </svg>
  ),
  "I struggle to tell my story.": (
    <svg className="service-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  "I’m dealing with something difficult.": (
    <svg className="service-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12"/><path d="M12 12C12 12 8 10 8 6a4 4 0 0 1 8 0c0 4-4 6-4 6z"/>
      <path d="M12 12C12 12 16 10 16 6"/><path d="M9 22h6"/>
    </svg>
  ),
}

const services = [
  {
    title: "I want to grow but don’t know how.",
    items: ['Career direction and next moves', 'Promotions and advancement', 'Career transitions'],
  },
  {
    title: "I’m not being seen or recognised.",
    items: ['Strategic networking and relationships', 'Building internal influence', 'Executive visibility'],
  },
  {
    title: 'I struggle to tell my story.',
    items: ['Positioning your experience', 'Personal brand and presence', 'Communicating your value'],
  },
  {
    title: "I’m dealing with something difficult.",
    items: ['Navigating workplace dynamics', 'Career setbacks and change', 'Confidence under pressure'],
  },
]

const typewriterPhrases = [
  'earn more.',
  'land your next role.',
  'navigate your next career move.',
  'build confidence.',
  'rebrand your professional story.',
]

function TypewriterSection({ onDone, onReplay }) {
  const ctx = useContext(SparkCtx)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState('waiting')
  const [animOpacity, setAnimOpacity] = useState(1)
  const [sparkFlight, setSparkFlight] = useState(null)
  const [dotsRevealed, setDotsRevealed] = useState([false, false, false])

  const dotRef0 = useRef(null)
  const dotRef1 = useRef(null)
  const dotRef2 = useRef(null)
  const dotRefs = [dotRef0, dotRef1, dotRef2]

  function replay() {
    setPhraseIndex(0)
    setDisplayed('')
    setAnimOpacity(1)
    setPhase('typing')
    setDotsRevealed([true, true, true])
    setSparkFlight(null)
    if (onReplay) onReplay()
  }

  useEffect(() => {
    if (!ctx) return
    ctx.handlerRef.current = (bulbEl) => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) {
        setDotsRevealed([true, true, true])
        setTimeout(() => setPhase('typing'), 300)
        return
      }

      const bulbRect = bulbEl.getBoundingClientRect()
      const dotRects = dotRefs.map(r => r.current?.getBoundingClientRect() ?? null)

      setSparkFlight({ bulbRect, dotRects })

      // Reveal each dot as its spark arrives (75% of 2s = 1500ms + 180ms stagger)
      const arrivalBase = 1500
      dotRefs.forEach((_, i) => {
        setTimeout(() => {
          setDotsRevealed(prev => {
            const next = [...prev]
            next[i] = true
            return next
          })
        }, arrivalBase + i * 180)
      })

      // Start typing after all three dots have landed and sparks finish fading
      setTimeout(() => {
        setSparkFlight(null)
        setPhase('typing')
      }, arrivalBase + 2 * 180 + 520)
    }
    return () => { ctx.handlerRef.current = null }
  }, [])

  useEffect(() => {
    if (phase === 'waiting') return

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
      timeout = setTimeout(() => { setPhase('final'); if (onDone) onDone() }, 700)
    }

    return () => clearTimeout(timeout)
  }, [displayed, phase, phraseIndex])

  if (phase === 'final') {
    return (
      <div className="typewriter-section__final">
        <p className="typewriter-section__final-line">
          Let me be your<br />trusted thought partner.
        </p>
        <a
          href={CALENDLY_URL}
          className="btn-primary btn-primary--large"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book your Free Discovery Call
        </a>
        <button className="typewriter-section__replay" onClick={replay}>
          Click to replay prompts.
        </button>
      </div>
    )
  }

  return (
    <>
      {sparkFlight && (
        <SparkFlight bulbRect={sparkFlight.bulbRect} dotRects={sparkFlight.dotRects} />
      )}
      <div className="typewriter-section__animated" style={{ opacity: animOpacity, transition: 'opacity 0.7s ease' }}>
        <p className="typewriter-section__fixed">
          I can help you<span className="typewriter-dots" aria-hidden="true">
            <span
              ref={dotRef0}
              className={`typewriter-dot${dotsRevealed[0] ? ' typewriter-dot--active' : ''}`}
            >.</span>
            <span
              ref={dotRef1}
              className={`typewriter-dot${dotsRevealed[1] ? ' typewriter-dot--active' : ''}`}
            >.</span>
            <span
              ref={dotRef2}
              className={`typewriter-dot${dotsRevealed[2] ? ' typewriter-dot--active' : ''}`}
            >.</span>
          </span>
          <span className="sr-only">&hellip;</span>
        </p>
        <p className="typewriter-section__phrase" aria-live="polite" aria-atomic="true">
          {displayed}<span className="typewriter-section__cursor" aria-hidden="true">|</span>
        </p>
      </div>
    </>
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
              <div className="service-item__icon-wrap">{serviceIcons[s.title]}</div>
              <h3 className="service-item__title">{s.title}</h3>
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
        <BulbIcon large />
        <h2 className="section-headline">Why<br />Reimagined Mira</h2>
        <p><strong className="why-started__hook">I&apos;m obsessed with career strategy:</strong> positioning, networking, personal brand, and career growth. <em>I dream about this stuff so you don&apos;t have to.</em></p>
        <p>I&apos;ve reinvented my own career more than once, from business school to clinical nutrition to digital health. Along the way, I&apos;ve learned that career paths are rarely linear and that feeling stuck doesn&apos;t have to be permanent.</p>
        <p>Most professionals don&apos;t need more effort. They need someone to help them see what they&apos;re too close to recognise.</p>
        <p>That&apos;s why I created Reimagined by Mira.</p>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about">
      <div className="about__inner">
        <h2 className="section-headline">About Mira</h2>
        <p className="about__role">Healthcare Product Leader · Strategic Partnerships Lead,<br />Heart &amp; Stroke Foundation</p>
        <p className="about__body">
          For the past 8+ years, I&apos;ve worked across healthcare strategy, digital health, and product leadership while helping professionals navigate career growth, networking, personal brand, and change.
        </p>
        <div className="about__pillars">
          <div className="about__pillar">
            <h3 className="about__pillar-title">Strategic Operator</h3>
            <p className="about__pillar-body">I bring structure, clarity, and strategic thinking to complex career questions.</p>
          </div>
          <div className="about__pillar">
            <h3 className="about__pillar-title">Purpose-Driven Leader</h3>
            <p className="about__pillar-body">My work spans digital health, community partnerships, and volunteer leadership with Heart &amp; Stroke Foundation.</p>
          </div>
          <div className="about__pillar">
            <h3 className="about__pillar-title">Curious Storyteller</h3>
            <p className="about__pillar-body">From podcasting to mentorship, I've always been drawn to helping people make sense of their next chapter.</p>
          </div>
        </div>
      </div>
    </section>
  )
}


const caseStudies = [
  {
    tag: 'Early Career',
    title: 'Breaking Through Unemployment',
    challenge: 'Recent graduate unemployed for 6+ months, struggling to transition into a new field.',
    work: 'Developed a career positioning strategy, identified transferable strengths, and built the narrative needed to compete in a new field.',
    outcome: 'Secured a role in their target field within 3 months.',
  },
  {
    tag: 'Mid-Career',
    title: 'Navigating Compensation Conversations',
    challenge: 'Felt undercompensated and unsure how to navigate a salary conversation.',
    work: 'Built a strategic case for increased compensation by articulating contributions, quantifying impact, and preparing for a confident negotiation.',
    outcome: 'Successfully negotiated an increase in salary.',
  },
  {
    tag: 'Experienced Professional',
    title: 'From Comfortable to Confident',
    challenge: 'After 15+ years with the same employer, this client was unsure how to approach an external job search.',
    work: 'Developed a modern job search strategy, repositioned their experience for today\'s market, and rebuilt confidence after a long tenure.',
    outcome: 'Secured an external role after more than 15 years with the same employer.',
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
                <dt>
                  <svg className="case-study__dt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L12 6M12 18L12 22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12L6 12M18 12L22 12M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"/></svg>
                  Challenge
                </dt><dd>{c.challenge}</dd>
                <dt>
                  <svg className="case-study__dt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><path d="M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12"/></svg>
                  What We Worked On
                </dt><dd>{c.work}</dd>
                <dt>
                  <svg className="case-study__dt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Outcome
                </dt><dd>{c.outcome}</dd>
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
  const ctx = useContext(SparkCtx)
  const headingRef = useRef(null)
  const btnRef = useRef(null)
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [sparkFlight, setSparkFlight] = useState(null)
  const [glowing, setGlowing] = useState(false)

  // Reveal heading when section scrolls into view
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        obs.disconnect()
      }
    }, { threshold: 0.25 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!ctx) return
    ctx.closingHandlerRef.current = (bulbEl) => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) {
        setGlowing(true) // stays permanently
        return
      }

      const bulbRect = bulbEl.getBoundingClientRect()
      // Target the CTA button (falls back to heading if button not visible on mobile)
      const targetEl = btnRef.current?.offsetParent ? btnRef.current : headingRef.current
      const headingRect = targetEl?.getBoundingClientRect()
      if (!headingRect) return

      setSparkFlight({ bulbRect, headingRect })

      setTimeout(() => {
        setSparkFlight(null)
        setGlowing(true) // stays permanently — this is the payoff state
      }, 1900)
    }
    return () => { ctx.closingHandlerRef.current = null }
  }, [])

  return (
    <section className="closing" ref={sectionRef}>
      <div className="closing__inner">
        {sparkFlight && (
          <ClosingSparkFlight bulbRect={sparkFlight.bulbRect} headingRect={sparkFlight.headingRect} />
        )}
        <h2
          ref={headingRef}
          className={`closing-headline${inView ? ' closing-headline--visible' : ''}${glowing ? ' closing-headline--glowing' : ''}`}
        >
          Enough Thinking
        </h2>
        <p><a href={CALENDLY_URL} className="closing__highlight" target="_blank" rel="noopener noreferrer">Book your Free Discovery Call</a> and let&apos;s have a conversation. There is no pressure or obligation to work together.</p>
        <p style={{marginTop: '32px'}}><strong className="why-started__hook">I&apos;m ready to meet you when you are.</strong></p>
        <a href={CALENDLY_URL} className="closing__cta-btn" ref={btnRef} target="_blank" rel="noopener noreferrer">
          Book your Free Discovery Call
        </a>
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
  const ctx = useContext(SparkCtx)

  function handleBulbActive(el) {
    if (ctx?.closingHandlerRef?.current) ctx.closingHandlerRef.current(el)
  }

  return (
    <footer className="footer">
      <p className="footer__copy">&copy; 2026 Reimagined by Mira <BulbIcon onActive={handleBulbActive} /></p>
    </footer>
  )
}

function App() {
  const handlerRef = useRef(null)
  const closingHandlerRef = useRef(null)

  return (
    <SparkCtx.Provider value={{ handlerRef, closingHandlerRef }}>
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
    </SparkCtx.Provider>
  )
}

export default App
