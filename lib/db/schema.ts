import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  decimal,
  boolean,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Categories: Audio, Lifestyle, Health
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Subcategories: Headphones, Speakers, Smart Home, etc.
export const subcategories = pgTable("subcategories", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id")
    .references(() => categories.id)
    .notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Products being ranked
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  subcategoryId: integer("subcategory_id")
    .references(() => subcategories.id)
    .notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  brand: text("brand"),
  image: text("image"),
  affiliateUrl: text("affiliate_url"),
  price: decimal("price", { precision: 10, scale: 2 }),
  // Ranking scores
  overallScore: decimal("overall_score", { precision: 4, scale: 2 }),
  sentimentScore: decimal("sentiment_score", { precision: 4, scale: 2 }),
  valueScore: decimal("value_score", { precision: 4, scale: 2 }),
  qualityScore: decimal("quality_score", { precision: 4, scale: 2 }),
  // Metadata
  reviewCount: integer("review_count").default(0),
  isExcluded: boolean("is_excluded").default(false),
  excludeReason: text("exclude_reason"),
  pros: text("pros").array(),
  cons: text("cons").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Blog posts / Articles
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => categories.id),
  subcategoryId: integer("subcategory_id").references(() => subcategories.id),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  image: text("image"),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Post to Product relationship (many-to-many)
export const postProducts = pgTable(
  "post_products",
  {
    postId: integer("post_id")
      .references(() => posts.id)
      .notNull(),
    productId: integer("product_id")
      .references(() => products.id)
      .notNull(),
    rank: integer("rank"), // Position in the post's ranking
  },
  (table) => ({
    pk: primaryKey({ columns: [table.postId, table.productId] }),
  })
);

// Relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  subcategories: many(subcategories),
  posts: many(posts),
}));

export const subcategoriesRelations = relations(
  subcategories,
  ({ one, many }) => ({
    category: one(categories, {
      fields: [subcategories.categoryId],
      references: [categories.id],
    }),
    products: many(products),
    posts: many(posts),
  })
);

export const productsRelations = relations(products, ({ one, many }) => ({
  subcategory: one(subcategories, {
    fields: [products.subcategoryId],
    references: [subcategories.id],
  }),
  postProducts: many(postProducts),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id],
  }),
  subcategory: one(subcategories, {
    fields: [posts.subcategoryId],
    references: [subcategories.id],
  }),
  postProducts: many(postProducts),
}));

export const postProductsRelations = relations(postProducts, ({ one }) => ({
  post: one(posts, {
    fields: [postProducts.postId],
    references: [posts.id],
  }),
  product: one(products, {
    fields: [postProducts.productId],
    references: [products.id],
  }),
}));
