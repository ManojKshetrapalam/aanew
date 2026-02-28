'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function NeuralBackground() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] bg-[#000000] overflow-hidden">
            {/* Neural Core Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#136DEC]/10 blur-[150px] rounded-full"></div>

            {/* Data Streams */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#136DEC 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            {/* Floating Neural Nodes */}
            {isMounted && [...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-[#22D3EE] rounded-full"
                    initial={{
                        x: Math.random() * 2000 - 1000,
                        y: Math.random() * 2000 - 1000,
                        opacity: Math.random()
                    }}
                    animate={{
                        y: [null, Math.random() * -500],
                        opacity: [0.2, 0.8, 0.2]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                />
            ))}

            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:100px_100px]"></div>
        </div>
    );
}
