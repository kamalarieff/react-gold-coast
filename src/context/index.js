import React, { createContext } from "react";

export const StaticDataContext = createContext();

export const StaticDataProvider = props => {
  const store = [
    {
      name: "accomodation",
      data: {
        value: 1460,
        currency: "AUD",
        title: "View Pacific Apartments",
        url:
          "https://www.booking.com/hotel/au/view-pacific-apartments.html?label=gen173nr-1FCAEoggI46AdIM1gEaKEBiAECmAExuAEJyAER2AEB6AEB-AECiAIBqAIDuALaxpbqBcACAQ;sid=1ce18ca4875ca3247a4ddd1fa8372b16;all_sr_blocks=36883008_195607957_7_0_0;bhgwe_bhr=0;checkin=2019-10-13;checkout=2019-10-19;dest_id=-1575736;dest_type=city;dist=0;group_adults=7;group_children=0;hapos=7;highlighted_blocks=36883008_195607957_7_0_0;hpos=7;matching_block_id=36883008_195607957_7_0_0;no_rooms=1;ref_is_wl=1;req_adults=7;req_children=0;room1=A%2CA%2CA%2CA%2CA%2CA%2CA;sb_price_type=total;sr_order=popularity;srepoch=1564845225;srpvid=6d0a6b14fd92011a;type=total;ucfs=1&"
      }
    }
  ];

  const budget = [
    {
      name: "food",
      data: {
        value: 150,
        currency: "AUD",
        url: []
      }
    },
    {
      name: "visa",
      data: {
        value: 57,
        currency: "RM",
        url: []
      }
    },
    {
      name: "dream world",
      data: {
        value: 160,
        currency: "RM",
        url: []
      }
    },
    {
      name: "movie world + paradise country",
      data: {
        value: 186,
        currency: "RM",
        url: []
      }
    },
    {
      name: "flight ticket",
      data: {
        value: 1343,
        currency: "RM",
        url: []
      }
    },
    {
      name: "car rental",
      data: {
        value: 115.48,
        currency: "RM",
        url: []
      }
    },
    {
      name: "fuel",
      data: {
        value: 200,
        currency: "AUD",
        url: []
      }
    }
  ];

  return (
    <StaticDataContext.Provider value={{ store: [...store, ...budget] }}>
      {props.children}
    </StaticDataContext.Provider>
  );
};
