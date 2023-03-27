/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import { getBookById } from '../components/utils/api';

function SelectedBookPage() {
  const bookId = useSelector((state) => state?.books?.bookId);
  const [bookById, setBookById] = useState(null);
  const [loading, setLoading] = useState(false);

  const getBookByIdData = async () => {
    setLoading(true);
    const bookData = await getBookById(bookId);
    setBookById(bookData);
    setLoading(false);
  };

  useEffect(() => {
    getBookByIdData();
  }, [bookId]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
      }}>
      <Box>
        <Typography
          variant="h6"
          item
          xs={9}
          sx={{ marginTop: '-40px', color: 'white', marginLeft: '20px' }}>
          {bookById?.title}
        </Typography>

        <Typography
          variant="h6"
          item
          xs={3}
          sx={{ marginTop: '-60px', color: 'white',  marginLeft: '20px' }}>
          Author:
        </Typography>
      </Box>
      <Box
        component="img"
        src={bookById?.coverPhoto}
        alt={bookById?.title}
        sx={{
          margin: '0 auto',
          maxWidth: '100%',
          width: '100%',
          height: '40vh',
          overflow: 'hidden'
        }}
      />
      <p>info</p>

      <Grid container spacing={5} sx={{ paddingLeft: '20px' }}>
        <Grid item xs={3}>
          Title:
        </Grid>
        <Grid item xs={9}>
          {bookById?.title}
        </Grid>

        <Grid item xs={3}>
          Author:
        </Grid>
        <Grid item xs={9}>
          {bookById?.nameOfAuthor}
        </Grid>

        <Grid item xs={3}>
          Year:
        </Grid>
        <Grid item xs={9}>
          {bookById?.yearOfPublishing}
        </Grid>

        <Grid item xs={3}>
          Pages:{' '}
        </Grid>
        <Grid item xs={9}>
          {bookById?.numberOfPages}
        </Grid>

        <Grid item xs={3}>
          Quantity:{' '}
        </Grid>
        <Grid item xs={9}>
          {bookById?.quantity}
        </Grid>
      </Grid>
    </Box>
  );
}

export default SelectedBookPage;
