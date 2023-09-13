import { Container } from "@mui/material";
import { FunctionComponent } from "react";
import BooksList from "./components/BooksList";

interface BooksPageProps {}

const BooksPage: FunctionComponent<BooksPageProps> = () => {
  return (
    <Container>
      <BooksList />
    </Container>
  );
};

export default BooksPage;
