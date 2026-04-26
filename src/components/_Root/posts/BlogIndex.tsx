"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { FiX } from "react-icons/fi";

import ArticleCard from "@/src/components/_Root/posts/post/ArticleCard";
import type {
  BlogArticle,
  BlogCategoryGroup,
  BlogCategoryListItem,
} from "@/src/lib/types/blog/BlogArticle";

interface BlogIndexProps {
  articles: BlogArticle[];
  groups: BlogCategoryGroup[];
}

const PAGE_SIZE = 12;

const BlogIndex: React.FC<BlogIndexProps> = ({ articles, groups }) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const deferredSearch = useDeferredValue(search);

  const allCategories: BlogCategoryListItem[] = useMemo(
    () => groups.flatMap((g) => g.categories),
    [groups],
  );

  const filtered = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();
    return articles.filter((article) => {
      if (activeCategory && article.category.slug !== activeCategory)
        return false;
      if (query) {
        const haystack = (
          article.title +
          " " +
          article.excerpt +
          " " +
          article.category.name
        ).toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [articles, activeCategory, deferredSearch]);

  const visibleArticles = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const activeCategoryObj = activeCategory
    ? allCategories.find((c) => c.slug === activeCategory)
    : null;

  return (
    <div className="container-msp">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
        <aside className="lg:sticky lg:top-24 lg:col-span-3">
          <div className="rounded-xl border border-line bg-main p-4 md:p-5">
            <p className="eyebrow">Catégories</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory(null);
                setVisible(PAGE_SIZE);
              }}
              className={`mt-3 flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-medium transition-colors md:text-sm ${
                activeCategory === null
                  ? "bg-secondary text-cream shadow-sage"
                  : "text-darker hover:bg-primary hover:text-forest"
              }`}
            >
              Tous les articles
              <span className="text-2xs opacity-70">{articles.length}</span>
            </button>
            <div className="mt-4 space-y-4">
              {groups.map((group) => (
                <div key={group.group}>
                  <p className="mb-1.5 text-2xs font-semibold uppercase tracking-wider text-ink-3">
                    {group.group}
                  </p>
                  <ul className="flex flex-col gap-0.5">
                    {group.categories.map((cat) => {
                      const active = activeCategory === cat.slug;
                      const count = articles.filter(
                        (a) => a.category.slug === cat.slug,
                      ).length;
                      return (
                        <li key={cat.slug}>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveCategory(cat.slug);
                              setVisible(PAGE_SIZE);
                            }}
                            className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-xs transition-colors md:text-sm ${
                              active
                                ? "bg-secondary text-cream shadow-sage"
                                : "text-ink-2 hover:bg-primary hover:text-forest"
                            }`}
                          >
                            <span className="truncate">{cat.name}</span>
                            <span
                              className={`ml-2 text-2xs ${
                                active ? "text-cream/70" : "text-ink-3"
                              }`}
                            >
                              {count}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-9">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="relative w-full sm:max-w-sm">
              <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-ink-3">
                <CgSearch size={15} />
              </span>
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisible(PAGE_SIZE);
                }}
                placeholder="Rechercher un article…"
                className="w-full rounded-md border border-line bg-main py-2 pl-9 pr-3 text-xs text-darker placeholder:text-ink-3 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 md:text-sm"
              />
            </div>
            <p className="text-xs text-ink-2 md:text-sm">
              <span className="font-semibold text-darker">
                {filtered.length}
              </span>{" "}
              article{filtered.length > 1 ? "s" : ""}
              {activeCategoryObj && (
                <>
                  {" "}
                  ·{" "}
                  <span className="font-medium text-forest">
                    {activeCategoryObj.name}
                  </span>
                </>
              )}
            </p>
          </div>

          {(activeCategory || search) && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {activeCategoryObj && (
                <Chip onRemove={() => setActiveCategory(null)}>
                  {activeCategoryObj.name}
                </Chip>
              )}
              {search && (
                <Chip onRemove={() => setSearch("")}>« {search} »</Chip>
              )}
            </div>
          )}

          <div className="mt-6 md:mt-8">
            {visibleArticles.length === 0 ? (
              <EmptyState
                onReset={() => {
                  setActiveCategory(null);
                  setSearch("");
                }}
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 md:gap-5 xl:grid-cols-3">
                {visibleArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            )}
          </div>

          {hasMore && (
            <div className="mt-10 flex justify-center md:mt-12">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="rounded-md border border-line bg-main px-4 py-2 text-xs font-medium text-darker transition-colors hover:border-secondary/40 hover:text-forest md:text-sm"
              >
                Voir plus d'articles
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Chip: React.FC<{
  children: React.ReactNode;
  onRemove: () => void;
}> = ({ children, onRemove }) => (
  <span className="chip-sage inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-2xs font-medium md:text-xs">
    {children}
    <button
      type="button"
      onClick={onRemove}
      aria-label="Retirer ce filtre"
      className="grid h-4 w-4 place-items-center rounded-full text-forest transition-colors hover:bg-secondary hover:text-cream"
    >
      <FiX size={11} />
    </button>
  </span>
);

const EmptyState: React.FC<{ onReset: () => void }> = ({ onReset }) => (
  <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line bg-main py-12 text-center md:py-16">
    <div className="grid h-10 w-10 place-items-center rounded-full border border-light bg-light text-secondary">
      <CgSearch size={16} />
    </div>
    <div className="px-4">
      <p className="text-sm font-medium text-darker md:text-base">
        Aucun résultat.
      </p>
      <p className="mt-1 text-xs text-ink-2 md:text-sm">
        Modifiez votre recherche ou retirez les filtres.
      </p>
    </div>
    <button
      type="button"
      onClick={onReset}
      className="rounded-md border border-line bg-main px-3 py-1.5 text-xs font-medium text-darker hover:border-secondary/40 hover:text-forest"
    >
      Réinitialiser
    </button>
  </div>
);

export default BlogIndex;
