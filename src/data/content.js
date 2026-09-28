export const outcomes = [
  { value: 1, suffix: '', label: 'Single source of truth across service provider and sector levels.' },
  { value: 40, suffix: '%', label: 'Less time spent on compliance reporting. (sample data)' },
  { value: 365, suffix: '', label: 'Better audit readiness across the year.' },
  { value: 5, suffix: '', label: 'Pillars of the sector framework (NCS-CRF) covered.' },
  { value: 18, suffix: ' mo', label: 'Return on investment within 12–18 months. (target)' },
  { value: 100, suffix: '%', label: 'Full visibility of sector-wide cyber resilience.' },
]

export const pillars = [
  { n: '01', label: 'Governance, risk & compliance', h: 62 },
  { n: '02', label: 'Risk management', h: 78 },
  { n: '03', label: 'Cybersecurity posture', h: 96 },
  { n: '04', label: 'Incident response & resilience', h: 72 },
  { n: '05', label: 'Capacity building', h: 58 },
]

export const modules = [
  { key: 'Risk', title: 'Risk Management', image: '/risk-register.png', bullets: ['Unified taxonomy: strategic, operational, IT, third-party', 'Qualitative and quantitative assessments', 'Treatment workflows and KRIs with alerts', 'Appetite framework and heatmaps'] },
  { key: 'Compliance', title: 'Compliance Management', image: '/control-library.png', bullets: ['Library of regulations and standards', 'Cross-framework control mapping', 'Regulatory change tracking', 'Automated assessments and attestations'] },
  { key: 'Audit', title: 'Audit Management', image: '/audit.png', bullets: ['Planning and scheduling', 'Automated evidence collection', 'Workpapers with version control', 'Findings and remediation tracking'] },
  { key: 'Third-party', title: 'Third-Party Risk', image: '/license.png', bullets: ['Vendor onboarding and due diligence', 'Assessment questionnaires', 'Continuous supplier monitoring', 'Contract repository'] },
  { key: 'Incidents', title: 'Incident & Issue Management', image: '/governance.png', bullets: ['Central capture and categorisation', 'Root cause analysis & corrective actions', 'Links to risks, controls, requirements'] },
  { key: 'Policy', title: 'Policy Management', image: '/reports.png', bullets: ['Draft-to-acknowledge lifecycle', 'Standard and custom templates', 'Archive of retired policies'] },
  { key: 'Reporting', title: 'Reporting & Analytics', image: '/dashboard.png', bullets: ['Real-time role-based dashboards', 'Risk and compliance heatmaps', 'Automated board and regulator reports'] },
]
