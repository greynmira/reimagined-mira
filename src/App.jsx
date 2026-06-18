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
          Book a Free Discovery Call
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
            Book a complimentary 20-min call
          </a>
          <p className="hero__cta-note">Free 20-minute conversation to explore your goals and determine whether we&apos;re a good fit.</p>
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
    items: ['Build authentic professional relationships that create opportunity, visibility, and support throughout your career.', 'Internal influence', 'Executive visibility'],
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
          Over the years, colleagues, mentees, and friends repeatedly sought me out for guidance on career decisions, workplace challenges, networking, and professional growth. That pattern eventually became this practice.
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
          <p className="about__role">Healthcare Product Leader · Strategic Partnerships Lead, Heart &amp; Stroke Foundation</p>
          <p className="about__body">
            8+ years in healthcare strategy, digital health, and product leadership. The people who are good at their jobs often need the most help navigating the system around them — that observation is what led to this practice.
          </p>
        </div>
      </div>
    </section>
  )
}


const caseStudies = [
  {
    tag: 'Early Career',
    title: 'Breaking Through Unemployment',
    body: [
      'A recent graduate came to me after spending more than six months unemployed and struggling to transition into a field outside their academic specialization.',
      'Together, we refined their resume and cover letters, identified transferable skills, prepared for interviews, and developed a stronger professional narrative. One of the biggest challenges wasn\'t capability — it was learning how to communicate their value with confidence and help others see their potential.',
      'After months of feeling stuck, they successfully secured a role in their target field and began building the career they had been working toward.',
    ],
  },
  {
    tag: 'Mid-Career',
    title: 'Advocating for Your Dollar Value',
    body: [
      'A professional reached out because they felt undercompensated and wanted support navigating a conversation about salary and bonus expectations.',
      'Talking about money can feel uncomfortable. Together, we worked on identifying their contributions, framing their impact, and preparing for a compensation discussion that felt professional, confident, and authentic.',
      'The result was a successful conversation that led to an increase in both salary and bonus compensation. Our work later expanded into broader career strategy, interview preparation, and exploring new opportunities.',
    ],
  },
  {
    tag: 'Experienced Professionals',
    title: 'Feeling Stuck and Wanting Change',
    body: [
      'A professional with more than 30 years of experience came to me feeling stuck and uncertain about what the next chapter of their career might look like.',
      'Many experienced professionals reach a point where the "same old, same old" no longer feels fulfilling. Together, we explored networking strategies, relationship building, career reinvention, and how to continue growing in a rapidly changing professional landscape.',
      'Through our work together, they expanded their professional network, explored new opportunities within their organization, and began approaching the next stage of their career with greater curiosity, confidence, and momentum.',
    ],
  },
]

function CaseStudies() {
  return (
    <section className="case-studies">
      <div className="case-studies__inner">
        <h2 className="section-headline">How I&apos;ve Helped Clients Navigate Career Challenges</h2>
        <div className="case-studies__list">
          {caseStudies.map((c, i) => (
            <div key={i} className="case-study">
              <div className="case-study__tag">{c.tag}</div>
              <h3 className="case-study__title">{c.title}</h3>
              {c.body.map((p, j) => (
                <p key={j} className="case-study__body">{p}</p>
              ))}
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
        <h2 className="final-cta__headline">Start Where You Are</h2>
        <p className="final-cta__subtext">You don&apos;t need to have everything figured out. You just need a place to start.</p>
        <a
          href={CALENDLY_URL}
          className="btn-outline-light btn-primary--large"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a complimentary 20-min call
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
        <Services />
        <CaseStudies />
        <WhyMe />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

export default App
