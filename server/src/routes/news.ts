import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

router.get("/:section", async (req: Request, res: Response) => {
  const { section } = req.params;
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${process.env.NYT_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch news" });
  }
});

export default router;