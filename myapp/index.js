const express = require("express");
const app = express();
/*
const importingSqliteModuleObject = require("sqlite");
console.log(importingSqliteModuleObject);
output for importingSqliteModuleObject:
{
  open: [AsyncFunction: open],
  Statement: [Getter],
  Database: [Getter]
}
*/

const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");
/*
console.log(sqlite3);
{
  Database: [Function: Database],
  Statement: [Function: Statement],
  Backup: [Function: Backup],
  OPEN_READONLY: 1,
  OPEN_READWRITE: 2,
  OPEN_CREATE: 4,
  OPEN_FULLMUTEX: 65536,
  OPEN_URI: 64,
  OPEN_SHAREDCACHE: 131072,
  OPEN_PRIVATECACHE: 262144,
  VERSION: '3.41.1',
  SOURCE_ID: '2023-03-10 12:13:52 20399f3eda5ec249d147ba9e48da6e87f969d7966a9a896764ca437ff7e737ff',
  VERSION_NUMBER: 3041001,
  OK: 0,
  ERROR: 1,
  INTERNAL: 2,
  PERM: 3,
  ABORT: 4,
  BUSY: 5,
  LOCKED: 6,
  NOMEM: 7,
  READONLY: 8,
  INTERRUPT: 9,
  IOERR: 10,
  CORRUPT: 11,
  NOTFOUND: 12,
  FULL: 13,
  CANTOPEN: 14,
  PROTOCOL: 15,
  EMPTY: 16,
  SCHEMA: 17,
  TOOBIG: 18,
  CONSTRAINT: 19,
  MISMATCH: 20,
  MISUSE: 21,
  NOLFS: 22,
  AUTH: 23,
  FORMAT: 24,
  RANGE: 25,
  NOTADB: 26,
  LIMIT_LENGTH: 0,
  LIMIT_SQL_LENGTH: 1,
  LIMIT_COLUMN: 2,
  LIMIT_EXPR_DEPTH: 3,
  LIMIT_COMPOUND_SELECT: 4,
  LIMIT_VDBE_OP: 5,
  LIMIT_FUNCTION_ARG: 6,
  LIMIT_ATTACHED: 7,
  LIMIT_LIKE_PATTERN_LENGTH: 8,
  LIMIT_VARIABLE_NUMBER: 9,
  LIMIT_TRIGGER_DEPTH: 10,
  LIMIT_WORKER_THREADS: 11,
  cached: { Database: [Function: Database], objects: {} },
  verbose: [Function (anonymous)]
}
*/
/*
console.log(path);
output for path is below:

<ref *2> {
  resolve: [Function: resolve],
  normalize: [Function: normalize],
  isAbsolute: [Function: isAbsolute],
  join: [Function: join],
  relative: [Function: relative],
  toNamespacedPath: [Function: toNamespacedPath],
  dirname: [Function: dirname],
  basename: [Function: basename],
  extname: [Function: extname],
  format: [Function: bound _format],
  parse: [Function: parse],
  sep: '/',
  delimiter: ':',
  win32: <ref *1> {
    resolve: [Function: resolve],
    normalize: [Function: normalize],
    isAbsolute: [Function: isAbsolute],
    join: [Function: join],
    relative: [Function: relative],
    toNamespacedPath: [Function: toNamespacedPath],
    dirname: [Function: dirname],
    basename: [Function: basename],
    extname: [Function: extname],
    format: [Function: bound _format],
    parse: [Function: parse],
    sep: '\\',
    delimiter: ';',
    win32: [Circular *1],
    posix: [Circular *2],
    _makeLong: [Function: toNamespacedPath]
  },
  posix: [Circular *2],
  _makeLong: [Function: toNamespacedPath]
}
*/

//console.log(open);//output:[AsyncFunction: open]
const dbPath = path.join(__dirname, "goodreads.db");
//console.log(dbPath);//output:/home/workspace/nodejs/sessions/Introduction-to-Express-JS-Part-2/myapp/goodreads.db
let dbConnectionObject = null;
const initializeDBAndServer = async () => {
  try {
    dbConnectionObject = await open({
      filename: dbPath,
      driver: sqlite3.Database, //Database: [Function: Database]
    });
    /*
    console.log(dbConnectionObject);
    output for dbConnectionObject is below:
    Database {
        config: {
            filename: '/home/workspace/nodejs/sessions/Introduction-to-Express-JS-Part-2/myapp/goodreads.db',
            driver: [Function: Database]
        },
        db: Database {}
    }

    explanation for dbConnectionObject output:
    the dbConnectionObject contains two important pieces of information:
    The configuration object (config) used to create the connection, which includes the database file path (filename) and the database driver (driver).
    The connected database (db) instance that allows you to execute queries and perform various operations on the SQLite database.
    */

    app.listen(3000, () => {
      console.log("server is running at port 3000");
    });
  } catch (error) {
    console.log(`ERROR:${error.message}`);
  }
};
initializeDBAndServer();
/*
    explanation about  "driver: sqlite3.Database":
     a "driver" refers to a software component or library that
    facilitates the communication between the application (Node.js in this case)
    and the actual database management system (SQLite). It acts as an interface or
    bridge that allows the application to send queries and receive results from the database.
    In this specific case, the driver option is set to sqlite3.Database, which is a constructor
    function from the "sqlite3" module. The "sqlite3" module is a popular Node.js module used to
    interact with SQLite databases.
    By specifying sqlite3.Database as the driver, the open function knows that it should use the
    "sqlite3" module's database driver to create a connection to the SQLite database specified in
    the filename option (which is dbPath in this code).
    */

//console.log(__dirname);///home/workspace/nodejs/sessions/Introduction-to-Express-JS-Part-2/myapp

/*
IF WE DID NOT USE ASYNC FUNCTION THEN RETURNS EMPTY OBJECT.

app.get("/books/", (requestObject, responseObject) => {
  const getBooksQuery = "SELECT * FROM book ORDER BY book_id;";
  const bookArray = dbConnectionObject.all(getBooksQuery); //returns promise object
  console.log(bookArray);//OUTPUT: Promise { <pending> }
  responseObject.send(bookArray);
});
*/

//IF WE  USE ASYNC FUNCTION THEN RETURNS EMPTY OBJECT:
app.get("/books/", async (requestObject, responseObject) => {
  const getBooksQuery = "SELECT * FROM book ORDER BY book_id;";
  const bookArray = await dbConnectionObject.all(getBooksQuery); //returns promise object
  //console.log(bookArray);
  responseObject.send(bookArray); //returns array of objects.
});
