import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import getUsers from '../components/utils/api';

function Home() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortByAuthor, setSortByAuthor] = useState('asc');
  const [sortByTitle, setSortByTitle] = useState('asc');

  const getUserList = async () => {
    setLoading(true);
    const usersData = await getUsers(sortByTitle, sortByAuthor);
    console.log('⬇️ userData ⬇️', usersData);
    setUserList(usersData);
    setLoading(false);
  };

  useEffect(
    () => {
      getUserList();
    },
    [
      sortByAuthor,
      sortByTitle],
  );

  const sortByAuthorFn = () => {
    setSortByAuthor(sortByAuthor === 'asc' ? 'desc' : 'asc');
  };

  const setSortByTitleFn = () => {
    setSortByTitle(sortByTitle === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div>
      <button onClick={sortByAuthorFn} type="button">
        sortByAuthorFn
      </button>
      <button onClick={setSortByTitleFn} type="button">
        setSortByTitleFn
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TableContainer component={Paper} sx={{ width: '500px' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right" />
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Year</TableCell>
                <TableCell align="right">Pages</TableCell>
                <TableCell align="right">Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((row) => (
                <TableRow
                  key={row.title}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">
                    <Box
                      component="img"
                      src={row.coverPhoto}
                      alt={row.title}
                      sx={{
                        height: 100,
                        width: 70,
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
    </div>
  );
}

export default Home;
