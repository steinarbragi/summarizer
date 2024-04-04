import React, { ReactElement, createContext, useState } from 'react';

const useValue = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('funny');
  const [selectedLength, setSelectedLength] = useState<number>(50);
  const categoryList = ['funny', 'serious', 'pirate', 'aristocrat'];
  const lengthList = [50, 100, 150];
  const lengthMap: { [key: number]: string } = {
    50: 'Short',
    100: 'Medium',
    150: 'Long',
  };
  return {
    selectedCategory,
    setSelectedCategory,
    selectedLength,
    setSelectedLength,
    categoryList,
    lengthList,
    lengthMap,
  };
};

export const SettingsContext = createContext({} as ReturnType<typeof useValue>);

export function SettingsContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <SettingsContext.Provider value={useValue()}>
      {children}
    </SettingsContext.Provider>
  );
}
