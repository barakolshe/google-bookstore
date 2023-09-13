import { booksEndpoint } from "@/api/api";
import { PAGE_SIZE } from "@/configs/mainConfig";
import {
  Box,
  CircularProgress,
  Pagination,
  Typography,
  useTheme,
} from "@mui/material";
import { FunctionComponent } from "react";
import { useQuery } from "react-query";
import BookItem from "./components/BookItem";

interface BooksListProps {}

const BooksList: FunctionComponent<BooksListProps> = () => {
  const theme = useTheme();
  const { isLoading, error, isError, data } = useQuery("booksData", () =>
    booksEndpoint({ pageSize: PAGE_SIZE, startIndex: 0 }).then((books) => books)
  );

  let items = null;

  if (isLoading) {
    items = (
      <CircularProgress
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  } else if (isError) {
    items = (
      <Typography
        variant="h2"
        color="error"
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontWeight: 600,
        }}
      >
        Error
      </Typography>
    );
  } else {
    items = data?.items.map((item) => (
      <BookItem
        cover={item.volumeInfo.imageLinks?.thumbnail}
        title={item.volumeInfo.title}
      />
    ));
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
          minHeight: "100%",
          width: "100%",
          gap: theme.spacing(3),
          marginTop: theme.spacing(3),
          overflowY: "hidden",
        }}
      >
        {items}
      </Box>
      <Pagination count={10} color="primary" sx={{ marginY: "20px" }} />
    </Box>
  );
};

export default BooksList;
