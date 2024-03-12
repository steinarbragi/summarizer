'use client';

import { useState } from 'react';
import ArticleCard from './articlecard';
import Article from './article';

export default function ArticleGrid({ articles }: { articles: Article[] }) {
  const [selected, setSelected] = useState<Article | null>(null);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {articles &&
        articles.map((item: Article) => (
          <ArticleCard
            key={item.url}
            setSelected={setSelected}
            article={item}
          />
        ))}
      <Article article={selected} setSelected={setSelected} />
    </div>
  );
}
