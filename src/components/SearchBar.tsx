import { alpha, Button, Card, InputBase, Stack, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FC, FormEventHandler, useState } from 'react';

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
    onSearch(1, search);
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

        <Button
          type="submit"
          variant="contained"
          sx={{ px: 4 }}
          //   disabled={isLoading}
        >
          <SearchIcon sx={{ mr: 1 }} />
          Search
        </Button>
      </Stack>
    </form>
  );
};

export default SearchBar;
