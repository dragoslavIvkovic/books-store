import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import { delateBookById, getUsers } from '../components/utils/api';
import { addBookState, setMode } from '../state/booksReducer';
import SelectedBookPage from './SelectedBookPage';
import { Button, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';



const drawerWidth = 600;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    height: '150px',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  height: '150px',
  padding: theme.spacing(0, 1),
  backgroundColor: 'darkblue',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

function Home() {
  const [page, setPage] = React.useState(0);
  const [sortByPages, setSortByPages] = useState('asc');

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortByTitle, setSortByTitle] = useState('asc');
  const dispatch = useDispatch();
  const bookId = useSelector((state) => state?.books?.bookId);
  const navigate = useNavigate();
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const handleAuthorChange = (event) => {
    setSelectedAuthor(event.target.value);
  };
  const authorFilter = [...new Set(userList.map((user) => user.nameOfAuthor))];
  
 const getUserList = async () => {
   setLoading(true);
   const usersData = await getUsers(selectedAuthor, sortByTitle);
   const sortedUsers =
     sortByPages === 'asc'
       ? usersData.sort((a, b) => a.numOfPages - b.numOfPages)
       : usersData.sort((a, b) => b.numOfPages - a.numOfPages);
   setUserList(sortedUsers);
   console.log(`⬇️ sortedUsers ⬇️`, sortedUsers, usersData, usersData);
   setLoading(false);
 };

  const delateBook = async () => {
   setLoading(true);
   const bookData = await delateBookById(bookId);
    getUserList();
    setOpen(false);
  };

  useEffect(() => {
    getUserList();
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
    <Box sx={{ display: 'flex', marginTop: '2rem' }}>
      <AppBar position="fixed" open={open} sx={{ height: '150px' }}>
        <Box sx={{ right: '300px' }}>
          <AddCircleIcon
            onClick={() => {
              navigate('EditBookPage');
              dispatch(setMode('add'));
            }}
          />
        </Box>
      </AppBar>
      <Main open={open}>
        <DrawerHeader sx={{ backgroundColor: 'white' }} />
        <FormControl>
          <InputLabel id="author-select-label">Author</InputLabel>
          <Select
            labelId="author-select-label"
            id="author-select"
            value={selectedAuthor}
            onChange={handleAuthorChange}>
            <MenuItem value="">All</MenuItem>
            {authorFilter.map((author) => (
              <MenuItem key={author} value={author}>
                {author}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right" />
                  <TableCell align="right">
                    {' '}
                    <Button onClick={setSortByTitleFn} type="button">
                      SORT BY Title{' '}
                    </Button>
                  </TableCell>
                  <TableCell align="right">Author</TableCell>
                  <TableCell align="right">Year</TableCell>
                  <TableCell align="right">
                    {' '}
                    <Button onClick={setSortByPagesFn} type="button">
                      SORT BY Pages
                    </Button>
                  </TableCell>
                  <TableCell align="right">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index)=> (
                  <TableRow
                    onClick={() => {
                      dispatch(addBookState(row.id));
                      handleDrawerOpen();
                    }}
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">
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
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.nameOfAuthor}</TableCell>
                    <TableCell align="right">{row.yearOfBublishing}</TableCell>
                    <TableCell align="right">{row.numOfPages}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">
                      <MoreVertIcon />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={10}
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
          <Button sx={{ backgroundColor: 'transparent', color: 'white' }}>
            <EditIcon
              onClick={() => {
                navigate('EditBookPage');
                dispatch(setMode('edit'));
              }}
            />
          </Button>
          <Button onClick={delateBook} sx={{ backgroundColor: 'transparent', color: 'white' }}>
            <DeleteIcon />
          </Button>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <SelectedBookPage />
      </Drawer>
    </Box>
  );
}

export default Home;
