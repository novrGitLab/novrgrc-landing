export const outcomes = [
  { value: 1, suffix: '', label: 'Single source of truth — risk, compliance and audit on one record, at entity and sector level.' },
  { value: 40, suffix: '%', label: 'Less compliance reporting time with automation and Smart Mapping. (sample data)' },
  { value: 100, suffix: '%', label: 'Audit readiness — evidence, workpapers and regulator-ready reports, all year.' },
  { value: 7, suffix: '', label: 'Modules on one record — easy to adopt across business units and geographies.' },
  { value: 12, suffix: '–18 mo', label: 'To demonstrated ROI for service providers. (target)' },
  { value: 10, suffix: '+', label: 'Frameworks covered — Nigerian, international and custom.' },
]

export const grcTrio = [
  { t: 'Governance', d: 'Strategic direction and overarching policies for cybersecurity.' },
  { t: 'Risk Management', d: 'Proactively identifies vulnerabilities and threats, focusing resources on critical assets.' },
  { t: 'Compliance', d: 'Adherence to laws, regulations and internal standards — avoiding penalties and reputational damage.' },
]

// Spec §6 — authoritative framework list, in spec order
export const frameworksSpec = [
  'CRF-NCS',
  'CBN Cybersecurity Framework',
  'NDPA',
  'NCPS',
  'ISO 27001',
  'NIST CSF',
  'PCI DSS',
  'Other internationals',
  'Custom',
]

export const frameworksIntlExamples = [
  'SOC 2',
  'GDPR',
  'HIPAA',
  'CMMC',
  'COBIT',
  'SOX',
  'FISMA',
  'GLBA',
  'ISO 31000',
  'CIS Controls',
]

export const frameworksAll = [...frameworksSpec.slice(0, 7), '…and more', 'Custom']

export const pillars = [
  { n: '01', label: 'Governance & oversight', h: 62 },
  { n: '02', label: 'Risk management', h: 78 },
  { n: '03', label: 'Compliance & controls', h: 96 },
  { n: '04', label: 'Incident response & resilience', h: 72 },
  { n: '05', label: 'Capacity & reporting', h: 58 },
]

// Spec §3 — functional requirements, in spec order
export const modules = [
  { key: 'Risk', title: 'Risk Management', image: '/risk-register.png', bullets: ['Risk register with taxonomy: strategic, operational, IT, third-party', 'Qualitative & quantitative assessments, end-to-end with treatment workflows', 'Control implementation and automated testing in one platform', 'KRIs with thresholds and alerts, appetite framework and heatmaps', 'Scenario planning and stress testing of cyber resilience'] },
  { key: 'Compliance', title: 'Compliance Management', image: '/control-library.png', bullets: ['Repository of regulations, standards and frameworks', 'Control mapping and Smart Mapping across frameworks', 'Regulatory change tracking and impact assessment', 'Automated and customised assessments and attestations', 'Custom tests that continuously monitor controls'] },
  { key: 'Audit', title: 'Audit Management', image: '/audit.png', bullets: ['Planning and scheduling with clear test scope and criteria', 'Automated evidence collection — AWS, GCP, Azure and endpoints', 'Workpapers with version control', 'Findings management and remediation tracking', 'Reporting for audit committees, the board and regulators'] },
  { key: 'Third-party', title: 'Third-Party Risk Management', image: '/license.png', bullets: ['Vendor onboarding and due-diligence workflows', 'Assessment questionnaires with agentic AI — collects, reviews, flags gaps, follows up', 'Impact ratings and external vendor-rating integrations', 'Continuous supplier monitoring inside the risk register', 'Contract repository, compliance tracking and management reports'] },
  { key: 'Incidents', title: 'Incident & Issue Management', image: '/governance.png', bullets: ['Centralised capture and categorisation', 'Root Cause Analysis and Corrective Action Plans', 'Linked to risks, controls and compliance requirements', 'Automated escalation and notifications'] },
  { key: 'Policy', title: 'Policy Management', image: '/reports.png', bullets: ['Lifecycle: draft, review, approve, distribute, acknowledge', 'Template repository plus custom policy templates', 'Archive for out-of-scope policies', 'Automated asset collection — spreadsheets, cloud, APIs'] },
  { key: 'Reporting', title: 'Reporting & Analytics', image: '/dashboard.png', bullets: ['Real-time dashboards for executives and operational teams', 'Risk and compliance heatmaps', 'Automated board and regulator-defined reports', 'Predictive analytics and AI-driven insights'] },
]

export const customers = ['NCC', 'Glo', 'Routelink', 'Rapidlink']
