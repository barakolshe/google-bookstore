import SearchTextField from "@/components/common/TextField/SearchTextField";
import { PAGE_SIZE_OPTIONS } from "@/configs/apiConfig";
import { Grid, Theme, useMediaQuery } from "@mui/material";
import { FunctionComponent } from "react";
import PageSizeSelect from "./PageSizeSelect/PageSizeSelection";

interface ControlsProps {
  pageSize: (typeof PAGE_SIZE_OPTIONS)[number];
  setPageSize: (pageSize: (typeof PAGE_SIZE_OPTIONS)[number]) => void;
  setSearchValue: (searchValue: string) => void;
}

const Controls: FunctionComponent<ControlsProps> = ({
  pageSize,
  setPageSize,
  setSearchValue,
}) => {
  return (
    <Grid container direction="row-reverse">
      <Grid
        item
        xs={
          useMediaQuery((theme: Theme) => theme.breakpoints.down("md")) ? 12 : 4
        }
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: { xs: "center", md: "center" },
          mb: { xs: 3, md: 0 },
        }}
      >
        <PageSizeSelect pageSize={pageSize} setPageSize={setPageSize} />
      </Grid>
      <Grid
        item
        xs={
          useMediaQuery((theme: Theme) => theme.breakpoints.down("md")) ? 12 : 4
        }
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <SearchTextField
          placeholder="Search"
          sx={{ width: "280px" }}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default Controls;
