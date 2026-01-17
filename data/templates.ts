import { Top10Page, ProductCard } from '@/types';

export const audioHeadphonesTop10: Top10Page = {
  category: 'audio-headphones',
  title: '최고의 헤드폰 TOP 10 (2024년 실사용자 기준)',
  conclusion: [
    "그냥 하나만 고르면: 1위 Sony WH-1000XM5",
    "가성비로 가면: 4위 Anker Soundcore Space Q45",
    "취향 확실하면: 5위 Sennheiser Momentum 4"
  ],
  criteria: [
    "불량 후기 많은 건 거름",
    "AS 스트레스는 생각보다 큼",
    "초보는 편한 게 최고",
    "가격 대비 납득되는지 체크",
    "소음/내구성 이슈 확인"
  ],
  products: [],
  excludedProducts: [
    {
      product: {
        id: 'audio-ex-001',
        category: 'audio',
        subcategory: 'headphones',
        brand: 'Unknown',
        model: 'Cheap ANC-01',
        price_tier: 'budget',
        rating_avg: 3.2,
        reviews_count: 150,
        negative_keyword_rate: 0.35,
        positive_keywords_top3: ['가격', '저렴함'],
        negative_keywords_top3: ['불량', '고장', 'AS'],
        score_total: 45,
        rank_in_category: 0,
        affiliate_links: [],
        status: 'deprecated',
        updated_at: ''
      },
      reason: '불량 후기 35% 넘음. AS 문제 심각.'
    },
    {
      product: {
        id: 'audio-ex-002',
        category: 'audio',
        subcategory: 'headphones',
        brand: 'Generic',
        model: 'ProSound Max',
        price_tier: 'premium',
        rating_avg: 3.8,
        reviews_count: 80,
        negative_keyword_rate: 0.28,
        positive_keywords_top3: ['디자인'],
        negative_keywords_top3: ['가격', '음질', '내구성'],
        score_total: 52,
        rank_in_category: 0,
        affiliate_links: [],
        status: 'deprecated',
        updated_at: ''
      },
      reason: '리뷰수 80개에 불과. 데이터 부족.'
    },
    {
      product: {
        id: 'audio-ex-003',
        category: 'audio',
        subcategory: 'headphones',
        brand: 'BudgetBrand',
        model: 'LiteBuds Wireless',
        price_tier: 'budget',
        rating_avg: 3.5,
        reviews_count: 420,
        negative_keyword_rate: 0.32,
        positive_keywords_top3: ['가격'],
        negative_keywords_top3: ['연결', '고장', '베터리'],
        score_total: 48,
        rank_in_category: 0,
        affiliate_links: [],
        status: 'deprecated',
        updated_at: ''
      },
      reason: '연결 문제 다수. 리뷰 5개 중 1개는 불만.'
    }
  ],
  faqs: [
    {
      question: '노이즈 캔슬링이 필요한가?',
      answer: '출퇴근/카페에서 자주 쓰면 필요. 집에서만 쓰면 굳이 안 써도 됨.'
    },
    {
      question: '유선 vs 무선 뭘 살까?',
      answer: '휴대성 중요하면 무선. 음질 중요하면 유선.'
    },
    {
      question: '가성비 헤드폰 추천?',
      answer: '10만원대면 Anker Soundcore Space Q45. 20만원대면 Sony WH-1000XM4 (이전 세대).'
    },
    {
      question: '오버이어 vs 이어헤드폰?',
      answer: '오버이어는 소음 차단 좋지만 큼. 이어헤드폰은 휴대성 좋음.'
    },
    {
      question: '애플 사용자면 AirPods Max 사도 될까?',
      answer: '예산 넉넉하면 OK. 하지만 Sony가 더 좋은 경우도 많음.'
    }
  ]
};

export const audioSpeakersTop10: Top10Page = {
  category: 'audio-speakers',
  title: '최고의 블루투스 스피커 TOP 10 (2024년 실사용자 기준)',
  conclusion: [
    "그냥 하나만 고르면: 1위 JBL Flip 6",
    "가성비로 가면: 3위 Sony SRS-XB100",
    "야외/수영장: 4위 Ultimate Ears Wonderboom 3"
  ],
  criteria: [
    "불량 후기 많은 건 거름",
    "수방수는 IP67 확인",
    "베터리는 최소 6시간",
    "베이스/고음 밸런스 체크",
    "휴대성 vs 사운드 트레이드오프"
  ],
  products: [],
  excludedProducts: [
    {
      product: {
        id: 'audio-sp-ex-001',
        category: 'audio',
        subcategory: 'speakers',
        brand: 'Generic',
        model: 'BassBoom Mini',
        price_tier: 'budget',
        rating_avg: 3.1,
        reviews_count: 180,
        negative_keyword_rate: 0.38,
        positive_keywords_top3: ['가격'],
        negative_keywords_top3: ['고장', '충전', '소음'],
        score_total: 42,
        rank_in_category: 0,
        affiliate_links: [],
        status: 'deprecated',
        updated_at: ''
      },
      reason: '고장률 높음. 2달 쓰면 멈춘다는 리뷰 다수.'
    },
    {
      product: {
        id: 'audio-sp-ex-002',
        category: 'audio',
        subcategory: 'speakers',
        brand: 'CheapSound',
        model: 'Wireless Speaker Pro',
        price_tier: 'mid',
        rating_avg: 3.4,
        reviews_count: 120,
        negative_keyword_rate: 0.33,
        positive_keywords_top3: ['베이스'],
        negative_keywords_top3: ['고음', '베터리', '연결'],
        score_total: 46,
        rank_in_category: 0,
        affiliate_links: [],
        status: 'deprecated',
        updated_at: ''
      },
      reason: '베이스는 강하지만 고음 안 들림. 음악 들을 때 피곤함.'
    },
    {
      product: {
        id: 'audio-sp-ex-003',
        category: 'audio',
        subcategory: 'speakers',
        brand: 'ExpensiveBrand',
        model: 'Premium Sound X',
        price_tier: 'premium',
        rating_avg: 3.7,
        reviews_count: 90,
        negative_keyword_rate: 0.25,
        positive_keywords_top3: ['디자인'],
        negative_keywords_top3: ['가격', '사운드', '내구성'],
        score_total: 55,
        rank_in_category: 0,
        affiliate_links: [],
        status: 'deprecated',
        updated_at: ''
      },
      reason: '가격 3배인데 사운드는 1.2배 수준. 납득 안 됨.'
    }
  ],
  faqs: [
    {
      question: '야외에서 쓸 스피커 추천?',
      answer: 'JBL Flip 6 (전반), UE Wonderboom 3 (수방수 우선)'
    },
    {
      question: '집에서만 쓸 스피커 추천?',
      answer: 'Bose SoundLink Flex (사운드 퀄리티)'
    },
    {
      question: '가성비 스피커 추천?',
      answer: 'Sony SRS-XB100 (5만원대), Anker Motion+ (7만원대)'
    },
    {
      question: '베이스 강한 스피커 원해.',
      answer: 'JBL Flip 6, Anker Motion+'
    },
    {
      question: 'IP67 뭐야?',
      answer: '방진+수방수. 샤워/수영장에서도 쓸 수 있음.'
    }
  ]
};
