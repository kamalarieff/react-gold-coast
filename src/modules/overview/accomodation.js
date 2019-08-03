import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import * as R from "ramda";
import { StyledPaper } from "./index";
import { StaticDataContext } from "../../context";

const Overview = () => {
  const { store } = useContext(StaticDataContext);
  const getAccomodation = R.find(R.propEq("name", "Accomodation"));
  //   const getURL = R.path(["data", "url"]);
  const getUrl = R.pipe(
    getAccomodation,
    R.path(["data", "url"])
  );
  const getTitle = R.pipe(
    getAccomodation,
    R.path(["data", "title"])
  );
  //   console.log("TCL: Overview -> temp", temp);
  //   const accomodation = getAccomodation(temp);
  //   console.log("TCL: Overview -> accomodation", accomodation);
  const url = getUrl(store);
  const title = getTitle(store);
  //   console.log("TCL: Overview -> url1", url1);
  //   const url =
  // "https://www.booking.com/hotel/au/view-pacific-apartments.html?label=gen173nr-1FCAEoggI46AdIM1gEaKEBiAECmAExuAEJyAER2AEB6AEB-AECiAIBqAIDuALaxpbqBcACAQ;sid=1ce18ca4875ca3247a4ddd1fa8372b16;all_sr_blocks=36883008_195607957_7_0_0;bhgwe_bhr=0;checkin=2019-10-13;checkout=2019-10-19;dest_id=-1575736;dest_type=city;dist=0;group_adults=7;group_children=0;hapos=7;highlighted_blocks=36883008_195607957_7_0_0;hpos=7;matching_block_id=36883008_195607957_7_0_0;no_rooms=1;ref_is_wl=1;req_adults=7;req_children=0;room1=A%2CA%2CA%2CA%2CA%2CA%2CA;sb_price_type=total;sr_order=popularity;srepoch=1564845225;srpvid=6d0a6b14fd92011a;type=total;ucfs=1&";
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
