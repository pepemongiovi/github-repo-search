import { act, render, screen, waitFor } from '@testing-library/react';
import SearchBar from '@/components/SearchBar';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';

describe('SearchBar component', () => {
  it('should show search bar with input field and button', async () => {
    const { getByText, getByPlaceholderText, debug } = await act(() =>
      render(<SearchBar onSearch={jest.fn()} isLoading={false} />),
    );

    expect(getByText('Search')).toBeVisible();
    expect(getByText('Search')).toBeEnabled();
    expect(getByPlaceholderText('Search for a repository...')).toBeVisible();
  });

  it('should disable button when isLoading = true', async () => {
    const { getByTestId } = await act(() =>
      render(<SearchBar onSearch={jest.fn()} isLoading={true} />),
    );
    expect(getByTestId('search-btn')).toBeDisabled();
  });

  it('should show warning toast when user tries to search with empty field', async () => {
    const { getByText } = await act(() =>
      render(<SearchBar onSearch={jest.fn()} isLoading={false} />),
    );

    const searchBtn = getByText('Search');
    await userEvent.click(searchBtn);

    expect(toast.warn).toHaveBeenCalled();
  });
});

export {};
