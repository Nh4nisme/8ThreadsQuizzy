import { useState } from 'react'
import QuizDetail from './components/ui/QuizDetail.jsx';
function App() {
    const students = [
        { name: "Alex Johnson", score: "85%", timeSpent: "15:24", completed: "2 hours ago" },
        { name: "Emma Wilson", score: "92%", timeSpent: "18:24", completed: "2 hours ago" },
        { name: "Michael Cohen", score: "85%", timeSpent: "15:24", completed: "2 hours ago" },
        { name: "Sophia Gracious", score: "92%", timeSpent: "18:24", completed: "2 hours ago" }
    ]

    const questionsProgress = [
        { question: "What is the basic unit of life?", progress: 67 },
        { question: "Which organelle is responsible for...?", progress: 69 },
        { question: "What is the process of cell division...?", progress: 41 },
        { question: "Which of the following is NOT a...?", progress: 36 },
    ];

    return (
        <QuizDetail quizTItle={"Introduction to Biology"}
            quizDescription={"Basic concepts of biology to beginners"}></QuizDetail>
    );
}

export default App
