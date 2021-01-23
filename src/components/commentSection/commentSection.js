import React, {useState} from "react";
import styles from "./commentSection.module.scss";
import {postComment} from "../../helpers/commentHelper";
import Img from "gatsby-image";
import moment from "moment";
import ReactLoading from 'react-loading';
import cx from "classnames";

const CommentSection = ({pageSlug, comments, avatars, category}) => {

    console.log(process.env.SHOW_COMMENTS);
    console.log(process.env.GATSBY_SITE_URL);

    const [showForm, setShowForm] = useState(false);
    const [username, setUsername] = useState();
    const [comment, setComment] = useState();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    function _handleSubmit(e) {
        e.preventDefault();
        setError(false);
        setSuccess(false);
        setLoading(true);

        const randomAvatar = avatars[Math.floor((Math.random() * avatars.length))].node.relativePath;
        const avatarPath = `../avatars/${category}/${randomAvatar}`

        postComment(username, comment, pageSlug, avatarPath)
            .then(() => {
                setSuccess(true);
            })
            .catch(() => {
                setError(true)
            })
            .finally(() => {
                setLoading(true);
            })
    }

    function renderComment(comment) {
        const {html, frontmatter} = comment.node;
        const {_id, date, name, avatar} = frontmatter;
        return <div className={styles.commentContainer} key={_id}>
            <div className={styles.commentHeader}>
                <Img fixed={avatar.childImageSharp.fixed} className={styles.avatar}/>
                <div className={styles.commentInfos}>
                    <div className={styles.name}>
                        {name}
                    </div>
                    <div className={styles.date}>
                        Posté le {moment(date).format('Do MMMM YYYY')} à {moment(date).format("HH:mm")}
                    </div>
                </div>
            </div>

            <div className={styles.commentBody} dangerouslySetInnerHTML={{__html: html}}/>
        </div>
    }

    return <div className={styles.commentSectionContainer}>
        <div className={styles.commentSectionWrapper}>
            <h2>
                Commentaires ({comments.length})
            </h2>
            <div className={styles.commentsListContainer}>
                {comments.map(renderComment)}
            </div>
            <div className={styles.commentFormContainer}>
                {
                    !showForm &&
                    <button className={styles.btnPrimary}
                            onClick={() => setShowForm(true)}>
                        Commenter l'article
                    </button>
                }
                {
                    showForm && !success &&
                    <form onSubmit={_handleSubmit}>
                        <input type={"text"}
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                               placeholder="Pseudonyme"
                               required
                        />
                        <textarea value={comment}
                                  rows={5}
                                  onChange={(e) => setComment(e.target.value)}
                                  placeholder="Votre commentaire"
                                  required/>

                        {!loading ?
                            <input type="submit"
                                   className={styles.btnPrimary}
                                   value={"Envoyer"}
                                   disabled={loading}/> :
                            <div className={cx(styles.btnPrimary, styles.reverse, styles.loadingButton)} >
                                <ReactLoading type="bubbles" color="white" height={"30px"} width={"30px"}/>
                            </div>
                        }
                        {error &&
                        <span
                            className={styles.errorMsg}>Une erreur est survenue lors de l'envoi du commentaire.</span>}
                    </form>
                }
                {success &&
                <div className={styles.successMsg}>Merci pour votre commentaire ! Il sera publié d'ici quelques
                    minutes.</div>}
            </div>
        </div>

    </div>
}

export default CommentSection;