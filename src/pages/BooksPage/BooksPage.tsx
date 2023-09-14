import { Pagination, Stack } from "@mui/material";
import { FunctionComponent } from "react";
import BooksList from "./BooksList/BooksList";
import Controls from "./Controls/Controls";
import useBookPage from "./useBookPage";

interface BooksPageProps {}

const BooksPage: FunctionComponent<BooksPageProps> = () => {
  const {
    pageNumber,
    updatePageNumber,
    booksQuery,
    currBreakpoint,
    setSearchValue,
    pageSize,
    setPageSize,
  } = useBookPage();

  return (
    <Stack
      direction="column"
      alignItems="center"
      sx={{
        position: "relative",
        minHeight: "inherit",
        width: "100%",
        px: 5,
        pt: 3,
      }}
    >
      <Controls />
      <BooksList
        isError={booksQuery.isError}
        isLoading={booksQuery.isLoading}
        books={booksQuery.data ? booksQuery.data.items : []}
      />
      <Pagination
        count={
          booksQuery.data !== undefined
            ? Math.ceil(booksQuery.data?.totalItems / pageSize)
            : 0
        }
        color="primary"
        sx={{ my: "20px" }}
        onChange={updatePageNumber}
        page={pageNumber}
        boundaryCount={currBreakpoint === "xs" ? 0 : 1}
      />
    </Stack>
  );
};

export default BooksPage;
