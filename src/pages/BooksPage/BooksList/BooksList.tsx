import Loader from "@/components/common/Loader/Loader";
import { Book } from "@/types/BookResponse.interface";
import { Grid, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import BookItem from "../../../components/shared/BookItem/BookItem";
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
      <Grid container spacing={3}>
        {books?.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
            key={`${item.id}${index}`}
          >
            <BookItem
              onClick={() => setSelectedBook(item)}
              cover={item.volumeInfo.imageLinks?.thumbnail}
              title={item.volumeInfo.title}
            />
          </Grid>
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
