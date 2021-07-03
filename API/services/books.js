const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(idBookshelf, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT idBook, title, author, pages, Bookshelf_idBookshelf, toRead, stars, photo 
    FROM Book WHERE Bookshelf_idBookshelf = ? LIMIT ?,?`,
    [idBookshelf, offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function create(book) {
  const result = await db.query(
    `INSERT INTO Book
    (title, author, pages, Bookshelf_idBookshelf, toRead, stars, photo) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?)`,
    [
      book.title, book.author,
      book.pages, book.Bookshelf_idBookshelf,
      book.toRead, book.stars, book.photo
    ]
  );

  let message = 'Error in creating books';

  if (result.affectedRows) {
    message = 'Book created successfully';
  }

  return { message };
}

async function update(id, book) {
  if (book.stars == "") {
    const result = await db.query(
      `UPDATE Book 
    SET toRead=?
    WHERE idBook=?`,
      [
        book.toRead, book.stars, id
      ]
    );
  } else {
    const result = await db.query(
      `UPDATE Book 
    SET stars=?
    WHERE idBook=?`,
      [
        book.stars, id
      ]
    );
  }

  let message = 'Error in updating book';

  if (result.affectedRows) {
    message = 'Book updated successfully';
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM Book WHERE idBook=?`,
    [id]
  );

  let message = 'Error in deleting book';

  if (result.affectedRows) {
    message = 'Book deleted successfully';
  }

  return { message };
}


module.exports = {
  getMultiple,
  create,
  update,
  remove
}
