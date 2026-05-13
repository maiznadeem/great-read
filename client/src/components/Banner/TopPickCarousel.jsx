import { useEffect, useRef, useState } from "react";
import SliderImport from "react-slick";
import { useReadingList } from "../../context/ReadingListContext";

const Slider = SliderImport.default ?? SliderImport;

export default function TopPickCarousel(props) {
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const { togglePageRefresh } = useReadingList();

    const handleSlideClick = (index) => {
        if (index === currentSlide) {
            const targetElement = document.getElementById("booksection");
            if (targetElement) {
                const offset = targetElement.offsetTop - 170;
                window.scrollTo({ top: offset, behavior: "smooth" });
            }
            togglePageRefresh();
            return;
        }
        sliderRef.current?.slickGoTo(index);
    };

    useEffect(() => {
        const id = setInterval(() => {
            sliderRef.current?.slickNext();
        }, 5000);
        return () => clearInterval(id);
    }, []);

    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
        speed: 600,
        beforeChange: (_, next) => setCurrentSlide(next),
    };

    return (
        <div
            style={{
                width: "80%",
                maxWidth: "300px",
                height: props.height,
                margin: props.margin,
            }}
        >
            <Slider {...settings} ref={sliderRef}>
                {props.cards.map((card, index) => (
                    <div
                        key={card.key ?? index}
                        onClick={() => handleSlideClick(index)}
                    >
                        {card.content}
                    </div>
                ))}
            </Slider>
        </div>
    );
}
