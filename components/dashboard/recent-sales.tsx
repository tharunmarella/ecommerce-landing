import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  sales: number;
}

interface RecentSalesProps {
  products?: Product[];
  loading?: boolean;
}

export function RecentSales({ products = [], loading = false }: RecentSalesProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 animate-pulse">
            <div className="h-9 w-9 rounded-full bg-muted" />
            <div className="flex-1 space-y-1">
              <div className="h-3 w-32 rounded bg-muted" />
              <div className="h-3 w-20 rounded bg-muted" />
            </div>
            <div className="h-3 w-16 rounded bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic text-center py-8">
        No sales data available.
      </p>
    );
  }

  // Top 5 products by units sold
  const top5 = [...products]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {top5.map((product) => {
        // Generate initials from product name
        const words = product.name.split(' ');
        const initials = words.length >= 2
          ? `${words[0][0]}${words[1][0]}`.toUpperCase()
          : product.name.slice(0, 2).toUpperCase();

        const revenue = (product.sales * product.price).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        return (
          <div key={product.id} className="flex items-center">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
              {initials}
            </div>
            <div className="ml-4 space-y-1 flex-1 min-w-0">
              <p className="text-sm font-medium leading-none truncate">{product.name}</p>
              <p className="text-sm text-muted-foreground">{product.sales.toLocaleString()} units sold</p>
            </div>
            <div className="ml-auto font-medium shrink-0">+${revenue}</div>
          </div>
        );
      })}
    </div>
  );
}
