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
    return <div className="">
        {urlToImage && <img className="rounded-3xl" src={urlToImage} alt={title} />}
        <h2 className="font-bold p-2">{title}</h2>
    </div>
}