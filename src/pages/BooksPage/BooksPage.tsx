import { PAGE_SIZE } from "@/configs/apiConfig";
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
      direction="row"
      sx={{
        minHeight: `inherit`,
        width: "100%",
        paddingX: "40px",
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        sx={{
          minHeight: "inherit",
        }}
      >
        <BooksList
          isError={booksQuery.isError}
          isLoading={booksQuery.isLoading}
          books={booksQuery.data ? booksQuery.data.items : []}
        />
        <Pagination
          count={
            booksQuery.data !== undefined
              ? Math.ceil(booksQuery.data?.totalItems / PAGE_SIZE)
              : 0
          }
          color="primary"
          sx={{ marginY: "20px" }}
          onChange={updatePageNumber}
          page={Number(pageNumber)}
          boundaryCount={currBreakpoint === "xs" ? 0 : 1}
        />
      </Stack>
    </Stack>
  );
};

export default BooksPage;
