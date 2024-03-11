import { Dispatch, SetStateAction } from "react";

/* eslint-disable @next/next/no-img-element */
export default function Article({article, setSelected}: {
    article: Article | null, 
    setSelected: Dispatch<SetStateAction<Article | null>> 
}) {
    return <div >
        {article && <div className="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-md bg-white/50 dark:bg-black/50">
        <button onClick={() => setSelected(null)}>close</button>

            <div className="flex flex-row justify-center">
                <div className=" max-w-3xl ">
                    <h1>{article.title}</h1>
                    <img src={article.urlToImage} alt={article.title} />
                    <p>{article.content}</p>
                </div>
            </div>
        </div>
        }
    </div>
}