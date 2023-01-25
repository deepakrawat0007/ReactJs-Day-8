import { useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import "./quiz.css";

const QuizShow = () => {
    const [ques, setQues] = useState([])
    const [currentQues, setCurrentQues] = useState(0)
    const [score, setScore] = useState(0)
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get("https://opentdb.com/api.php?amount=5&type=multiple")
            .then((res) => {
                setQues(res.data.results)
                setCurrentQues(0)
                setLoading(false);
            })
            .catch((e) => {
                console.log(e.message)
                setLoading(false);
            })
    }, [])
    const handleNext = () => {
        setCurrentQues(currentQues + 1)
    }
    const handleScore = () => {
        setScore(score + 1)
        setCurrentQues(currentQues + 1)
    }

    if (!loading && currentQues === ques.length) {
        return (
            <div className="score">
            <div className="para">You Score {score} Out of 5</div>
            </div>
        )
    }
    return (
        <div>
            <div className="wrapper">
                <div>
                    <div className="head"><h1>Question {currentQues+1}</h1><span><h3>/5</h3></span></div>
                    <p>
                        {!loading && ques[currentQues].question}
                    </p>
                </div>
                <div className="btns">
                    {!loading && ques[currentQues].incorrect_answers.map((itms, idx) => (
                        <button onClick={handleNext}>{itms}</button>
                    ))}
                    {!loading && <button onClick={handleScore}>{ques[currentQues].correct_answer}</button>}
                </div>
            </div>
        </div>
    )
}

export default QuizShow
