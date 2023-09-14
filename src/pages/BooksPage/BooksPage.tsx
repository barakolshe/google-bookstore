import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import BooksList from "./components/BooksList";

interface BooksPageProps {}

const BooksPage: FunctionComponent<BooksPageProps> = () => {
  return (
    <Box
      sx={{
        minHeight: `inherit`,
        width: "100%",
        paddingX: "40px",
      }}
    >
      <BooksList />
    </Box>
  );
};

export default BooksPage;
