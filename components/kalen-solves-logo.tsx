'use client'

import { useState } from 'react'

type LogoProps = { className?: string; showWordmark?: boolean }

export function KalenSolvesMark({ className = '' }: { className?: string }) {
  const [active, setActive] = useState(false)
  return (
    <span className={`ks-mark ${active ? 'is-active' : ''} ${className}`} onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)} aria-hidden="true">
      <svg viewBox="0 0 32 32" role="img" focusable="false">
        <path className="ks-path ks-path-a" d="M7 7v18" />
        <path className="ks-path ks-path-b" d="M7 16 25 7" />
        <path className="ks-path ks-path-c" d="m7 16 18 9" />
        <path className="ks-path ks-path-d" d="M16 12.5 21 16l-5 3.5" />
        <circle cx="7" cy="7" r="2" /><circle cx="7" cy="25" r="2" /><circle cx="25" cy="7" r="2" /><circle cx="25" cy="25" r="2" />
      </svg>
    </span>
  )
}

export function KalenSolvesLogo({ className = '', showWordmark = true }: LogoProps) {
  return <span className={`ks-logo ${className}`}><KalenSolvesMark />{showWordmark && <span className="ks-wordmark">KALEN <b>SOLVES</b></span>}</span>
}
