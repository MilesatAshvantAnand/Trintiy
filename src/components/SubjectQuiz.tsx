import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import type { QuizQuestion, Subject, QuizAttempt } from '../types';
import { X, Trophy, RotateCcw, CheckCircle2, XCircle, Zap, ArrowRight } from 'lucide-react';

interface SubjectQuizProps {
    subject: Subject;
    onClose: () => void;
}

type QuizPhase = 'start' | 'question' | 'results';

export function SubjectQuiz({ subject, onClose }: SubjectQuizProps) {
    const { state, dispatch } = useApp();
    const [phase, setPhase] = useState<QuizPhase>('start');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answered, setAnswered] = useState(false);
    const [userAnswers, setUserAnswers] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const [animateScore, setAnimateScore] = useState(false);

    const questions: QuizQuestion[] = subject.quizzes || [];

    // Get best previous score for this subject
    const previousAttempts = state.quizAttempts?.filter(a => a.subjectId === subject.id) || [];
    const bestScore = previousAttempts.length > 0
        ? Math.max(...previousAttempts.map(a => Math.round((a.score / a.totalQuestions) * 100)))
        : null;

    const handleStartQuiz = () => {
        setPhase('question');
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setAnswered(false);
        setUserAnswers([]);
        setScore(0);
    };

    const handleSelectAnswer = (optionIndex: number) => {
        if (answered) return;
        setSelectedAnswer(optionIndex);
        setAnswered(true);

        const isCorrect = optionIndex === questions[currentIndex].correctAnswer;
        const newAnswers = [...userAnswers, optionIndex];
        setUserAnswers(newAnswers);

        if (isCorrect) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setAnswered(false);
        } else {
            // Quiz finished — submit attempt
            const attempt: QuizAttempt = {
                id: crypto.randomUUID(),
                subjectId: subject.id,
                score: score + (selectedAnswer === questions[currentIndex].correctAnswer ? 1 : 0),
                totalQuestions: questions.length,
                completedAt: new Date().toISOString(),
                answers: userAnswers,
            };

            dispatch({ type: 'SUBMIT_QUIZ_ATTEMPT', payload: attempt });
            setPhase('results');
        }
    };

    useEffect(() => {
        if (phase === 'results') {
            setTimeout(() => setAnimateScore(true), 100);
        } else {
            setAnimateScore(false);
        }
    }, [phase]);

    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);

    const getEmoji = () => {
        if (percentage === 100) return '🏆';
        if (percentage >= 80) return '🌟';
        if (percentage >= 60) return '💪';
        if (percentage >= 40) return '📚';
        return '🔄';
    };

    const getFeedback = () => {
        if (percentage === 100) return 'Perfect score! You nailed it!';
        if (percentage >= 80) return 'Excellent work! Nearly perfect!';
        if (percentage >= 60) return 'Good job! Keep revising!';
        if (percentage >= 40) return 'Not bad, but more revision needed!';
        return 'Keep studying — you\'ll get there!';
    };

    const getOptionClass = (optionIndex: number) => {
        if (!answered) {
            return selectedAnswer === optionIndex ? 'quiz-option selected' : 'quiz-option';
        }

        const isCorrect = optionIndex === questions[currentIndex].correctAnswer;
        const isSelected = optionIndex === selectedAnswer;

        if (isCorrect) return 'quiz-option correct';
        if (isSelected && !isCorrect) return 'quiz-option incorrect';
        return 'quiz-option disabled';
    };

    if (questions.length === 0) {
        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal quiz-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2 className="modal-title">No Quiz Available</h2>
                        <button className="modal-close" onClick={onClose}><X /></button>
                    </div>
                    <div className="modal-body">
                        <p>No quiz questions are available for this subject yet.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal quiz-modal" onClick={(e) => e.stopPropagation()}>
                {/* START SCREEN */}
                {phase === 'start' && (
                    <>
                        <div className="modal-header">
                            <h2 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                <Zap style={{ color: subject.color }} /> {subject.name} Quiz
                            </h2>
                            <button className="modal-close" onClick={onClose}><X /></button>
                        </div>
                        <div className="modal-body quiz-start-body">
                            <div className="quiz-start-icon" style={{ background: subject.color }}>
                                <Zap size={40} color="white" />
                            </div>
                            <h3 className="quiz-start-title">Ready to test your knowledge?</h3>
                            <p className="quiz-start-desc">
                                {questions.length} questions • Multiple choice
                            </p>
                            {bestScore !== null && (
                                <div className="quiz-best-score">
                                    <Trophy size={16} /> Best score: {bestScore}%
                                </div>
                            )}
                            <button className="btn btn-primary btn-lg btn-block quiz-start-btn" onClick={handleStartQuiz}>
                                <Zap size={20} /> Start Quiz
                            </button>
                        </div>
                    </>
                )}

                {/* QUESTION VIEW */}
                {phase === 'question' && (
                    <>
                        <div className="modal-header">
                            <h2 className="modal-title" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                                {subject.name} Quiz
                            </h2>
                            <button className="modal-close" onClick={onClose}><X /></button>
                        </div>
                        <div className="modal-body">
                            {/* Progress */}
                            <div className="quiz-progress-container">
                                <div className="quiz-progress-text">
                                    Question {currentIndex + 1} of {questions.length}
                                </div>
                                <div className="quiz-progress-bar">
                                    <div
                                        className="quiz-progress-fill"
                                        style={{
                                            width: `${((currentIndex + 1) / questions.length) * 100}%`,
                                            background: subject.color,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Question */}
                            <div className="quiz-question">
                                {questions[currentIndex].question}
                            </div>

                            {/* Options */}
                            <div className="quiz-options">
                                {questions[currentIndex].options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        className={getOptionClass(idx)}
                                        onClick={() => handleSelectAnswer(idx)}
                                        disabled={answered}
                                    >
                                        <span className="quiz-option-letter">
                                            {String.fromCharCode(65 + idx)}
                                        </span>
                                        <span className="quiz-option-text">{option}</span>
                                        {answered && idx === questions[currentIndex].correctAnswer && (
                                            <CheckCircle2 className="quiz-option-icon correct-icon" size={20} />
                                        )}
                                        {answered && idx === selectedAnswer && idx !== questions[currentIndex].correctAnswer && (
                                            <XCircle className="quiz-option-icon incorrect-icon" size={20} />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Feedback + Next */}
                            {answered && (
                                <div className="quiz-feedback animate-slide-up">
                                    <div className={`quiz-feedback-text ${selectedAnswer === questions[currentIndex].correctAnswer ? 'correct' : 'incorrect'}`}>
                                        {selectedAnswer === questions[currentIndex].correctAnswer
                                            ? '✅ Correct!'
                                            : `❌ Incorrect — the answer is "${questions[currentIndex].options[questions[currentIndex].correctAnswer]}"`
                                        }
                                    </div>
                                    <button className="btn btn-primary quiz-next-btn" onClick={handleNext}>
                                        {currentIndex < questions.length - 1 ? (
                                            <>Next <ArrowRight size={16} /></>
                                        ) : (
                                            <>See Results <Trophy size={16} /></>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* RESULTS SCREEN */}
                {phase === 'results' && (
                    <>
                        <div className="modal-header">
                            <h2 className="modal-title">Quiz Complete!</h2>
                            <button className="modal-close" onClick={onClose}><X /></button>
                        </div>
                        <div className="modal-body quiz-results-body">
                            <div className={`quiz-score-display ${animateScore ? 'animate' : ''}`}>
                                <span className="quiz-emoji">{getEmoji()}</span>
                                <div className="quiz-score-number" style={{ color: subject.color }}>
                                    {finalScore}/{questions.length}
                                </div>
                                <div className="quiz-score-percent">{percentage}%</div>
                                <div className="quiz-feedback-message">{getFeedback()}</div>
                            </div>

                            {/* Per-question review */}
                            <div className="quiz-review">
                                <h4 className="quiz-review-title">Question Review</h4>
                                {questions.map((q, idx) => {
                                    const userAnswer = userAnswers[idx];
                                    const isCorrect = userAnswer === q.correctAnswer;
                                    return (
                                        <div key={q.id} className={`quiz-review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                                            <div className="quiz-review-icon">
                                                {isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                                            </div>
                                            <div className="quiz-review-content">
                                                <div className="quiz-review-q">{q.question}</div>
                                                {!isCorrect && (
                                                    <div className="quiz-review-answer">
                                                        Your answer: <span className="wrong">{q.options[userAnswer]}</span><br />
                                                        Correct: <span className="right">{q.options[q.correctAnswer]}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="quiz-result-actions">
                                <button className="btn btn-primary" onClick={handleStartQuiz}>
                                    <RotateCcw size={16} /> Try Again
                                </button>
                                <button className="btn btn-secondary" onClick={onClose}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
