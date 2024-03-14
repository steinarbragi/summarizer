import Link from 'next/link';

const categories = [
  {
    name: 'All',
    url: '/',
  },
  {
    name: 'Politics',
    url: '/c/politics',
  },
  {
    name: 'Sports',
    url: '/c/sports',
  },
  {
    name: 'Science',
    url: '/c/science',
  },
  {
    name: 'Entertainment',
    url: '/c/entertainment',
  },
];

export default function Categories() {
  return (
    <div className="my-5">
      {categories.map(item => (
        <Link className="m-2" key={item.url} href={item.url}>
          {item.name}
        </Link>
      ))}
    </div>
  );
}
