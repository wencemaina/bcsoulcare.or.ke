"use client"

import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { BlogPost } from "@/types/database";

interface BlogArticle {
  _id?: string; // MongoDB ObjectId as string
  title: string;
  category: string;
  excerpt: string;
  author: string;
  slug: string;
  image?: string;
  status: "draft" | "published" | "archived";
  createdAt: string | Date; // Could be string from API
  tags: string[];
}



export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();

        // Transform the blog posts to match the expected format
        const transformedArticles = data.blogPosts.map((post: any) => ({
          _id: post._id?.toString(),
          title: post.title,
          category: post.category,
          excerpt: post.excerpt,
          author: post.author,
          slug: post.slug,
          image: post.image || "/placeholder.svg", // Use a default image if none provided
          status: post.status,
          createdAt: post.createdAt,
          tags: post.tags || [],
        }));

        setArticles(transformedArticles);
      } catch (err) {

        setError('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog & Insights</h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Read our latest articles on African business, sustainability, and success stories.
          </p>
        </div>
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog & Insights</h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Read our latest articles on African business, sustainability, and success stories.
          </p>
        </div>
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog & Insights</h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          Read our latest articles on African business, sustainability, and success stories.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Main Feed */}
        {articles.map((article) => (
          <article key={article.slug} className="flex flex-col md:flex-row gap-8 group">
            <div className="w-full md:w-2/5 aspect-video md:aspect-square relative rounded-2xl overflow-hidden border shrink-0">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                  {article.category}
                </Badge>
              </div>
              <h2 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                <Link href={`/blog/${article.slug}`}>{article.title}</Link>
              </h2>
              <p className="text-muted-foreground leading-relaxed">{article.excerpt}</p>

            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
