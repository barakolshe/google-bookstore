import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { FunctionComponent } from "react";

interface BookItemProps {
  onClick: () => void;
  cover: string | undefined;
  title: string;
}

const BookItem: FunctionComponent<BookItemProps> = ({
  cover,
  title,
  onClick,
}) => {
  return (
    <Card title={title} sx={{ width: "250px" }}>
      <CardActionArea sx={{ height: "294px" }} onClick={onClick}>
        <Stack direction="row" justifyContent="center">
          <Box
            component="img"
            src={cover}
            height="188px"
            sx={{ objectFit: "fill" }}
          />
        </Stack>
        <CardContent>
          <Typography
            variant="h6"
            align="center"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              mt: "10px",
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookItem;
