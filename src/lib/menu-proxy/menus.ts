import useSWR, { SWRResponse } from "swr";
import { MENU_PROXY_URL } from ".";
import MicroSearch from "../search/micro-search";
import { Menu } from "./types";

export async function fetchMenus(): Promise<Menu[]> {
  const url = new URL("/menus", MENU_PROXY_URL);
  const res = await fetch(url.href);
  return res.json();
}

export function useMenus(): SWRResponse<Menu[], unknown> {
  return useSWR<Menu[]>("/menus", () => fetchMenus());
}

export function useMenuSearch() {
  const { data } = useMenus();

  const microSearch = new MicroSearch(data ?? [], "title");

  return microSearch;
}
