import React from "react";
import { AppBar, Toolbar, Typography, Link } from "@material-ui/core";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          <Link href="/" color="inherit" style={{ textDecoration: "none" }}>
            Quiz
          </Link>
        </Typography>
        <Typography variant="inherit" style={{ marginLeft: "16px" }}>
          <Link href="/ranking" color="inherit">
            Ranking
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
