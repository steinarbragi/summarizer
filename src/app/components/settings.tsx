import { useContext } from 'react';
import { SettingsContext } from '../context/settingsContext';

export default function Settings() {
  const {
    lengthMap,
    lengthList,
    categoryList,
    selectedLength,
    selectedCategory,
    setSelectedLength,
    setSelectedCategory,
  } = useContext(SettingsContext);

  return (
    <div>
      <div>
        {categoryList.map(category => (
          <button
            key={category}
            className={`m-2 rounded-full py-1 px-3 ${
              selectedCategory === category
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-500'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="my-2">
        {lengthList.map(length => (
          <button
            key={length}
            className={`m-2 rounded-full py-1 px-3 ${
              selectedLength === length
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-500'
            }`}
            onClick={() => setSelectedLength(length)}
          >
            {lengthMap[length]}
          </button>
        ))}
      </div>
    </div>
  );
}
