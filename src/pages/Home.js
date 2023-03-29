import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import { styled, useTheme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookById, getBooks } from '../components/utils/api';
import { addBookState, setMode } from '../state/booksReducer';
import SelectedBookPage from './SelectedBookPage';
import { Box, Button, IconButton, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { CircleWithCrossIcon } from '../assets/AddIcon';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import '../App.css';

const CircleWithCrossIconStyled = styled(CircleWithCrossIcon)({
  '&:focus': {
    outline: 'none'
  },
  borderRadius: '50%',
  width: '78px',
  height: '78px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
});

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginRight: 0
    })
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    height: '150px',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  height: '150px',
  padding: theme.spacing(0, 1),
  backgroundColor: '#023373',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

function Home() {
  const [page, setPage] = React.useState(0);
  const [sortByPages, setSortByPages] = useState('asc');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortByTitle, setSortByTitle] = useState('asc');
  const dispatch = useDispatch();
  const bookId = useSelector((state) => state?.books?.bookId);
  const navigate = useNavigate();
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const handleAuthorChange = (event) => {
    setSelectedAuthor(event.target.value);
  };
  const authorFilter = [...new Set(bookList.map((book) => book.nameOfAuthor))];
  const startPage = 0;
  const limitPage = 30;

  
  const getBookList = async () => {
    setLoading(true);
    const booksData = await getBooks(selectedAuthor, sortByTitle, startPage, limitPage);
 
    const sortedBooks =
      sortByPages === 'asc'
        ? booksData.records.sort((a, b) => a.numOfPages - b.numOfPages)
        : booksData.records.sort((a, b) => b.numOfPages - a.numOfPages);
    setBookList(sortedBooks);
    setBookList(sortedBooks);
    console.log('Sorted book list:', sortedBooks);

     setLoading(false);
  };

  const deleteBook = async () => {
    setLoading(true);
    const bookData = await deleteBookById(bookId);
    getBookList();
    setOpen(false);
  };

  useEffect(() => {
    getBookList();
  }, [selectedAuthor, sortByTitle, sortByPages]);

  const setSortByTitleFn = () => {
    setSortByTitle(sortByTitle === 'asc' ? 'desc' : 'asc');
  };

  const setSortByPagesFn = () => { 
    setSortByPages(sortByPages === 'asc' ? 'desc' : 'asc');
  };
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const theme = useTheme();

  return (
    <Box
      sx={{ display: 'flex', marginTop: '2rem', alignItems: 'center', justifyContent: 'center' }}>
      <AppBar position="fixed" open={open} sx={{ height: '150px', background: '#0b4994' }}>
        <Box sx={{ marginLeft: '2vw', marginTop: '110px' }}>
          <CircleWithCrossIconStyled
            onClick={() => {
              navigate('EditBookPage');
              dispatch(setMode('add'));
            }}
          />
        </Box>
        <Box
          sx={{
            marginLeft: '70vw',
            marginTop: '-130px',
            position: 'relative',
            left: '-5%'
          }}>
          <FormControl
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white'
                },
                '&:hover fieldset': {
                  borderColor: 'white'
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white'
                }
              },
              '& .MuiInputLabel-root': {
                color: 'white'
              },
              '& .MuiSelect-icon': {
                color: 'white'
              }
            }}>
            <InputLabel id="author-select-label">Author</InputLabel>
            <Select
              labelId="author-select-label"
              id="author-select"
              value={selectedAuthor}
              onChange={handleAuthorChange}
              sx={{ backgroundColor: '#0b4994', color: 'white', width: '10vw' }}>
              <MenuItem value="">All</MenuItem>
              {authorFilter.map((author) => (
                <MenuItem key={author} value={author}>
                  {author}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </AppBar>
      <Main open={open}>
        <DrawerHeader sx={{ backgroundColor: 'white' }} />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ width: '80vw', paddingLeft: '3vw', maxHeight: 600, overflow: 'auto' }}>
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ boxShadow: 'none' }}></TableCell>
                  <TableCell align="left">
                    <Button onClick={setSortByTitleFn} type="button">
                      Title {sortByTitle == 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                    </Button>
                  </TableCell>
                  <TableCell align="left">Author</TableCell>
                  <TableCell align="left">Year</TableCell>
                  <TableCell align="left">
                    <Button onClick={setSortByPagesFn} type="button">
                      Pages{sortByPages == 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                    </Button>
                  </TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      onClick={() => {
                        dispatch(addBookState(row.id));
                        handleDrawerOpen();
                      }}
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="left">
                        <Box
                          component="img"
                          src={row.coverPhoto}
                          alt={row.title}
                          sx={{
                            height: 100,
                            width: 70
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">{row.nameOfAuthor}</TableCell>
                      <TableCell align="left">{row.yearOfBublishing}</TableCell>
                      <TableCell align="left">{row.numOfPages}</TableCell>
                      <TableCell align="left">{row.quantity}</TableCell>
                      <TableCell align="left">
                        <MoreVertIcon />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TablePagination
          component="div"
          count={30}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth
          }
        }}
        variant="persistent"
        anchor="right"
        open={open}>
        <DrawerHeader>
          <Button sx={{ backgroundColor: 'transparent', color: 'white', marginTop: '1vh' }}>
            <EditIcon
              onClick={() => {
                navigate('EditBookPage');
                dispatch(setMode('edit'));
              }}
            />
          </Button>
          <Button
            onClick={deleteBook}
            sx={{ backgroundColor: 'transparent', color: 'white', marginTop: '1vh' }}>
            <DeleteIcon />
          </Button>
        </DrawerHeader>
        <Divider />
        <SelectedBookPage />
      </Drawer>
    </Box>
  );
}

export default Home;
