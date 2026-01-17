import { Product } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function RankingTable({ products }: { products: Product[] }) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">순위</TableHead>
              <TableHead>모델</TableHead>
              <TableHead className="text-right">총점</TableHead>
              <TableHead className="hidden md:table-cell">한줄평</TableHead>
              <TableHead className="hidden md:table-cell">추천대상</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Badge variant="secondary" className="font-bold text-base">
                    {product.rank_in_category}위
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="font-semibold">{product.brand}</div>
                  <div className="text-sm text-muted-foreground">{product.model}</div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge className="text-base">{product.score_total}점</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                  {product.positive_keywords_top3[0]} / {product.negative_keywords_top3[0]}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                  {product.price_tier === 'budget' && '예산 10만원대'}
                  {product.price_tier === 'mid' && '예산 20~30만원대'}
                  {product.price_tier === 'premium' && '예산 40만원대 이상'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
