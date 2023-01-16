import GithubRepoTable from '@/components/GithubRepoTable';
import SearchBar from '@/components/SearchBar';
import useGithubRepoFetch from '@/hooks/useGithubRepoFetch';
import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const GithubRepoSearch = () => {
  const { repos, isLoading, fetchRepos } = useGithubRepoFetch();
  const [page, setPage] = useState(1);

  const onSearchRepo = (page: number, search: string) => {
    fetchRepos(page, search);
    setPage(page);
  };

  const onPageChange = async (newPage: number) => {
    await fetchRepos(newPage);
    setPage(newPage);
  };

  return (
    <Stack sx={{ p: 5, bgcolor: 'gainsboro' }} spacing={5}>
      <SearchBar onSearch={onSearchRepo} isLoading={isLoading} />
      {!!repos.total_count && (
        <GithubRepoTable
          page={page}
          onPageChange={onPageChange}
          data={repos}
          isLoading={isLoading}
        />
      )}
    </Stack>
  );
};

export default GithubRepoSearch;
