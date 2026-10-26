"use client";

import { useEffect, useRef, useState } from "react";

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(600);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

function DataTable({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <details className="table-view">
      <summary>View as table</summary>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={String(r[0])}>
                {r.map((c, i) => (
                  <td key={i}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

/** Single-series line chart with a hover crosshair. Values are percentages. */
export function LineChart({ data, label }: { data: { period: string; value: number }[]; label: string }) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const height = 240;
  const m = { top: 16, right: 16, bottom: 28, left: 40 };
  const w = Math.max(width - m.left - m.right, 10);
  const h = height - m.top - m.bottom;
  const x = (i: number) => m.left + (i / (data.length - 1)) * w;
  const y = (v: number) => m.top + h - (v / 100) * h;
  const path = data.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d.value)}`).join("");
  const last = data[data.length - 1];
  const active = hover ?? data.length - 1;

  return (
    <div className="chart" ref={ref}>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={`${label}: from ${data[0].value}% in ${data[0].period} to ${last.value}% in ${last.period}`}
        onMouseLeave={() => setHover(null)}
        onMouseMove={(e) => {
          const px = e.clientX - e.currentTarget.getBoundingClientRect().left;
          const i = Math.round(((px - m.left) / w) * (data.length - 1));
          setHover(Math.min(data.length - 1, Math.max(0, i)));
        }}
      >
        {[0, 25, 50, 75, 100].map((t) => (
          <g key={t}>
            <line className="grid" x1={m.left} x2={m.left + w} y1={y(t)} y2={y(t)} />
            <text className="axis" x={m.left - 8} y={y(t)} dy="0.32em" textAnchor="end">
              {t}%
            </text>
          </g>
        ))}
        {data.map((d, i) => (
          <text key={d.period} className="axis" x={x(i)} y={height - 8} textAnchor="middle">
            {width < 420 && i % 2 ? "" : d.period}
          </text>
        ))}
        <line className="crosshair" x1={x(active)} x2={x(active)} y1={m.top} y2={m.top + h} opacity={hover === null ? 0 : 1} />
        <path d={path} className="line" />
        <circle cx={x(active)} cy={y(data[active].value)} r={5} className="dot" />
      </svg>
      <div
        className="tooltip"
        style={{ left: Math.min(Math.max(x(active), 60), width - 60), top: y(data[active].value) - 12 }}
        aria-hidden
      >
        <span className="muted">{data[active].period}</span> <strong>{data[active].value}%</strong>
      </div>
      <DataTable head={["Period", label]} rows={data.map((d) => [d.period, `${d.value}%`])} />
    </div>
  );
}

/** Two-series horizontal bars: baseline vs. latest, per category. */
export function CompareBars({
  data,
  unit,
}: {
  data: { type: string; baseline: number; latest: number }[];
  unit: string;
}) {
  const max = Math.max(...data.flatMap((d) => [d.baseline, d.latest]));
  return (
    <div className="chart">
      <div className="legend">
        <span>
          <i className="swatch swatch-baseline" /> Baseline (Q1 &rsquo;25)
        </span>
        <span>
          <i className="swatch swatch-latest" /> Latest (Q3 &rsquo;26)
        </span>
      </div>
      <div className="hbars">
        {data.map((d) => (
          <div key={d.type} className="hbar-group">
            <div className="hbar-label">{d.type}</div>
            {(["baseline", "latest"] as const).map((k) => (
              <div key={k} className="hbar-row" title={`${d.type} — ${k === "baseline" ? "Baseline" : "Latest"}: ${d[k]} ${unit}`}>
                <div className={`hbar hbar-${k}`} style={{ width: `${(d[k] / max) * 100}%` }} />
                <span className="hbar-value">{d[k]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <DataTable head={["Incident type", "Baseline", "Latest"]} rows={data.map((d) => [d.type, d.baseline, d.latest])} />
    </div>
  );
}

/** Single-series horizontal bars; the highlighted category is drawn in the brand color. */
export function SimpleBars({ data, highlight, unit }: { data: { method: string; minutes: number }[]; highlight: string; unit: string }) {
  const max = Math.max(...data.map((d) => d.minutes));
  return (
    <div className="chart">
      <div className="hbars">
        {data.map((d) => (
          <div key={d.method} className="hbar-group">
            <div className="hbar-label">{d.method}</div>
            <div className="hbar-row" title={`${d.method}: ${d.minutes} ${unit}`}>
              <div className={d.method === highlight ? "hbar hbar-latest" : "hbar hbar-baseline"} style={{ width: `${(d.minutes / max) * 100}%` }} />
              <span className="hbar-value">
                {d.minutes} {unit}
              </span>
            </div>
          </div>
        ))}
      </div>
      <DataTable head={["Method", `Median (${unit})`]} rows={data.map((d) => [d.method, d.minutes])} />
    </div>
  );
}
