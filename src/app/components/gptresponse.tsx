import useSWR from 'swr';
import Spinner from './spinner';

// Adjusted fetcher to expect an array of arguments
const fetcher = ([url, category, length]: [string, string, string]) =>
  fetch(`/gpt/${new URLSearchParams({ url, category, length })}`).then(res =>
    res.json()
  );

export default function GPTResponse({
  url,
  category,
  length,
}: {
  url: string;
  category: string;
  length: number;
}) {
  const { data, error } = useSWR([url, category, length.toString()], fetcher);
  if (error) return <p>An error has occurred.</p>;
  if (!data) return <Spinner />; // This checks if data is not yet available

  return (
    <div>
      <p>{data.summary}</p>
    </div>
  );
}
