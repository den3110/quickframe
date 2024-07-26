import React, { useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { VipMemberContext } from "..";

function LevelSelect() {
  const [level, setLevel] = React.useState("level");
  const [subLevel, setSubLevel] = React.useState(1);
  const {setLevel: setLevelContext, setNickName: setNickNameContext, setPage: setPageContext }= useContext(VipMemberContext)

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
    if(event.target.value=== "level") {
        setSubLevel(0); 
    }
};

  const handleSubLevelChange = (event) => {
    setSubLevel(event.target.value);
  };

  const handleSubmit= ()=> {
    if(level=== "level") {
        setLevelContext(parseInt(subLevel))
        setPageContext(1)
    }
    if(level=== "username") {
        setNickNameContext(subLevel)
        setPageContext(1)
    }
  }

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <FormControl sx={{ minWidth: 120 }}>
        <Select
          size="small"
          value={level}
          onChange={handleLevelChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="level">By Level</MenuItem>
          <MenuItem value="username">By Username</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        {level === "level" ? (
          <Select
            size="small"
            value={subLevel}
            onChange={handleSubLevelChange}
            inputProps={{ "aria-label": "Without label" }}
          >
            {Array.from(Array(7).keys()).map((item, key) => (
              <MenuItem key={key} value={parseInt(item) + 1}>
                Level {parseInt(item) + 1}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <TextField
            
            size="small"
            value={subLevel}
            onChange={handleSubLevelChange}
            placeholder="Enter Username"
          />
        )}
      </FormControl>
      <Button onClick={handleSubmit} startIcon={<SearchIcon />} variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
}

export default LevelSelect;
