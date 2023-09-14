import SearchTextField from "@/components/common/TextField/SearchTextField";
import { Grid, Pagination, Stack } from "@mui/material";
import { FunctionComponent } from "react";
import BooksList from "./components/BooksList";
import PageSizeSelection from "./components/PageSizeSelection";
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
      <Grid container direction="row">
        <Grid
          item
          xs={currBreakpoint === "md" ? 4 : 12}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: { xs: "center", md: "center" },
            mb: { xs: 3, md: 0 },
          }}
        >
          <PageSizeSelection pageSize={pageSize} setPageSize={setPageSize} />
        </Grid>
        <Grid
          item
          xs={currBreakpoint === "md" ? 4 : 12}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <SearchTextField
            placeholder="Search"
            sx={{ width: "280px" }}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Grid>
      </Grid>
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
