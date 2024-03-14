import ArticleGrid from './components/articlegrid';
import Categories from './components/categories';

export default async function Home() {
  const news = await fetch(
    `https://newsapi.org/v2/top-headlines?language=en&from=2024-02-21&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
  );
  const newsJson = await news.json();

  return (
    <main className="min-h-screen p-5 lg:p-24">
      <h2 className="text-3xl font-semibold">News</h2>
      <Categories />
      <ArticleGrid articles={newsJson?.articles} />
    </main>
  );
}
