import useSWR from 'swr';
import Spinner from './spinner';
import { useContext } from 'react';
import { SettingsContext } from '../context/settingsContext';

// Adjusted fetcher to expect an array of arguments
const fetcher = ([url, category, length]: [string, string, string]) =>
  fetch(`/gpt/${new URLSearchParams({ url, category, length })}`).then(res =>
    res.json()
  );

export default function GPTResponse({ url }: { url: string }) {
  const { selectedCategory, selectedLength } = useContext(SettingsContext);
  const { data, error } = useSWR(
    [url, selectedCategory, selectedLength.toString()],
    fetcher
  );
  if (error) return <p>An error has occurred.</p>;
  if (!data) return <Spinner />; // This checks if data is not yet available

  return (
    <div>
      <p>{data.summary}</p>
    </div>
  );
}
