const mongoose = require("mongoose");

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://lutheranders:k83khC5QmMp9twf@cluster0.uebgs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log("DB connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
