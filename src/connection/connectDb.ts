import mysql from "mysql";

const connectDatabase = () => {
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sucker@123",
    database: "test",
  });
  con.connect(function (err) {
    if (err) throw err;
    console.log("connected");
  });

  return con;
};

export { connectDatabase };
