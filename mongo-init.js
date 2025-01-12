db = db.getSiblingDB('admin');
db.auth(process.env.MONGO_INITDB_ROOT_USERNAME, process.env.MONGO_INITDB_ROOT_PASSWORD);

// Create users_ms_db
db = db.getSiblingDB(process.env.USERS_DB_NAME);
db.createUser({
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD,
  roles: ["readWrite", "dbAdmin"]
});

// Create blogs_ms_db
db = db.getSiblingDB(process.env.BLOGS_DB_NAME);
db.createUser({
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD,
  roles: ["readWrite", "dbAdmin"]
}); 