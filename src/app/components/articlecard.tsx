/* eslint-disable @next/next/no-img-element */

import { Dispatch, SetStateAction } from 'react';

export default function ArticleCard({
  article,
  setSelected,
}: {
  article: Article;
  setSelected: Dispatch<SetStateAction<Article | null>>;
}) {
  return (
    <div className="" onClick={() => setSelected(article)}>
      {article.urlToImage && (
        <img
          className="rounded-3xl mb-3"
          src={article.urlToImage}
          alt={article.title}
        />
      )}
      <span className="bg-gray-500 text-white w-auto py-1 px-3 rounded-full">
        {article.source.name}
      </span>
      <h2 className="font-bold p-2">{article.title}</h2>
    </div>
  );
}
