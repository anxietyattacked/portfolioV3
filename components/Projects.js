import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "../styles/Home.module.css";
import ComputerIcon from "@mui/icons-material/Computer";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import useWindowDimensions from "../utils/useWindowDimensions";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Image from "next/image";
import { dsData } from "../data/dsData";
import { webData } from "../data/webData";
import { display, width } from "@mui/system";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Projects() {
  const [value, setValue] = React.useState(0);
  const win = useWindowDimensions();
  const isMobile = win.width >= 800;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [isSSR, setIsSSR] = React.useState(true);

  React.useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          variant={isMobile ? "fullWidth" : "standard"}
          value={value}
          onChange={handleChange}
          centered={isMobile ? false : true}
          aria-label="Data Science Or Web Development Projects"
          sx={{
            ".MuiTabs-indicator": {
              backgroundColor: "#7ed957",
            },
          }}
        >
          <Tab
            icon={<QueryStatsIcon />}
            label="Data Science"
            {...a11yProps(0)}
          />

          <Tab
            icon={<ComputerIcon />}
            label="Web Development"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className={styles.projectPanel}>
          {!isSSR
            ? dsData.map((d) => (
                <Card sx={{ maxWidth: 345 }} key={d.Link}>
                  <a href={d.link}>
                    <Image
                      src={d.image}
                      height={d.iHeight}
                      width={d.iWidth}
                      alt={d.name}
                    />
                  </a>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {d.name}
                    </Typography>
                    <Typography
                      component={"span"}
                      color="text.secondary"
                      variant="body2"
                    >
                      {d.info}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ display: "grid", placeContent: "center" }}>
                    <Button
                      size="small"
                      variant="contained"
                      href={d.Link}
                      sx={{
                        backgroundColor: "#131b40",
                        color: "#fff",
                        alignSelf: "end",
                        ":hover": {
                          backgroundColor: "#7ed957",
                        },
                      }}
                      className={`${styles.bottonFont} ${styles.webButton}`}
                    >
                      Website
                    </Button>
                  </CardActions>
                </Card>
              ))
            : null}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={styles.projectPanel}>
          {webData && !isSSR
            ? webData.map((d) => (
                <Card sx={{ maxWidth: 345 }} key={d.Link}>
                  <a href={d.Link}>
                    <Image
                      src={d.image}
                      height={d.iHeight}
                      width={d.iWidth}
                      alt={d.name}
                    />
                  </a>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {d.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {d.info}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "grid",
                      placeContent: "center",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      width: "100%",
                    }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      href={d.Link}
                      sx={{
                        backgroundColor: "#131b40",
                        color: "#fff",
                        ":hover": {
                          backgroundColor: "#7ed957",
                        },
                      }}
                      className={`${styles.bottonFont} ${styles.webButton}`}
                    >
                      Website
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      href={d.ghLink}
                      sx={{
                        color: "#131b40",
                        borderBlockColor: "#131b40",
                        ":hover": {
                          backgroundColor: "#131b40",
                          color: "white",
                        },
                      }}
                      className={`${styles.bottonFont} ${styles.gitButton}`}
                    >
                      Github
                    </Button>
                  </CardActions>
                </Card>
              ))
            : null}
        </div>
      </TabPanel>
    </Box>
  );
}
