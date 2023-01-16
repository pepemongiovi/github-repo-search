import { fetchGithubAPI } from '@/services/github-api';
import { useState } from 'react';

const ROWS_PER_PAGE = 10;

export interface GithubRepoResult {
  total_count: number;
  items: any[];
}
const useGithubRepoFetch = () => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [repos, setRepos] = useState<GithubRepoResult>({
    total_count: 0,
    items: [],
  });

  const fetchRepos = async (page: number, repoName = search) => {
    if (!search || repoName !== search || repos.items.length < page) {
      setIsLoading(true);

      const res = await fetchGithubAPI('/search/repositories', {
        q: repoName,
        language: 'typescript',
        sort: 'stars',
        order: 'desc',
        per_page: ROWS_PER_PAGE,
        page,
      });

      setIsLoading(false);
      setRepos({ ...res, items: [...repos.items, res.items] });
      setSearch(repoName);
    }
  };

  return { repos, fetchRepos, isLoading };
};

export default useGithubRepoFetch;
