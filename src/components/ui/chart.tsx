import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

// Configuration de base pour les graphiques
export interface ChartConfig {
  label: string;
  color?: string;
}

// Composant conteneur pour le graphique
interface ChartContainerProps {
  config: ChartConfig;
  className?: string;
  children: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  config,
  className,
  children,
}) => {
  return (
    <div className={`chart-container ${className}`}>
      {children}
    </div>
  );
};

// Composant pour l'affichage des tooltips dans le graphique
interface ChartTooltipProps {
  cursor: boolean;
  content: React.ReactNode;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  cursor,
  content,
}) => {
  return (
    <div className="chart-tooltip">
      {content}
    </div>
  );
};

// Contenu du tooltip personnalisé
interface ChartTooltipContentProps {
  hideLabel?: boolean;
  children: React.ReactNode;
}

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({
  hideLabel,
  children,
}) => {
  return (
    <div className="chart-tooltip-content">
      {children}
    </div>
  );
};

// Composant principal du graphique
interface ChartProps {
  data: { name: string; value: number; fill: string }[];
  innerRadius?: number;
  outerRadius?: number;
}

export const Chart: React.FC<ChartProps> = ({
  data,
  innerRadius = 60,
  outerRadius = 80,
}) => {
  return (
    <ChartContainer config={{ label: "Example Chart" }}>
      <PieChart width={250} height={250}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel children={undefined} />}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={5}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};
