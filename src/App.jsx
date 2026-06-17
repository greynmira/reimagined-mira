import './App.css'

const CALENDLY_URL = 'https://calendly.com'

function Nav() {
  return (
    <nav className="nav">
      <div className="nav__inner">
        <div className="nav__logo">
          Reimagined <span>by Mira</span>
        </div>
        <a href={CALENDLY_URL} className="btn-primary" target="_blank" rel="noopener noreferrer">
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
        <span className="hero__eyebrow">Career Coaching</span>
        <h1 className="hero__headline">
          Build a career that feels <em>successful</em> — and sustainable.
        </h1>
        <p className="hero__subtext">
          I help professionals navigate career growth, workplace challenges, networking, and personal branding without losing themselves in the process.
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
        <div className="hero__trust">
          <span className="hero__trust-item">Career Strategy</span>
          <span className="hero__trust-divider" aria-hidden="true" />
          <span className="hero__trust-item">Personal Branding</span>
          <span className="hero__trust-divider" aria-hidden="true" />
          <span className="hero__trust-item">Resilience &amp; Change</span>
        </div>
      </div>
    </section>
  )
}

function Problem() {
  const questions = [
    'Should I stay or leave?',
    'How do I navigate a difficult manager?',
    'Why do I feel stuck despite being successful?',
    'How do I build a stronger professional network?',
    'How do I become more visible at work?',
    'What do I actually want next?',
  ]

  return (
    <section className="problem">
      <div className="problem__inner">
        <h2 className="problem__headline">Career growth is rarely just about work.</h2>
        <p className="problem__body">
          Most people don&apos;t need another r&eacute;sum&eacute; template. They need help navigating uncertainty — difficult decisions, workplace dynamics, confidence challenges, leadership opportunities, and career transitions.
        </p>
        <p className="problem__questions-label">Questions clients come with</p>
        <ul className="problem__questions">
          {questions.map((q, i) => (
            <li key={i} className="problem__question">{q}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const services = [
  {
    icon: '🧭',
    title: 'Career Strategy',
    body: 'Clarify your goals, evaluate opportunities, and create a plan for meaningful career growth.',
  },
  {
    icon: '🤝',
    title: 'Networking & Professional Relationships',
    body: 'Build authentic connections that open doors, strengthen influence, and create new opportunities.',
  },
  {
    icon: '✦',
    title: 'Personal Brand & Visibility',
    body: 'Develop confidence, communicate your value, and increase your visibility inside and outside your organization.',
  },
  {
    icon: '◎',
    title: 'Resilience & Change',
    body: 'Navigate uncertainty, setbacks, workplace politics, and transitions with greater confidence and self-trust.',
  },
]

function Services() {
  return (
    <section className="services section">
      <div className="services__inner">
        <span className="section-label">How I Can Help</span>
        <h2 className="section-headline">Coaching that meets you where you are.</h2>
        <p className="section-subtext">
          Whether you&apos;re navigating a transition, feeling stuck, or ready to level up — there&apos;s a path forward.
        </p>
        <div className="services__grid">
          {services.map((s, i) => (
            <div key={i} className="service-card">
              <div className="service-card__icon" aria-hidden="true">{s.icon}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Approach() {
  const pills = [
    'Clearer',
    'More confident',
    'Less overwhelmed',
    'Better equipped to move forward',
  ]

  return (
    <section className="approach">
      <div className="approach__inner">
        <div className="approach__content">
          <span className="section-label">My Approach</span>
          <h2 className="approach__headline">
            There is no <em>one-size-fits-all</em> career path.
          </h2>
          <p className="approach__body">
            Our work together starts with an honest conversation — about where you are, where you want to go, and what&apos;s actually getting in the way. I won&apos;t tell you what to do.
          </p>
          <p className="approach__body">
            Instead, I help you understand your options more clearly, challenge assumptions that may be holding you back, and build the clarity and confidence to move forward in a way that&apos;s right for you.
          </p>
          <p className="approach__outcomes-label">Clients describe feeling</p>
          <div className="approach__pills">
            {pills.map((p, i) => (
              <span key={i} className="approach__pill">{p}</span>
            ))}
          </div>
        </div>
        <div className="approach__visual" aria-hidden="true">
          <div className="approach__shape">
            <div className="approach__shape-ring approach__shape-ring--1" />
            <div className="approach__shape-ring approach__shape-ring--2" />
            <div className="approach__shape-ring approach__shape-ring--3">
              <span className="approach__shape-text">Your path,<br />your terms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about section">
      <div className="about__inner">
        <div className="about__left">
          <span className="about__tag">About Mira</span>
          <h2 className="about__name">
            Mira
            <em>Career Coach &amp; Strategist</em>
          </h2>
          <div className="about__avatar" aria-hidden="true">
            <span className="about__avatar-initials">M</span>
          </div>
        </div>
        <div className="about__right">
          <p className="about__body">
            With 8 years in healthcare strategy, digital health, and product leadership, I&apos;ve spent my career at the intersection of complex decisions, organizational dynamics, and helping teams move forward.
          </p>
          <p className="about__body">
            Throughout that time, I was always drawn to something else — helping people find clarity. In hallway conversations, over coffee, in formal mentoring relationships. I noticed that the questions people carried weren&apos;t really about their r&eacute;sum&eacute;s. They were about meaning, direction, and confidence.
          </p>
          <p className="about__body">
            Reimagined by Mira was created from that passion — and a belief that everyone deserves thoughtful, honest support as they navigate their career.
          </p>
          <blockquote className="about__quote">
            <p>
              &ldquo;Because careers are rarely linear, and sometimes the most valuable thing isn&apos;t advice — it&apos;s having someone who can help you see the path more clearly.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="final-cta" id="contact">
      <div className="final-cta__inner">
        <span className="final-cta__eyebrow">Start Where You Are</span>
        <h2 className="final-cta__headline">
          You don&apos;t need to have everything figured out.
        </h2>
        <p className="final-cta__subtext">You just need a place to start.</p>
        <a
          href={CALENDLY_URL}
          className="btn-primary btn-primary--large btn-primary--light"
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
      <div className="footer__inner">
        <div className="footer__logo">
          Reimagined <span>by Mira</span>
        </div>
        <p className="footer__copy">&copy; 2025 Reimagined by Mira. All rights reserved.</p>
        <p className="footer__tagline">Build a career that feels successful — and sustainable.</p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Services />
        <Approach />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

export default App
