"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type {
  TooltipContentProps,
  TooltipValueType,
  XAxisTickContentProps,
} from "recharts";
import type { RevenueBar } from "@/components/admin/dashboard/dashboard-types";
import { formatPrice } from "@/components/products/products-data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export type RevenueChartProps = Readonly<{
  bars: readonly RevenueBar[];
  rangeLabel: string;
}>;

/* The peak day is emphasised by fill *and* by its label weight, so the
   highlight never rides on colour alone. */
const dayClassByEmphasis = {
  peak: "fill-ink-primary font-medium",
  rest: "fill-ink-muted font-normal",
} as const;

export function RevenueChart(props: Readonly<RevenueChartProps>) {
  const { bars, rangeLabel } = props;
  const reducedMotion = useReducedMotion();
  const peak = Math.max(...bars.map((bar) => bar.amount), 0);
  const peakDay = bars.find((bar) => bar.amount === peak)?.day;

  function renderDayTick(tick: Readonly<XAxisTickContentProps>) {
    const { x = 0, y = 0, payload } = tick;
    const day = String(payload?.value ?? "");
    const emphasis = day === peakDay ? "peak" : "rest";

    return (
      <text
        x={x}
        y={y}
        dy={14}
        textAnchor="middle"
        className={`text-caption ${dayClassByEmphasis[emphasis]}`}
      >
        {day}
      </text>
    );
  }

  function renderTooltip(
    tooltip: Readonly<TooltipContentProps<TooltipValueType, number | string>>,
  ) {
    const { active, payload } = tooltip;
    const bar: RevenueBar | undefined = payload?.[0]?.payload;

    if (!active || !bar) {
      return null;
    }

    return (
      <div className="rounded border border-line-subtle bg-surface-raised px-3 py-2 shadow-md">
        <p className="text-caption text-ink-muted">{bar.day}</p>
        <p className="text-body-sm font-medium text-ink-primary">
          {formatPrice(bar.amount)}
        </p>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="revenue-this-week"
      className="flex h-full flex-col gap-6 rounded border border-line-subtle bg-surface-base/70 p-6 panel-glow"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 id="revenue-this-week" className="text-body text-ink-primary">
          Revenue this week
        </h2>
        <p className="rounded border border-line-subtle px-3 py-1 text-caption text-ink-muted">
          {rangeLabel}
        </p>
      </div>

      <div className="min-h-45 w-full min-w-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            accessibilityLayer
            data={[...bars]}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            barCategoryGap="24%"
          >
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={renderDayTick}
              interval={0}
            />
            <YAxis hide domain={[0, "dataMax"]} />
            <Tooltip
              content={renderTooltip}
              cursor={{ fill: "var(--color-brand-accent)", fillOpacity: 0.08 }}
            />
            <Bar
              dataKey="amount"
              name="Revenue"
              fill="var(--color-brand-accent)"
              radius={4}
              maxBarSize={48}
              isAnimationActive={!reducedMotion}
            >
              {bars.map((bar) => (
                <Cell
                  key={bar.day}
                  fillOpacity={bar.amount === peak ? 1 : 0.25}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <table className="sr-only">
        <caption>Revenue this week, {rangeLabel}</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {bars.map((bar) => (
            <tr key={bar.day}>
              <th scope="row">{bar.day}</th>
              <td>{formatPrice(bar.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
