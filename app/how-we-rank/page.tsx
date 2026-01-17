import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function HowWeRank() {
  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <section>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          순위 산정 기준
        </h1>
        <p className="text-xl text-muted-foreground">
          실제 사용자 후기를 기반으로 한 평판 데이터로 제품 순위를 매깁니다.
        </p>
      </section>

      <section>
        <Card className="bg-muted/50 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">기본 원칙</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-base">
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">✓</span>
                <span>AI가 글을 쓰는 게 아니라, 실제 사용자 후기를 분석해서 점수를 매깁니다.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">✓</span>
                <span>광고/제휴 상관 없이 데이터만 봅니다.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">✓</span>
                <span>불만 후기 많은 제품은 무조건 순위에서 내립니다.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">✓</span>
                <span>단점/탈락 섹션은 필수입니다. 솔직해야 신뢰가 생깁니다.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">점수 체계 (100점 만점)</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>평점</CardTitle>
                <Badge variant="secondary" className="text-lg font-bold">35점</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">가중 평균. 3.0~5.0 범위.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>리뷰 수</CardTitle>
                <Badge variant="secondary" className="text-lg font-bold">20점</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">로그 스케일. 10개=0점, 10만개=20점.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>불만 키워드 패널티</CardTitle>
                <Badge variant="destructive" className="text-lg font-bold">-15점</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">불만 비율 50%면 -15점.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>가성비</CardTitle>
                <Badge variant="secondary" className="text-lg font-bold">20점</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">가격 대비 평점. 싼 제품이 유리.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>최신성</CardTitle>
                <Badge variant="secondary" className="text-lg font-bold">5점</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">출시일 기반. 최신 제품 가점.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>전문 리뷰</CardTitle>
                <Badge variant="secondary" className="text-lg font-bold">5점</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">어워드/전문지 가점.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>데이터 수집 방법</CardTitle>
            <CardDescription>공개 가능한 데이터만 사용합니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-base">
              <li className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1">1</Badge>
                <span>평점/리뷰수: 공개된 집계 데이터</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1">2</Badge>
                <span>긍정 키워드 Top3, 불만 키워드 Top3: 키워드 빈도 분석</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1">3</Badge>
                <span>불만 키워드 비율: 부정 리뷰의 키워드 추출</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1">4</Badge>
                <span>제휴 링크: 제품별 1~3개 (공개 정보)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">탈락 기준</CardTitle>
            <CardDescription>
              다음 경우 순위에서 제외합니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-base">
              <li className="flex items-start gap-3">
                <span className="text-destructive text-xl">✗</span>
                <span>불만 키워드 비율 30% 이상</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-destructive text-xl">✗</span>
                <span>리뷰수 100개 미만 (데이터 부족)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-destructive text-xl">✗</span>
                <span>고장/불량/AS 후기가 전체의 20% 이상</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-destructive text-xl">✗</span>
                <span>판매 중단/단종</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>업데이트 주기</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-base">
              <li className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">매일</Badge>
                <span>신규 제품 DB 업데이트</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">주 1회</Badge>
                <span>전체 점수 재계산, 순위 업데이트</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">월 1회</Badge>
                <span>단종/품절 정리</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>투명성 공개</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-base">
            <p className="text-muted-foreground">
              우리는 광고주의 영향을 받지 않습니다. 모든 점수와 순위는 공개 가능한 데이터만 사용해서 계산합니다.
            </p>
            <p className="text-muted-foreground">
              제휴 링크는 있지만, 순위와는 무관합니다. 제휴 여부가 점수에 영향을 주지 않습니다.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="rounded-lg bg-muted/50 border border-yellow-200 p-6">
          <h3 className="font-bold text-lg mb-3">왜 우리의 순위를 믿을 수 있나요?</h3>
          <div className="space-y-3 text-base text-muted-foreground">
            <div className="flex items-start gap-3">
              <span className="text-primary">📊</span>
              <span>모든 점수는 공개 가능한 데이터로 계산됩니다.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary">🔍</span>
              <span>불만 후기 높은 제품은 무조건 제외합니다.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary">🤝</span>
              <span>제휴 여부와 무관하게 데이터만 봅니다.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary">📅</span>
              <span>정기적으로 점수를 재계산하고 업데이트합니다.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
