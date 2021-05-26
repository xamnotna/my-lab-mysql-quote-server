const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT id, quote, author FROM quote LIMIT ?,?', 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

// Retrieve quote with id 

async function getID(id)
{
  
  //const offset = helper.getOffset(id, config.listPerPage);
  const rows = await db.query(
    'SELECT id, quote, author FROM quote where id = ?', 
    [id]
    
  );
  const data = helper.emptyOrRows(rows);
  const meta = {id};

  return {
    data,
    meta
  }
}

async function getUpdate(quote, id){
  validateCreate(quote);
  //getID(id)
  console.log(quote)
  console.log(id)
  const result = await db.query(
    'UPDATE quote SET quote = ?, author = ? WHERE id = ? ', 
    [quote.quote, quote.author, id]
  );

  let message = 'Error in updating quote';

  if (result.affectedRows) {
    message = 'Quote updated successfully';
  }

  return {message};
}


async function getRemove(id){
  const result = await db.query(
    'DELETE FROM quote WHERE id = ? ', 
    [id]
  );

  let message = 'Error in deleting quote';

  if (result.affectedRows) {
    message = 'Quote deleted successfully';
  }

  return {message};
}


function validateCreate(quote) {
  let messages = [];

  console.log(quote);

  if (!quote) {
    messages.push('No object is provided');
  }

  if (!quote.quote) {
    messages.push('Quote is empty');
  }

  if (!quote.author) {
    messages.push('Quote is empty');
  }

  if (quote.quote && quote.quote.length > 255) {
    messages.push('Quote cannot be longer than 255 characters');
  }

  if (quote.author && quote.author.length > 255) {
    messages.push('Author name cannot be longer than 255 characters');
  }

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

async function create(quote){
  validateCreate(quote);

  const result = await db.query(
    'INSERT INTO quote (quote, author) VALUES (?, ?)', 
    [quote.quote, quote.author]
  );

  let message = 'Error in creating quote';

  if (result.affectedRows) {
    message = 'Quote created successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  getID,
  getUpdate,
  getRemove,
  create
}

