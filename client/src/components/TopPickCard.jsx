import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

function TopPickCard({ book }) {
    const [show, setShown] = useState(false);

    const props3 = useSpring({
        transform: show ? "scale(1.03)" : "scale(1)",
        boxShadow: show
            ? "0 20px 25px rgb(0 0 0 / 25%)"
            : "0 2px 10px rgb(0 0 0 / 8%)"
    });

    return (
        <animated.div
            style={{
                display: 'flex',
                justifyContent: 'center',
                width: '170px',
                height: '270px',
                overflow: "hidden",
                borderRadius: '15px',
                ...props3,
            }}
            onMouseEnter={() => setShown(true)}
            onMouseLeave={() => setShown(false)}
        >
            <img
                src={book.image}
                style={{ objectFit: "cover" }}
            />
        </animated.div>
    );
}

export default TopPickCard;
