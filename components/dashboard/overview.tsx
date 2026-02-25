import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  sales: number;
}

interface OverviewProps {
  products?: Product[];
  loading?: boolean;
  /** 'sales' (default) shows units sold; 'revenue' shows sales × price */
  mode?: 'sales' | 'revenue';
}

export function Overview({ products = [], loading = false, mode = 'sales' }: OverviewProps) {
  if (loading) {
    return (
      <div className="h-[350px] w-full flex items-center justify-center text-muted-foreground italic">
        Loading chart…
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="h-[350px] w-full flex items-center justify-center text-muted-foreground italic">
        No product data available.
      </div>
    );
  }

  // Show top 12 products sorted by the chosen metric
  const sorted = [...products]
    .sort((a, b) =>
      mode === 'revenue'
        ? b.sales * b.price - a.sales * a.price
        : b.sales - a.sales
    )
    .slice(0, 12);

  const values = sorted.map(p => (mode === 'revenue' ? p.sales * p.price : p.sales));
  const max = Math.max(...values, 1);

  return (
    <div className="flex items-end justify-between h-[350px] px-2 pt-10 gap-1">
      {sorted.map((product, i) => {
        const value = values[i];
        const heightPct = (value / max) * 100;
        const label = mode === 'revenue'
          ? `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
          : `${value.toLocaleString()} sold`;

        return (
          <div key={product.id} className="flex flex-col items-center gap-2 flex-1 group min-w-0">
            <div
              className="w-full bg-primary rounded-t-md transition-all hover:opacity-80 relative"
              style={{ height: `${heightPct}%` }}
            >
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md z-10 pointer-events-none">
                <span className="font-medium">{product.name}</span>
                <br />
                {label}
              </div>
            </div>
            <span className="text-[9px] text-muted-foreground uppercase truncate w-full text-center">
              {product.name.split(' ')[0]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
