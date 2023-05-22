import { createContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("tweets");
  const [searchedTweets, setSearchedTweets] = useState([]);
  

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, 
        selectedOption, setSelectedOption,
        searchedTweets, setSearchedTweets }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;


