const mongoose = require("mongoose");
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://lutheranders:k83khC5QmMp9twf@cluster0.uebgs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const db = mongoose.connection;
mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("MongoDB connection established")
);

db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));
