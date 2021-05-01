import { InputBase, makeStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import request from "api/request";
import useDebounce from "hook/useDebounce";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

Search.propTypes = {
  onSubmit: PropTypes.func,
  searchRef: PropTypes.object,
};
Search.defaultProps = {
  onSubmit: null,
};
const useStyles = makeStyles((theme) => ({
  inputRoot: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      fontSize: "small",
    },
  },
  inputInput: (props) => ({
    padding: theme.spacing(2 * 0.85, 3),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(props.paddingLeft + 2)}px)`,
    //padding: '1rem 1rem',
    width: "100%",
    color: "black",
    background: "white",
    borderRadius: "30px",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 2),
    },
  }),
  searchForm: {
    width: "95%",
    margin: "auto",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  seachRoot: {
    width: "6rem",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    right: 0,
    [theme.breakpoints.down("sm")]:{
      width: "5em",
      fontSize: "1em",
    }
  },
  searchInput: {
    cursor: " pointer",
    color: "white",
    borderRadius: "30px",
    fontWeight: 700,
    backgroundImage: " linear-gradient(to right, #74ebd5 0%, #9face6 100%);",
    padding: "14px",
    [theme.breakpoints.down("sm")]: {
      fontWeight: 300,
      padding: "7.5px",
    },
    "&:hover": {
      color: "black",
    },
  },
}));

function Search(props) {
  const { searchRef } = props;

  const classes = useStyles();
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("the");
  const debounceInput = useDebounce(searchTerm, 500);
  const history = useHistory();
  useEffect(() => {
    if (debounceInput) {
      const fetchData = async () => {
        try {
          // const paramString = queryString.stringify(debounceInput)
          const respone = await request.searchMovies(debounceInput, 1);
          setOptions(respone.results.map((item) => item.title));
        } catch (error) {
          console.log("Lỗi search", error);
        }
      };
      fetchData();
    }
  }, [debounceInput]);
  const handleChange = (event, newValue) => {
    if (newValue) {
      history.push(`/search/movie/page1/${newValue}`);
    }
  };
  const handleInputSearchChange = (event, newSearchTerm) => {
    // const values = event.target.value;
    setSearchTerm(newSearchTerm);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm) {
      history.push(`/search/movie/page1/${searchTerm}`);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.searchForm}>
        <Autocomplete
          freeSolo
          onChange={handleChange}
          inputValue={searchTerm}
          onInputChange={handleInputSearchChange}
          options={options}
          filterOptions={(options) => options}
          ref={searchRef}
          renderInput={(params) => (
            <InputBase
              ref={params.InputProps.ref}
              inputProps={{ ...params.inputProps }}
              placeholder="Tìm kiếm phim, chương trình truyền hình, mọi người..."
              // autoFocus
              classes={{ root: classes.inputRoot, input: classes.inputInput }}
            />
          )}
        />

        <InputBase
          type="submit"
          onClick={handleSubmit}
          value="Search"
          classes={{ root: classes.seachRoot, input: classes.searchInput }}
        />
      </form>
    </div>
  );
}
export default Search;
