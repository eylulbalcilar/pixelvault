import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nftRoutes from "./src/routes/nft.routes.js";

dotenv.config();

const app = express();

// REVIEW: cors() with no options allows ALL origins. Should restrict to your frontend domain
// e.g. app.use(cors({ origin: 'https://your-frontend.vercel.app' }))
app.use(cors());
app.use(express.json());

app.use("/api/nfts", nftRoutes);

// REVIEW: The server starts listening even if MongoDB fails to connect. The .catch only logs
// the error but doesn't prevent the app from running in a broken state. Consider awaiting the
// connection or exiting the process on failure.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB error ❌", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
