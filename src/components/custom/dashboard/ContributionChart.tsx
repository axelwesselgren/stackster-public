import { 
  Card, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartLegend, 
  ChartLegendContent, 
  ChartTooltip, 
  ChartTooltipContent, 
  type ChartConfig 
} from "@/components/ui/chart";
import { 
  Area,
  AreaChart,
  CartesianGrid,
  XAxis, 
  YAxis
} from "recharts";

const chartData = [
  { month: "January", creations: 5, updates: 8, deletions: 3 },
  { month: "February", creations: 3, updates: 20, deletions: 5 },
  { month: "March", creations: 2, updates: 12, deletions: 3 },
  { month: "April", creations: 7, updates: 19, deletions: 3 },
  { month: "May", creations: 2, updates: 13, deletions: 4 },
  { month: "June", creations: 2, updates: 14, deletions: 6 },
]

const chartConfig = {
  creations: {
    label: "Creations",
    color: "hsl(var(--chart-1))",
  },
  updates: {
    label: "Updates",
    color: "hsl(var(--chart-2))",
  },
  deletions: {
    label: "Deletions",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

function ContributionChart({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Contribution</CardTitle>
        <CardDescription>Your contribution to projects</CardDescription>
      </CardHeader>
      <ChartContainer config={chartConfig} className="w-full max-h-[300px] overflow-hidden ">
        <AreaChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickCount={3}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            dataKey="creations"
            type="natural"
            fill="var(--color-creations)"
            fillOpacity={0.4}
            stroke="var(--color-creations)"
            stackId="a"
          />
          <Area
            dataKey="updates"
            type="natural"
            fill="var(--color-updates)"
            fillOpacity={0.4}
            stroke="var(--color-updates)"
            stackId="a"
          />
          <Area
            dataKey="deletions"
            type="natural"
            fill="var(--color-deletions)"
            fillOpacity={0.4}
            stroke="var(--color-deletions)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  );
}

export { ContributionChart };
