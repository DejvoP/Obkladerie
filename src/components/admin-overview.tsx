"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAdminInquiries } from "@/components/admin-inquiries-provider";

const DAY_LABELS_MON_FIRST = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"] as const;

type AdminOverviewProps = {
  productCount: number;
  categoryCount: number;
};

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

/** Monday 00:00 of the week that contains `date` (ISO / EU week). */
function startOfWeekMonday(date: Date) {
  const day = startOfDay(date);
  const weekday = day.getDay(); // 0 = Sun … 6 = Sat
  const offset = weekday === 0 ? -6 : 1 - weekday;
  day.setDate(day.getDate() + offset);
  return day;
}

export function AdminOverview({
  productCount,
  categoryCount,
}: AdminOverviewProps) {
  const { inquiries, pendingCount } = useAdminInquiries();

  const weeklyInquiries = useMemo(() => {
    const monday = startOfWeekMonday(new Date());
    const days = Array.from({ length: 7 }, (_, index) => {
      const day = new Date(monday);
      day.setDate(monday.getDate() + index);
      return day;
    });

    return days.map((day, index) => {
      const next = new Date(day);
      next.setDate(day.getDate() + 1);
      const count = inquiries.filter((item) => {
        const created = new Date(item.createdAt);
        return created >= day && created < next;
      }).length;
      return {
        day: DAY_LABELS_MON_FIRST[index],
        poptavky: count,
      };
    });
  }, [inquiries]);

  const weekTotal = weeklyInquiries.reduce(
    (sum, item) => sum + item.poptavky,
    0,
  );
  const doneCount = inquiries.filter((item) => item.status === "done").length;
  const statusRows = [
    { label: "Nevyřízené", value: pendingCount },
    { label: "Vyřízené", value: doneCount },
    { label: "Celkem", value: inquiries.length },
  ];
  const maxStatus = Math.max(...statusRows.map((item) => item.value), 1);

  return (
    <div>
      <h1 className="font-serif text-4xl text-charcoal sm:text-5xl">Přehled</h1>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Nevyřízené poptávky"
          value={String(pendingCount)}
          hint="Čekají na odpověď"
        />
        <StatCard
          label="Celkové poptávky"
          value={String(inquiries.length)}
          hint="V databázi"
        />
        <StatCard
          label="Produkty v katalogu"
          value={String(productCount)}
          hint={`${categoryCount} kategorie`}
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <section className="border border-line bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl text-charcoal">
                Poptávky tento týden
              </h2>
              <p className="mt-1 text-sm text-muted">
                Počet z databáze · týden Po–Ne
              </p>
            </div>
            <p className="font-sans text-3xl text-charcoal">{weekTotal}</p>
          </div>

          <div className="mt-6 h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                accessibilityLayer
                data={weeklyInquiries}
                margin={{ left: 0, right: 8, top: 8, bottom: 0 }}
              >
                <CartesianGrid vertical={false} stroke="#e7e2dc" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval={0}
                  tick={{ fill: "#6f6f6f", fontSize: 12 }}
                />
                <YAxis
                  allowDecimals={false}
                  domain={[0, "auto"]}
                  width={28}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#6f6f6f", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "#f5f1ec" }}
                  contentStyle={{
                    border: "1px solid #e7e2dc",
                    borderRadius: 0,
                    background: "#ffffff",
                    color: "#1f1f1f",
                    fontSize: 13,
                  }}
                  formatter={(value) => [`${value}`, "Poptávky"]}
                />
                <Bar
                  dataKey="poptavky"
                  fill="#c9b29a"
                  maxBarSize={36}
                  radius={[0, 0, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="border border-line bg-white p-6">
          <h2 className="font-serif text-2xl text-charcoal">Stav poptávek</h2>
          <p className="mt-1 text-sm text-muted">
            Rozdělení podle stavu v adminu
          </p>

          <div className="mt-8 flex flex-col gap-5">
            {statusRows.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className="text-charcoal">{item.label}</span>
                  <span className="text-muted">{item.value}</span>
                </div>
                <div className="h-2 bg-soft">
                  <div
                    className="h-full bg-charcoal transition-[width] duration-500"
                    style={{
                      width: `${(item.value / maxStatus) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="border border-line bg-white p-6 text-charcoal">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-3 font-sans text-5xl leading-none">{value}</p>
      <p className="mt-3 text-sm text-muted">{hint}</p>
    </div>
  );
}
