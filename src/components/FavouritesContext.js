import {createContext, useEffect, useState} from "react";

export const FavouritesContext = createContext({});

export function FavouritesContextProvider({children}) {
  const ls = typeof window !== "undefined" ? window.localStorage : {};
  const [favourites, setFavourites] = useState([]); 
  
  useEffect(() => {
    if (favourites?.length > 0) {
      ls?.setItem('favourites', JSON.stringify(favourites));
    }
  }, [favourites]);

  useEffect(() => {
    if (ls && ls.getItem('favourites')) {
      setFavourites(JSON.parse(ls.getItem('favourites')));
    }
  }, []);

  function addFavourite(productId) {
    setFavourites(prev => {
      const temp = prev.indexOf(productId);
      if(temp === -1) {
        return [...prev, productId];
      }
      return prev;
    });
  }

  function removeFavourite(productId) {
    setFavourites(prev => {
      const temp = prev.indexOf(productId);
      if(temp !== -1) {
        return prev.filter((value, index) => index !== temp);
      }
      return prev;
    });
  }

  return (
    <FavouritesContext.Provider value={{favourites, setFavourites, addFavourite, removeFavourite}}>
      {children}
    </FavouritesContext.Provider>
  );
}