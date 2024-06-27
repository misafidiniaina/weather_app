import React, { useState, useCallback } from "react";
import logo from "../images/meteo.svg";
import searchIcon from "../images/search.svg";
import "./Header.css";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import debounce from "lodash.debounce";

const Header = React.memo(({ options, onSearch, onValidate }) => {
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearch = useCallback(
    debounce((value) => {
      if (value.trim() !== "") {
        onSearch(value);
      }
    }, 100),
    [onSearch]
  );

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };
  const handleInputChange = (event, newInputValue) => {
    setSearchValue(newInputValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchValue.trim() !== "") {
      onValidate(searchValue);
    }
  };

  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="logo" width={150} height={25} />
      </div>
      <div className="searchBar">
        <form onSubmit={handleSubmit}>
          <Autocomplete
            style={{ width: "100%" }}
            freeSolo
            options={options.map((option) => option)}
            onInputChange={handleInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter a city or a country..."
                variant="outlined"
                id="outlined-basic"
                value={searchValue}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    paddingX: 3,
                    "& fieldset": {
                      borderWidth: "2px",
                      borderColor: "#333333",
                      borderRadius: 500,
                      paddingLeft: 3,
                    },
                    "&:hover fieldset": {
                      borderWidth: "2px",
                      borderColor: "#333333",
                    },
                    "&.Mui-focused fieldset": {
                      borderWidth: "2px",
                      borderColor: "#333333",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    marginLeft: 2,
                    color: "#737373",
                    "&.Mui-focused": {
                      color: "black",
                      marginLeft: 2,
                      color: "gray"
                    },
                  },
                }}
              />
            )}
          />
          <input type="submit" value="SEARCH" id="submitBtn" />
        </form>
      </div>
    </div>
  );
});

export default Header;
