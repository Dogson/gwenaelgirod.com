import Slider from "react-slick";
import React from "react";
import cx from "classnames";
import styles from "./carousel.module.scss";
import {Link} from "gatsby"
import {MEDIA_CATEGORIES} from "../../helpers/const";

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

    function CarouselItem({item}) {
        const classNames = cx(styles.carouselItemWrapper, styles[item.category]);

        return <div className={classNames}>
            <img className={styles.backgroundImage} src={item.image} alt={item.title} height="100%"
                 width="100%"/>
            <div className={styles.carouselItemContainer}>
                <Link className={styles.titleContainer}
                      to={`posts/${item.path.substring(item.path.lastIndexOf('/') + 1).slice(0, -3)}`}>
                    <div className={styles.tag}>
                        <span className={styles.icon}>{MEDIA_CATEGORIES[item.category].icon}</span>
                        <span className={styles.text}>{MEDIA_CATEGORIES[item.category].name}</span>
                    </div>
                    <div className={styles.title}>
                        <span>{item.title}</span>
                        <span className={styles.details}>{settings.clickText}</span>
                    </div>
                </Link>
            </div>
        </div>

    }

    return (
        <Slider {...config}>
            {items.map((item, i) =>
                <div key={i}>
                    <CarouselItem item={item}/>
                </div>
            )}
        </Slider>
    );
};

export default Carousel;