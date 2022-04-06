import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TemporaryDrawer from "./Drawer";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import styles from "../styles/Home.module.css";

export default function ButtonAppBar() {
  return (
    <Box
      elevation={0}
      sx={{
        flexGrow: 1,
        backgroundColor: "#131b40",
      }}
    >
      <AppBar
        elevation={0}
        position="static"
        sx={{
          backgroundColor: "#131b40",
        }}
      >
        <Toolbar>
          <TemporaryDrawer></TemporaryDrawer>
          <div className={styles.navContainer}>
            <a className={styles.navLink} href="#about">
              About
            </a>
            <a className={styles.navLink} href="#skills">
              Skills
            </a>
            <a className={styles.navLink} href="#projects">
              Projects
            </a>
            <a className={styles.navLink} href="#contact">
              Contact
            </a>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
