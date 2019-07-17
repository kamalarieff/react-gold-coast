import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from "@emotion/styled";

const itenaryData = [
  {
    Evening: "-",
    Morning: "Arrive in Gold Coast",
    Night: "-",
    date: "13 Oct 2019",
    day: "Sunday"
  },
  {
    Evening: "-",
    Morning: "Movie World",
    Night: "-",
    date: "14 Oct 2019",
    day: "Monday"
  },
  {
    Evening: "-",
    Morning: "paradise country",
    Night: "-",
    date: "15 Oct 2019",
    day: "Tuesday"
  },
  {
    Evening: "-",
    Morning: "Dream world",
    Night: "-",
    date: "16 Oct 2019",
    day: "Wednesday"
  },
  {
    Evening: "-",
    Morning: "Nimbin",
    Night: "-",
    date: "17 Oct 2019",
    day: "Thursday"
  },
  {
    Evening: "-",
    Morning: "-",
    Night: "-",
    date: "18 Oct 2019",
    day: "Friday"
  },
  {
    Evening: null,
    Morning: "Return flight",
    Night: null,
    date: "19 Oct 2019",
    day: "Saturday"
  }
];

const ActivityTable = styled(Table)`
  table-layout: fixed;
`;

const TableHeader = ({ date, day }) => (
  <TableHead style={{ backgroundColor: "lightgrey" }}>
    <TableRow>
      <TableCell>
        <Typography variant="h6">
          {date} {day}
        </Typography>
      </TableCell>
    </TableRow>
  </TableHead>
);

const SubTableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell>Time</TableCell>
      <TableCell>Activity</TableCell>
    </TableRow>
  </TableHead>
);

const ItenaryRow = ({ label, activity }) => (
  <TableRow>
    <TableCell>{label}</TableCell>
    <TableCell>{activity}</TableCell>
  </TableRow>
);

const Itenary = () => (
  <Card>
    <CardHeader title={<Typography variant="h5">Itenary</Typography>} />
    <CardContent>
      <Table>
        {itenaryData.map(itenary => (
          <React.Fragment key={itenary.date}>
            <TableHeader date={itenary.date} day={itenary.day} />
            <TableBody>
              <ActivityTable>
                <SubTableHeader />
                <TableBody>
                  <ItenaryRow label="Morning" activity={itenary.Morning} />
                  <ItenaryRow label="Evening" activity={itenary.Evening} />
                  <ItenaryRow label="Night" activity={itenary.Night} />
                </TableBody>
              </ActivityTable>
            </TableBody>
          </React.Fragment>
        ))}
      </Table>
    </CardContent>
  </Card>
);

export default Itenary;
