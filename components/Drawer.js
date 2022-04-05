import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FolderIcon from "@mui/icons-material/Folder";
import EmailIcon from "@mui/icons-material/Email";
import styles from "../styles/Home.module.css";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Home"].map((text, index) => (
          <div key={text}>
            <ListItem button key={text}>
              <ListItemIcon>
                <Button href="#hero">
                  <HomeIcon className={styles.navIcon} />
                </Button>
              </ListItemIcon>
              <ListItemText
                sx={{
                  textDecorationLine: "none",
                  textDecoration: "none",
                  textDecorationStyle: "none",
                }}
                primary={text}
              />
            </ListItem>
          </div>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <Button href="#about">
              <InfoIcon className={styles.navIcon} />
            </Button>
          </ListItemIcon>
          <ListItemText
            sx={{
              textDecorationLine: "none",
              textDecoration: "none",
              textDecorationStyle: "none",
            }}
            primary="About"
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Button href="#skills">
              <CheckCircleOutlineIcon className={styles.navIcon} />
            </Button>
          </ListItemIcon>
          <ListItemText
            sx={{
              textDecorationLine: "none",
              textDecoration: "none",
              textDecorationStyle: "none",
            }}
            primary="Skills"
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Button href="#projects">
              <FolderIcon className={styles.navIcon} />
            </Button>
          </ListItemIcon>
          <ListItemText
            sx={{
              textDecorationLine: "none",
              textDecoration: "none",
              textDecorationStyle: "none",
            }}
            primary="Projects"
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Button href="#contact" sx={{ color: "131b40" }}>
              <EmailIcon className={styles.navIcon} />
            </Button>
          </ListItemIcon>
          <ListItemText
            sx={{
              textDecorationLine: "none",
              textDecoration: "none",
              textDecorationStyle: "none",
            }}
            primary="Contact"
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2, color: "white", fontWeight: "Bold" }}
        onClick={toggleDrawer("left", true)}
      >
        <MenuIcon sx={{ fontSize: "3rem" }} />
      </IconButton>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}
