import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useReadingList } from "../../context/ReadingListContext";

const spring = { type: "spring", stiffness: 160, damping: 22 };

function slotStyle(offset, total) {
    const half = Math.floor(total / 2);
    let normalized = offset;
    if (normalized > half) normalized -= total;
    if (normalized < -half) normalized += total;

    const abs = Math.abs(normalized);
    return {
        x: normalized * 90,
        rotateY: normalized * -35,
        scale: abs === 0 ? 1 : 0.7,
        opacity: abs === 0 ? 1 : 0.45,
    };
}

export default function TopPickCarousel(props) {
    const { cards, height, margin } = props;
    const total = cards.length;

    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const { togglePageRefresh } = useReadingList();

    const handleSlideClick = (index) => {
        if (index === active) {
            const target = document.getElementById("booksection");
            if (target) {
                const offset = target.offsetTop - 170;
                window.scrollTo({ top: offset, behavior: "smooth" });
            }
            togglePageRefresh();
            return;
        }
        setActive(((index % total) + total) % total);
        setPaused(true);
        setTimeout(() => setPaused(false), 3000);
    };

    useEffect(() => {
        if (paused) return undefined;
        const id = setInterval(() => {
            setActive((prev) => (prev + 1) % total);
        }, 5000);
        return () => clearInterval(id);
    }, [paused, total]);

    return (
        <div
            style={{
                width: "80%",
                maxWidth: "300px",
                height,
                margin,
                position: "relative",
                perspective: 1200,
                overflow: "visible",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    transformStyle: "preserve-3d",
                }}
            >
                {cards.map((card, index) => {
                    const target = slotStyle(index - active, total);
                    const zIndex = 10 - Math.abs((() => {
                        const half = Math.floor(total / 2);
                        let n = index - active;
                        if (n > half) n -= total;
                        if (n < -half) n += total;
                        return n;
                    })());
                    return (
                        <motion.div
                            key={card.key ?? index}
                            onClick={() => handleSlideClick(index)}
                            animate={target}
                            transition={spring}
                            style={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transformStyle: "preserve-3d",
                                backfaceVisibility: "hidden",
                                zIndex,
                            }}
                        >
                            {card.content}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
