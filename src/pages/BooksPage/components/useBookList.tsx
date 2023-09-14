import { booksEndpoint } from "@/api/api";
import { PAGE_SIZE } from "@/configs/mainConfig";
import useBreakpoint from "@/hooks/useBreakpoint";
import React, { ChangeEvent } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const useBookList = () => {
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const currBreakpoint = useBreakpoint(["xs", "sm"]);
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);

  const booksData = useQuery(["booksData", pageNumber], () =>
    booksEndpoint({
      pageSize: PAGE_SIZE,
      startIndex: (Number(pageNumber) - 1) * PAGE_SIZE,
    })
  );
  const { data } = booksData;

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [data]);

  const updatePageNumber = (_e: ChangeEvent<unknown>, _pageNumber: number) => {
    navigate(`/books/${_pageNumber}`);
  };

  return {
    pageNumber,
    updatePageNumber,
    booksData,
    currBreakpoint,
    selectedBook,
    setSelectedBook,
  };
};

export default useBookList;
