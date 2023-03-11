import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import FetchedTable from "../components/FetchedTable/FetchedTable";

const FIRST_TABLE_TO_FETCH = "users";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Admin = () => {
  const [tabNum, setTabNum] = React.useState(0);
  const [SQLtable, setSQLtable] = React.useState(FIRST_TABLE_TO_FETCH);

  const handleChange = (event, newTabNum) => {
    setTabNum(newTabNum);
    setSQLtable(event.target.innerText);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        background: "#eeeeee",
        height: "90vh",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabNum}
        onChange={handleChange}
        sx={{
          borderRight: 3,
          borderColor: "divider",
          bgcolor: "background.paper",
          minWidth: 200,
        }}
      >
        <Tab label="users" {...a11yProps(0)} />
        <Tab label="roles" {...a11yProps(1)} />
        <Tab label="cakes" {...a11yProps(2)} />
        <Tab label="ingredients" {...a11yProps(3)} />
        <Tab label="cake_ingredients" {...a11yProps(4)} />
        <Tab label="carts" {...a11yProps(5)} />
        <Tab label="customer_address" {...a11yProps(6)} />
        <Tab label="orders_header" {...a11yProps(7)} />
        <Tab label="orders_position" {...a11yProps(8)} />
      </Tabs>
      <TabPanel
        value={tabNum}
        index={0}
        sx={{
          width: 1200,
        }}
      >
        <FetchedTable SQLtable={SQLtable} />
      </TabPanel>
      <TabPanel
        value={tabNum}
        index={1}
        sx={{
          width: 1200,
        }}
      >
        <FetchedTable SQLtable={SQLtable} />
      </TabPanel>
      <TabPanel
        value={tabNum}
        index={2}
        sx={{
          width: 1200,
        }}
      >
        <FetchedTable SQLtable={SQLtable} />
      </TabPanel>
      <TabPanel
        value={tabNum}
        index={3}
        sx={{
          width: 1200,
        }}
      >
        <FetchedTable SQLtable={SQLtable} />
      </TabPanel>
      <TabPanel
        value={tabNum}
        index={4}
        sx={{
          width: 1200,
        }}
      >
        <FetchedTable SQLtable={SQLtable} />
      </TabPanel>
      <TabPanel
        value={tabNum}
        index={5}
        sx={{
          width: 1200,
        }}
      >
        <FetchedTable SQLtable={SQLtable} />
      </TabPanel>
      <TabPanel
        value={tabNum}
        index={6}
        sx={{
          width: 1200,
        }}
      >
        <FetchedTable SQLtable={SQLtable} />
      </TabPanel>
      <TabPanel
        value={tabNum}
        index={7}
        sx={{
          width: 1200,
        }}
      >
        <FetchedTable SQLtable={SQLtable} />
      </TabPanel>
      <TabPanel
        value={tabNum}
        index={8}
        sx={{
          width: 1200,
        }}
      >
        <FetchedTable SQLtable={SQLtable} />
      </TabPanel>
    </Box>
  );
};
export default Admin;
