"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@chakra-ui/react";

export default function Contracts() {
  const [contractFinished, setContractFinished] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleFinishContract = () => {
    setContractFinished(true);
  };

  const handleSubmitReview = () => {
    setReviewSubmitted(true);
  };

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
        <p>
          Name: Jose Silva
          <br />
          Profession: Carpenter
          <br />
          Location: São Paulo, SP, Brazil
          <br />
          Phone: +55 11 98765-4321
          <br />
          Email: jose.carpenter@email.com
        </p>
        <div className={styles.auctionDetails}>
          <div className={styles.auctionInfoColumn}>
            <button className={styles.endAuctionButton}>
              Contact contractor
            </button>
          </div>
          <div className={styles.auctionInfoColumn}>
            {!contractFinished && (
              <button className={styles.openDisputeButton}>
                Open a dispute
              </button>
            )}
            {!contractFinished ? (
              <button
                className={styles.endAuctionButton}
                onClick={handleFinishContract}
              >
                Finish contract
              </button>
            ) : (
              <DialogRoot>
                <DialogTrigger asChild>
                  {!reviewSubmitted ? (
                    <button className={styles.endAuctionButton}>
                      Review contractor
                    </button>
                  ) : (
                    <button className={styles.endAuctionButton} disabled>
                      Review submitted
                    </button>
                  )}
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Review Contractor</DialogTitle>
                    <DialogCloseTrigger />
                  </DialogHeader>
                  <DialogBody>
                    <Textarea placeholder="Review" />
                  </DialogBody>
                  <DialogFooter>
                    <DialogActionTrigger>
                      <p
                        className={styles.endAuctionButton}
                        onClick={handleSubmitReview}
                      >
                        Submit
                      </p>
                    </DialogActionTrigger>
                  </DialogFooter>
                </DialogContent>
              </DialogRoot>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
