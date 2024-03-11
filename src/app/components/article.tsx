"use client"

import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { XCircleIcon } from "@heroicons/react/16/solid";
import GPTResponse from "./gptresponse";

/* eslint-disable @next/next/no-img-element */
export default function Article({article, setSelected}: {
    article: Article | null, 
    setSelected: Dispatch<SetStateAction<Article | null>> 
}) {
    return <div >
        {article && <div className="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-lg bg-white/60 dark:bg-black/60">
        <button className="h-10 w-10 m-5 right-0 absolute" onClick={() => setSelected(null)}><XCircleIcon /></button>
            <div className="flex flex-row justify-center">
                <div className=" p-5 max-w-3xl ">
                    <h1 className="text-3xl font-bold py-10">{article.title}</h1>
                    {article.urlToImage && 
                        <img className="rounded-3xl" src={article.urlToImage} alt={article.title} />
                    }
                    <p className="py-5">{article.description}</p>
                    <Link className="text-indigo-500 font-bold text-xl" href={article.url}>View Original</Link>
                    <GPTResponse url={article.url} />
                </div>
            </div>
        </div>
        }
    </div>
}