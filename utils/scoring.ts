import { Product } from '@/types';

// 점수 가중치 (총 100점)
const SCORE_WEIGHTS = {
  RATING_AVG: 35,          // 평점 가중 평균
  REVIEWS_COUNT: 20,       // 리뷰수 (로그 스케일)
  NEGATIVE_PENALTY: -15,   // 불만 키워드 패널티
  VALUE_FOR_MONEY: 20,     // 가성비
  RECENCY: 5,              // 최신성 (출시/세대)
  PRO_REVIEW: 5            // 전문리뷰/어워드 가점
};

// 로그 스케일로 리뷰수 점수 계산 (리뷰수 10~100,000개 범위 고려)
function calculateReviewsScore(count: number): number {
  const logCount = Math.log10(Math.max(count, 10));
  // log(10)=1 → 0점, log(100000)=5 → 20점
  const normalized = (logCount - 1) / 4; // 0~1 범위
  return Math.round(normalized * SCORE_WEIGHTS.REVIEWS_COUNT);
}

// 평점 점수 계산 (3.0~5.0 범위)
function calculateRatingScore(avg: number): number {
  const normalized = (avg - 3.0) / 2.0; // 0~1 범위
  return Math.round(normalized * SCORE_WEIGHTS.RATING_AVG);
}

// 불만 키워드 패널티 (0~50% 범위 → 0~-15점)
function calculateNegativePenalty(rate: number): number {
  const penalty = Math.min(rate * 30, 15); // 최대 -15점
  return -Math.round(penalty);
}

// 가성비 점수 (가격대 + 평점 조합)
function calculateValueScore(priceTier: string, ratingAvg: number): number {
  const tierMultiplier: Record<string, number> = {
    'budget': 1.0,
    'mid': 0.9,
    'premium': 0.8
  };
  const baseScore = ratingAvg / 5.0 * SCORE_WEIGHTS.VALUE_FOR_MONEY;
  return Math.round(baseScore * (tierMultiplier[priceTier] || 0.8));
}

// 최신성 점수 (현재는 시뮬레이션 - 실제는 출시일 기반)
function calculateRecencyScore(product: Product): number {
  // MVP 단계에서는 모든 제품 최신으로 간주
  return SCORE_WEIGHTS.RECENCY;
}

// 전문리뷰/어워드 가점 (시뮬레이션)
function calculateProReviewScore(product: Product): number {
  // 상위 3개 제품은 전문리뷰 점수 부여
  return product.rank_in_category <= 3 ? SCORE_WEIGHTS.PRO_REVIEW : 0;
}

// 총 점수 계산
export function calculateTotalScore(product: Product): number {
  const ratingScore = calculateRatingScore(product.rating_avg);
  const reviewsScore = calculateReviewsScore(product.reviews_count);
  const negativePenalty = calculateNegativePenalty(product.negative_keyword_rate);
  const valueScore = calculateValueScore(product.price_tier, product.rating_avg);
  const recencyScore = calculateRecencyScore(product);
  const proReviewScore = calculateProReviewScore(product);

  const total = ratingScore + reviewsScore + negativePenalty + valueScore + recencyScore + proReviewScore;

  return Math.max(0, Math.min(100, total)); // 0~100 범위 보정
}

// 순위 재계산
export function recalculateRanks(products: Product[]): Product[] {
  // 점수 재계산
  const productsWithScore = products.map(p => ({
    ...p,
    score_total: calculateTotalScore(p)
  }));

  // 카테고리별로 정렬 후 순위 부여
  const categoryGroups = productsWithScore.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  Object.keys(categoryGroups).forEach(category => {
    const sorted = categoryGroups[category]
      .sort((a, b) => b.score_total - a.score_total)
      .map((p, idx) => ({
        ...p,
        rank_in_category: idx + 1
      }));
    categoryGroups[category] = sorted;
  });

  // 모든 제품 합치기
  return Object.values(categoryGroups).flat();
}

// 순위 변동 감지 (이전 순위 비교)
export function detectRankChange(previousRank: number, currentRank: number): 'up' | 'down' | 'same' | 'new' {
  if (previousRank === 0 || !previousRank) return 'new';
  if (previousRank === currentRank) return 'same';
  return previousRank > currentRank ? 'up' : 'down';
}
