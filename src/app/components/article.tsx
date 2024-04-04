'use client';

import Link from 'next/link';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { XCircleIcon } from '@heroicons/react/16/solid';
import GPTResponse from './gptresponse';
import { SettingsContext } from '../context/settingsContext';

/* eslint-disable @next/next/no-img-element */
export default function Article({
  article,
  setSelected,
}: {
  article: Article | null;
  setSelected: Dispatch<SetStateAction<Article | null>>;
}) {
  const { selectedCategory, selectedLength } = useContext(SettingsContext);

  return (
    <div>
      {article && (
        <div className="fixed overflow-y-scroll top-0 left-0 right-0 bottom-0 backdrop-blur-lg bg-white/60 dark:bg-black/60">
          <button
            className="h-10 w-10 m-5 right-0 absolute"
            onClick={() => setSelected(null)}
          >
            <XCircleIcon />
          </button>
          <div className="flex flex-row justify-center">
            <div className=" p-5 max-w-3xl ">
              <h1 className="text-3xl font-bold py-10">{article.title}</h1>
              <p className="mb-5 font-semibold text-xl text-right">
                {new Date(article.publishedAt).toLocaleDateString('is')}
              </p>
              {article.urlToImage && (
                <img
                  className="rounded-3xl mb-5"
                  src={article.urlToImage}
                  alt={article.title}
                />
              )}
              <span className="bg-gray-500 text-white w-auto py-1 px-3 rounded-full">
                {article.source.name}
              </span>
              <p className="py-5">{article.description}</p>
              <Link
                className="text-indigo-500 font-bold text-xl"
                href={article.url}
              >
                View Original
              </Link>
              <GPTResponse url={article.url} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
