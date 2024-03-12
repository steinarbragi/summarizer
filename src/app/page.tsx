import ArticleGrid from './components/articlegrid';

export default async function Home() {
  const news = await fetch(
    `https://newsapi.org/v2/top-headlines?language=en&from=2024-02-11&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
  );
  const newsJson = await news.json();

  return (
    <main className="min-h-screen p-5 lg:p-24">
      <h2>News</h2>
      <ArticleGrid articles={newsJson?.articles} />
    </main>
  );
}
