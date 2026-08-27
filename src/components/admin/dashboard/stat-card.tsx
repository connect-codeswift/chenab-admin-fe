import Image from "next/image";
import type {
  DashboardStat,
  StatArrow,
  StatTone,
  StatTrend,
} from "@/components/admin/dashboard/dashboard-types";

export type StatCardProps = Readonly<{
  stat: DashboardStat;
}>;

const cardClassByTone: Record<StatTone, string> = {
  dark: "bg-brand-deep shadow-md",
  light: "border border-surface-base bg-surface-base/50 shadow-md",
};

const labelClassByTone: Record<StatTone, string> = {
  dark: "text-tiny text-sm text-ink-on-deep",
  light: "text-tiny text-sm text-ink-primary",
};

const valueClassByTone: Record<StatTone, string> = {
  dark: "text-h2 text-ink-on-deep",
  light: "text-h2 text-ink-primary",
};

const arrowIconByTone: Record<StatTone, string> = {
  dark: "/icons/admin/stat-arrow-light.svg",
  light: "/icons/admin/stat-arrow.svg",
};

const rotationByArrow: Record<StatArrow, string> = {
  up: "",
  down: "rotate-180",
};

const trendIconByTrend: Record<StatTrend, string> = {
  positive: "/icons/admin/trend-up.svg",
  critical: "/icons/admin/trend-down.svg",
};

const noteClassByTrend: Record<StatTrend, string> = {
  positive: "text-state-positive-ink text-sm",
  critical: "text-state-critical text-sm",
};

export function StatCard(props: Readonly<StatCardProps>) {
  const { stat } = props;

  return (
    <article
      className={`flex flex-col gap-4 rounded px-4 py-6 ${cardClassByTone[stat.tone]}`}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className={labelClassByTone[stat.tone]}>{stat.label}</h2>
        <Image
          src={arrowIconByTone[stat.tone]}
          alt=""
          width={24}
          height={24}
          className={`size-6 shrink-0 ${rotationByArrow[stat.arrow]}`}
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className={valueClassByTone[stat.tone]}>{stat.value}</p>
        <p className="flex items-center gap-1 pt-1">
          <Image
            src={trendIconByTrend[stat.trend]}
            alt=""
            width={18}
            height={18}
            className={`size-4.5 shrink-0 ${rotationByArrow[stat.arrow]}`}
          />
          <span className={`text-tiny ${noteClassByTrend[stat.trend]}`}>
            {stat.note}
          </span>
        </p>
      </div>
    </article>
  );
}
