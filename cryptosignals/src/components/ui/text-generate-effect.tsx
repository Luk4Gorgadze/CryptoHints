"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "../../lib/utils";

export const TextGenerateEffect = ({
    words,
    className,
    color,
    fontSize,
}: {
    words: string;
    className?: string;
    color?: string;
    fontSize?: string;
}) => {
    const [scope, animate] = useAnimate();
    let wordsArray = words.split(" ");
    useEffect(() => {
        animate(
            "span",
            {
                opacity: 1,
            },
            {
                duration: 1,
                delay: stagger(0.1),
            }
        );
    }, [scope.current]);

    const renderWords = () => {
        return (
            <motion.div ref={scope}>
                {wordsArray.map((word, idx) => {
                    return (
                        <motion.span
                            key={word + idx}
                            className={`${color} dark:${color} text-black opacity-0 ${fontSize}`}
                        >
                            {word}{" "}
                        </motion.span>
                    );
                })}
            </motion.div>
        );
    };

    return (
        <div className={cn("", className)}>
            <div className="mt-4">
                <div className=" dark:text-white text-black text-2xl leading-snug tracking-wide ">
                    {renderWords()}
                </div>
            </div>
        </div>
    );
};
