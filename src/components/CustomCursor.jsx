import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    // State to track if the device is touch-enabled
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // This check runs once to see if the user has a touch screen.
        const checkForTouch = () => {
            if (typeof window !== 'undefined') {
                const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
                setIsTouchDevice(hasTouch);
            }
        };
        checkForTouch();
    }, []);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // This effect now depends on isTouchDevice.
        // It will only add the mouse listener if it's NOT a touch device.
        if (!isTouchDevice) {
            const moveCursor = (e) => {
                cursorX.set(e.clientX);
                cursorY.set(e.clientY);
            };
            window.addEventListener('mousemove', moveCursor);
            return () => {
                window.removeEventListener('mousemove', moveCursor);
            };
        }
    }, [isTouchDevice, cursorX, cursorY]);

    // If it's a touch device, we render nothing.
    if (isTouchDevice) {
        return null;
    }

    // Otherwise, we render the cursor for desktop users.
    return (
        <motion.div
            className="custom-cursor fixed top-0 left-0 w-8 h-8 bg-[#6b7a1f] rounded-full pointer-events-none z-50 mix-blend-difference -translate-x-1/2 -translate-y-1/2"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
        />
    );
};

export default CustomCursor;
