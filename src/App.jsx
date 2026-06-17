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
        <div className="nav__logo">Reimagined by Mira</div>
        <a href={CALENDLY_URL} className="btn-outline" target="_blank" rel="noopener noreferrer">
          Book a Discovery Call
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
          I help ambitious professionals build careers, networks, and personal brands that create opportunity — without burning themselves out.
        </p>
        <div className="hero__cta">
          <a
            href={CALENDLY_URL}
            className="btn-primary btn-primary--large"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a Discovery Call
          </a>
        </div>
        <hr className="hero__divider" />
        <div className="hero__trust">
          <span className="hero__trust-item">Career Strategy</span>
          <span className="hero__trust-sep" aria-hidden="true">·</span>
          <span className="hero__trust-item">Personal Branding</span>
          <span className="hero__trust-sep" aria-hidden="true">·</span>
          <span className="hero__trust-item">Resilience &amp; Change</span>
        </div>
      </div>
    </section>
  )
}

const services = [
  {
    title: 'Career Strategy',
    items: ['Promotions and advancement', 'Career transitions', 'Leadership growth'],
  },
  {
    title: 'Networking',
    items: ['Building meaningful professional relationships', 'Internal influence', 'Executive visibility'],
  },
  {
    title: 'Personal Brand',
    items: ['Confidence and presence', 'Communicating your value', 'Showing up authentically'],
  },
  {
    title: 'Resilience',
    items: ['Difficult managers', 'Organizational politics', 'Career setbacks and change'],
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

const outcomes = ['CLEARER', 'MORE CONFIDENT', 'LESS OVERWHELMED', 'BETTER EQUIPPED']

function WhyMe() {
  return (
    <section className="why-me">
      <div className="why-me__inner">
        <h2 className="section-headline">Why Work With Me?</h2>
        <p className="why-me__body">
          I&apos;ve spent my career navigating complex healthcare organizations, leading cross-functional initiatives, influencing without authority, and building trust across diverse stakeholder groups.
        </p>
        <p className="why-me__body">
          Along the way, colleagues, leaders, and friends kept coming to me with their own career challenges. That pattern eventually became this practice.
        </p>
        <div className="why-me__outcomes">
          {outcomes.map((o, i) => (
            <span key={i} className="why-me__outcome">{o}</span>
          ))}
        </div>
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
          <p className="about__body">
            For the past eight years, I&apos;ve worked in healthcare strategy, digital health, and product leadership — helping teams navigate complexity, align stakeholders, and deliver meaningful outcomes. Reimagined by Mira was built from a simple observation: the people who are good at their jobs often need the most help navigating the system around them.
          </p>
          <p className="about__quote">
            Because careers are rarely linear. And sometimes the most valuable thing isn&apos;t advice — it&apos;s having someone help you see the path more clearly.
          </p>
        </div>
      </div>
    </section>
  )
}

function Awards() {
  return (
    <section className="awards">
      <div className="awards__inner">
        <h2 className="section-headline">Recognition</h2>
        <div className="award-card">
          <div className="award-card__img-wrap">
            <img
              src={`${import.meta.env.BASE_URL}certificate.jpg`}
              alt="Official Certificate – Chitchat Champion awarded to Mira M."
              className="award-card__img"
            />
            <div className="award-card__blur" aria-hidden="true" />
          </div>
          <p className="award-card__caption">
            Chitchat Champion — awarded by colleagues for mastering random conversations, morning desk pop-ins, ninja exits, and making coworkers smile even without coffee.
          </p>
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="final-cta" id="contact">
      <div className="final-cta__inner">
        <h2 className="final-cta__headline">Start Where You Are</h2>
        <p className="final-cta__subtext">You don&apos;t need to have everything figured out. You just need a place to start.</p>
        <a
          href={CALENDLY_URL}
          className="btn-outline-light btn-primary--large"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a Discovery Call
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copy">&copy; 2025 Reimagined by Mira</p>
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
        <Services />
        <WhyMe />
        <About />
        <Awards />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

export default App
