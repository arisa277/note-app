import express, { Request, Response, NextFunction } from "express"
import { onDatabaseConnect } from "./src/config/knex"
import noteRoutes from "./src/routes/note"
const cors = require("cors")

const app = express();

app.use(cors())
app.use(express.json());
app.use("/note", noteRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message })
})

onDatabaseConnect()
  .then(() => {
    console.log("Database is connected");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((e) => console.error("Database connection failed", e));