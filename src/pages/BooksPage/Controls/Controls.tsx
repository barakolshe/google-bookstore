import SearchTextField from "@/components/common/TextField/SearchTextField";
import { Grid } from "@mui/material";
import { FunctionComponent } from "react";
import PageSizeSelect from "./PageSizeSelect/PageSizeSelection";

interface ControlsProps {}

const Controls: FunctionComponent<ControlsProps> = () => {
  return (
    <Grid container direction="row-reverse">
      <Grid
        item
        xs={currBreakpoint === "md" ? 4 : 12}
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
        xs={currBreakpoint === "md" ? 4 : 12}
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
