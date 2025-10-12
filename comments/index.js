import express from "express";
import router from "./routes/comment.js";
import cors from "cors";

const app = express();
const PORT = 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

app.post("/events", (req, res) => {
  console.log("Event Received", req.body.type);
  return res.status(200).json({});
});

app.use("/api/v1/snippet", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
