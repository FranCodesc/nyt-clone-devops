import { useState, useEffect } from "react";
import { fetchMarket, type MarketQuote } from "../services/finnhubApi";

const symbols = ["AAPL", "MSFT", "GOOGL"];

export function MarketData() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [market, setMarket] = useState<MarketQuote | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchMarket(symbols[currentIndex]).then((data) => {
      if (!cancelled) setMarket(data);
    });
    return () => {
      cancelled = true;
    };
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