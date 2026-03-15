import { ArrowLeft, Copy, QrCode } from "lucide-react";
// @ts-ignore

import styles from "./styles/Quizzes.module.css";
export const ShareQuiz = () => {
  return (
    <div className={styles.shareQuizBody}>
      <div className={styles.shareQuizHeading}>
        <ArrowLeft className={styles.backIcon} size={18} />
        <div className={styles.headingText}>
          <h3>Share Quiz</h3>
          <p>Share this quiz with students, colleagues, or on social media</p>
        </div>
      </div>
      <div className={styles.link}>
        <p>Share Link</p>
        <div className={styles.inputCard}>
          <input
            className={styles.inputBox}
            type="text"
            value="https://quizmaster.com/quizzes/q1"
            readOnly
          />
          <Copy size={18} className={styles.copyIcon} />
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
      <button className={styles.btn}>
        <Copy />
        <p>Copy Link</p>
      </button>
    </div>
  );
};

export default ShareQuiz;
