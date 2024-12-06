"use client";

import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = React.useState(
    6 * 60 * 60 + 46 * 60
  );

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  async function handleEndAuction() {
    console.log("Ending auction");
    if (window.ethereum) {
      console.log("MetaMask is installed!");
      try {
        window.ethereum.request({
          method: "eth_requestAccounts",
        });
        router.push("/contracts");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("MetaMask is not installed.");
      alert(
        "MetaMask is not installed. Please install it to use this application."
      );
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Your Auctions</h1>
      <div className={styles.auctionPanel}>
        <h2 className={styles.auctionTitle}>
          Looking for a Carpenter to Repair Furniture
        </h2>
        <p className={styles.auctionDescription}>
          The table has broken legs that need to be reattached or replaced, and
          the chairs have loose joints that require tightening or re-gluing. The
          furniture is antique, so the work needs to be done carefully to
          maintain its original condition and aesthetic.
        </p>
        <div className={styles.auctionDetails}>
          <div className={styles.auctionImageColumn}>
            <p className={styles.auctionImageText}>
              Rua: Rua das Acacias Bairro: Trindade, 1420 Florianópolis-SC -
              88000-400
            </p>
            <Image
              src="/furniture.png"
              alt="Furniture.PNG"
              className={styles.auctionImage}
              width={100}
              height={100}
            />
          </div>
          <div className={styles.auctionInfoColumn}>
            <p className={styles.auctionOwner}>Current Owner: José</p>
            <p className={styles.auctionBid}>Current bid: R$60,00</p>
            <div className={styles.auctionTimerContainer}>
              <p className={styles.auctionTimer}>Remaining time:</p>
              <span className={styles.clock}>
                🕒 {formatTime(timeRemaining)}
              </span>
            </div>
            <button
              className={styles.endAuctionButton}
              onClick={handleEndAuction}
            >
              End Auction
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
