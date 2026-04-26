import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { BlogArticle } from "@/src/lib/types/blog/BlogArticle";
import ArticleCard from "@/src/components/_Root/posts/post/ArticleCard";

interface BlogProps {
  articles?: BlogArticle[];
}

const Blog: React.FC<BlogProps> = ({ articles = [] }) => {
  if (articles.length === 0) return null;

  const [feature, ...rest] = articles;

  return (
    <section className="container-msp">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="max-w-xl">
          <p className="eyebrow">Conseils santé</p>
          <h2 className="mt-3 text-base font-semibold leading-tight tracking-tight text-darker md:text-xl lg:text-2xl">
            Derniers <span className="text-secondary">articles.</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-2 md:text-base">
            Plus de 300 fiches pratiques pour mieux comprendre, prévenir et
            bien vivre.
          </p>
        </div>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 self-start rounded-md border border-line bg-main px-3 py-1.5 text-xs font-medium text-darker transition-colors hover:border-secondary/40 hover:text-forest md:self-end md:text-sm"
        >
          Tout le blog
          <FaArrowRightLong
            size={11}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:mt-10 lg:grid-cols-12 lg:gap-6">
        {feature && (
          <ArticleCard
            article={feature}
            variant="feature"
            className="lg:col-span-7"
          />
        )}
        <div className="grid gap-3 lg:col-span-5">
          {rest.slice(0, 3).map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              variant="row"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
