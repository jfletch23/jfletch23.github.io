import React, { useState } from 'react';

// This is a simplified version of the Shadcn UI components for a single-file example.
const Button = ({ children, onClick, disabled, className }: { children: React.ReactNode, onClick?: () => void, disabled?: boolean, className?: string }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`
      inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold
      ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
      focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none
      disabled:opacity-50 h-10 px-4 py-2 text-black
      shadow-md hover:shadow-lg transition-all duration-200
      ${className} disabled:cursor-not-allowed
    `}
    >
        {children}
    </button>
);

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`rounded-lg bg-[#2a2a2a] text-card-foreground shadow-sm p-6 max-w-lg w-full ${className}`}>
        {children}
    </div>
);

interface RadioGroupItemProps {
    value: string;
    children: React.ReactNode;
    onSelect?: () => void;
    selected?: boolean;
    disabled?: boolean;
    isAnswered: boolean;
    correctAnswerIndex: number;
    selectedAnswer: number | null;
}

// Type guard to check if a child is a RadioGroupItem
const isRadioGroupItem = (child: React.ReactNode): child is React.ReactElement<RadioGroupItemProps> => {
    return React.isValidElement(child) && typeof (child.props as any).value === 'string';
};

const RadioGroup = ({ children, onValueChange, value, disabled }: { children: React.ReactNode, onValueChange: (value: string) => void, value: string, disabled: boolean }) => (
    <div role="radiogroup" className="grid gap-2">
        {React.Children.map(children, child => {
            // Use the new type guard for correct type inference
            if (isRadioGroupItem(child)) {
                return React.cloneElement(child, {
                    onSelect: () => !disabled && onValueChange(child.props.value),
                    selected: value === child.props.value,
                    disabled: disabled,
                    // Pass down the correct and selected answer states
                    isAnswered: child.props.isAnswered,
                    correctAnswerIndex: child.props.correctAnswerIndex,
                    selectedAnswer: child.props.selectedAnswer,
                });
            }
            return child;
        })}
    </div>
);

const RadioGroupItem = ({ value, children, onSelect, selected, disabled, isAnswered, correctAnswerIndex }: RadioGroupItemProps) => {
    // Determine the background color based on the state of the quiz
    const isCorrect = isAnswered && parseInt(value) === correctAnswerIndex;
    const isIncorrect = isAnswered && selected && parseInt(value) !== correctAnswerIndex;

    const getBgColor = () => {
        if (!isAnswered) {
            // Default color for un-answered state
            return selected ? 'bg-amber-500' : 'bg-white hover:bg-[#81898a] hover:border-[#81898a]';
        }
        if (isCorrect) {
            return 'bg-green-600';
        }
        if (isIncorrect) {
            return 'bg-red-600';
        }
        // If answered but not selected, show default gray background
        return 'bg-white opacity-50';
    };

    const labelClasses = `
    flex items-center space-x-3 rounded-md p-4 transition-colors duration-200
    ${getBgColor()}
    ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
  `;

    return (
        <label
            onClick={onSelect}
            className={labelClasses}
        >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 transition-colors duration-200">
                <div className={`h-3 w-3 rounded-full ${selected ? 'bg-blue-600' : ''}`} />
            </div>
            <span className="text-sm font-bold leading-none text-[#1f1f1f]">
            {children}
          </span>
        </label>
    );
};

// Define the structure for an answer and a question
interface Answer {
    text: string;
    feedback: string;
}

interface Question {
    questionText: string;
    answers: Answer[];
    correctAnswer: number;
}

// The quiz data with unique explanations for each answer
const quizData: Question[] = [
    {
        questionText: "What year did facial recognition technology research begin?",
        answers: [
            { text: "1997", feedback: "Incorrect. In 1997 Peter N. Belhumeur, Joao P. Hespanha, and David J. Kriegman developed a new method for facial recognition called FisherFaces." },
            { text: "1987", feedback: "Incorrect. In 1987 Lawrence Sirovich and Michael Kirby published a paper in which they determined fewer than 100 values were required to build a unique face template." },
            { text: "1964", feedback: "Correct! Woodrow Bledsoe started research in 1964 for the company Panoramic Research. Most of the work was not published because it was being sponsored by an unknown intelligence agency. He used a computer to compare distances of key features on the face." },
            { text: "1971", feedback: "Incorrect. In 1971 A.J. Goldstein, Leon Harmon, and Ann Lesk published a paper in which they determined 14 feature descriptions are required to uniquely identify someone. An example of a feature description is wide set eyes or full cheeks." },
        ],
        correctAnswer: 2,
    },
    {
        questionText: "Which of the following locations does NOT utilize facial recognition technology?",
        answers: [
            { text: "Fast food restaurants", feedback: "Incorrect. Fast food restaurants such as WhatABurger, Steak Shack, and CaliBurger are using PopID to allow customers to pay with their face. In the fast food chain’s respective app customers link their face with a payment method. When ordering at a kiosk, the kiosk scans the customer’s face to create a facial template to match with PopID’s database." },
            { text: "Movie Theaters", feedback: "Correct! There are no documented examples of movie theaters using facial recognition technology and the technology is not considered to be widespread across the industry. It has been suggested that movie theaters could start using F.R.T. to link a movie ticket to a customer’s face, automatically identify patrons doing inappropriate things in movie theaters, and create new analytical data about customer’s facial reactions to movies." },
            { text: "Retail Stores", feedback: "Incorrect. Retail stores use facial recognition technology for customer engagement and marketing. By identifying customers from their face, retail stores can construct profiles of the customer to better tailor the experience to them. In addition, retail stores use F.R.T. to identify shoplifters and maintain security." },
            { text: "Libraries", feedback: "Incorrect. Libraries are beginning to experiment with facial recognition technology. In 2018, the New Jersey Institute of Technology library implemented facial recognition technology for access control. The system keeps a log of when people exit and enter and also issues a security alert to public safety officers when someone on the university’s banned list enters the library. Some future uses of F.R.T. in libraries could be replacing library cards entirely or creating a profile for patrons linked to their face that includes details such as books checked out, overdue books, and book recommendations." },
        ],
        correctAnswer: 1,
    },
    {
        questionText: "According to a 2019 federal study, what group of people are most likely to be misidentified by facial recognition technology in one to one matches?",
        answers: [
            { text: "Native Americans", feedback: "Correct! Native Americans have the highest rate of false positives." },
            { text: "African American Women", feedback: "Incorrect. African American Women had the highest rate of false positives in one to many matches, but not one to one matches." },
            { text: "Asian Men", feedback: "Incorrect. In general there was a higher rate of false positives in women than men." },
            { text: "Children", feedback: "Incorrect. Children and elderly adults had a higher rate of false positives compared to middle aged adults." },
        ],
        correctAnswer: 0,
    },
];

export function QuizPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);

    const handleAnswerSelect = (value: string) => {
        const selectedIndex = parseInt(value, 10);
        setSelectedAnswer(selectedIndex);
        setIsAnswered(true);

        const isCorrect = selectedIndex === quizData[currentQuestionIndex].correctAnswer;
        if (isCorrect) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            setIsQuizCompleted(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setIsQuizCompleted(false);
    };

    const startQuiz = () => {
        setQuizStarted(true);
    };

    const currentQuestion = quizData[currentQuestionIndex];

    // Determine the content for the explanation card
    let explanationContent = "Select an option to see feedback text.";
    if (isAnswered && selectedAnswer !== null) {
        explanationContent = currentQuestion.answers[selectedAnswer].feedback;
    }

    return (
        <section className="relative min-h-screen bg-[#1f1f1f] overflow-hidden">
            <div className="relative z-10 px-6 py-24 md:py-32 flex flex-col items-center">
                <Card className="shadow-2xl text-center mb-8">
                    <h1 className="relative z-10 text-4xl md:text-5xl font-extrabold text-white">
                        Test Your Knowledge!
                    </h1>
                </Card>

                {!quizStarted ? (
                    <div className="mt-8 md:mt-16 w-full flex justify-center">
                        <Card className="shadow-2xl text-center">
                            <p className="text-white text-lg mb-4">
                                Check out our other pages prior to taking the quiz!
                            </p>
                            <Button onClick={startQuiz} className="mt-6 w-full bg-[#e3725e] hover:bg-teal-500">
                                Start Quiz
                            </Button>
                        </Card>
                    </div>
                ) : (
                    <div className="mt-8 md:mt-16 w-full flex flex-col items-stretch md:flex-row md:justify-center md:space-x-8">
                        {/* Left Card: The Quiz */}
                        <Card className="shadow-2xl md:min-w-[400px]">
                            {!isQuizCompleted ? (
                                <>
                                    <h2 className="text-3xl font-bold mb-2 text-center text-teal-500">
                                        Question {currentQuestionIndex + 1}
                                    </h2>
                                    <h3 className="text-xl mb-4 text-center text-white">
                                        {currentQuestion.questionText}
                                    </h3>
                                    <RadioGroup onValueChange={handleAnswerSelect} value={String(selectedAnswer)} disabled={isAnswered}>
                                        {currentQuestion.answers.map((answer, index) => (
                                            <RadioGroupItem
                                                key={index}
                                                value={String(index)}
                                                selected={selectedAnswer === index}
                                                isAnswered={isAnswered}
                                                correctAnswerIndex={currentQuestion.correctAnswer}
                                                selectedAnswer={selectedAnswer}
                                            >
                                                {answer.text}
                                            </RadioGroupItem>
                                        ))}
                                    </RadioGroup>
                                    {isAnswered && (
                                        <Button
                                            onClick={handleNextQuestion}
                                            className="mt-6 w-full bg-[#e3725e] hover:bg-teal-500"
                                        >
                                            {currentQuestionIndex === quizData.length - 1 ? 'Submit' : 'Next Question'}
                                        </Button>
                                    )}
                                </>
                            ) : (
                                <div className="text-center text-white">
                                    <h2 className="text-2xl font-bold mb-4">
                                        Quiz Complete!
                                    </h2>
                                    <p className="text-lg mb-6">
                                        You scored {score} out of {quizData.length}.
                                    </p>
                                    <Button onClick={resetQuiz} className="w-full bg-[#e3725e] hover:bg-teal-500">
                                        Restart Quiz
                                    </Button>
                                </div>
                            )}
                        </Card>

                        {/* Right Card: The Explanation */}
                        {isAnswered && !isQuizCompleted && (
                            <Card className="shadow-2xl mt-8 md:mt-0 md:min-w-[400px] flex-1">
                                <div className="flex flex-col h-full">
                                    <h2 className="text-3xl font-bold mb-4 text-center text-[#e3725e]">
                                        Explanation
                                    </h2>
                                    <div className="text-white text-md flex-1">
                                        <h3 className="text-xl mb-4 text-center text-white">
                                            {explanationContent}
                                        </h3>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}