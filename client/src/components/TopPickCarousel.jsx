import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";

export default function TopPickCarousel(props) {
    const table = props.cards.map((element, index) => {
        return {
            ...element, 
            onClick: () => handleSlideClick(index)
        };
    });

    const [goToSlide, setGoToSlide] = useState(null);
    const [isPaused, setPaused] = useState(false);
    const [cards] = useState(table);
    const [timeoutId, setTimeoutId] = useState(null);

    const customSlideStyle = (offsetFromCenter, index) => {
        const opacity = 1 - Math.abs(offsetFromCenter) / 5;
        const scale = 1 - Math.abs(offsetFromCenter) / 5;
        
        return {
            transform: `translateX(-50%) translateY(-50%) scale(${scale})`,
            opacity: opacity,
        };
    };

    const handleSlideClick = (index) => {
        setGoToSlide(index);
        setPaused(true);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            setPaused(false);
        }, 3000);
        setTimeoutId(newTimeoutId);
    };

    useEffect(() => {
        let intervalId;
        if (!isPaused) {
            intervalId = setInterval(() => {
                setGoToSlide((prevIndex) => (prevIndex + 1) % cards.length);
            }, 5000);
        }
        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    }, [isPaused, cards.length, timeoutId]);

    return (
        <div
            style={{ width: "80%", maxWidth: "300px", height: props.height, margin: props.margin }}
        >
            <Carousel
                slides={cards}
                goToSlide={goToSlide}
                offsetRadius={1}
                animationConfig={config.gentle}
                offsetFn={customSlideStyle}
            />
        </div>
    );
}
