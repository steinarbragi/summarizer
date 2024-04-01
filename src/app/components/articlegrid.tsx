'use client';

import { useState } from 'react';
import ArticleCard from './articlecard';
import Article from './article';

export default function ArticleGrid({ articles }: { articles: Article[] }) {
  const [selected, setSelected] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('funny');
  const [selectedLength, setSelectedLength] = useState<number>(50);
  const categoryList = ['funny', 'serious', 'pirate', 'aristocrat'];
  const lengthList = [25, 50, 75];
  const lengthMap: { [key: number]: string } = {
    25: 'Short',
    50: 'Medium',
    75: 'Long',
  };

  return (
    <>
      <div className="my-5">
        {categoryList.map(category => (
          <button
            key={category}
            className={`m-2 ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="my-5">
        {lengthList.map(length => (
          <button
            key={length}
            className={`m-2 ${
              selectedLength === length
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => setSelectedLength(length)}
          >
            {lengthMap[length]}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles &&
          articles.map((item: Article) => (
            <ArticleCard
              key={item.url}
              setSelected={setSelected}
              article={item}
            />
          ))}
        <Article
          article={selected}
          setSelected={setSelected}
          category={selectedCategory}
          length={selectedLength}
        />
      </div>
    </>
  );
}
