'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export type CalculatorValues = { labor: number; materials: number; equipment: number; overhead: number; contingency: number; quote: number; target: number }
export const defaultValues: CalculatorValues = { labor: 2200, materials: 1900, equipment: 400, overhead: 360, contingency: 0, quote: 6500, target: 35 }
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
export const formatMoney = (n: number) => money.format(Number.isFinite(n) ? n : 0)
export function calculate(v: CalculatorValues) { const base = [v.labor,v.materials,v.equipment,v.overhead].reduce((sum,n)=>sum+(Number.isFinite(n)?Math.max(0,n):0),0); const contingency=Math.min(99,Math.max(0,Number.isFinite(v.contingency)?v.contingency:0)); const contingencyAmount=base*contingency/100; const cost=base+contingencyAmount; const quote=Math.max(0,Number.isFinite(v.quote)?v.quote:0); const target=Math.min(99,Math.max(0,Number.isFinite(v.target)?v.target:0)); const denominator=Math.max(0.01,1-target/100); const min=cost/denominator; const profit=quote-cost; const margin=quote>0?(profit/quote)*100:0; return {base,contingencyAmount,cost,quote,target,min,profit,margin,gap:quote-min} }

export function ProfitCalculator({ compact=false, initial=defaultValues }: { compact?: boolean; initial?: CalculatorValues }) {
  const [values,setValues]=useState(initial); const result=useMemo(()=>calculate(values),[values]);
  const status=result.quote<=result.cost?'DO NOT QUOTE':result.margin>=result.target?'SAFE TO QUOTE':'MARGIN RISK';
  const statusClass=status==='SAFE TO QUOTE'?'safe':status==='MARGIN RISK'?'risk':'danger';
  const fields:[keyof CalculatorValues,string,string][]=[['labor','Labor Cost','Direct labor'],['materials','Materials','Purchased materials'],['equipment','Equipment / Subs','Equipment and subs'],['overhead','Overhead','Allocated overhead'],['contingency','Contingency %','Buffer for surprises'],['quote','Planned Quote','Customer price'],['target','Target Margin %','Gross margin goal']];
  return <section className={`profit-calculator ${compact?'compact':''}`} aria-label="Profit Guard calculator">
    <div className="calc-head"><div><span className="mm-kicker">LIVE PROFIT GUARD</span><h2>Check the quote before you send it.</h2></div><span className={`status-badge ${statusClass}`}><i />{status}</span></div>
    <div className="calc-layout"><div className="calc-fields">{fields.map(([key,label,help])=><label className="calc-field" key={key}><span>{label}<small>{help}</small></span><div className="input-wrap"><b>{key.includes('percent')||key==='contingency'||key==='target'?'%':'$'}</b><input type="number" min="0" max={key==='contingency'||key==='target'?99:100000000} value={values[key]} onChange={e=>setValues({...values,[key]:Math.max(0,Number(e.target.value)||0)})} aria-label={label}/></div></label>)}</div>
      <div className="calc-results"><div className="result-hero"><span>Recommended minimum</span><strong>{formatMoney(result.min)}</strong><em>{result.gap>=0?`${formatMoney(result.gap)} above target pricing`:`${formatMoney(Math.abs(result.gap))} pricing gap`}</em></div><div className="result-grid"><Metric label="True job cost" value={formatMoney(result.cost)}/><Metric label="Break-even" value={formatMoney(result.cost)}/><Metric label="Planned margin" value={`${result.margin.toFixed(1)}%`}/><Metric label="Target margin" value={`${result.target}%`}/><Metric label="Expected profit" value={formatMoney(result.profit)} highlight/></div><AnimatePresence mode="wait"><motion.p key={status} className={`status-message ${statusClass}`} initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}}>{status==='SAFE TO QUOTE'?'This quote clears your target margin.':status==='MARGIN RISK'?'This quote covers cost, but misses your protected margin.':'The quote does not cover the true job cost.'}</motion.p></AnimatePresence></div></div>
    <p className="calc-note">Uses target margin, not markup. Contingency is applied to your base cost.</p>
  </section>
}
function Metric({label,value,highlight=false}:{label:string;value:string;highlight?:boolean}){return <div className={highlight?'metric highlight':'metric'}><span>{label}</span><strong>{value}</strong></div>}
