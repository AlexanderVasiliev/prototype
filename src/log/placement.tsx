import React, { createContext, useContext, useMemo } from 'react';

const Cont = createContext<{ path: string[] }>({ path: [] });

export const usePlace = (): string[] => {
  const { path } = useContext(Cont) ?? { path: [] };

  return path;
};

interface IPlacementProps {
  place: string;
}

export const Placement: React.FC<IPlacementProps> = ({ place, children }) => {
  const parentPath = usePlace();
  const currentPath = useMemo(() => {
    return  [...parentPath, place];
  }, [place, parentPath]);

return (<Cont.Provider value={{ path: currentPath }}>{children}</Cont.Provider>);
};
