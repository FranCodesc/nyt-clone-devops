import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

router.get("/:symbol", async (req: Request, res: Response) => {
  const { symbol } = req.params;
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch market data" });
  }
});

export default router;