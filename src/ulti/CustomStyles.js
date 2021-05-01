import { createMuiTheme } from "@material-ui/core/styles";
const defaultTheme = createMuiTheme();
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        a: {
          textDecoration: "none",
          color: "inherit",
          "&:hover": {
            textDecoration: "none",
            color: "gray",
          },
        },
      },
    },
    MuiContainer: {
      maxWidthLg: {
        paddingTop: defaultTheme.spacing(3),
        paddingBottom: defaultTheme.spacing(3),
        [defaultTheme.breakpoints.up("lg")]: {
          maxWidth: 1500,
          paddingTop: defaultTheme.spacing(6),
          paddingBottom: defaultTheme.spacing(8),
        },
      },
    },
    MuiToolbar: {
      root: {
        // width container
        maxWidth: 1280,
        width: "100%",
        margin: "auto",
      },
    },
    MuiTabs: {
      root: {
        alignItems: "center",
      },
    },
    MuiTab: {
      root: {
        [defaultTheme.breakpoints.up("xs")]: {
          minHeight: "48px",
          minWidth: "auto",
        },
        // padding: "4px 0px",
        // marginLeft: defaultTheme.spacing(3),
        color: "inherit",
        textTransform: "none",

        // Typography body1
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif"',
        fontWeight: 400,
        fontSize: "1rem",
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
      },
    },
    MuiButton: {
      root: {
        textTransform: "none",
      },
    },
    MuiCardMedia: {
      root: {
        borderRadius: 8,
      },
    },
    MuiListItem: {
      button: {
        "&:hover": {
          color: "#fff",
          backgroundColor: " rgba(25,28,109,1)",
        },
      },
    },
  },
  typography: {
    h2: {
      fontWeight: "bold",
      [defaultTheme.breakpoints.down("sm")]: {
        fontSize: "1.5em",
        fontWeight: 700,
      },
    },
    h3: {
      fontWeight: "bold",
      [defaultTheme.breakpoints.down("sm")]: {
        fontSize: " 2em;",
      },
    },
    h4: {
      fontWeight: "bold",
      [defaultTheme.breakpoints.down("sm")]: {
        fontSize: "2em",
      },
    },
    h5: {
      fontWeight: "bold",
    },
    h6: {
      fontWeight: "bold",
      [defaultTheme.breakpoints.down("sm")]: {
        fontSize: "1.25em",
      },
    },
  },
  palette: {
    primary: {
      main: "#142851",
      contrastText: "#fff",
    },
  },
});
export default theme;
