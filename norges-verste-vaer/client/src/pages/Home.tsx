/**
 * DESIGN: Arctic Command Center
 * - Dark background (#060a14) with cyan/teal accents
 * - Monospaced data (JetBrains Mono), Space Grotesk headings
 * - Sharp edges, panel-based layout
 * - Color coding: Red >50, Orange 30-50, Yellow <30
 */

import { useEffect, useState } from "react";
import {
  META,
  TRONSKIFTE,
  DAGENS_LEDER,
  FYLKER_DAG_FOR_DAG,
  FYLKER_SAMMENLAGT,
  STASJONER_PERIODE,
  STASJONER_UKE,
  scoreColor,
  scoreClass,
  fmt,
  fmtChange,
  posLabel,
  posColor,
  sortedSammenlagt,
  sortedIDag,
  sortedDagForDag,
} from "@/lib/weatherData";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663397553509/5iRSSyapKXacEfRoQ8UKk7/hero-storm-6SLKFd38cHXnh2KaC3MWaz.webp";
const TRONSKIFTE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663397553509/5iRSSyapKXacEfRoQ8UKk7/tronskifte-bg-XhXTSnWy2AuXXbLzhzFrNx.webp";
const FINNMARK_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663397553509/5iRSSyapKXacEfRoQ8UKk7/finnmark-storm-4dKCpVi68qmvqJXSr8XqTP.webp";

/* ---- Helpers ---- */
function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1200;
      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(eased * value);
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return <span>{fmt(display)}</span>;
}

function ScoreBar({ score, maxScore = 100, delay = 0 }: { score: number; maxScore?: number; delay?: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setWidth((score / maxScore) * 100), delay);
    return () => clearTimeout(timer);
  }, [score, maxScore, delay]);
  return (
    <div className="progress-track mt-1">
      <div className="progress-fill" style={{ width: `${width}%`, backgroundColor: scoreColor(score) }} />
    </div>
  );
}

function MiniBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full h-1 mt-0.5" style={{ background: "rgba(255,255,255,0.05)" }}>
      <div className="h-full" style={{ width: `${pct}%`, backgroundColor: scoreColor(value), transition: "width 0.8s ease-out" }} />
    </div>
  );
}

function LiveIndicator() {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-data uppercase tracking-widest text-[#00d4ff]">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full bg-[#00d4ff] opacity-75" style={{ borderRadius: "50%" }} />
        <span className="relative inline-flex h-2.5 w-2.5 bg-[#00d4ff]" style={{ borderRadius: "50%" }} />
      </span>
      LIVE
    </span>
  );
}

function FarevarselBadge({ level }: { level: string }) {
  const map: Record<string, { bg: string; text: string; label: string }> = {
    gul:     { bg: "rgba(212,201,87,0.2)",  text: "#d4c957", label: "GUL" },
    oransje: { bg: "rgba(255,170,0,0.2)",   text: "#ffaa00", label: "ORANSJE" },
    rod:     { bg: "rgba(255,45,45,0.2)",    text: "#ff2d2d", label: "RØD" },
  };
  const c = map[level];
  if (!c) return <span className="text-[#4a5568] font-data text-xs">&mdash;</span>;
  return (
    <span className="font-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider"
      style={{ backgroundColor: c.bg, color: c.text, border: `1px solid ${c.text}40` }}>
      {c.label}
    </span>
  );
}

function StatBlock({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-[10px] font-data uppercase tracking-widest text-[#4a6a8a]">{label}</p>
        <p className="font-data text-lg font-semibold text-[#c0d0e0]">{value}</p>
      </div>
    </div>
  );
}

function SectionHeading({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e0e8f0" }}>
        {children}
      </h2>
      {sub && <p className="text-[10px] font-data uppercase tracking-widest text-[#4a6a8a] mt-1">{sub}</p>}
    </div>
  );
}

/* ==================================================================
   MAIN PAGE
   ================================================================== */
export default function Home() {
  const sammenlagt = sortedSammenlagt();
  const dagensTopp = sortedIDag();
  const dagForDag = sortedDagForDag();
  const vinner = sammenlagt[0];

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #060a14 0%, #0a0e17 20%, #0d1220 100%)" }}>

      {/* ===== HERO BANNER ===== */}
      <section className="relative overflow-hidden" style={{ minHeight: "400px" }}>
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(6,10,20,0.3) 0%, rgba(6,10,20,0.85) 70%, #060a14 100%)" }} />
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
          <div className="absolute w-full h-[2px] bg-[#00d4ff]" style={{ animation: "scan-line 4s linear infinite" }} />
        </div>

        <div className="relative container pt-8 pb-12">
          <div className="flex items-center justify-between mb-8">
            <LiveIndicator />
            <span className="font-data text-xs text-[#4a6a8a] tracking-wider">
              {META.datoOppdatert} &middot; {META.rapportVersjon}
            </span>
          </div>

          <div className="mb-6 py-3 px-5 animate-border-pulse"
            style={{ background: "linear-gradient(90deg, rgba(255,45,45,0.08) 0%, rgba(255,45,45,0.02) 100%)", borderLeft: "3px solid #ff2d2d" }}>
            <p className="text-[#ff2d2d] font-bold text-lg tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              NORGES VERSTE V&AElig;R AKKURAT N&Aring;
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div className="animate-fade-up">
              <p className="text-[#4a6a8a] text-sm font-data uppercase tracking-widest mb-2">
                Leder sammenlagt-ligaen &mdash; {META.sammenlagtLabel}
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#ffffff" }}>
                {vinner.navn}
              </h1>
              <div className="flex items-baseline gap-3 mb-6">
                <span className={`font-data text-5xl sm:text-6xl font-bold ${scoreClass(vinner.total)}`}>
                  <AnimatedNumber value={vinner.total} />
                </span>
                <span className="font-data text-lg text-[#4a6a8a]">sammenlagt</span>
                <span className="font-data text-lg text-[#ff2d2d]">
                  +{fmt(vinner.iDag)} i dag
                </span>
              </div>
              <div className="flex flex-wrap gap-6">
                <StatBlock label="Temp i dag" value={`${fmt(DAGENS_LEDER.temp)}°C`} icon="🌡" />
                <StatBlock label="EI i dag" value={`${fmt(DAGENS_LEDER.ei)}`} icon="📊" />
                <StatBlock label="Nedbør i dag" value={`${fmt(DAGENS_LEDER.nedbor)} mm`} icon="🌧" />
              </div>
            </div>

            <div className="panel p-4 w-full lg:w-72">
              <p className="text-[10px] font-data uppercase tracking-widest text-[#4a6a8a] mb-3">Topp 5 sammenlagt</p>
              {sammenlagt.slice(0, 5).map((f, i) => (
                <div key={f.navn} className="flex items-center justify-between py-1.5 border-b border-[#ffffff08] last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="font-data text-xs text-[#4a6a8a] w-4">{i + 1}.</span>
                    <span className="text-sm text-[#c0d0e0]">{f.navn}</span>
                  </div>
                  <span className={`font-data text-sm font-semibold ${scoreClass(f.total)}`}>
                    {fmt(f.total)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRONSKIFTE ===== */}
      {TRONSKIFTE.aktiv && (
        <section className="relative overflow-hidden py-10">
          <div className="absolute inset-0">
            <img src={TRONSKIFTE_IMG} alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #060a14 0%, rgba(6,10,20,0.7) 50%, #060a14 100%)" }} />
          </div>
          <div className="relative container">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, #ff2d2d60, transparent)" }} />
              <h2 className="text-[#ff2d2d] font-bold text-2xl tracking-wider animate-pulse-glow" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                &#9889; {TRONSKIFTE.tittel} &#9889;
              </h2>
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, #ff2d2d60, transparent)" }} />
            </div>
            <p className="text-[#8a9ab0] text-center max-w-2xl mx-auto mb-8 leading-relaxed">{TRONSKIFTE.beskrivelse}</p>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center max-w-3xl mx-auto">
              <div className="panel p-5 text-center" style={{ borderColor: "rgba(0,212,255,0.2)" }}>
                <p className="text-[10px] font-data uppercase tracking-widest text-[#4a6a8a] mb-1">Forrige leder</p>
                <p className="text-xl font-bold text-[#607890]">{TRONSKIFTE.gammelLeder}</p>
              </div>
              <div className="text-center text-3xl text-[#ff2d2d] animate-pulse-glow hidden md:block">&rarr;</div>
              <div className="panel p-5 text-center animate-border-pulse"
                style={{ borderColor: "rgba(255,45,45,0.5)", boxShadow: "0 0 30px rgba(255,45,45,0.1)" }}>
                <p className="text-[10px] font-data uppercase tracking-widest text-[#ff2d2d] mb-1">Ny leder</p>
                <p className="text-xl font-bold text-white">{TRONSKIFTE.nyLeder}</p>
                <p className="font-data text-2xl font-bold text-[#ff2d2d] mt-1">{fmt(vinner.total)}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== DAGENS V&AElig;RTAPERE ===== */}
      <section className="container py-10">
        <SectionHeading sub={META.dagLabel}>DAGENS V&AElig;RTAPERE</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {dagensTopp.slice(0, 3).map((f, i) => {
            const isFirst = i === 0;
            return (
              <div key={f.navn} className={`panel p-5 animate-fade-up ${isFirst ? "animate-border-pulse" : ""}`}
                style={{ animationDelay: `${i * 100}ms`, borderColor: isFirst ? "rgba(255,45,45,0.5)" : "rgba(0,212,255,0.15)", boxShadow: isFirst ? "0 0 25px rgba(255,45,45,0.08)" : "none" }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`font-data text-2xl font-bold ${isFirst ? "text-[#ff2d2d]" : "text-[#4a6a8a]"}`}>#{i + 1}</span>
                    {isFirst && <span className="text-[8px] font-data uppercase tracking-widest px-1.5 py-0.5 bg-[#ff2d2d20] text-[#ff2d2d] border border-[#ff2d2d30]">VERST I DAG</span>}
                  </div>
                  <span className={`font-data text-3xl font-bold ${scoreClass(f.iDag)}`}>{fmt(f.iDag)}</span>
                </div>
                <p className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{f.navn}</p>
                <p className="text-xs text-[#607890] font-data">{fmt(f.iDag)} EI i dag &middot; {fmt(f.total)} sammenlagt</p>
                <ScoreBar score={f.iDag} maxScore={50} delay={i * 100 + 200} />
              </div>
            );
          })}
        </div>
        <div className="mt-6">
          <p className="text-[10px] font-data uppercase tracking-widest text-[#4a6a8a] mb-3">
            Topp 5 stasjoner i dag (s&oslash;ndag 08.03)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {STASJONER_PERIODE.map((s: { navn: string; kommune: string; fylke: string; ei: number; vindkast: number; nedbor: number; temp: number; farevarsel: string }, i: number) => (
              <div key={s.navn} className="panel p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-data text-xs text-[#4a6a8a]">#{i + 1}</span>
                  <span className={`font-data text-xl font-bold ${scoreClass(s.ei)}`}>{fmt(s.ei)}</span>
                </div>
                <p className="text-sm font-bold text-white mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.navn}</p>
                <p className="text-xs text-[#607890]">{s.kommune}, {s.fylke}</p>
                <div className="flex flex-wrap gap-2 mt-2 text-[10px] font-data text-[#4a6a8a]">
                  <span>&#128168; {fmt(s.vindkast)} m/s</span>
                  <span>&#127783; {fmt(s.nedbor)} mm</span>
                  <span>&#127777; {fmt(s.temp)}&deg;C</span>
                </div>
                <div className="mt-2">
                  <FarevarselBadge level={s.farevarsel} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DAG-FOR-DAG UTVIKLING ===== */}
      <section className="container py-10">
        <SectionHeading sub="Frost API-data, deduplisert">
          DAG-FOR-DAG UTVIKLING
        </SectionHeading>

        <div className="panel-highlight p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[#c0d0e0]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Alle fylker &mdash; daglig EI
            </h3>
          </div>

          {/* Header */}
          <div className="hidden sm:grid grid-cols-[2rem_1fr_repeat(7,2.8rem)_1fr] gap-2 py-2 border-b border-[#ffffff10] text-[10px] font-data uppercase tracking-widest text-[#4a6a8a]">
            <span>#</span>
            <span>Fylke</span>
            {META.dagLabels.map((l: string) => <span key={l} className="text-center">{l}</span>)}
            <span>Trend</span>
          </div>

          {dagForDag.slice(0, 5).map((f, i) => {
            const isTop3 = i < 3;
            const maxEi = Math.max(...f.dager);
            return (
              <div key={f.navn} className={`animate-fade-up border-b border-[#ffffff06] ${isTop3 ? "bg-[#ffffff03]" : ""}`}
                style={{ animationDelay: `${i * 60}ms` }}>
                {/* Desktop */}
                <div className="hidden sm:grid grid-cols-[2rem_1fr_repeat(7,2.8rem)_1fr] gap-2 py-3 items-center">
                  <span className={`font-data text-sm ${isTop3 ? "text-[#00d4ff] font-bold" : "text-[#4a6a8a]"}`}>{i + 1}</span>
                  <span className={`text-sm ${isTop3 ? "text-white font-semibold" : "text-[#8a9ab0]"}`}>{f.navn}</span>
                  {f.dager.map((val: number, di: number) => {
                    const isPeak = val === maxEi;
                    return (
                      <div key={di} className="text-center">
                        <span className={`font-data text-sm font-semibold ${isPeak ? scoreClass(val) : "text-[#8a9ab0]"}`}>
                          {fmt(val)}
                        </span>
                        <MiniBar value={val} max={50} />
                      </div>
                    );
                  })}
                  <span className="text-[10px] text-[#607890] leading-tight">{f.trend}</span>
                </div>
                {/* Mobile */}
                <div className="sm:hidden py-3 px-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`font-data text-sm ${isTop3 ? "text-[#00d4ff] font-bold" : "text-[#4a6a8a]"}`}>{i + 1}.</span>
                      <span className={`text-sm ${isTop3 ? "text-white font-semibold" : "text-[#8a9ab0]"}`}>{f.navn}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {f.dager.map((val: number, di: number) => {
                      const isPeak = val === maxEi;
                      return (
                        <div key={di} className="text-center">
                          <p className="text-[9px] font-data text-[#4a6a8a]">{META.dagLabels[di]}</p>
                          <p className={`font-data text-xs font-semibold ${isPeak ? scoreClass(val) : "text-[#8a9ab0]"}`}>
                            {fmt(val)}
                          </p>
                          <MiniBar value={val} max={50} />
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-[#607890] leading-tight">{f.trend}</p>
                </div>
              </div>
            );
          })}

          <details className="mt-2">
            <summary className="text-[10px] font-data uppercase tracking-widest text-[#4a6a8a] cursor-pointer hover:text-[#00d4ff] py-2 select-none">
              Vis alle 15 fylker &#9662;
            </summary>
            {dagForDag.slice(5).map((f, i) => {
              const maxEi = Math.max(...f.dager);
              return (
                <div key={f.navn} className="border-b border-[#ffffff06]">
                  <div className="hidden sm:grid grid-cols-[2rem_1fr_repeat(7,2.8rem)_1fr] gap-2 py-3 items-center">
                    <span className="font-data text-sm text-[#4a6a8a]">{i + 6}</span>
                    <span className="text-sm text-[#8a9ab0]">{f.navn}</span>
                    {f.dager.map((val: number, di: number) => {
                      const isPeak = val === maxEi;
                      return (
                        <div key={di} className="text-center">
                          <span className={`font-data text-sm font-semibold ${isPeak ? scoreClass(val) : "text-[#8a9ab0]"}`}>
                            {fmt(val)}
                          </span>
                          <MiniBar value={val} max={50} />
                        </div>
                      );
                    })}
                    <span className="text-[10px] text-[#607890] leading-tight">{f.trend}</span>
                  </div>
                  <div className="sm:hidden py-3 px-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-data text-sm text-[#4a6a8a]">{i + 6}.</span>
                      <span className="text-sm text-[#8a9ab0]">{f.navn}</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {f.dager.map((val: number, di: number) => (
                        <div key={di} className="text-center">
                          <p className="text-[9px] font-data text-[#4a6a8a]">{META.dagLabels[di]}</p>
                          <p className={`font-data text-xs font-semibold ${val === maxEi ? scoreClass(val) : "text-[#8a9ab0]"}`}>
                            {fmt(val)}
                          </p>
                          <MiniBar value={val} max={50} />
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-[#607890] leading-tight">{f.trend}</p>
                  </div>
                </div>
              );
            })}
          </details>
        </div>
      </section>

      {/* ===== UKENS SAMMENLAGT-LIGA ===== */}
      <section className="container py-10">
        <SectionHeading sub={META.sammenlagtLabel}>
          UKENS ELENDIGHETS-LIGA (Sammenlagt)
        </SectionHeading>
        <div className="panel-highlight p-6">
          <div className="hidden lg:grid grid-cols-[2rem_1fr_5rem_5.5rem_5rem_1fr] gap-2 py-2 border-b border-[#ffffff10] text-[10px] font-data uppercase tracking-widest text-[#4a6a8a]">
            <span>#</span>
            <span>Fylke</span>
            <span className="text-right">I dag</span>
            <span className="text-right">Sammenlagt</span>
            <span className="text-center">Plassering</span>
            <span>Trend</span>
          </div>
          {sammenlagt.map((f, i) => {
            const isTop3 = i < 3;
            const endringColor = f.endringFraIGar > 0 ? "text-[#ff2d2d]" : f.endringFraIGar < 0 ? "text-[#00d4ff]" : "text-[#4a6a8a]";
            const dagForDagMatch = FYLKER_DAG_FOR_DAG.find(fd => fd.navn === f.navn);
            const trendText = dagForDagMatch ? dagForDagMatch.trend : "";
            return (
              <div key={f.navn} className={`animate-fade-up border-b border-[#ffffff06] ${isTop3 ? "bg-[#ffffff03]" : ""}`}
                style={{ animationDelay: `${i * 40}ms` }}>
                <div className="hidden lg:grid grid-cols-[2rem_1fr_5rem_5.5rem_5rem_1fr] gap-2 py-3 items-center">
                  <span className={`font-data text-sm ${isTop3 ? "text-[#00d4ff] font-bold" : "text-[#4a6a8a]"}`}>{i + 1}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${isTop3 ? "text-white font-semibold" : "text-[#8a9ab0]"}`}>{f.navn}</span>
                    {i === 0 && <span className="text-[8px] font-data uppercase tracking-widest px-1.5 py-0.5 bg-[#ff2d2d20] text-[#ff2d2d] border border-[#ff2d2d30]">LEDER</span>}
                  </div>
                  <span className={`font-data text-sm text-right ${endringColor}`}>{fmtChange(f.endringFraIGar)}</span>
                  <span className={`font-data text-sm text-right font-bold ${scoreClass(f.total)}`}>{fmt(f.total)}</span>
                  <span className="font-data text-xs text-center" style={{ color: posColor(f.plasseringEndring) }}>{posLabel(f.plasseringEndring)}</span>
                  <span className="text-xs text-[#607890] truncate">{trendText}</span>
                </div>
                <div className="lg:hidden py-3 px-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-data text-sm ${isTop3 ? "text-[#00d4ff] font-bold" : "text-[#4a6a8a]"}`}>{i + 1}.</span>
                      <span className={`text-sm ${isTop3 ? "text-white font-semibold" : "text-[#8a9ab0]"}`}>{f.navn}</span>
                      {i === 0 && <span className="text-[8px] font-data uppercase tracking-widest px-1 py-0.5 bg-[#ff2d2d20] text-[#ff2d2d] border border-[#ff2d2d30]">LEDER</span>}
                    </div>
                    <span className={`font-data text-sm font-bold ${scoreClass(f.total)}`}>{fmt(f.total)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-data">
                    <span className={endringColor}>{fmtChange(f.endringFraIGar)} i dag</span>
                    <span style={{ color: posColor(f.plasseringEndring) }}>{posLabel(f.plasseringEndring)}</span>
                    <span className="text-[#607890] truncate">{trendText}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== TOPP 5 STASJONER (perioden) ===== */}
      <section className="container py-10">
        <SectionHeading sub="Søndag 08.03.2026 — Frost API P1D + timesdata">
          Topp 5 Stasjoner &mdash; Søndag 08.03
        </SectionHeading>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {STASJONER_PERIODE.map((s, i) => {
            const isCritical = s.ei > 50;
            return (
              <div key={s.navn} className={`panel p-4 animate-fade-up ${isCritical ? "animate-border-pulse" : ""}`}
                style={{ animationDelay: `${i * 80}ms`, borderColor: isCritical ? "rgba(255,45,45,0.4)" : "rgba(0,212,255,0.15)", boxShadow: isCritical ? "0 0 20px rgba(255,45,45,0.08)" : "none" }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-data text-xs text-[#4a6a8a]">#{i + 1}</span>
                      <span className="text-base font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.navn}</span>
                    </div>
                    <p className="text-xs text-[#607890]">{s.kommune}, {s.fylke}</p>
                  </div>
                  <div className="text-right">
                    <span className={`font-data text-2xl font-bold ${scoreClass(s.ei)}`}>{fmt(s.ei)}</span>
                    <p className="text-[10px] font-data text-[#4a6a8a] uppercase tracking-widest">EI</p>
                  </div>
                </div>
                <ScoreBar score={s.ei} delay={i * 80 + 200} />
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div>
                    <p className="text-[9px] font-data uppercase tracking-widest text-[#4a6a8a]">Vindkast</p>
                    <p className="font-data text-sm font-semibold text-[#c0d0e0]">{fmt(s.vindkast)} m/s</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-data uppercase tracking-widest text-[#4a6a8a]">Nedb&oslash;r</p>
                    <p className="font-data text-sm font-semibold text-[#c0d0e0]">{fmt(s.nedbor)} mm</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-data uppercase tracking-widest text-[#4a6a8a]">Temp</p>
                    <p className="font-data text-sm font-semibold text-[#c0d0e0]">{fmt(s.temp)}&deg;C</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== UKENS VERSTE STASJONER ===== */}
      <section className="container py-10">
        <SectionHeading sub="Sammenlagt man–søn 02.03–08.03 — Frost API, 1472 stasjoner">
          Ukens Verste Stasjoner
        </SectionHeading>
        <div className="grid grid-cols-1 gap-4">
          {STASJONER_UKE.map((s, i) => {
            const isCritical = s.totalEi > 300;
            const peakDay = s.dager.indexOf(Math.max(...s.dager));
            const peakLabels = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];
            return (
              <div key={s.navn}
                className={`panel p-5 animate-fade-up ${isCritical ? "animate-border-pulse" : ""}`}
                style={{ animationDelay: `${i * 80}ms`, borderColor: isCritical ? "rgba(255,45,45,0.4)" : "rgba(0,212,255,0.15)", boxShadow: isCritical ? "0 0 20px rgba(255,45,45,0.08)" : "none" }}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-data text-xs text-[#4a6a8a]">#{i + 1}</span>
                      <span className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.navn}</span>
                      {i === 0 && <span className="text-[10px] font-data uppercase tracking-widest px-2 py-0.5" style={{ background: "rgba(255,45,45,0.15)", color: "#ff2d2d", border: "1px solid rgba(255,45,45,0.3)" }}>UKENS VINNER</span>}
                    </div>
                    <p className="text-xs text-[#607890] mb-2">{s.kommune}, {s.fylke}</p>
                    <p className="text-xs text-[#8a9ab0] leading-relaxed">{s.beskrivelse}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`font-data text-3xl font-bold ${scoreClass(s.totalEi / 7)}`}>{s.totalEi.toFixed(1)}</span>
                    <p className="text-[10px] font-data text-[#4a6a8a] uppercase tracking-widest">Total EI</p>
                    <p className="text-[10px] font-data text-[#607890] mt-1">Toppdag: {peakLabels[peakDay]} ({s.dager[peakDay].toFixed(1)})</p>
                  </div>
                </div>
                {/* Dag-for-dag mini bars */}
                <div className="mt-3">
                  <p className="text-[9px] font-data uppercase tracking-widest text-[#4a6a8a] mb-2">Daglig EI (man–søn)</p>
                  <div className="grid grid-cols-7 gap-1">
                    {s.dager.map((val, di) => (
                      <div key={di} className="flex flex-col items-center gap-1">
                        <div className="w-full relative" style={{ height: "40px" }}>
                          <div className="absolute bottom-0 w-full" style={{ height: `${Math.min(100, (val / 90) * 100)}%`, backgroundColor: scoreColor(val), opacity: di === peakDay ? 1 : 0.6, transition: "height 0.8s ease-out" }} />
                        </div>
                        <span className="text-[8px] font-data" style={{ color: scoreColor(val) }}>{val.toFixed(0)}</span>
                        <span className="text-[7px] font-data text-[#4a6a8a]">{peakLabels[di]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mt-4 pt-3" style={{ borderTop: "1px solid rgba(0,212,255,0.08)" }}>
                  <div>
                    <p className="text-[9px] font-data uppercase tracking-widest text-[#4a6a8a]">Maks vindkast</p>
                    <p className="font-data text-sm font-semibold text-[#c0d0e0]">{s.gustMax.toFixed(1)} m/s</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-data uppercase tracking-widest text-[#4a6a8a]">Total nedbør</p>
                    <p className="font-data text-sm font-semibold text-[#c0d0e0]">{s.precipTotal.toFixed(1)} mm</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-data uppercase tracking-widest text-[#4a6a8a]">Min temp</p>
                    <p className="font-data text-sm font-semibold text-[#c0d0e0]">{s.tempMin.toFixed(1)}°C</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== FINNMARK SPOTLIGHT ===== */}
      <section className="relative overflow-hidden py-10">
        <div className="absolute inset-0">
          <img src={FINNMARK_IMG} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #060a14 0%, rgba(6,10,20,0.6) 50%, #060a14 100%)" }} />
        </div>
        <div className="relative container">
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] font-data uppercase tracking-widest text-[#ff6b6b] mb-2">Ukens vinner &mdash; N&aelig;rbilde</p>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#ffffff" }}>
              Finnmark: Kuldens kongerike
            </h2>
            <p className="text-[#8a9ab0] leading-relaxed mb-6">
              Finnmark tar ukesseieren med 244.9 poeng &mdash; nesten 10 foran Nordland (235.1). Vedvarende kulde (ned til -9&deg;C p&aring; B&aring;tsfjord) og sterk vind gjennom hele uken gj&oslash;r Finnmark til Norges elendigste fylke uke 10. Hasvik&ndash;Sluskfjellet m&aring;lte 43.2 m/s vindkast l&oslash;rdag &mdash; ukens h&oslash;yeste.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="panel p-4 text-center">
                <p className="text-[10px] font-data uppercase tracking-widest text-[#4a6a8a] mb-1">Temp</p>
                <p className="font-data text-2xl font-bold text-[#00d4ff]">{fmt(DAGENS_LEDER.temp)}&deg;C</p>
              </div>
              <div className="panel p-4 text-center">
                <p className="text-[10px] font-data uppercase tracking-widest text-[#4a6a8a] mb-1">EI i dag</p>
                <p className="font-data text-2xl font-bold text-[#ffaa00]">{fmt(DAGENS_LEDER.ei)}</p>
              </div>
              <div className="panel p-4 text-center">
                <p className="text-[10px] font-data uppercase tracking-widest text-[#4a6a8a] mb-1">Nedb&oslash;r</p>
                <p className="font-data text-2xl font-bold text-[#00d4ff]">{fmt(DAGENS_LEDER.nedbor)} mm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FORMEL ===== */}
      <section className="container py-10">
        <div className="panel p-6 max-w-3xl mx-auto">
          <h3 className="text-sm font-bold tracking-wide mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#8a9ab0" }}>
            Elendighets-Indeks Formel
          </h3>
          <div className="font-data text-xs text-[#607890] space-y-2 leading-relaxed">
            <p className="text-[#00d4ff]">
              EI = (Gj.snitt vind &times; 2.0) + (Maks vindkast &times; 0.5) + (Total nedb&oslash;r &times; 0.5) + (20 &minus; Gj.snitt temp)
            </p>
            <p><span className="text-[#d4c957]">SLUDD-BONUS:</span> +15 poeng hvis temp mellom &minus;1&deg;C og +2&deg;C OG nedb&oslash;r &gt; 0</p>
            <p><span className="text-[#ffaa00]">FAREVARSEL:</span> Gul +10 &middot; Oransje +25 &middot; R&oslash;d +50</p>
            <p className="mt-3 text-[#4a6a8a]">Sammenlagt = sum av daglige EI-verdier gjennom uken. Totalen kan aldri minke.</p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="container pb-8">
        <div className="border-t border-[#ffffff08] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[10px] font-data text-[#3a4a5a] uppercase tracking-widest">
            Norges Verste V&aelig;r &middot; TikTok-serien &middot; Data fra Frost API (frost.met.no)
          </div>
          <div className="text-[10px] font-data text-[#3a4a5a]">
            Rapport {META.rapportVersjon} &middot; Oppdatert {META.datoOppdatert}
          </div>
        </div>
      </footer>
    </div>
  );
}
