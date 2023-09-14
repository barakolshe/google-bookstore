// This honestly should be max 35 because the google api supports up to 40 items per request,
// but since you specifically asked for it... i've decided to implement it.
export const DEFAULT_PAGE_SIZE = 50 as const;
export const MAX_PAGE_SIZE = 40 as const;

export const DEFAULT_FILTER = "cyber";
export const FIELDS =
  "totalItems,items(id,volumeInfo(title,imageLinks(thumbnail)))";

export const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;
