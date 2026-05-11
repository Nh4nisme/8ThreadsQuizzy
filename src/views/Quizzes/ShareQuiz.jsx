"use client";

import { ArrowLeft, Copy, QrCode } from "lucide-react";
import styles from "./styles/Quizzes.module.css";
import { useState } from "react";

export const ShareQuiz = ({ quiz, onBack }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/QuizzForStudent?quizId=${quiz?._id || quiz?.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.shareQuizBody}>
      <div className={styles.shareQuizHeading}>
        <button type="button" onClick={onBack} className={styles.backBtn}>
          <ArrowLeft className={styles.backIcon} size={18} />
        </button>
        <div className={styles.headingText}>
          <h3>Share Quiz: {quiz?.title}</h3>
          <p>Share this quiz with students, colleagues, or on social media</p>
        </div>
      </div>
      <div className={styles.link}>
        <p>Share Link</p>
        <div className={styles.inputCard}>
          <input
            className={styles.inputBox}
            type="text"
            value={shareUrl}
            readOnly
          />
          <button type="button" onClick={handleCopy} className="p-2 hover:bg-white/5 rounded-lg transition">
            <Copy size={18} className={styles.copyIcon} />
          </button>
        </div>
      </div>
      <div className={styles.qrCode}>
        <p>QR Code</p>
        <div className={styles.qrPic}>
          <QrCode color="black" className={styles.iconQr} />
        </div>
        <p className={styles.download}>Download QR Code</p>
      </div>
      <div className={styles.trackShares}>
        <div>
          <h4>Track Shares</h4>
          <p>Get notified when someone accesses this link</p>
        </div>
        <label className={styles.switch}>
          <input type="checkbox" name="" id="" />
          <span className={styles.slider}></span>
        </label>
      </div>
      <button type="button" onClick={handleCopy} className={styles.btn}>
        <Copy size={18} />
        <p>{copied ? "Copied!" : "Copy Link"}</p>
      </button>
    </div>
  );
};

export default ShareQuiz;
