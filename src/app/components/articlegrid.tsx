"use client"

import { useState } from "react"
import ArticleCard from "./articlecard"
import Article from "./article"

export default function ArticleGrid({articles}: {articles: Article[]}) {
    const [selected, setSelected] = useState<Article | null>(null)
    return <>
        {articles.map((item: Article) => 
        <ArticleCard 
            key={item.url} 
            setSelected={setSelected} 
            article={item}
        />)}
        <Article article={selected} setSelected={setSelected} />
    </>
}