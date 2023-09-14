import { booksEndpoint } from "@/api/api";
import { DEFAULT_PAGE_SIZE } from "@/configs/apiConfig";
import useBreakpoint from "@/hooks/useBreakpoint";
import React, { ChangeEvent } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const useBookPage = () => {
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const currBreakpoint = useBreakpoint(["xs", "sm"]);

  const booksQuery = useQuery(["booksData", pageNumber], () =>
    booksEndpoint({
      pageSize: DEFAULT_PAGE_SIZE,
      startIndex: (Number(pageNumber) - 1) * DEFAULT_PAGE_SIZE,
    })
  );

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
    currBreakpoint,
  };
};

export default useBookPage;
