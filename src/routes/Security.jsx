import { PageHero, CtaBand } from '../components/PageBits'
import { Reveal } from '../components/fx'

const tiles = [
  ['Access control', 'Role-based access control (RBAC) with least privilege — granular permissions, segregation of duties.'],
  ['Authentication', 'Multi-factor authentication (MFA) on every account. SSO with enterprise identity providers.'],
  ['Data protection', 'Encryption of data at rest, in use and in transit. Aligned with NDPA and GDPR.'],
  ['Audit trail', 'Full audit trail of user and process activity — tamper-evident records for verification.'],
  ['Scale & availability', 'Cloud SaaS preferred, with hybrid / on-prem option. Global scale: multi-language, multi-timezone, multi-currency. 99.9% uptime SLA.'],
  ['Usability', 'Intuitive, modern UI. Configurable dashboards by role. Mobile-friendly access for teams in the field.'],
]

const nodes = [
  { id: 'erp', label: 'ERP', x: 120, y: 70 },
  { id: 'hr', label: 'HR', x: 120, y: 200 },
  { id: 'itsm', label: 'ITSM', x: 120, y: 330 },
  { id: 'siem', label: 'SIEM', x: 680, y: 110 },
  { id: 'iam', label: 'IAM', x: 680, y: 290 },
]

export default function Security() {
  return (
    <>
      <PageHero
        eyebrow="Security & integrations"
        title="Built for regulated environments."
        sub="AI-driven, multi-tenant and cloud-native — hardened for telecoms, finance, insurance and regulatory oversight, and open where it counts."
      />
      <section style={{ padding: '12px 0 84px' }}>
        <div className="wrap">
          <div className="sec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {tiles.map(([k, v], i) => (
              <Reveal key={k} delay={(i % 3) * 0.06}>
                <div className="glass vault-scan" style={{ padding: 24, height: '100%' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--brand-deep)' }}>0{i + 1}</div>
                  <h3 style={{ fontSize: 17, margin: '8px 0' }}>{k}</h3>
                  <p className="muted" style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>{v}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <style>{`@media(max-width:860px){ .sec-grid{ grid-template-columns:1fr !important } }`}</style>
        </div>
      </section>

      <section style={{ padding: '0 0 84px' }}>
        <div className="wrap" style={{ maxWidth: 900 }}>
          <Reveal><span className="eyebrow-mono">Integrations</span></Reveal>
          <Reveal delay={0.05}>
            <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,44px)', margin: '12px 0 6px' }}>Plays well with your stack.</h2>
            <p className="muted" style={{ margin: '0 0 24px' }}>Open APIs, SSO and connectors — data flows in, insight flows out, including regulatory threat-intel feeds.</p>
          </Reveal>
          <Reveal>
            <div className="glass" style={{ padding: 16 }}>
              <svg viewBox="0 0 800 400" style={{ width: '100%', height: 'auto', display: 'block' }} role="img" aria-label="Integration diagram: NovrGRC connected to ERP, HR, ITSM, SIEM and IAM">
                {nodes.map((n) => (
                  <line key={n.id} x1={400} y1={200} x2={n.x} y2={n.y} stroke="var(--brand)" strokeWidth="1.5" strokeDasharray="6 6" className="flowline" />
                ))}
                {nodes.map((n) => (
                  <g key={n.id}>
                    <rect x={n.x - 62} y={n.y - 26} width={124} height={52} rx={12} fill="#fff" stroke="var(--line)" />
                    <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize={13} fontWeight={700} fill="var(--ink)" fontFamily="var(--font-mono)">{n.label}</text>
                  </g>
                ))}
                <circle cx={400} cy={200} r={64} fill="var(--dark-band)" />
                <circle cx={400} cy={200} r={64} fill="none" stroke="var(--lime)" strokeWidth={2} />
                <text x={400} y={195} textAnchor="middle" fontSize={16} fontWeight={800} fill="#fff">NovrGRC</text>
                <text x={400} y={214} textAnchor="middle" fontSize={10} fill="var(--lime)" fontFamily="var(--font-mono)">OPEN API + SSO</text>
              </svg>
            </div>
          </Reveal>
          <style>{`.flowline{ animation: dashmove 1.2s linear infinite } @keyframes dashmove{ to{ stroke-dashoffset:-24 } } @media (prefers-reduced-motion: reduce){ .flowline{ animation:none } }`}</style>
          <Reveal delay={0.1}>
            <div style={{ marginTop: 18, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['Open APIs', 'SSO', 'ERP · HR · ITSM', 'SIEM · IAM', 'Regulatory threat-intel feeds'].map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <CtaBand title="See how it fits your stack." />
    </>
  )
}
