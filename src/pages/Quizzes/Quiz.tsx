import { ArrowLeft, Flag, Timer } from "lucide-react";
// @ts-ignore

import styles from "./styles/Quizzes.module.css";
import { useState } from "react";

export const Quiz = () => {
  const [showExitModal, setShowExitModal] = useState(false);

  const currentQuestion = 19;
  const totalQuestions = 19;
  const progress = (currentQuestion / totalQuestions) * 100;
  const handleExitQuiz = () => {
    console.log("Exit quiz");
    setShowExitModal(false);
  };
  return (
    <div className={styles.quizBody}>
      <div className={styles.quizHeading}>
        <button
          className={styles.backBtn}
          onClick={() => setShowExitModal(true)}
        >
          <ArrowLeft className={styles.backIcon} size={18} />
        </button>
      </div>
      <div className={styles.quiz}>
        <div className={styles.main}>
          <div className={styles.quizHeader}>
            <p>
              Question {currentQuestion} of {totalQuestions}
            </p>
            <p>{Math.round(progress)}% Complete</p>
          </div>

          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className={styles.question}>
            <div className={styles.questionHeader}>
              <div className={styles.point}>
                <p>100 points</p>
              </div>
              <div className={styles.timer}>
                <Timer />
                <p>00:00</p>
              </div>
              <div className={styles.difficulty}>
                <p>Medium</p>
              </div>
            </div>
            <div className={styles.qContent}>
              Đáp án rất dài rất dài rất dài...Đáp án rất dài rất dài rất
              dài...Đáp án rất dài rất dài rất dài...Đáp án rất dài rất dài rất
              dài...Đáp án rất dài rất dài rất dài...Đáp án rất dài rất dài rất
              dài...Đáp án rất dài rất dài rất dài...Đáp án rất dài rất dài rất
              dài...
            </div>
          </div>
          <ul className={styles.answers}>
            <li className={styles.answerCard}>
              <div className={styles.answerTag}>A</div>
              <div className={styles.answerContent}>
                Đáp án rất dài rất dài rất dài...
              </div>
            </li>
            <li className={styles.answerCard}>
              <div className={styles.answerTag}>B</div>
              <div className={styles.answerContent}>
                Đáp án rất dài rất dài rất dài...
              </div>
            </li>
            <li className={styles.answerCard}>
              <div className={styles.answerTag}>C</div>
              <div className={styles.answerContent}>
                Đáp án rất dài rất dài rất dài...
              </div>
            </li>
            <li className={styles.answerCard}>
              <div className={styles.answerTag}>D</div>
              <div className={styles.answerContent}>
                Đáp án rất dài rất dài rất dài...Đáp án rất dài rất dài rất
                dài...Đáp án rất dài rất dài rất dài...Đáp án rất dài rất dài
                rất dài...Đáp án rất dài rất dài rất dài...Đáp án rất dài rất
                dài rất dài...Đáp án rất dài rất dài rất dài...Đáp án rất dài
                rất dài rất dài...
              </div>
            </li>
          </ul>
          <div className={styles.controller}>
            <div className={styles.skipBtn}>
              <Flag />
              <p>Skip</p>
            </div>
            <div className={styles.btn}>
              <p>Next Question</p>
            </div>
          </div>
        </div>

        <div className={styles.sideBar}>
          <p>Quiz Stats</p>
          <ul className={styles.quizStat}>
            <li className={styles.quizStatCard}>
              <span>Score</span>
              <h4>0</h4>
            </li>
            <li className={styles.quizStatCard}>
              <span>Progress</span>
              <h4 style={{ color: "white" }}>1/10</h4>
            </li>
            <li className={styles.quizStatCard}>
              <span>Position</span>
              <h4>2nd</h4>
            </li>
          </ul>
        </div>
      </div>
      {showExitModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowExitModal(false)}
        >
          <div
            className={styles.exitModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.exitHeader}>
              <button
                className={styles.exitBtn}
                onClick={() => setShowExitModal(false)}
              >
                <ArrowLeft size={16} />
              </button>
              <h3>Exit Quiz ?</h3>
            </div>

            <p className={styles.exitText}>
              Are you sure you want to leave this quiz?
              <br />
              Your answer might not be saved.
            </p>

            <div className={styles.exitActions}>
              <button
                className={styles.continueBtn}
                onClick={() => setShowExitModal(false)}
              >
                Continue Quiz
              </button>
              <button className={styles.exitBtn} onClick={handleExitQuiz}>
                Exit Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
