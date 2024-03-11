/* eslint-disable @next/next/no-img-element */
export default function ArticleCard({
    source, 
    author, 
    title, 
    description, 
    url, 
    urlToImage, 
    publishedAt, 
    content
}: Article) {
    return <div className="bg-white rounded-lg p-5">
        <img src={urlToImage} alt={title} />
        <h2 className="text-black">{title}</h2>
    </div>
}