import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import * as R from "ramda";
import { StyledPaper } from "./index";
import { StaticDataContext } from "../../context";

const Overview = () => {
  const { store } = useContext(StaticDataContext);
  const getCarRental = R.find(R.propEq("name", "car rental"));
  const getUrl = R.path(["data", "url"]);
  const getTitle = R.path(["data", "title"]);

  const carRental = getCarRental(store);
  const url = getUrl(carRental);
  const title = getTitle(carRental);

  return (
    <StyledPaper>
      <Typography variant="body1">Car Rental</Typography>
      <Typography variant="body2">
        <Link href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </Link>
      </Typography>
    </StyledPaper>
  );
};

export default Overview;
