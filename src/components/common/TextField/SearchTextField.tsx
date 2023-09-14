import { Search as SearchIcon } from "@mui/icons-material";
import { IconButton, InputBase, InputBaseProps, Paper } from "@mui/material";
import { FunctionComponent } from "react";

type SearchTextFieldProps = InputBaseProps & {};

const SearchTextField: FunctionComponent<SearchTextFieldProps> = ({
  sx,
  ...props
}) => {
  return (
    <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center", ...sx }}>
      <InputBase sx={{ ml: 1, flex: 1 }} {...props} />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchTextField;
