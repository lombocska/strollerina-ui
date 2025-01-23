'use client';

import { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "config/site";
import { useLocalStorage, clearLocalStorage } from "lib/LocalStorageAPI";
import GuideHeaderContent from "../headers/guide-header";
import { useRouter } from "next/navigation";

export default function GuideContent({ dictionary, lang }) {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useLocalStorage("guide/answers", []);
    const [isFlipped, setIsFlipped] = useState(false);
    const [productType, setProductType] = useState<"strollers" | "carseats" | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [currentQuestions, setCurrentQuestions] = useState([]);

    useEffect(() => {
        if (productType) {
            const questions = productType === "strollers"
                ? siteConfig.strollerQuestions
                : siteConfig.carSeatQuestions;
            setCurrentQuestions(questions);
        }
    }, [productType]);

    const currentQuestion = currentQuestions[currentQuestionIndex];

    const handleNext = () => {
        const isLastQuestion = currentQuestionIndex === currentQuestions.length - 1;
    
        // Add selected answers to the state
        const updatedAnswers = [...answers, ...selectedAnswers];
        setAnswers(updatedAnswers);
    
        if (isLastQuestion) {
            onQuizComplete(updatedAnswers); // Pass the updated answers to the completion function
        } else {
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedAnswers([]);
        }
    };
    
    const handleAnswer = (answer: string) => {
        const isMultipleAllowed = currentQuestion?.multipleOptionsAllowed;
        const isLastQuestion = currentQuestionIndex === currentQuestions.length - 1;
    
        if (isMultipleAllowed) {
            setSelectedAnswers((prev) =>
                prev.includes(answer) ? prev.filter((a) => a !== answer) : [...prev, answer]
            );
        } else {
            const updatedAnswers = [...answers, answer];
            setAnswers(updatedAnswers);
    
            if (isLastQuestion) {
                onQuizComplete(updatedAnswers); // Pass the updated answers to the completion function
            } else {
                setIsFlipped(true);
                setTimeout(() => {
                    setIsFlipped(false);
                    setCurrentQuestionIndex((prev) => prev + 1);
                    setSelectedAnswers([]);
                }, 1000);
            }
        }
    };
    
    // Function to be called when the quiz is completed
    const onQuizComplete = (finalAnswers: string[]) => {
        const filteredAnswers = finalAnswers.filter(answer => answer !== 'no');
        restartQuiz();
        router.push(`/${lang}/${productType}?tags=${filteredAnswers}`);

    };
    

    const restartQuiz = () => {
        clearLocalStorage("guide/answers");
        setAnswers([]);
        setCurrentQuestionIndex(0);
        setProductType(null);
        setSelectedAnswers([]);
    };

    return (
        <>
            <GuideHeaderContent dictionary={dictionary} headerLabelKey={'title'} />
            <div className="flex flex-col items-center min-h-screen p-4 space-y-6">

                {productType === null ? (
                    <AnimatePresence>
                        <motion.div
                            key="product-type-selection"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="w-full max-w-xl"
                        >
                            <Card className="w-full text-center py-10 px-6 md:py-14 md:px-10 rounded-lg shadow-xl">
                                <CardBody>
                                    <h2 className="text-xl font-semibold sm:text-xl md:text-2xl">
                                        What are you looking for?
                                    </h2>
                                    <div className="mt-6 space-y-4">
                                        <Button
                                            variant="bordered"
                                            className="w-full text-lg md:text-xl whitespace-normal break-words px-4 py-3"
                                            onPress={() => setProductType("strollers")}
                                        >
                                            Stroller
                                        </Button>
                                        <Button
                                            variant="bordered"
                                            className="w-full text-lg md:text-xl whitespace-normal break-words px-4 py-3"
                                            onPress={() => setProductType("carseats")}
                                        >
                                            Car Seat
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                ) : currentQuestionIndex < currentQuestions.length ? (
                    <AnimatePresence>
                        <motion.div
                            key={currentQuestion?.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="w-full max-w-2xl"
                        >
                            <Card
                                className="w-full text-center py-10 px-6 md:py-14 md:px-10 rounded-lg shadow-xl"
                                style={{
                                    transformStyle: "preserve-3d",
                                    transition: "transform 0.6s",
                                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                                }}
                            >
                                <CardBody>
                                    {!isFlipped ? (
                                        <>
                                            <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl leading-snug">
                                                {currentQuestion?.question}
                                            </h2>
                                            <div className="mt-6 space-y-4">
                                                {currentQuestion?.options.map((option, index) => (
                                                    <Button
                                                        key={index}
                                                        className={`w-full text-m md:text-xl whitespace-normal overflow-visible break-words h-auto py-4 px-6 flex items-center justify-center ${selectedAnswers.includes(option.name)
                                                            ? "bg-primary-500 text-white" // Primary color when selected
                                                            : "border border-gray-300"   // Default border styling when not selected
                                                            }`}
                                                        variant={selectedAnswers.includes(option.name) ? "solid" : "bordered"}
                                                        onPress={() => handleAnswer(option.name)}
                                                    >
                                                        {dictionary[productType]["tags"]["main-card"]["chip"][option.label.split('.').pop()]}
                                                    </Button>
                                                ))}

                                                {currentQuestion?.multipleOptionsAllowed && (
                                                    <Button
                                                        size="lg"
                                                        className="mt-4 bg-primary-500 text-white hover:bg-primary-600" // Primary color styling for the "Next" button
                                                        // disabled={selectedAnswers.length === 0}
                                                        onPress={handleNext}
                                                    >
                                                        Next
                                                    </Button>
                                                )}
                                            </div>

                                        </>
                                    ) : (
                                        <div className="flex items-center justify-center h-40">
                                            <p className="text-lg font-bold">Loading...</p>
                                        </div>
                                    )}
                                </CardBody>
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold sm:text-4xl">Thank you for your answers!</h2>
                        <p className="mt-4 text-lg sm:text-xl">Processing results...</p>
                    </div>
                )}

                {productType && (
                    <Button
                        size="lg"
                        variant="bordered"
                        className="mt-6 text-lg md:text-xl"
                        onPress={restartQuiz}
                    >
                        Restart Quiz
                    </Button>
                )}
            </div>
        </>
    );
}
