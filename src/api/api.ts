import { DEFAULT_FILTER, MAX_PAGE_SIZE } from "@/configs/mainConfig";
import axios from "axios";

const server = import.meta.env.VITE_SERVER;

interface booksEnpointParams {
  keyWord?: string;
  startIndex: number;
  pageSize: number;
}

/**
 * DISCLAIMER - This api is very complicated because google api only supports up to 40 items, and in the request assignment
 * it was specifically requested to support up to 50 items per page.
 * If it wasnt for this this all code should have beed a one liner.
 */

export const booksEndpoint = ({
  keyWord,
  startIndex,
  pageSize,
}: booksEnpointParams) => {
  keyWord =
    keyWord !== undefined ? `${DEFAULT_FILTER}+${keyWord}` : DEFAULT_FILTER;
  let requests = getPageSize(pageSize, startIndex);

  requests.forEach((request) => request.push(`q=${keyWord}`));

  const queries = requests.map((request) => request.join("&"));

  return combinePromises(
    queries.map((query) =>
      axios
        .get<BooksResponse>(`${server}/books/v1/volumes?${query}`)
        .then((response) => response.data)
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

  let requests = [];

  for (; pageSize > 0; pageSize -= MAX_PAGE_SIZE) {
    let currResquest = [];
    currResquest.push(`startIndex=${startIndex}`);
    startIndex += calcCurrPageSize(pageSize);
    currResquest.push(`maxResults=${calcCurrPageSize(pageSize)}`);

    requests.push(currResquest);
  }

  return requests;
};

// Combined all the book requests being sent
function combinePromises(promises: Promise<BooksResponse>[]) {
  return Promise.all(promises).then((responses) =>
    responses.reduce((combined, curr) => {
      combined.items.push(...curr.items);
      return combined;
    })
  );
}
