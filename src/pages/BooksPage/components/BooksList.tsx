import Error from "@/components/common/Error/Error";
import Loader from "@/components/common/Loader/Loader";
import { Stack } from "@mui/material";
import React, { FunctionComponent } from "react";
import BookItem from "./components/BookItem";
import PurchaseModal from "./components/PurchaseModal";

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
    items = <Error>Error</Error>;
  } else if (isLoading) {
    items = <Loader />;
  } else {
    items = (
      <Stack
        direction="row"
        sx={{
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          gap: 3,
          mt: 3,
          overflowY: "hidden",
        }}
      >
        {books?.map((item, index) => (
          <BookItem
            onClick={() => setSelectedBook(item)}
            key={index}
            cover={item.volumeInfo.imageLinks?.thumbnail}
            title={item.volumeInfo.title}
          />
        ))}
      </Stack>
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
