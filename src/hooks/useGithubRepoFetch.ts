import { fetchGithubAPI } from '@/services/github-api';
import { useState } from 'react';

export interface GithubRepoResult {
  total_count: number;
  items: any[];
}
const useGithubRepoFetch = () => {
  const [repos, setRepos] = useState<GithubRepoResult>({
    total_count: 0,
    items: [],
  });

  const fetchRepos = async (search: string, page: number) => {
    const res = await fetchGithubAPI('/search/repositories', {
      q: search,
      language: 'typescript',
      sort: 'stars',
      order: 'desc',
      per_page: 10,
      page,
    });

    setRepos(res);
  };

  return { repos, fetchRepos };
};

export default useGithubRepoFetch;
