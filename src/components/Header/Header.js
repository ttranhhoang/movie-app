import { AppBar, makeStyles, Toolbar } from "@material-ui/core";
import HideOnScroll from "./HideOnScroll";
import NavLeft from "./NavLeft/NavLeft";
import NavRight from "./NavRight/NavRight";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
function Header(props) {
  //navbar hidescroll
  // const [show, setShow] = useState(true);
  // const [prevScrollPos, setPrevScrollPos] = useState(0);

  //const [isOpen, setIsOpen] = useState(false);

  // const toggle = () => setIsOpen(!isOpen);

  // const handleScroll = debounceScroll(() => {
  //   const currentScrollPos = window.pageYOffset;
  //   setShow(
  //     (prevScrollPos > currentScrollPos &&
  //       prevScrollPos - currentScrollPos > 70) ||
  //       currentScrollPos < 10
  //   );
  //   setPrevScrollPos(currentScrollPos);
  // }, 100);
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [prevScrollPos, show, handleScroll]);
  const classes = useStyles();
  return (
    <>
      <HideOnScroll {...props}>
        <AppBar elevation={0}>
          <Toolbar>
            <NavLeft />
            <div className={classes.root}></div>
            <NavRight />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
}

export default Header;
