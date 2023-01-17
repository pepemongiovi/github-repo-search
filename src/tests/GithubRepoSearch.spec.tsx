import GithubRepoSearch from '@/features/GithubRepoSearch';
import * as fetchGithubAPI from '@/services/github-api';
import { act, findByText, render } from '@testing-library/react';
import { githubReposMock } from '@/../__mocks__/githubRepos';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';

describe('GithubRepoSearch component', () => {
  const fetchGithubAPISpy = jest.spyOn(fetchGithubAPI, 'default');

  beforeEach(() => {
    fetchGithubAPISpy.mockReturnValue(githubReposMock as any);
  });

  afterEach(() => {
    fetchGithubAPISpy.mockClear();
  });

  it("should not show table when there's no data", async () => {
    const { queryByTestId } = await act(() => render(<GithubRepoSearch />));
    expect(queryByTestId('repos-table')).toBeFalsy();
  });

  it('should show table when user writes repo name and presses search button', async () => {
    const { findByTestId, getByText, getByPlaceholderText } = render(
      <GithubRepoSearch />,
    );

    const inputField = getByPlaceholderText('Search for a repository...');
    const searchButton = getByText('Search');

    await userEvent.type(inputField, 'Cook');
    await userEvent.click(searchButton);

    expect(searchButton).toBeEnabled();
    expect(await findByTestId('repos-table')).toBeVisible();
  });

  it('should contain a table with 5 columns: "Name", "Owner", "Stars", "Link" and "Details"', async () => {
    const { getByText, getByPlaceholderText, getAllByRole } = render(
      <GithubRepoSearch />,
    );

    const inputField = getByPlaceholderText('Search for a repository...');
    const searchButton = getByText('Search');

    await userEvent.type(inputField, 'Cook');
    await userEvent.click(searchButton);

    const columnHeaders = getAllByRole('columnheader');

    expect(columnHeaders.length).toBe(5);
    expect(getByText('Name')).toBeVisible();
    expect(getByText('Owner')).toBeVisible();
    expect(getByText('Stars')).toBeVisible();
    expect(getByText('Link')).toBeVisible();
    expect(getByText('Details')).toBeVisible();
  });

  it('should only show 10 rows per page', async () => {
    const { getByText, getByPlaceholderText, getAllByText, getByTitle } =
      render(<GithubRepoSearch />);

    const inputField = getByPlaceholderText('Search for a repository...');
    const searchButton = getByText('Search');

    await userEvent.type(inputField, 'Cook');
    await userEvent.click(searchButton);

    const rows = getAllByText('View details');
    expect(rows.length).toBe(10);

    const button = getByTitle('Go to next page');
    await userEvent.click(button);

    expect(rows.length).toBe(10);
  });

  it('should only call github api once per page', async () => {
    const { getByText, getByPlaceholderText, getAllByText, getByTitle } =
      render(<GithubRepoSearch />);

    const inputField = getByPlaceholderText('Search for a repository...');
    const searchButton = getByText('Search');

    await userEvent.type(inputField, 'Cook');
    await userEvent.click(searchButton);

    const nextPageBtn = getByTitle('Go to next page');
    await userEvent.click(nextPageBtn);
    await userEvent.click(nextPageBtn);

    const prevPageBtn = getByTitle('Go to previous page');
    await userEvent.click(prevPageBtn);
    await userEvent.click(nextPageBtn);

    expect(fetchGithubAPISpy).toHaveBeenCalledTimes(3);
  });

  it('should show error toast when api throws exception', async () => {
    const { getByText, getByPlaceholderText, getAllByText, getByTitle } =
      render(<GithubRepoSearch />);

    fetchGithubAPISpy.mockRejectedValue(new Error());

    const inputField = getByPlaceholderText('Search for a repository...');
    const searchButton = getByText('Search');

    await userEvent.type(inputField, 'Cook');
    await userEvent.click(searchButton);

    expect(toast.error).toHaveBeenCalled();
  });
});

export {};
