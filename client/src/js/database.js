import { openDB } from 'idb';

const initdb = async () =>
//creating datbase names jate and version we want
  openDB('jate', 1, {
    //add database schema if it has not already been initialized
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      //create new object store for the data and give it a key name of id which needs to increment automatically
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to database');
  //connect to datbase
  const todosDb = await openDB('todos', 1);
  //create new transaction
  const tx = todosDb.transaction('todos', 'readwrite');
  //open up the desired store object
  const store = tx.objectStore('todos');
  //use put method to update specific id
  const request = store.put({ id: id, todo: content });
  //get confirmation of request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () =>{
  console.log('GET from database');
  //create connection to the databse and version we want to use
  const jateDb= await openDB('jate',1);
  //create a new transaction and specify the database and data privleges.
  const tx=jateDb.transaction('jate','readonly');
  //open up the desired object store
  const store= tx.objectStore('jate');
  //use .getAll() method to get all data in the database.
  const request= store.getAll();
  //get confirmation of request 
  const result= await request;
  console.log('result.value',result)
  return result;
}
initdb();
