import { Pagination, Stack, useTheme } from "@mui/material";
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
    setSearchValue,
    pageSize,
    setPageSize,
  } = useBookPage();
  const theme = useTheme();

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
      <Controls
        pageSize={pageSize}
        setPageSize={setPageSize}
        setSearchValue={setSearchValue}
      />
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
        boundaryCount={theme.breakpoints.up("xs") ? 0 : 1} // TODO - check this
      />
    </Stack>
  );
};

export default BooksPage;
