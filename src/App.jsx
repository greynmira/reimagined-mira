import { useState } from 'react'
import './App.css'

const CALENDLY_URL = 'https://calendar.google.com/calendar/appointments'

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
        <div className="gate__logo">Reimagined by Mira</div>
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
        <div className="nav__logo">Reimagined<br />by Mira</div>
        <a href={CALENDLY_URL} className="btn-outline" target="_blank" rel="noopener noreferrer">
          Book a free Discovery call
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
        <div className="hero__cta">
          <a
            href={CALENDLY_URL}
            className="btn-primary btn-primary--large"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a free Discovery call
          </a>
        </div>
      </div>
    </section>
  )
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

function Services() {
  return (
    <section className="services">
      <div className="services__inner">
        <h2 className="section-headline">What I Help With</h2>
        <div className="services__grid">
          {services.map((s, i) => (
            <div key={i} className="service-item">
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
        <h2 className="section-headline">Why I Started<br />Reimagined by Mira</h2>
        <p>I&apos;m obsessed with career strategy: positioning, networking, personal brand, and career growth. I dream about this stuff so you don&apos;t have to.</p>
        <p>I&apos;ve reinvented my own career more than once, from business school to clinical nutrition to digital health. Along the way, I&apos;ve learned that career paths are rarely linear and that feeling stuck does not have to be permanent.</p>
        <p>What I&apos;ve learned is that most people aren&apos;t lacking talent. More often than not, they are lacking perspective, accountability, and a trusted sounding board.</p>
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
            For the past 8+ years I&apos;ve worked across healthcare strategy, digital health, and product leadership, while also serving as a Strategic Partnerships Lead with the Heart &amp; Stroke Foundation.
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
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="final-cta" id="contact">
      <div className="final-cta__inner">
        <h2 className="final-cta__headline">Build a Career That Fits Who You Are</h2>

        <a
          href={CALENDLY_URL}
          className="btn-outline-light btn-primary--large"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a free Discovery call
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copy">&copy; 2026 Reimagined by Mira</p>
    </footer>
  )
}

function App() {
  const [unlocked, setUnlocked] = useState(false)

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CaseStudies />
        <Services />
        <WhyIStarted />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

export default App
