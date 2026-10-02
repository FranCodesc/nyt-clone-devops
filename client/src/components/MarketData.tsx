import { useState, useEffect } from "react";
import { fetchMarket, type MarketQuote } from "../services/finnhubApi";

const symbols = ["AAPL", "MSFT", "GOOGL"];

export function MarketData() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [market, setMarket] = useState<MarketQuote | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchMarket(symbols[currentIndex])
      .then((data) => {
        if (!cancelled) {
          setMarket(data);
          setError(false);
        }
      })
      .catch((err) => {
        // Errore gestito: niente "unhandled rejection".
        // Caso tipico: server su Render in cold start.
        // Al prossimo giro (5 secondi) il widget riprova da solo.
        if (!cancelled) setError(true);
        console.warn("Quotazioni non disponibili:", err.message);
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

  // Nessun dato ancora arrivato e richiesta fallita: messaggio discreto
  if (!market && error) {
    return <span className="text-gray-400">Quotazioni non disponibili</span>;
  }

  // Primo caricamento in corso: niente da mostrare
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