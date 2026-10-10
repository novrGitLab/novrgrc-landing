import { PageHero, CtaBand } from '../components/PageBits'
import { Reveal } from '../components/fx'

const values = [
  ['Customer Delight', 'We are committed to customer satisfaction and won’t stop until our clients are delighted.'],
  ['Integrity', 'Unwavering honesty, transparency, and a strong moral compass to maintain trust.'],
  ['Innovation', 'Relentless innovation — creating cutting-edge solutions while swiftly adapting to new challenges.'],
  ['People', 'Guiding our team to uphold the highest standards of quality in solutions, services and incident response.'],
  ['Resilience', 'Achieving cybersecurity resilience in ourselves the same way we do for our clients.'],
]

const milestones = [
  ['2008', 'Cybernovr founded — information assurance and cybersecurity risk management.'],
  ['2016', 'National Cybersecurity Policy & Strategy and NCC-CSIRT leadership.'],
  ['2021', 'Sector-wide cyber-resilience frameworks for Nigerian critical infrastructures.'],
  ['2026', 'ISO 27001 certification and launch of the NovrGRC platform.'],
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Built by Cybernovr. Proven in the field."
        sub="NovrGRC is the governance, risk and compliance platform born out of nearly two decades of securing Critical Information Infrastructures across Africa — and beyond."
      />

      <section style={{ padding: '12px 0 84px' }}>
        <div className="wrap">
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Reveal>
              <div className="glass" style={{ padding: 28, height: '100%' }}>
                <div className="eyebrow-mono" style={{ marginBottom: 12 }}>Our vision</div>
                <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0 }}>To achieve resilience of your Critical Information Infrastructure.</p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="glass" style={{ padding: 28, height: '100%' }}>
                <div className="eyebrow-mono" style={{ marginBottom: 12 }}>Our mission</div>
                <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0 }}>To work with you to strengthen the resilience of your information assets — pinpointing your unique risks, prioritising your defences, and helping you achieve cybersecurity resilience of your critical services.</p>
              </div>
            </Reveal>
          </div>
          <style>{`@media(max-width:760px){ .about-grid{ grid-template-columns:1fr !important } }`}</style>

          <Reveal delay={0.1}>
            <div className="glass" style={{ marginTop: 16, padding: 28 }}>
              <div className="eyebrow-mono" style={{ marginBottom: 12 }}>Our story</div>
              <p className="muted" style={{ fontSize: 15, lineHeight: 1.7, margin: '0 0 14px' }}>
                Established in 2008, Cybernovr delivers comprehensive services in Governance, Risk and Compliance management, Critical Information Infrastructure Protection, and specialised cybersecurity education.
              </p>
              <p className="muted" style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                With close to two decades of national and international cybersecurity leadership, our team has designed cyber-resilience frameworks for sectors across Nigeria — including work on the NCC Cybersecurity Blueprint for the telecoms backbone. Cybernovr is ISO 27001 certified, covering GRC services, managed SOC operations, professional services and cybersecurity education.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: '0 0 84px' }}>
        <div className="wrap">
          <Reveal><span className="eyebrow-mono">Core values</span></Reveal>
          <Reveal delay={0.05}>
            <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,44px)', margin: '12px 0 24px' }}>What drives us.</h2>
          </Reveal>
          <div className="val-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {values.map(([k, v], i) => (
              <Reveal key={k} delay={(i % 3) * 0.06}>
                <div className="glass vault-scan" style={{ padding: 24, height: '100%' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--brand-deep)' }}>0{i + 1}</div>
                  <h3 style={{ fontSize: 17, margin: '8px 0' }}>{k}</h3>
                  <p className="muted" style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>{v}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <style>{`@media(max-width:860px){ .val-grid{ grid-template-columns:1fr !important } }`}</style>
        </div>
      </section>

      <section style={{ padding: '0 0 84px' }}>
        <div className="wrap" style={{ maxWidth: 900 }}>
          <Reveal><span className="eyebrow-mono">Milestones</span></Reveal>
          <Reveal delay={0.05}>
            <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,44px)', margin: '12px 0 6px' }}>Our journey.</h2>
            <p className="muted" style={{ margin: '0 0 12px' }}>Since 2008, advancing cybersecurity for organisations of all sizes.</p>
          </Reveal>
          <div style={{ marginTop: 8 }}>
            {milestones.map(([y, d], i) => (
              <Reveal key={y} delay={i * 0.05}>
                <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 16, padding: '18px 0', borderBottom: i === milestones.length - 1 ? 'none' : '1px solid var(--line)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--brand-deep)', fontWeight: 700 }}>{y}</div>
                  <div className="muted" style={{ fontSize: 14, lineHeight: 1.6 }}>{d}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <div style={{ marginTop: 18, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span className="chip">ISO 27001 certified</span>
              <span className="chip">Since 2008</span>
              <span className="chip">Lagos · Calgary</span>
              <span className="chip">#cyber360resilience</span>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand title="See what we’ve built." sub="NovrGRC distils that field experience into one platform — request a walkthrough tailored to your organisation." />
    </>
  )
}
