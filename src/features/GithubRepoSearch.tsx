import GithubRepoTable from '@/components/GithubRepoTable';
import SearchBar from '@/components/SearchBar';
import useGithubRepoFetch from '@/hooks/useGithubRepoFetch';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';

const GithubRepoSearch = () => {
  const { repos, fetchRepos } = useGithubRepoFetch();
  const [page, setPage] = useState(1);

  return (
    <Stack sx={{ p: 5, bgcolor: 'gainsboro' }} spacing={5}>
      <SearchBar page={page} onSearch={fetchRepos} />
      {!!repos.total_count && (
        <GithubRepoTable page={page} onChangePage={setPage} data={repos} />
      )}
    </Stack>
  );
};

export default GithubRepoSearch;
