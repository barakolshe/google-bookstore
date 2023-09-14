import SearchTextField from "@/components/common/TextField/SearchTextField";
import { DEFAULT_PAGE_SIZE } from "@/configs/apiConfig";
import { Pagination, Stack } from "@mui/material";
import { FunctionComponent } from "react";
import BooksList from "./components/BooksList";
import useBookPage from "./useBookPage";

interface BooksPageProps {}

const BooksPage: FunctionComponent<BooksPageProps> = () => {
  const { pageNumber, updatePageNumber, booksQuery, currBreakpoint } =
    useBookPage();

  return (
    <Stack
      direction="column"
      alignItems="center"
      sx={{
        minHeight: "inherit",
        width: "100%",
        px: 5,
        mt: 3,
      }}
    >
      <SearchTextField placeholder="Search" />
      <BooksList
        isError={booksQuery.isError}
        isLoading={booksQuery.isLoading}
        books={booksQuery.data ? booksQuery.data.items : []}
      />
      <Pagination
        count={
          booksQuery.data !== undefined
            ? Math.ceil(booksQuery.data?.totalItems / DEFAULT_PAGE_SIZE)
            : 0
        }
        color="primary"
        sx={{ my: "20px" }}
        onChange={updatePageNumber}
        page={Number(pageNumber)}
        boundaryCount={currBreakpoint === "xs" ? 0 : 1}
      />
    </Stack>
  );
};

export default BooksPage;
