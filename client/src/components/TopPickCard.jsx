import { Skeleton } from "@mui/material";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

function TopPickCard({ book }) {

    const [show, setShown] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    
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
                width: '160px',
                height: '260px',
                overflow: "hidden",
                borderRadius: '12px',
                ...props3,
            }}
            onMouseEnter={() => setShown(true)}
            onMouseLeave={() => setShown(false)}
        >
            { !isImageLoaded && <Skeleton variant="rectangular" width={170} height={270} className='absolute inset-0' sx={{ bgcolor: '#f0f0f0' }} animation="wave" /> }
            <img
                src={book.image}
                style={{ objectFit: "cover" }}
                onLoad={() => setIsImageLoaded(true)}
            />
        </animated.div>
    );
}

export default TopPickCard;
