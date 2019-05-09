import Slider from "react-slick";
import React from "react";
import styles from "./carousel.module.scss";
import {Link} from "gatsby"

const Carousel = ({items, settings}) => {
    const config = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        dotsClass: "slick-dots slick-dots-custom",
        arrows: false,
        cssEase: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
        // autoplay: true,
        // autoPlaySpeed: 10000,
        appendDots: dots => (
            <div>
                <div className={styles.customDotsWrapper}>
                    <div className={styles.customDotsContainer}>
                        <div className={styles.customDots}>
                            <ul style={{margin: "0px"}}> {dots} </ul>
                        </div>
                    </div>
                </div>
            </div>
        ),
    };


    return (
        <Slider {...config}>
            {items.map((item, i) =>
                <div key={i}>
                    <div className={styles.carouselItemWrapper}>
                        <img className={styles.backgroundImage} src={item.image} alt={item.title} height="100%"
                             width="100%"/>
                        <div className={styles.carouselItemContainer}>
                            <Link className={styles.titleContainer} to={`posts/${item.path.substring(item.path.lastIndexOf('/') + 1).slice(0, -3)}`}>
                                <div className={styles.tag}>
                                    {item.tag}
                                </div>
                                <div className={styles.title}>
                                    <span>{item.title}</span>
                                    <span className={styles.details}>{settings.clickText}</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </Slider>
    );
};

export default Carousel;