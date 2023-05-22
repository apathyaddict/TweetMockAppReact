import React, {useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchContext from "./SearchContext";


const SearchBar = () => {
 
  const {setSearchQuery} = useContext(SearchContext)

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

 
  

  return (
    <>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input
        className="searchInput"
        placeholder="Search..."
        onChange={handleSearchInput}
      />
     
    </>
  );
};

export default SearchBar;
