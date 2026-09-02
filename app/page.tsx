'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, ChevronRight, Menu, X, Check, Plus, Minus, MoveUpRight } from 'lucide-react'
import { KalenSolvesLogo, KalenSolvesMark } from '@/components/kalen-solves-logo'

const products = [
  { number: '01', name: 'MarginMate', desc: 'Profit-first estimating for contractors.', status: 'Available', featured: true },
  { number: '02', name: 'A focused product', desc: 'Built for a problem worth solving.', status: 'Coming soon' },
  { number: '03', name: 'Another useful tool', desc: 'Quietly removing friction from work.', status: 'Coming soon' },
]

const faqs = [
  ['What kind of software does Kalen Solves build?', 'Focused products and custom business tools: internal systems, workflow automation, dashboards, portals, and web applications designed around the way your team works.'],
  ['Do I need to know exactly what software I need?', 'No. Start with the bottleneck. A clear description of what is not working is enough to begin a useful conversation.'],
  ['How is custom software priced?', 'Pricing depends on workflows, integrations, features, and complexity. We scope the work before discussing a project price.'],
  ['Can you customize an existing Kalen Solves product?', 'We can explore whether a focused product is the right starting point and what your workflow would need.'],
  ['How long does a custom project take?', 'It depends on scope and complexity. We will define the first useful version and the path beyond it together.'],
  ['Do you work with small businesses?', 'Yes. Practical software should be useful at every stage of a business.'],
]

function Button({ children, href, secondary = false, onClick }: { children: React.ReactNode; href?: string; secondary?: boolean; onClick?: () => void }) {
  const className = `button ${secondary ? 'button-secondary' : ''}`
  return href ? <a className={className} href={href}>{children}<ArrowUpRight size={16} /></a> : <button className={className} onClick={onClick}>{children}<ArrowUpRight size={16} /></button>
}

function HeroVisual() {
  const [active, setActive] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [ambient, setAmbient] = useState<string | null>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const nodes = [
    ['Workflow', 'Map the way work actually moves through the business.', 'UNDERSTAND'],
    ['Data', 'Bring the information needed for the workflow into one usable system.', 'CONNECT'],
    ['Margin', 'Protect the economics behind business decisions.', 'PROTECT'],
    ['Automation', 'Remove repetitive steps that software can handle reliably.', 'EXECUTE'],
    ['Decision', 'Turn business information into clear actions.', 'DECIDE'],
    ['Output', 'Produce useful results — quotes, reports, actions, records or customer-facing outputs.', 'DELIVER'],
  ]
  const focused = preview || active || ambient
  const activeNode = useMemo(() => nodes.find(([label]) => label === focused), [focused])
  useEffect(() => {
    if (active) return
    const sequence = ['Workflow', 'Margin', 'Automation', 'Output']
    let index = 0
    const timer = window.setInterval(() => { setAmbient(sequence[index]); index = (index + 1) % sequence.length }, 4800)
    return () => window.clearInterval(timer)
  }, [active])
  const choose = (label: string) => { setActive(label); setPreview(null); setAmbient(null) }
  return <div className={`hero-visual ${focused ? 'has-focus' : ''}`} aria-label="Kalen Solves business logic system visualization" onClick={() => { setActive(null); setPreview(null); setAmbient(null) }} onMouseMove={(event) => { const r = event.currentTarget.getBoundingClientRect(); setTilt({ x: (event.clientY - r.top - r.height / 2) / 40, y: (event.clientX - r.left - r.width / 2) / -40 }) }} onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setPreview(null) }}>
    <div className="visual-grid" /><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="visual-orbit orbit-three" />
    <svg className="system-connections" viewBox="0 0 600 570" aria-hidden="true"><path className={`connection-path workflow-data ${focused === 'Workflow' || focused === 'Data' ? 'is-relevant' : ''}`} d="M90 130 C190 150 215 205 300 285" /><path className={`connection-path logic-margin ${focused === 'Margin' || focused === 'Decision' ? 'is-relevant' : ''}`} d="M300 285 C360 320 390 370 440 395" /><path className={`connection-path logic-automation ${focused === 'Automation' || focused === 'Output' ? 'is-relevant' : ''}`} d="M300 285 C385 245 420 210 500 165" /><path className={`connection-path decision-output ${focused === 'Decision' || focused === 'Output' ? 'is-relevant' : ''}`} d="M440 395 C475 350 490 280 500 165" /></svg>
    <div className="visual-stage" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }} onClick={(event) => event.stopPropagation()}>
      <div className={`visual-center ${focused ? 'is-focused' : ''}`}><KalenSolvesMark /><span className="eyebrow">KALEN SOLVES / SYSTEM</span><strong>Business<br /><em>logic.</em></strong><small className="center-state">{activeNode?.[2] || 'BUSINESS LOGIC'}</small><span className="center-dot" /></div>
      {nodes.map(([label, description], i) => <button aria-label={`Explore ${label}`} className={`visual-layer layer-${i + 1} ${focused === label ? 'is-hovered' : ''} ${active === label ? 'is-locked' : ''}`} onMouseEnter={() => setPreview(label)} onFocus={() => setPreview(label)} onBlur={() => setPreview(null)} onClick={() => choose(label)} key={label}><span className="layer-index">0{i + 1}</span><span>{label}</span><span className="layer-pulse" />{focused === label && <small>{description}</small>}</button>)}
    </div>
    <div className="visual-footer"><span>Problem</span><i /><span>Software</span><i /><span>Outcome <ArrowUpRight size={13} /></span></div>
  </div>
}

function MarginMate() {
  const [quote, setQuote] = useState(6800)
  const [cost, setCost] = useState(6020)
  const margin = Math.max(0, Math.round(((quote - cost) / quote) * 1000) / 10)
  const recommended = Math.round(cost / 0.65)
  const gap = quote - recommended
  const status = margin >= 35 ? ['SAFE TO QUOTE', 'This quote protects your target profitability.', 'safe'] : margin >= 20 ? ['MARGIN RISK', 'This quote needs a closer look before you send it.', 'risk'] : ['DO NOT QUOTE', 'This quote is below your target profitability.', 'danger']
  return <div className="margin-demo">
    <div className="demo-head"><div><span className="eyebrow">LIVE PROFIT GUARD</span><h3>See the real margin.</h3></div><span className={`status-pill ${status[2]}`}><span /> {status[0]}</span></div>
    <div className="demo-grid"><div className="demo-inputs">
      <label>True job cost <output>${cost.toLocaleString()}</output><input type="range" min="4000" max="7000" step="20" value={cost} onChange={e => setCost(Number(e.target.value))} /></label>
      <label>Planned quote <output>${quote.toLocaleString()}</output><input type="range" min="5000" max="14000" step="20" value={quote} onChange={e => setQuote(Number(e.target.value))} /></label>
      <div className="input-row"><span>Labor</span><b>$2,840</b><span>Materials</span><b>$1,920</b></div><div className="input-row"><span>Equipment</span><b>$580</b><span>Overhead</span><b>$680</b></div>
    </div><div className="demo-result"><div className="gauge"><span>{margin}%</span><small>actual margin</small></div><div className="result-row"><span>Target margin</span><b>35%</b></div><div className="result-row"><span>Recommended minimum</span><b>${recommended.toLocaleString()}</b></div><div className={`gap ${gap < 0 ? 'negative' : ''}`}><span>Pricing gap</span><b>{gap < 0 ? '-' : '+'}${Math.abs(gap).toLocaleString()}</b></div><p>{status[1]}</p></div></div>
  </div>
}

function RequestBuilder() {
  const [step, setStep] = useState(1); const [business, setBusiness] = useState(''); const [problem, setProblem] = useState(''); const [type, setType] = useState(''); const [features, setFeatures] = useState<string[]>([]); const [complexity, setComplexity] = useState(''); const [submitted, setSubmitted] = useState(false)
  const options = ['Contractor / Home Services', 'Professional Services', 'E-commerce', 'Operations / Logistics', 'Finance / Administration', 'Other']; const types = ['Internal Business Tool', 'Customer Portal', 'Workflow Automation', 'Dashboard / Reporting', 'Custom Web Application', 'Not Sure Yet']; const featureList = ['User Accounts', 'Dashboard', 'Analytics', 'PDF / Reports', 'Customer Management', 'Payments', 'Notifications', 'File Uploads', 'Integrations', 'Automation', 'Role Permissions', 'Custom Calculations', 'Mobile Friendly', 'API', 'Other'];
  const next = () => setStep(s => Math.min(6, s + 1)); const prev = () => setStep(s => Math.max(1, s - 1));
  return <div className="builder"><div className="builder-top"><div><span className="eyebrow">SOFTWARE REQUEST</span><h3>Start with the problem.</h3></div><span className="step-count">0{step} / 06</span></div><div className="progress"><span style={{ width: `${step / 6 * 100}%` }} /></div><div className="builder-body">
    {step === 1 && <div className="step"><h4>What best describes your business?</h4><div className="option-grid">{options.map(o => <button className={business === o ? 'selected' : ''} onClick={() => setBusiness(o)} key={o}>{o}{business === o && <Check size={16} />}</button>)}</div></div>}
    {step === 2 && <div className="step"><h4>What needs to work better?</h4><textarea value={problem} onChange={e => setProblem(e.target.value)} placeholder="Describe the workflow, bottleneck, repetitive task or software problem you want solved." /></div>}
    {step === 3 && <div className="step"><h4>What kind of software would help?</h4><div className="type-grid">{types.map(o => <button className={type === o ? 'selected' : ''} onClick={() => setType(o)} key={o}><span>{o}</span><ChevronRight size={16} /></button>)}</div></div>}
    {step === 4 && <div className="step"><h4>What might it need to do?</h4><div className="chips">{featureList.map(f => <button className={features.includes(f) ? 'selected' : ''} onClick={() => setFeatures(features.includes(f) ? features.filter(x => x !== f) : [...features, f])} key={f}>{features.includes(f) ? <Check size={13} /> : <Plus size={13} />}{f}</button>)}</div></div>}
    {step === 5 && <div className="step"><h4>How complex does it feel?</h4><div className="complexity">{['Simple', 'Moderate', 'Advanced', 'Not sure'].map(o => <button className={complexity === o ? 'selected' : ''} onClick={() => setComplexity(o)} key={o}><strong>{o}</strong><span>{o === 'Simple' ? 'One clear workflow' : o === 'Moderate' ? 'Several moving parts' : o === 'Advanced' ? 'Complex systems' : 'We can work that out'}</span></button>)}</div><div className="scope-note"><strong>Custom Scope Required</strong><span>Pricing depends on workflows, integrations, features and complexity.</span></div></div>}
    {step === 6 && <div className="step"><h4>Where should we send the details?</h4><div className="contact-grid"><input placeholder="Your name" /><input placeholder="Business name" /><input placeholder="Business email" type="email" /></div><div className="summary"><span>Request summary</span><b>{business || 'Business'} · {type || 'Software'} · {complexity || 'Scope to discuss'}</b></div></div>}
  </div><div className="builder-actions">{step > 1 ? <button className="text-button" onClick={prev}>Back</button> : <span />}{step < 6 ? <button className="button" onClick={next}>Continue <ArrowUpRight size={16} /></button> : <button className="button" onClick={() => setSubmitted(true)}>Submit Software Request <ArrowUpRight size={16} /></button>}</div>{submitted && <div className="modal-backdrop"><div className="confirm-modal"><button className="close" onClick={() => setSubmitted(false)}><X size={18} /></button><span className="confirm-mark"><Check /></span><span className="eyebrow">REQUEST PREPARED</span><h3>Your project details are ready for review.</h3><p>This prototype has prepared your request. No information has been sent.</p><button className="button" onClick={() => setSubmitted(false)}>Continue exploring <ArrowUpRight size={16} /></button></div></div>}</div>
}

export default function Page() {
  const [menu, setMenu] = useState(false); const [faq, setFaq] = useState<number | null>(null); const [node, setNode] = useState(2)
  return <main><nav className="nav"><a className="wordmark" href="#top"><KalenSolvesLogo /></a><div className={`nav-links ${menu ? 'open' : ''}`}><a href="#products" onClick={() => setMenu(false)}>Products</a><a href="#custom" onClick={() => setMenu(false)}>Custom Software</a><a href="#process" onClick={() => setMenu(false)}>How It Works</a><a href="#about" onClick={() => setMenu(false)}>About</a></div><a className="nav-cta" href="#request">Discuss a Project <ArrowUpRight size={15} /></a><button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X /> : <Menu />}</button></nav>
    <section className="hero section" id="top"><div className="hero-copy"><span className="eyebrow reveal">SOFTWARE BUILT AROUND REAL WORK</span><h1 className="reveal">Software for the way<br /><em>your business actually works.</em></h1><p className="hero-sub reveal">Focused software products and custom business tools designed around real workflows, real bottlenecks, and real outcomes.</p><div className="hero-actions reveal"><Button href="#request">Tell Us What You Need</Button><Button href="#products" secondary>Explore Products</Button></div><div className="hero-note reveal"><span />Focused products. <span />Custom software. <span />No unnecessary complexity.</div></div><HeroVisual /></section>
    <section className="positioning"><span>Software should adapt to the business —</span><strong>not force the business to adapt to the software.</strong><div className="keyword-row"><span>Focused</span><span>Useful</span><span>Flexible</span><span>Purpose-built</span><span>Practical</span></div></section>
    <section className="section philosophy"><div className="section-intro"><span className="eyebrow">FOCUSED SOFTWARE</span><h2>Useful software<br /><em>without the noise.</em></h2><p>Kalen Solves builds focused tools designed to remove friction from specific business processes.</p></div><div className="workflow-compare"><div className="chaos"><span className="eyebrow">BEFORE / COMPLEX WORKFLOW</span><div className="chaos-nodes">{['Spreadsheet', 'Messages', 'Manual Calculation', 'Notes', 'Documents', 'Follow-ups', 'Pricing', 'Reporting'].map((n, i) => <span key={n} style={{ transform: `translate(${(i % 2) * 38 - 18}px, ${(i % 3) * 5}px)` }}>{n}</span>)}</div></div><div className="arrow-transform"><MoveUpRight /></div><div className="clean"><span className="eyebrow">AFTER / KALEN SOLVES PRODUCT</span><div className="clean-ui"><div className="ui-bar"><span /><span /><span /></div><div className="ui-total"><small>Today&apos;s workflow</small><strong>One clear view.</strong></div><div className="ui-bars"><i /><i /><i /><i /></div><div className="ui-tag"><Check size={13} /> Ready to act</div></div></div></div></section>
    <section className="section margin-section" id="products"><div className="product-heading"><div><span className="eyebrow">01 / FEATURED PRODUCT</span><h2>MarginMate<br /><em>by Kalen Solves</em></h2></div><div className="product-description"><h3>Know if the quote is profitable before you send it.</h3><p>MarginMate helps independent contractors understand true job cost, protect target margins and detect underpriced jobs before a quote reaches the customer.</p><div className="inline-links"><a href="/marginmate">Explore MarginMate <ArrowUpRight size={15} /></a><a href="/marginmate/demo">Try Live Demo <ArrowUpRight size={15} /></a></div></div></div><MarginMate /></section>
    <section className="section products-rail"><div className="rail-header"><div><span className="eyebrow">THE PRODUCT LINE</span><h2>Focused software.<br /><em>Different problems.</em></h2></div><span className="rail-hint">Scroll to explore <ChevronRight size={15} /></span></div><div className="product-cards">{products.map(p => <a className={`product-card ${p.featured ? 'featured' : ''}`} href={p.featured ? '/marginmate' : '#request'} key={p.number}><span className="card-number">{p.number}</span><span className="card-status">{p.status}</span><h3>{p.name}</h3><p>{p.desc}</p><ArrowUpRight className="card-arrow" size={20} /></a>)}</div></section>
    <section className="custom-hero" id="custom"><div className="custom-inner"><span className="eyebrow">CUSTOM SOFTWARE</span><h2>Your workflow doesn&apos;t fit<br /><em>inside generic software.</em></h2><p>Tell us how your business works, where the friction is, and what you wish your existing tools could do. We&apos;ll scope software around the workflow instead of forcing your workflow into someone else&apos;s system.</p><Button href="#request">Start a Software Request</Button><small>Custom pricing based on scope, features and complexity.</small></div></section>
    <section className="section request-section" id="request"><RequestBuilder /></section>
    <section className="section process" id="process"><div className="process-copy"><span className="eyebrow">HOW CUSTOM SOFTWARE WORKS</span><h2>A clearer path<br /><em>from friction to flow.</em></h2><p>Good software starts by understanding the work it needs to support.</p></div><div className="process-steps">{['Tell us what’s not working', 'Define the software', 'Scope the project', 'Design & build', 'Launch and refine'].map((s, i) => <div className={`process-step ${node === i ? 'active' : ''}`} onClick={() => setNode(i)} key={s}><span>0{i + 1}</span><div><h3>{s}</h3><p>{['Start with the bottleneck, not the jargon.', 'Turn the right ideas into a useful product.', 'Make the work, features and tradeoffs clear.', 'Build carefully around the real workflow.', 'Keep improving as requirements become clear.'][i]}</p></div><ChevronRight size={18} /></div>)}</div></section>
    <section className="section principles" id="about"><div className="section-intro"><span className="eyebrow">WHY KALEN SOLVES</span><h2>Software with a<br /><em>point of view.</em></h2></div><div className="principle-grid">{[['Focused by Design', 'Software should solve its intended problem without unnecessary complexity.'], ['Built Around Workflows', 'The interface follows how the business actually operates.'], ['Business First', 'Technology is useful only when it improves the work.'], ['Expandable', 'Products can evolve as real requirements become clear.']].map(([t, d], i) => <div className="principle" key={t}><span>0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>
    <section className="section architecture"><div className="architecture-copy"><span className="eyebrow">A SYSTEM THAT CONNECTS</span><h2>From business<br /><em>to outcome.</em></h2><p>Click through the layers. Software is most useful when every part is connected to the work.</p></div><div className="arch-map">{[['Business', 'The work as it exists today.'], ['Workflow', 'The sequence, people and decisions inside it.'], ['Kalen Solves Software', 'A focused interface built around the work.'], ['Automation / Decisions / Data', 'The systems that make the work clearer.'], ['Outcome', 'Less friction. Better decisions.']].map(([t, d], i) => <button className={`arch-node ${node === i ? 'active' : ''}`} onClick={() => setNode(i)} key={t}><span>{String(i + 1).padStart(2, '0')}</span><strong>{t}</strong>{node === i && <small>{d}</small>}{i < 4 && <i />}</button>)}</div></section>
    <section className="final-cta"><span className="eyebrow">A BETTER WAY TO WORK</span><h2>There&apos;s probably a better way<br /><em>for your business to work.</em></h2><p>Tell us what&apos;s slowing you down. We&apos;ll determine whether software can make it simpler.</p><div className="hero-actions"><Button href="#request">Discuss Your Software</Button><Button href="#products" secondary>Explore Our Products</Button></div></section>
    <section className="section faq"><div className="section-intro"><span className="eyebrow">QUESTIONS, ANSWERED</span><h2>Keep it<br /><em>straightforward.</em></h2></div><div className="faq-list">{faqs.map(([q, a], i) => <div className={`faq-item ${faq === i ? 'open' : ''}`} key={q}><button onClick={() => setFaq(faq === i ? null : i)}><span>{q}</span>{faq === i ? <Minus size={18} /> : <Plus size={18} />}</button>{faq === i && <p>{a}</p>}</div>)}</div></section>
    <footer><div className="footer-brand"><a className="wordmark" href="#top"><KalenSolvesLogo /></a><p>Software for the way<br />your business actually works.</p></div><div className="footer-links"><div><span>Products</span><a href="/marginmate">MarginMate</a><a href="#products">All Products</a></div><div><span>Services</span><a href="#custom">Custom Software</a><a href="#request">Software Request</a></div><div><span>Company</span><a href="#about">About</a><a href="#request">Contact</a></div><div><span>Legal</span><a href="#top">Privacy</a><a href="#top">Terms</a></div></div><div className="footer-bottom"><span>© 2026 Kalen Solves.</span><span>Built for useful work.</span></div></footer>
  </main>
}
