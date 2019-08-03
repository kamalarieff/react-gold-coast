import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import * as R from "ramda";
import { StyledPaper } from "./index";
import { StaticDataContext } from "../../context";

const Overview = () => {
  const { store } = useContext(StaticDataContext);
  const getAccomodation = R.find(R.propEq("name", "Accomodation"));
  const getUrl = R.path(["data", "url"]);
  const getTitle = R.path(["data", "title"]);

  const accomodation = getAccomodation(store);
  const url = getUrl(accomodation);
  const title = getTitle(accomodation);

  return (
    <StyledPaper>
      <Typography variant="body1">Accomodation</Typography>
      <Typography variant="body2">
        <Link href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </Link>
      </Typography>
    </StyledPaper>
  );
};

export default Overview;
