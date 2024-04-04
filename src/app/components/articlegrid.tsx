'use client';

import { useState } from 'react';
import ArticleCard from './articlecard';
import Article from './article';

export default function ArticleGrid({ articles }: { articles: Article[] }) {
  const [selected, setSelected] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('funny');
  const [selectedLength, setSelectedLength] = useState<number>(50);
  const categoryList = ['funny', 'serious', 'pirate', 'aristocrat'];
  const lengthList = [50, 100, 150];
  const lengthMap: { [key: number]: string } = {
    50: 'Short',
    100: 'Medium',
    150: 'Long',
  };

  return (
    <>
      <div>
        {categoryList.map(category => (
          <button
            key={category}
            className={`m-2 rounded-full py-1 px-3 ${
              selectedCategory === category
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-500'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="my-2">
        {lengthList.map(length => (
          <button
            key={length}
            className={`m-2 rounded-full py-1 px-3 ${
              selectedLength === length
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-500'
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
