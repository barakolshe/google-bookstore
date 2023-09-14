import { DEFAULT_FILTER, FIELDS, MAX_PAGE_SIZE } from "@/configs/apiConfig";
import axios from "axios";
import { getBooks } from "./endpoints";

const server = import.meta.env.VITE_SERVER;

interface booksEnpointParams {
  keyWord?: string;
  startIndex: number;
  pageSize: number;
}

/**
 * DISCLAIMER - This api is very complicated because google api only supports up to 40 items, and in the request assignment
 * it was specifically requested to support up to 50 items per page.
 * In addition, i've searched the docs and there is no place where the number
 * of total items are written in order to implement pagination (The totalitems field is incorrect and it
 * changes for every query, its inconsistent and unusable). This makes
 * it even more complicated to implement this api. I've implement a binary search to get the number of objects
 * but this is a very unconventional way of using an api.
 */

class QueryBuilder {
  query: string[];

  constructor() {
    this.query = [];
  }

  startIndex(_startIndex: number) {
    this.query.push(`startIndex=${_startIndex}`);
  }

  maxResults(_maxResults: number) {
    this.query.push(`maxResults=${_maxResults}`);
  }

  keyWord(_keyWord: string) {
    this.query.push(`q=${_keyWord}`);
  }

  fields(_fields: string) {
    this.query.push(`fields=${_fields}`);
  }

  getQuery() {
    return this.query.join("&");
  }
}

export const booksEndpoint = ({
  keyWord,
  startIndex,
  pageSize,
}: booksEnpointParams) => {
  const _keyWord =
    keyWord !== undefined ? `${DEFAULT_FILTER}+${keyWord}` : DEFAULT_FILTER;

  let queryBuilders = getPageSize(pageSize, startIndex);

  queryBuilders.forEach((qb) => qb.keyWord(_keyWord));
  queryBuilders.forEach((qb) => qb.fields(FIELDS));

  const queries = queryBuilders.map((qbs) => qbs.getQuery());

  return combinePromises(
    queries.map((query) =>
      axios
        .get<BooksResponse>(`${server}${getBooks}?${query}`)
        .then(async (response) => {
          response.data.totalItems = Number(await getTotalItems(_keyWord));
          return response.data;
        })
    )
  );
};

/**
 * Recevies the pageSize and the startIndex, and returns multiple requests
 * with 40 and under pageSize, that are compatible with
 * googleapi max pagesize of 40
 */
const getPageSize = (pageSize: number, startIndex: number) => {
  // Function to get the current page size from MAX_PAGE_SIZE config
  const calcCurrPageSize = (pageSize: number) => {
    return Math.floor(pageSize / MAX_PAGE_SIZE) > 0
      ? MAX_PAGE_SIZE
      : pageSize % MAX_PAGE_SIZE;
  };

  let queryBuilders = [];

  for (; pageSize > 0; pageSize -= MAX_PAGE_SIZE) {
    let currQuery = new QueryBuilder();
    currQuery.startIndex(startIndex);
    startIndex += calcCurrPageSize(pageSize);
    currQuery.maxResults(calcCurrPageSize(pageSize));

    queryBuilders.push(currQuery);
  }

  return queryBuilders;
};

// Combined all the book requests being sent
const combinePromises = (promises: Promise<BooksResponse>[]) => {
  return Promise.all(promises).then((responses) =>
    responses.reduce((combined, curr) => {
      if (curr.items !== undefined) {
        combined.items.push(...curr.items);
      }
      return combined;
    })
  );
};

const itemsCountCache = new Map<string, number>();

// Uses a cache to optimise the process
const getTotalItems = async (keyWord: string) => {
  if (itemsCountCache.has(keyWord)) {
    return Promise.resolve(itemsCountCache.get(keyWord));
  } else {
    const firstPageCount = await getFirstPageCount(keyWord);
    const count =
      firstPageCount < MAX_PAGE_SIZE
        ? firstPageCount
        : await binarySearchCount(keyWord);
    itemsCountCache.set(keyWord, count);
    return count;
  }
};

const getFirstPageCount = async (keyWord: string) => {
  let qb = new QueryBuilder();
  qb.fields(FIELDS);
  qb.keyWord(keyWord);
  qb.maxResults(MAX_PAGE_SIZE);
  qb.startIndex(0);

  let result = await axios
    .get<BooksResponse>(`${server}${getBooks}?${qb.getQuery()}`)
    .then((response) => response.data);

  return result.items ? result.items.length : 0;
};

// Binary search to get number of items
const binarySearchCount = async (keyWord: string) => {
  let start = 0;
  let end = 500;

  while (start <= end) {
    let qb = new QueryBuilder();
    qb.fields(FIELDS);
    qb.keyWord(keyWord);
    qb.maxResults(MAX_PAGE_SIZE);

    let mid = Math.floor((start + end) / 2);
    qb.startIndex(mid);

    let result = await axios
      .get<BooksResponse>(`${server}${getBooks}?${qb.getQuery()}`)
      .then((response) => response.data);

    if (result.items === undefined || result.items.length === 0) {
      end = mid;
    } else if (result.items.length > 0 && result.items.length < MAX_PAGE_SIZE) {
      return mid + result.items.length;
    } else {
      start = mid;
    }
  }

  return 500;
};
