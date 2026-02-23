import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const TYPE_LABELS = {
  inverter: 'Inversor',
  module: 'Modulo',
  cable: 'Cabo',
  connector: 'Conector',
};

const TYPE_STYLES = {
  inverter: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  module: 'bg-green-100 text-green-800 hover:bg-green-100',
  cable: 'bg-amber-100 text-amber-800 hover:bg-amber-100',
  connector: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
};

function formatBRL(cents) {
  return (cents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export default function ProductCard({ product }) {
  return (
    <Card className="flex flex-col transition-shadow hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Badge
          className={cn(
            'uppercase tracking-wide border-0',
            TYPE_STYLES[product.type]
          )}
        >
          {TYPE_LABELS[product.type] || product.type}
        </Badge>
        <span className="text-xs text-muted-foreground font-mono">
          {product.code}
        </span>
      </CardHeader>

      <CardContent className="flex-1 space-y-2">
        <h3 className="font-semibold text-base leading-tight">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {product.manufacturer_name}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {product.ac_power && (
            <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">
              AC: {product.ac_power}W
            </span>
          )}
          {product.dc_power && (
            <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">
              DC: {product.dc_power}W
            </span>
          )}
          <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">
            {product.weight}kg
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t pt-4">
        <span className="text-lg font-bold text-green-600">
          {formatBRL(product.default_price_in_cents)}
        </span>
        <span
          className={cn(
            'text-sm',
            product.stock_quantity === 0
              ? 'text-destructive font-semibold'
              : 'text-muted-foreground'
          )}
        >
          Estoque: {product.stock_quantity}
        </span>
      </CardFooter>
    </Card>
  );
}
