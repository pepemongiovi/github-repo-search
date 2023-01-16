import {
  Button,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { FC } from 'react';

interface GithubRepoTableProps {
  data: any;
  page: number;
  onChangePage: (page: number) => void;
}
const GithubRepoTable: FC<GithubRepoTableProps> = ({
  data,
  page,
  onChangePage,
}) => {
  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Owner</TableCell>
              <TableCell align="center">Stars</TableCell>
              <TableCell align="center">Link</TableCell>
              <TableCell align="center">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.items.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.owner.login}</TableCell>
                <TableCell align="center">{row.stargazers_count}</TableCell>
                <TableCell align="center">
                  <Link target="_blank" href={row.html_url}>
                    {row.full_name}
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <Button>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={data.total_count}
        rowsPerPage={10}
        page={page}
        onPageChange={(_, page) => console.log(page)}
      />
    </Paper>
  );
};

export default GithubRepoTable;
