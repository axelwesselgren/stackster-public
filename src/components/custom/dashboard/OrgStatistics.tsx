import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { Cell, Label, Pie, PieChart } from "recharts";

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
} satisfies ChartConfig;

const chartData = [
  { name: "creations", value: 24 },
  { name: "updates", value: 60 },
  { name: "deletions", value: 16 },
];

function OrgStatistics({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const totalChanges = chartData.reduce((acc, entry) => acc + entry.value, 0);

  return (
    <Card className={className} {...props}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Organization Statistics</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer 
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={Object.values(chartConfig)[index].color} 
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalChanges.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Changes
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total changes for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

export { OrgStatistics };