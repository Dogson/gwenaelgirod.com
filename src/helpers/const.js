import {FaGamepad, FaFilm, FaTv, FaBook, FaCompactDisc} from "react-icons/fa";
import React from "react";

export const MEDIA_CATEGORIES = {
    movies: {
        name: "Films",
        path: "/blog/films/",
        image: "/assets/categories/movies.jpg",
        icon: <FaFilm/>
    },
    gaming: {
        name: "Jeux vidéo",
        path: "/blog/jeux-video/",
        image: "/assets/categories/gaming.jpg",
        icon: <FaGamepad/>
    },
    tv: {
        name: "Séries TV",
        path: "/blog/series-tv/",
        image: "/assets/categories/tv.jpg",
        icon: <FaTv/>
    },
    books: {
        name: "Littérature",
        path: "/blog/litterature/",
        image: "/assets/categories/books.jpg",
        icon: <FaBook/>
    },
    music: {
        name: "Musique",
        path: "/blog/musique/",
        image: "/assets/categories/music.jpg",
        icon: <FaCompactDisc/>
    },
    all: {
        name: "Blog",
        path: "/blog/",
        image: "/assets/categories/blog.jpg"
    }

};