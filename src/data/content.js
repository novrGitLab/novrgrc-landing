export const outcomes = [
  { value: 1, suffix: '', label: 'Single source of truth for risk and compliance, with Smart Mapping across frameworks.' },
  { value: 40, suffix: '%', label: 'Less time spent on compliance reporting. (sample data)' },
  { value: 365, suffix: '', label: 'Better audit readiness and regulator confidence, year round.' },
  { value: 17, suffix: '+', label: 'Nigerian and international frameworks supported out of the box.' },
  { value: 4, suffix: '', label: 'Sectors covered: telecoms, banks, fintechs, insurers — plus regulators.' },
  { value: 100, suffix: '%', label: 'Visibility of cyber risk and resilience maturity, in real time.' },
]

export const frameworksNG = ['NCC', 'CBN-CRF', 'NDPA']

export const frameworksIntl = [
  'SOC 2',
  'ISO 27001',
  'PCI DSS',
  'HIPAA',
  'CMMC',
  'GDPR',
  'NIST CSF',
  'COBIT',
  'SOX',
  'FISMA',
  'GLBA',
  'ISO 31000',
  'CIS Controls',
]

export const frameworksAll = [...frameworksNG, ...frameworksIntl, '…and more']

export const pillars = [
  { n: '01', label: 'Governance & oversight', h: 62 },
  { n: '02', label: 'Risk management', h: 78 },
  { n: '03', label: 'Compliance & controls', h: 96 },
  { n: '04', label: 'Incident response & resilience', h: 72 },
  { n: '05', label: 'Capacity & reporting', h: 58 },
]

export const modules = [
  { key: 'Risk', title: 'Risk Management', image: '/risk-register.png', bullets: ['Automated risk register and risk taxonomy', 'Qualitative & quantitative assessments', 'Key Risk Indicators (KRIs) with thresholds and alerts', 'Risk heatmaps and appetite tracking'] },
  { key: 'Compliance', title: 'Compliance Management', image: '/control-library.png', bullets: ['Framework repository — Nigerian + international', 'Automated control mapping (Smart Mapping)', 'Automated assessments and attestations', 'Compliance dashboards by entity, group and sector'] },
  { key: 'Audit', title: 'Audit Management', image: '/audit.png', bullets: ['Audit planning and scheduling', 'Evidence upload and workpapers', 'Findings and remediation tracking'] },
  { key: 'Third-party', title: 'Third-Party & Fourth-Party Risk', image: '/license.png', bullets: ['Vendor onboarding and due diligence', 'Vendor risk analysis and scoring', 'Continuous supplier monitoring', 'Contract repository'] },
  { key: 'Policy', title: 'Policy Management', image: '/reports.png', bullets: ['Automated workflows from drafting to renewal', 'Role-based controls and accountability', 'Real-time dashboards across the policy lifecycle'] },
  { key: 'Reporting', title: 'Reporting & Analytics', image: '/dashboard.png', bullets: ['CISO dashboards and board-level reporting', 'Regulator-ready templates', 'Real-time insights on cyber resilience maturity'] },
  { key: 'Security', title: 'Security & Governance', image: '/governance.png', bullets: ['Air-gapped multi-tenancy', 'Role-based access control, MFA and encryption', 'Full audit logs'] },
]
