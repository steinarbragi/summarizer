/* eslint-disable @next/next/no-img-element */

import { Dispatch, SetStateAction } from "react"

export default function ArticleCard({
    article,
    setSelected
}: {article: Article, setSelected: Dispatch<SetStateAction<Article | null>> }) {
    return <div className="" onClick={() => setSelected(article)}>
        {article.urlToImage && <img className="rounded-3xl" src={article.urlToImage} alt={article.title} />}
        <h2 className="font-bold p-2">{article.title}</h2>
    </div>
}