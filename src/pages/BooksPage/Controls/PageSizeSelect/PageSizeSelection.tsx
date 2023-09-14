import { PAGE_SIZE_OPTIONS } from "@/configs/apiConfig";
import {
  ButtonGroup,
  ButtonGroupProps,
  Button as MuiButton,
} from "@mui/material";
import { FunctionComponent } from "react";

interface PageSizeSelectionProps extends ButtonGroupProps {
  pageSize: (typeof PAGE_SIZE_OPTIONS)[number];
  setPageSize: (pageSize: (typeof PAGE_SIZE_OPTIONS)[number]) => void;
}

const PageSizeSelect: FunctionComponent<PageSizeSelectionProps> = ({
  sx,
  pageSize: selectedPageSize,
  setPageSize,
}) => {
  return (
    <ButtonGroup
      variant="contained"
      aria-label="outlined primary button group"
      sx={sx}
    >
      {PAGE_SIZE_OPTIONS.map((pageSize) => (
        <MuiButton
          key={pageSize}
          onClick={() => setPageSize(pageSize)}
          sx={{
            backgroundColor:
              pageSize === selectedPageSize ? "primary.dark" : "primary",
          }}
        >
          {pageSize}
        </MuiButton>
      ))}
    </ButtonGroup>
  );
};

export default PageSizeSelect;
