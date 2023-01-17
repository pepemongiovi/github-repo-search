import { GithubRepoItem } from '@/hooks/useGithubRepoFetch';
import {
  Button,
  Link,
  Paper,
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
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  viewRepoDetails: (repo: GithubRepoItem) => void;
}
const GithubRepoTable: FC<GithubRepoTableProps> = ({
  data,
  isLoading,
  page,
  onPageChange,
  viewRepoDetails,
}) => {
  return (
    <Paper data-testid="repos-table" sx={{ width: '100%', mb: 2 }}>
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
            {data.items[page - 1].map((repo: GithubRepoItem) => (
              <TableRow
                key={repo.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {repo.name}
                </TableCell>
                <TableCell align="center">{repo.owner.login}</TableCell>
                <TableCell align="center">{repo.stargazers_count}</TableCell>
                <TableCell align="center">
                  <Link target="_blank" href={repo.html_url}>
                    {repo.full_name}
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => viewRepoDetails(repo)}>
                    View details
                  </Button>
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
        page={page - 1}
        backIconButtonProps={isLoading ? { disabled: true } : undefined}
        nextIconButtonProps={isLoading ? { disabled: true } : undefined}
        onPageChange={(_, page) => {
          onPageChange(page + 1);
        }}
      />
    </Paper>
  );
};

export default GithubRepoTable;
