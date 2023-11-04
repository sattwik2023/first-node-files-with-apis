// const mysql = require('mysql2');
const mysql = require('mysql2/promise');
const express = require('express');
const { createPool } = require('mysql2/promise');
const app = express();
// let con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database:'node-test'
// });
// con.connect(() => {
//     con.query("Select * FROM users", function (err, result, fields) {
//         if (err) {
//             console.log(err);
//             return;
//         };
//         console.log(result);
//     });
// });

// const fetchData = async () => {
//     const con = await mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "",
//         database:"node-test"
//     })
//     try {
//         const [rows, fields] = await con.query('SELECT * FROM users');
//         console.log('Query result:', rows);
//     } catch (err) {
//         console.error('Error executing the query: ' + err);
//     } finally {
//         con.end();
//     }
// }
// fetchData();



// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database:"node-test"
// })

// const featchData = async () => {
//     try {
//         const connection = await pool.getConnection();
//         const [rows, fields] = await connection.execute("select * from users");
//         console.warn(rows);
//     } catch (error) {
//         console.log("Sql connection error ", error);
//     }

// }
// featchData();

//------------------------insert Data in mysql------------------------
// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "node-test"
// });
// con.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database: ' + err.stack);
//         return;
//     }
//     // const data = [
//     //     {
//     //         Name: "demo 1",
//     //         Email: "demo1@gmail.com",
//     //         Password: "demo1@123"
//     //     }
//     // ];
//     // con.query("insert into users set ?", data, (err, result, fields) => {
//     //     if (err) {
//     //         console.error("sql error on inserting data ", err);
//     //     } else {
//     //         console.warn(result);
//     //     }
//     //     con.end();
//     // });

//     //insert multipe record
//     const data = [
//         {
//             Name: "demo 2",
//             Email: "demo2@gmail.com",
//             Password: "demo2@123"
//         },
//         {
//             Name: "demo 3",
//             Email: "demo3@gmail.com",
//             Password: "demo3@123"
//         }
//     ];
//     con.query("insert into users (Name,Email,Password) values ?",[data.map(Object.values)], (err, result, fields) => {
//         if (err) {
//             console.error("error on insert data ", err);
//         } else {
//             console.log(result);
//         }
//         con.end();
//     })
// });

//another way
// async function insertData(){
//     const con = await mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "",
//         database: "node-test"
//     });
//     await con.connect();
//     // const data = {
//     //     Name: "demo 1",
//     //     Email: "demo1@gmail.com",
//     //     Password: "demo1@123"
//     // }
//     // const result = await con.query('insert into users set ?', data);
//     //     console.log(result);

//     //multiple recode insert
//     try {
//         await con.connect();
//         const data = [
//             {
//                 Name: "demo 4",
//                 Email: "demo4@gmail.com",
//                 Password: "demo1@123"
//             },
//             {
//                 Name: "demo 5",
//                 Email: "demo5@gmail.com",
//                 Password: "demo1@123"
//             }
//         ];
//         const query = 'INSERT INTO users (Name, Email, Password) VALUES ?';
//         const [result] = await con.query(query, [data.map(Object.values)]);
//         console.log(result);
//     } catch (err) {
//         console.error('Error:', err);
//     } finally {
//         con.end();
//     }
// }
// insertData();

// another way
// const pool = createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "node-test"
// });

// const insertData = async () => {
//     const con = await pool.getConnection();
//     // const data = {
//     //         Name: "demo 1",
//     //         Email: "demo1@gmail.com",
//     //         Password: "demo1@123"
//     //     }
//     // const [result] = await con.query("INSERT INTO users SET ?", [data]);
//     // console.warn(result);
//     // con.release();

//     //insert multiple record
//     const data = [
//         {
//             Name: "demo 1",
//             Email: "demo1@gmail.com",
//             Password: "demo1@123"
//         },
//         {
//             Name: "demo 2",
//             Email: "demo2@gmail.com",
//             Password: "demo2@123"
//         },
//         {
//             Name: "demo 3",
//             Email: "demo3@gmail.com",
//             Password: "demo3@123"
//         },
//         {
//             Name: "demo 4",
//             Email: "demo4@gmail.com",
//             Password: "demo4@123"
//         }
//     ];

//     const [result] = await con.query("INSERT INTO users (Name,Email,Password) values ?", [data.map(Object.values)]);
//     console.warn(result);
//     con.release();


// }
// insertData();

//------------------------------------Update------------------------------------
// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "node-test"
// });

// con.connect((err) => {
//     if (err) {
//         console.log("error on connection", err);
//         return;
//     }
//     // const updateData = {
//     //     Password:"demo4@123"
//     // }
//     // con.query("update users set ? where id=?", [updateData, 9], (err, result, fields) => {
//     //     if (err) {
//     //         console.log("error on updateing sql",err);
//     //         return;
//     //     }
//     //     console.log(result);
//     // })

//     //mulple record update
//     // const updateData = [
//     //     { id: 10, Email: "demo5@gmail.com", Password: "demo5@123" },
//     //     { id: 12, Name: "demo 6", Email: "demo6@gmail.com", Password: "demo6@123" },
//     // ];
//     // updateData.map((items) => {
//     //     const { id, Name, Email, Password } = items;
//     //     con.query("update users set Name=?,Email=?,Password=? where id=?", [Name,Email,Password,id], (err, result, fields) => {
//     //         if (err) {
//     //             console.log("error on updateing sql", err);
//     //             return;
//     //         }
//     //         console.log(result);
//     //     })
//     // })

// })

//another way
// const pool = createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: 'node-test'
// });

// (async() => {
//     const con = await pool.getConnection();
//     const updateData = {
//         Name:"demo 5"
//     }
//     const [result] = await con.query("update users set ? where id =?", [updateData, 10])
//     console.log(result);
// })();

//multipe record update
// (async () => {
//     const con = await pool.getConnection();
//     const updateData = [
//         { id: 1, Name: "Demo 1", Email: "demo1@gmail.com", password: "demo1@123" },
//         { id: 2, Name: "Demo 2", Email: "demo2@gmail.com", password: "demo2@123" },
//         { id: 3, Name: "Demo 3", Email: "demo3@gmail.com", password: "demo3@123" },
//         { id: 4, Name: "Demo 4", Email: "demo4@gmail.com", password: "demo4@123" },
//         { id: 5, Name: "Demo 5", Email: "demo5@gmail.com", password: "demo5@123" },
//         { id: 6, Name: "Demo 6", Email: "demo6@gmail.com", password: "demo6@123" },
//     ];
//     const result  = await updateData.map(async (items) => {
//         const { id, Name, Email, password } = items;
//         const result = await con.query("update users set Name=?,Email=?,Password=? where id =?", [Name, Email, password, id])
//         console.log(result);

//     })
// })();

//delete mysql

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: 'node-test'
// });
// con.connect((err) => {
//     if (err) {
//         console.log("Connection error", err);
//         return;
//     }
//     // con.query("delete from users where id=?", [6], (err, result, fields) => {
//     //     if (err) {
//     //         console.log("error on deleting mysql data",err);
//     //         return;
//     //     }
//     //     console.log(result);
//     // })

//     const deletedData = [43,234,1,2,4,5,7,0];
//     deletedData.map((item) => {
//         con.query("delete from users where id=?", [item], (err, result, fields) => {
//             if (err) {
//                 console.log("error on deleting mysql data", err);
//                 return;
//             }
//             console.log(result);
//         })
//     })

// })
