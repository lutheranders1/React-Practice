import dotenv from "dotenv";
dotenv.config();

export const dbURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://lutheranders:k83khC5QmMp9twf@cluster0.uebgs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
export const port = process.env.PORT || 4000;
export const secret = process.env.SECRET || "secret";
