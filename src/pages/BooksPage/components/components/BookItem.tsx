import { Box, Paper, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface BookItemProps {
  cover: string | undefined;
  title: string;
}

const BookItem: FunctionComponent<BookItemProps> = ({ cover, title }) => {
  return (
    <Paper
      sx={{
        height: "250px",
        width: "250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        src={cover}
        height="188px"
        sx={{ objectFit: "fill" }}
      />
      <Box title={title} sx={{ overflow: "hidden" }}>
        <Typography
          variant="h6"
          align="center"
          sx={{
            display: "-webkit-box",
            width: "250px",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            marginTop: "10px",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Paper>
  );
};

export default BookItem;
