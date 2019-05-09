import React from "react"
import {Link, withPrefix} from "gatsby"
import Dotdotdot from 'react-dotdotdot'
import styles from "./post.module.scss"
import cx from "classnames"
import {MEDIA_CATEGORIES} from "../../helpers/const";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.titleContainerRef = React.createRef();
        this.state = {};
    }

    componentDidMount() {
        this.setState({summaryHeight: 400 - 170 - 70 - this.titleContainerRef.current.clientHeight});
    }

    render() {
        const {post} = this.props;
        const newsCardContainerClass = cx(styles.newsCardContainer, styles[post.frontmatter.category]);
        const image = post.frontmatter.image ? withPrefix(post.frontmatter.image) : withPrefix(MEDIA_CATEGORIES[post.frontmatter.category].image);
        const summary = post.frontmatter.summary || post.excerpt;
        return <div className={newsCardContainerClass}>
            <Link to={MEDIA_CATEGORIES[post.frontmatter.category].path}>
                <div className={styles.categoryContainer}>
                    <div className={styles.categoryIcon}>{MEDIA_CATEGORIES[post.frontmatter.category].icon}</div>
                    <div className={styles.categoryName}>{MEDIA_CATEGORIES[post.frontmatter.category].name}</div>
                </div>
            </Link>
            <Link className={styles.postLink}
                to={`posts/${post.fileAbsolutePath.substring(post.fileAbsolutePath.lastIndexOf('/') + 1).slice(0, -3)}`}>
                <div>
                    <div className={styles.imageContainer}>
                        <img className={styles.image} src={image}
                             alt={post.frontmatter.title}/>
                    </div>
                    <div className={styles.bodyContainer}>
                        <div className={styles.titleContainer}
                             ref={this.titleContainerRef}>
                            <div>{post.frontmatter.title}</div>
                        </div>
                        <div className={styles.summary}>
                            <Dotdotdot clamp={`${this.state.summaryHeight}px`}>
                                <p>{summary}</p>
                            </Dotdotdot>
                        </div>
                        <div className={styles.readMore}><span>Lire la suite > </span></div>
                    </div>
                </div>
            </Link>
        </div>
    }
}

export default Post;