export interface Product {
  id: string;
  category: 'audio' | 'lifestyle' | 'health';
  subcategory: string;
  brand: string;
  model: string;
  price_tier: 'budget' | 'mid' | 'premium';
  rating_avg: number;
  reviews_count: number;
  negative_keyword_rate: number;
  positive_keywords_top3: string[];
  negative_keywords_top3: string[];
  score_total: number;
  rank_in_category: number;
  affiliate_links: string[];
  status: 'draft' | 'live' | 'deprecated';
  updated_at: string;
}

export interface ProductCard {
  product: Product;
  conclusion: string;
  pros: string[];
  cons: string[];
  forWhom: string;
  avoidWhom: string;
}

export interface Page {
  page_type: 'top10' | 'budget' | 'best_for' | 'compare' | 'product';
  category: string;
  target_keyword: string;
  title: string;
  slug: string;
  content_json: any;
  publish_status: 'draft' | 'published';
  url: string;
  last_generated: string;
}

export interface Top10Page {
  category: string;
  title: string;
  conclusion: string[];
  criteria: string[];
  products: ProductCard[];
  excludedProducts: Array<{
    product: Product;
    reason: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}
