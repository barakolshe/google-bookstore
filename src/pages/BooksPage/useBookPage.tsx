import { booksEndpoint } from "@/api/api";
import { PAGE_SIZE_OPTIONS } from "@/configs/apiConfig";
import { debounce } from "@mui/material";
import React, { ChangeEvent } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const useBookPage = () => {
  const navigate = useNavigate();
  const pageNumber = Number(useParams().pageNumber);
  const [searchValue, setSearchValue] = React.useState("");
  const [pageSize, _setPageSize] =
    React.useState<(typeof PAGE_SIZE_OPTIONS)[number]>(50);

  const booksQuery = useQuery(
    ["booksData", pageNumber, searchValue, pageSize],
    () =>
      booksEndpoint({
        keyWord: searchValue,
        pageSize: pageSize,
        startIndex: (Number(pageNumber) - 1) * pageSize,
      })
  );

  const setPageSize = (pageSize: (typeof PAGE_SIZE_OPTIONS)[number]) => {
    navigate(`/books/${1}`);
    _setPageSize(pageSize);
  };

  // Validating the current page number
  React.useEffect(() => {
    let currMaxPageSize =
      booksQuery.data !== undefined
        ? Math.ceil(booksQuery.data?.totalItems / pageSize)
        : 0;

    if (currMaxPageSize !== 0 && pageNumber > currMaxPageSize) {
      navigate(`/books/${1}`);
    }
  }, [booksQuery, pageSize, pageNumber]);

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [booksQuery.data]);

  const updatePageNumber = (_e: ChangeEvent<unknown>, _pageNumber: number) => {
    navigate(`/books/${_pageNumber}`);
  };

  return {
    pageNumber,
    updatePageNumber,
    booksQuery,
    setSearchValue: debounce(setSearchValue, 1000),
    pageSize,
    setPageSize,
  };
};

export default useBookPage;
