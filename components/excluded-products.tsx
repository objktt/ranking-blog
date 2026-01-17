import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from '@/types';
import { Badge } from "@/components/ui/badge";

interface ExcludedProductProps {
  product: Product;
  reason: string;
}

export function ExcludedProducts({ excluded }: { excluded: ExcludedProductProps[] }) {
  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardHeader>
        <CardTitle className="text-destructive">추천 제외 (탈락)</CardTitle>
        <CardDescription>
          다음 제품은 불만률이 높거나 데이터가 부족하여 순위에서 제외되었습니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {excluded.map((item, idx) => (
            <div key={idx} className="border-l-4 border-destructive pl-4 py-2">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold">{item.product.brand} {item.product.model}</p>
                <Badge variant="destructive">탈락</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{item.reason}</p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span>평점: {item.product.rating_avg}</span>
                <span>•</span>
                <span>리뷰: {item.product.reviews_count}</span>
                <span>•</span>
                <span>불만률: {(item.product.negative_keyword_rate * 100).toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
