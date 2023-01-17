import {
  alpha,
  Button,
  Card,
  CircularProgress,
  InputBase,
  Stack,
  styled,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FC, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: theme.spacing(2),
    transition: theme.transitions.create('width'),
    height: theme.spacing(4),
    width: '100%',
  },
}));

interface SearchBarProps {
  onSearch: (page: number, search: string) => void;
  isLoading?: boolean;
}
const SearchBar: FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [search, setSearch] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search) onSearch(1, search);
    else toast.warn('Please enter a repository name');
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack direction="row" spacing={2}>
        <Card sx={{ width: 1 }}>
          <Search>
            <StyledInputBase
              value={search}
              onChange={({ target: { value } }) => setSearch(value)}
              placeholder="Search for a repository..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Card>

        <LoadingButton
          data-testid="search-btn"
          type="submit"
          variant="contained"
          sx={{ px: 4 }}
          loading={isLoading}
        >
          <SearchIcon sx={{ mr: 1 }} />
          Search
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default SearchBar;
