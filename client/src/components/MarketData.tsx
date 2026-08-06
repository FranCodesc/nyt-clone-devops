import { useState, useEffect } from "react";
import { fetchMarket } from "../services/finnhubApi";

export function MarketData() {
  const symbols = ["AAPL", "MSFT", "GOOGL"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [market, setMarket] = useState<any>(null);

  useEffect(() => {
    setMarket(null);
    fetchMarket(symbols[currentIndex]).then((data) => setMarket(data));
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % symbols.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!market) return <span>{""}</span>;

  const change = (((market.c - market.pc) / market.pc) * 100).toFixed(2);
  const isPositive = market.c >= market.pc;

  return (
    <div className="flex gap-2">
      <p>{symbols[currentIndex]}</p>
      <span className={isPositive ? "text-green-600" : "text-red-600"}>
        {isPositive ? "+" : ""}
        {change}%
      </span>
    </div>
  );
}
