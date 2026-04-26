import Link from "next/link";
import { notFound } from "next/navigation";
import { CiCalendar } from "react-icons/ci";
import { FiArrowLeft, FiShare2 } from "react-icons/fi";

import ArticleCard from "@/src/components/_Root/posts/post/ArticleCard";
import { ShareButtons } from "@/src/components/_UI/ShareButtons/ShareButtons";
import {
  getAllArticlesBlog,
  getOneArticleBlog,
  getRelatedArticles,
} from "@/src/lib/services/blog/BlogArticle";
import { DOCTOLIB_URL, SITE } from "@/src/lib/data/site";
import formatDate from "@/src/utils/func/GetLocalDate";

interface ArticlePageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getAllArticlesBlog();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = await getOneArticleBlog(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} — ${SITE.shortName}`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.cover ? [article.cover] : undefined,
    },
  };
}

const Article = async ({ params }: ArticlePageProps) => {
  const article = await getOneArticleBlog(params.slug);
  if (!article) notFound();

  const related = await getRelatedArticles(params.slug, 3);
  const url = `${SITE.url}/blog/${article.slug}`;

  return (
    <article className="flex flex-col gap-10 py-8 md:gap-14 md:py-12">
      <header className="container-msp">
        <div className="mb-5 flex items-center gap-2 md:mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-2xs text-ink-2 transition-colors hover:text-forest md:text-xs"
          >
            <FiArrowLeft size={12} />
            Tous les articles
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2 text-2xs">
              <Link
                href={`/blog?cat=${article.category.slug}`}
                className="chip-sage inline-flex items-center rounded-full px-2.5 py-0.5 font-medium uppercase tracking-wider transition-colors hover:bg-secondary hover:text-cream"
              >
                {article.category.name}
              </Link>
              {article.date && (
                <span className="inline-flex items-center gap-1 text-ink-3">
                  <CiCalendar size={12} />
                  {formatDate(article.date)}
                </span>
              )}
            </div>
            <h1 className="mt-4 text-lg font-semibold leading-[1.2] tracking-tight text-darker md:text-2xl lg:text-3xl">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-2 md:mt-4 md:text-base">
                {article.excerpt}
              </p>
            )}
          </div>
          {article.cover && (
            <div className="lg:col-span-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.cover}
                alt=""
                className="aspect-[4/3] w-full rounded-xl border border-line object-cover"
              />
            </div>
          )}
        </div>
      </header>

      <section className="container-msp">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24 lg:flex lg:flex-col lg:gap-3">
              <div className="rounded-xl border border-line bg-main p-4">
                <p className="inline-flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-wider text-secondary">
                  <FiShare2 size={11} /> Partager
                </p>
                <div className="mt-3">
                  <ShareButtons url={url} title={article.title} />
                </div>
              </div>
              <div className="hidden rounded-xl border border-light bg-primary p-4 lg:block">
                <p className="eyebrow">Avis médical</p>
                <p className="mt-2 text-xs text-ink-2 md:text-sm">
                  Cet article ne remplace pas une consultation. Prenez
                  rendez-vous avec votre médecin.
                </p>
                <a
                  href={DOCTOLIB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-2xs font-medium text-cream shadow-sage transition-colors hover:bg-forest md:text-xs"
                >
                  Doctolib
                </a>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div
              className="msp-article"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-msp">
          <div className="flex items-end justify-between gap-4 border-b border-line pb-3">
            <div>
              <p className="eyebrow">Continuer la lecture</p>
              <h2 className="mt-2 text-base font-semibold tracking-tight text-darker md:text-xl">
                Articles liés
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden text-xs font-medium text-ink-2 hover:text-forest md:inline"
            >
              Tout le blog →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {related.map((r) => (
              <ArticleCard key={r.slug} article={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default Article;
