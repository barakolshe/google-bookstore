import Error from "@/components/common/Error/Error";
import Loader from "@/components/common/Loader/Loader";
import { PAGE_SIZE } from "@/configs/mainConfig";
import { Box, Pagination } from "@mui/material";
import { FunctionComponent } from "react";
import BookItem from "./components/BookItem";
import PurchaseModal from "./components/PurchaseModal";
import useBookList from "./useBookList";

interface BooksListProps {}

const BooksList: FunctionComponent<BooksListProps> = () => {
  const {
    pageNumber,
    updatePageNumber,
    booksData: { isLoading, isError, data },
    currBreakpoint,
    selectedBook,
    setSelectedBook,
  } = useBookList();

  // Rendering element based on api state
  let items = null;
  if (isError) {
    items = <Error>Error</Error>;
  } else if (isLoading) {
    items = <Loader />;
  } else {
    items = (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          gap: 3,
          marginTop: 3,
          overflowY: "hidden",
        }}
      >
        {data?.items.map((item, index) => (
          <BookItem
            onClick={() => setSelectedBook(item)}
            key={index}
            cover={item.volumeInfo.imageLinks?.thumbnail}
            title={item.volumeInfo.title}
          />
        ))}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "inherit",
      }}
    >
      <PurchaseModal
        bookDetails={selectedBook}
        open={selectedBook !== null}
        handleClose={() => setSelectedBook(null)}
      />
      {items}
      <Pagination
        count={data !== undefined ? Math.ceil(data.totalItems / PAGE_SIZE) : 0}
        color="primary"
        sx={{ marginY: "20px" }}
        onChange={updatePageNumber}
        page={Number(pageNumber)}
        boundaryCount={currBreakpoint === "xs" ? 0 : 1}
      />
    </Box>
  );
};

export default BooksList;
