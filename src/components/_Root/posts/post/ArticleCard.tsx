import Link from "next/link";
import { CiCalendar } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";
import formatDate from "@/src/utils/func/GetLocalDate";
import type { BlogArticle } from "@/src/lib/types/blog/BlogArticle";

const FALLBACK_COVER = "/images/Doctor-pana.svg";

type Variant = "default" | "feature" | "row" | "compact";

interface ArticleCardProps {
  article: BlogArticle;
  variant?: Variant;
  className?: string;
}

const Cover = ({
  article,
  className = "",
}: {
  article: BlogArticle;
  className?: string;
}) => {
  const cover = article.cover || FALLBACK_COVER;
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={cover}
      alt=""
      loading="lazy"
      className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${className}`}
    />
  );
};

const CategoryTag = ({
  name,
  variant = "default",
}: {
  name: string;
  variant?: "default" | "light";
}) => (
  <span
    className={`inline-flex items-center rounded-full px-2 py-0.5 text-2xs font-medium uppercase tracking-wider ${
      variant === "light"
        ? "border border-cream/30 text-cream/85"
        : "chip-sage"
    }`}
  >
    {name}
  </span>
);

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = "default",
  className = "",
}) => {
  const href = `/blog/${article.slug}`;

  if (variant === "feature") {
    return (
      <Link
        href={href}
        className={`group relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-xl bg-darker text-cream md:min-h-[360px] ${className}`}
      >
        <Cover article={article} className="absolute inset-0" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-darker via-darker/60 to-transparent"
        />
        <div className="relative z-10 flex flex-col gap-3 p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-1.5">
            <CategoryTag name={article.category.name} variant="light" />
            {article.date && (
              <span className="inline-flex items-center gap-1 text-2xs text-cream/70">
                <CiCalendar size={12} />
                {formatDate(article.date)}
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold leading-tight text-cream md:text-lg lg:text-xl">
            {article.title}
          </h3>
          <p className="line-clamp-2 max-w-xl text-xs leading-relaxed text-cream/80 md:text-sm">
            {article.excerpt}
          </p>
          <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-cream md:text-sm">
            Lire l'article
            <FaArrowRightLong
              size={11}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    );
  }

  if (variant === "row") {
    return (
      <Link
        href={href}
        className={`group flex gap-3 rounded-lg border border-line bg-main p-2.5 transition-colors hover:border-secondary/40 ${className}`}
      >
        <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-primary md:size-20">
          <Cover article={article} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5 pr-1">
          <div className="flex flex-col gap-1">
            <span className="text-2xs font-medium uppercase tracking-wider text-secondary">
              {article.category.name}
            </span>
            <h3 className="line-clamp-2 text-xs font-medium leading-snug text-darker md:text-sm">
              {article.title}
            </h3>
          </div>
          {article.date && (
            <span className="text-2xs text-ink-3">
              {formatDate(article.date)}
            </span>
          )}
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className={`group flex flex-col gap-2 rounded-lg border border-line bg-main p-3 transition-colors hover:border-secondary/40 ${className}`}
      >
        <span className="text-2xs font-medium uppercase tracking-wider text-secondary">
          {article.category.name}
        </span>
        <h3 className="line-clamp-3 text-xs font-medium leading-snug text-darker md:text-sm">
          {article.title}
        </h3>
        {article.date && (
          <span className="mt-auto text-2xs text-ink-3">
            {formatDate(article.date)}
          </span>
        )}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-main transition-colors hover:border-secondary/40 ${className}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-primary">
        <Cover article={article} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-1.5">
          <CategoryTag name={article.category.name} />
          {article.date && (
            <span className="inline-flex items-center gap-1 text-2xs text-ink-3">
              <CiCalendar size={11} />
              {formatDate(article.date)}
            </span>
          )}
        </div>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-darker md:text-base">
          {article.title}
        </h3>
        <p className="line-clamp-3 text-xs leading-relaxed text-ink-2 md:text-sm">
          {article.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-forest md:text-sm">
          Lire la suite
          <FaArrowRightLong
            size={11}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
};

export default ArticleCard;
