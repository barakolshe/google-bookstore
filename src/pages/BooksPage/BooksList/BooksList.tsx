import Loader from "@/components/common/Loader/Loader";
import { Grid, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { FunctionComponent } from "react";
import BookItem from "./BookItem/BookItem";
import PurchaseModal from "./PurchaseModal/PurchaseModal";

interface BooksListProps {
  isError: boolean;
  isLoading: boolean;
  books: Book[];
}

const BooksList: FunctionComponent<BooksListProps> = ({
  isError,
  isLoading,
  books,
}) => {
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);

  // Rendering element based on api state
  let items = null;
  if (isError) {
    items = (
      <Typography
        variant="h2"
        color="error"
        sx={{
          m: "auto auto",
        }}
      >
        Error
      </Typography>
    );
  } else if (isLoading) {
    items = <Loader />;
  } else if (books === undefined || books.length === 0) {
    items = (
      <Typography variant="h2" sx={{ m: "auto" }}>
        No books found
      </Typography>
    );
  } else {
    items = (
      <Grid
        container
        sx={{
          gap: 3,
          mt: 3,
          overflowY: "hidden",
        }}
      >
        {books?.map((item, index) => (
          <Grid2 xs={12} sm={6} md={3}>
            <BookItem
              onClick={() => setSelectedBook(item)}
              key={index}
              cover={item.volumeInfo.imageLinks?.thumbnail}
              title={item.volumeInfo.title}
            />
          </Grid2>
        ))}
      </Grid>
    );
  }

  return (
    <>
      <PurchaseModal
        bookDetails={selectedBook}
        open={selectedBook !== null}
        handleClose={() => setSelectedBook(null)}
      />
      {items}
    </>
  );
};

export default BooksList;
