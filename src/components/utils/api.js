/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const getUsers = async (sortByTitle, sortByAuthor) => {
  const apiUrl = `https://book-store.mvsoft.co.rs/books?sortByTitle=${sortByTitle}&sortByAuthor=${sortByAuthor}`;
  const response = await axios.get(apiUrl);
  //   console.log(response); // Dodajmo ovde
  return response.data.records;
};

export default getUsers;
