import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        className="search__input"
        type="text"
        placeholder="Search YouTube videos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search__btn" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
