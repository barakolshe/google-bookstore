import { booksEndpoint } from "@/api/api";
import Error from "@/components/common/Error/Error";
import Loader from "@/components/common/Loader/Loader";
import { PAGE_SIZE } from "@/configs/mainConfig";
import { Box, Pagination, useTheme } from "@mui/material";
import React, { ChangeEvent, FunctionComponent } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import BookItem from "./components/BookItem";

interface BooksListProps {}

const BooksList: FunctionComponent<BooksListProps> = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pageNumber } = useParams();

  const { isLoading, isError, data } = useQuery(["booksData", pageNumber], () =>
    booksEndpoint({
      pageSize: PAGE_SIZE,
      startIndex: (Number(pageNumber) - 1) * PAGE_SIZE,
    })
  );

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [data]);

  const updatePageNumber = (_e: ChangeEvent<unknown>, _pageNumber: number) => {
    navigate(`/books/${_pageNumber}`);
  };

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
          gap: theme.spacing(3),
          marginTop: theme.spacing(3),
          overflowY: "hidden",
        }}
      >
        {data?.items.map((item, index) => (
          <BookItem
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
      {items}
      <Pagination
        count={data !== undefined ? Math.ceil(data.totalItems / PAGE_SIZE) : 0}
        color="primary"
        sx={{ marginY: "20px" }}
        onChange={updatePageNumber}
        page={Number(pageNumber)}
      />
    </Box>
  );
};

export default BooksList;
