import useSWR from "swr";

const fetcher = (url: string) => fetch(`/gpt/${new URLSearchParams(url)}`).then((res) => res.json());


export default function GPTResponse({url}: {url: string}){
    
    const { data, error, isLoading } = useSWR(url,fetcher);
    
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";  
    
    return <div>API Response: {data.url}</div>
}