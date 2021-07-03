const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(req, page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT Reminder.date, Book.title, Reminder.Book_idBook, Bookshelf.name, Reminder.idReminder 
    FROM Reminder INNER JOIN Book ON Reminder.Book_idBook = Book.idBook INNER JOIN Bookshelf ON 
    Book.Bookshelf_idBookshelf=Bookshelf.idBookshelf WHERE Reminder.completed=0 AND Reminder.User_idUser= ? ORDER BY Reminder.date LIMIT ?,?`, 
    [req.userId, offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(userId, reminder){
  const result = await db.query(
    `INSERT INTO Reminder
    (date, completed, User_idUser, Book_idBook) 
    VALUES 
    (FROM_UNIXTIME(?), ?, ?, ?)`, 
    [
      reminder.date, reminder.completed,
      userId, reminder.Book_idBook
    ]
  );

  let message = 'Error in creating reminders';

  if (result.affectedRows) {
    message = 'Reminder created successfully';
  }

  return {message};
}

async function update(id, reminder){
  const result = await db.query(
    `UPDATE Reminder 
    SET completed=?
    WHERE idReminder=?`,
    [
      reminder.completed, id
    ]
  );
  const result2 = await db.query(
    `UPDATE Book 
    SET toRead=1
    WHERE idBook=?`,
    [
      reminder.Book_idBook
    ]
  );

  let message = 'Error in updating reminder';

  if (result.affectedRows) {
    message = 'Reminder updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM Reminder WHERE idReminder=?`, 
    [id]
  );

  let message = 'Error in deleting reminder';

  if (result.affectedRows) {
    message = 'Reminder deleted successfully';
  }

  return {message};
}


module.exports = {
  getMultiple,
  create,
  update,
  remove
}
