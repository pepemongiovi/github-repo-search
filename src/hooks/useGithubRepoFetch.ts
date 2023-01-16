import { fetchGithubAPI } from '@/services/github-api';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ROWS_PER_PAGE = 10;

export interface GithubRepoItem {
  name: string;
  full_name: string;
  stargazers_count: number;
  html_url: string;
  commits_url: string;
  forks_url: string;
  owner: {
    login: string;
    url: string;
  };
}
interface GithubRepoResult {
  total_count: number;
  items: GithubRepoItem[][];
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

      try {
        const res = await fetchGithubAPI({
          path: '/search/repositories',
          params: {
            q: repoName,
            sort: 'stars',
            order: 'desc',
            per_page: ROWS_PER_PAGE,
            page,
          },
        });

        setRepos({ ...res, items: [...repos.items, res.items] });
        setSearch(repoName);
      } catch (_) {
        toast.error("Couldn't fetch repositories");
      }

      setIsLoading(false);
    }
  };

  const viewRepoDetails = async (repo: GithubRepoItem) => {
    try {
      const commits = await fetchGithubAPI({
        path: `/repos/${repo.full_name}/commits`,
        params: {
          sort: 'commit.commiter.date',
          per_page: 3,
        },
      });

      const lastThreeCommitAuthors = commits
        .map((result: any) => result.commit.author.name)
        .join(', ');

      const lastFork = await fetchGithubAPI({
        fullPath: repo.forks_url.replace('{/sha}', ''),
        params: {
          per_page: 1,
        },
      });

      const lastForkAuthor = lastFork[0].owner.login;

      const lastForkOwner = await fetchGithubAPI({
        fullPath: repo.owner.url,
        params: {
          per_page: 1,
        },
      });

      const lastForkOwnerBio = lastForkOwner.bio;

      alert(
        `- Last 3 commits by ${lastThreeCommitAuthors}.\n- The last fork was created by ${lastForkAuthor}.\n- The owner has this in their biography: ${
          lastForkOwnerBio || 'none'
        }`,
      );
    } catch (_) {
      toast.error("Couldn't fetch repository details");
    }
  };

  return { repos, isLoading, fetchRepos, viewRepoDetails };
};

export default useGithubRepoFetch;
