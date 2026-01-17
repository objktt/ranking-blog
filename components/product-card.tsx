import { ProductCard as ProductCardType } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProductCard({ card }: { card: ProductCardType }) {
  const { product, conclusion, pros, cons, forWhom, avoidWhom } = card;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/30">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary" className="text-base font-bold">
                {product.rank_in_category}위
              </Badge>
              <CardTitle className="text-xl">
                {product.brand} {product.model}
              </CardTitle>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <Badge variant="outline">총점 {product.score_total}</Badge>
              <Badge variant="outline">평점 {product.rating_avg}</Badge>
              <Badge variant="outline">리뷰 {product.reviews_count.toLocaleString()}</Badge>
              <Badge variant={product.negative_keyword_rate > 0.15 ? "destructive" : "secondary"}>
                불만률 {(product.negative_keyword_rate * 100).toFixed(1)}%
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="rounded-lg bg-primary/10 p-4">
          <p className="font-semibold text-base">{conclusion}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span className="text-green-600">✓</span>
              좋은 점
            </h4>
            <ul className="space-y-2 text-sm">
              {pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span className="text-red-600">✗</span>
              걸리는 점
            </h4>
            <ul className="space-y-2 text-sm">
              {cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-lg bg-green-50 p-4">
            <p className="font-semibold mb-1 text-green-800">이런 사람에게</p>
            <p className="text-sm text-green-900">{forWhom}</p>
          </div>
          <div className="rounded-lg bg-red-50 p-4">
            <p className="font-semibold mb-1 text-red-800">피해야 할 사람</p>
            <p className="text-sm text-red-900">{avoidWhom}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.affiliate_links.slice(0, 2).map((link, i) => (
            <Button key={i} asChild variant="default">
              <a href={link} target="_blank" rel="noopener noreferrer">
                구매하기 {i + 1}
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
