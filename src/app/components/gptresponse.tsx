import useSWR from 'swr';
import Spinner from './spinner';

const fetcher = (url: string) =>
  fetch(`/gpt/${new URLSearchParams(url)}`).then(res => res.json());

export default function GPTResponse({ url }: { url: string }) {
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (error) return 'An error has occurred.';
  if (isLoading) return <Spinner />;

  return (
    <div>
      <p>{data.message.message.content}</p>
    </div>
  );
}
