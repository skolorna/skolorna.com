import React, { FunctionComponent, useEffect } from "react";
import { Search } from "react-feather";
import { useDelayedInput } from "../../lib/forms/delayed-input";
import { useMenuSearch } from "../../lib/menu-proxy/menu";
import MenuTile from "./MenuTile";
import styles from "./MenuSearch.module.scss";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import { Menu } from "../../lib/menu-proxy/types";

interface SearchResultsProps {
  results: Menu[];
  searching: boolean;
  initializing: boolean;
  query: string;
  size: number;
}

const SearchResults: FunctionComponent<SearchResultsProps> = ({
  results,
  searching,
  query,
  initializing,
  size,
}) => {
  const noResults = !searching && results.length === 0;
  const gridSkeleton = initializing || (searching && results.length === 0);

  if (noResults) {
    return (
      <span>
        Inga menyer som matchar &quot;<strong>{query}</strong>&quot; hittades.
      </span>
    );
  }

  return (
    <>
      <div className={styles.count}>
        {initializing ? (
          <InlineSkeleton width="6em" />
        ) : (
          <>
            {results.length} av {size}
          </>
        )}
      </div>
      <div className={styles.grid}>
        {(gridSkeleton ? new Array(12).fill(undefined) : results).map(
          (menu, i) => (
            <MenuTile menu={menu} key={menu?.id ?? i} />
          )
        )}
      </div>
    </>
  );
};

const MenuSearch: FunctionComponent = () => {
  const limit = 40;

  const { setQuery, query, results, size, searching } = useMenuSearch(limit);

  const { value, setInput } = useDelayedInput(250);

  useEffect(() => {
    setQuery(value);
  }, [setQuery, value]);

  const initializing = size === 0;

  return (
    <div>
      <div className={styles.search}>
        <Search className={styles.icon} />
        <input
          type="search"
          spellCheck="false"
          autoComplete="off"
          autoCorrect="off"
          onInput={(event) => setInput(event.currentTarget.value)}
          placeholder="Sök"
          className={styles.input}
          disabled={initializing}
        />
      </div>

      <section className={styles.results}>
        <SearchResults {...{ searching, initializing, results, query, size }} />
      </section>
    </div>
  );
};

export default MenuSearch;
