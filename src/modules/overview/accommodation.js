import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import * as R from "ramda";
import { StyledPaper } from "./index";
import { StaticDataContext } from "../../context";

const Overview = () => {
  const { store } = useContext(StaticDataContext);
  const getAccomodation = R.find(R.propEq("name", "accommodation"));
  const getUrl = R.path(["data", "url"]);
  const getTitle = R.path(["data", "title"]);

  const accommodation = getAccomodation(store);
  const url = getUrl(accommodation);
  const title = getTitle(accommodation);

  return (
    <StyledPaper>
      <Typography variant="body1">Accommodation</Typography>
      <Typography variant="body2">
        <Link href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </Link>
      </Typography>
    </StyledPaper>
  );
};

export default Overview;
