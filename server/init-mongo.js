db.createUser(
  {
      user: "admin",
      pwd: "admin",
      roles: [
          {
              role: "readWrite",
              db: "my_db"
          }
      ]
  }
);
db.createCollection("test");