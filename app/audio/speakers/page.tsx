import { productCards } from '@/data/products';
import { audioSpeakersTop10 } from '@/data/templates';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function SpeakersTop10() {
  const template = audioSpeakersTop10;
  const cards = productCards.slice(5, 10);

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          {template.title}
        </h1>
      </section>

      <section>
        <Card className="bg-muted/50 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">오늘 결론</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-lg">
              {template.conclusion.map((line, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mt-1">▶</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">고르는 기준</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {template.criteria.map((criterion, idx) => (
            <div key={idx} className="flex items-start gap-2 rounded-lg border p-4">
              <span className="text-primary font-bold text-lg">{idx + 1}</span>
              <span className="text-sm">{criterion}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">TOP 10 순위</h2>
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
                {cards.map((card) => (
                  <TableRow key={card.product.id}>
                    <TableCell>
                      <Badge variant="secondary" className="font-bold text-base">
                        {card.product.rank_in_category}위
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold">{card.product.brand}</div>
                      <div className="text-sm text-muted-foreground">{card.product.model}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className="text-base">{card.product.score_total}점</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                      {card.conclusion}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                      {card.forWhom}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">제품 상세 리뷰</h2>
        <div className="space-y-6">
          {cards.map((card) => (
            <Card key={card.product.id} className="overflow-hidden">
              <CardHeader className="bg-muted/30">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="secondary" className="text-base font-bold">
                        {card.product.rank_in_category}위
                      </Badge>
                      <CardTitle className="text-xl">
                        {card.product.brand} {card.product.model}
                      </CardTitle>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline">총점 {card.product.score_total}</Badge>
                      <Badge variant="outline">평점 {card.product.rating_avg}</Badge>
                      <Badge variant="outline">리뷰 {card.product.reviews_count.toLocaleString()}</Badge>
                      <Badge variant={card.product.negative_keyword_rate > 0.15 ? "destructive" : "secondary"}>
                        불만률 {(card.product.negative_keyword_rate * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="rounded-lg bg-primary/10 p-4">
                  <p className="font-semibold text-base">{card.conclusion}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      좋은 점
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {card.pros.map((pro, i) => (
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
                      {card.cons.map((con, i) => (
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
                    <p className="text-sm text-green-900">{card.forWhom}</p>
                  </div>
                  <div className="rounded-lg bg-red-50 p-4">
                    <p className="font-semibold mb-1 text-red-800">피해야 할 사람</p>
                    <p className="text-sm text-red-900">{card.avoidWhom}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {card.product.affiliate_links.slice(0, 2).map((link, i) => (
                    <Button key={i} asChild variant="default">
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        구매하기 {i + 1}
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">추천 제외 (탈락)</CardTitle>
            <CardDescription>
              다음 제품은 불만률이 높거나 데이터가 부족하여 순위에서 제외되었습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {template.excludedProducts.map((excluded, idx) => (
                <div key={idx} className="border-l-4 border-destructive pl-4 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold">{excluded.product.brand} {excluded.product.model}</p>
                    <Badge variant="destructive">탈락</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{excluded.reason}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>평점: {excluded.product.rating_avg}</span>
                    <span>•</span>
                    <span>리뷰: {excluded.product.reviews_count}</span>
                    <span>•</span>
                    <span>불만률: {(excluded.product.negative_keyword_rate * 100).toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>자주 묻는 질문</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {template.faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="rounded-lg bg-muted/50 border border-yellow-200 p-4 text-sm text-muted-foreground">
          <p className="flex items-start gap-2">
            <span className="text-lg">⚠️</span>
            <span>
              제휴 링크를 통해 구매하면 우리에게 소정의 수수료가 지급됩니다.
              하지만 이는 순위에 영향을 주지 않습니다. 모든 순위는 공개 가능한 데이터만 사용하여 계산됩니다.
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
