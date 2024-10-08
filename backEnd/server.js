import express from "express";
import mongoose from "mongoose";
import { Contacts } from "./models/ContactSchema.js";
import bodyParser from "express";
import { config } from "dotenv";
import cors from "cors";
const app = express();
config({ path: ".env" });
// utilities
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
//connecting to MONGODB
mongoose
  .connect(process.env.mongoString, { dbName: "contacts" })
  .then((res) => {
    console.log("Mongo db is connected...");
  })
  .catch((error) => console.log(error.message));
//APIS
//Add contact
app.post("/api/addcontact", async (req, res) => {
  const { name, email, phone } = req.body;
  const unique = await Contacts.findOne({ email });
  if (unique)
    return res.status(500).json({ message: "User Already exists..." });
  const contactAdd = await Contacts.create({
    name,
    email,
    phone,
  });
  res.status(200).json({ message: "Contact saved...", contactAdd });
});

//Get All contacts
app.get("/api/getcontact", async (req, res) => {
  const contactGet = await Contacts.find().sort({ createdAt: -1 });
  res.status(200).json({ message: "All Contacts in DB", contactGet });
});

//Delete Contact
app.delete("/api/deletecontact/:id", async (req, res) => {
  const id = req.params.id;
  const deleteContact = await Contacts.findByIdAndDelete(id);
  res.status(200).json({ message: "Deleted Successfuly...", deleteContact });
});
///Update by id
app.put("/api/updatecontact/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;
  const update = await Contacts.findByIdAndUpdate(
    id,
    { name, email, phone },
    { new: true }
  );
  if (!update) return res.status(404).json({ message: "No such record..." });
  res.status(200).json({ message: "updated successfully....", update });
});

const port = 2000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
