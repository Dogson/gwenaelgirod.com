import React, {useState} from "react";
import styles from "./commentSection.module.scss";
import {postComment} from "../../helpers/commentHelper";

const CommentSection = ({pageSlug}) => {
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
        postComment(username, comment, pageSlug)
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

    return <div className={styles.commentSectionContainer}>
        <div className={styles.commentSectionWrapper}>
            {/*<div className={cx(styles.sectionTitle, styles.small)}>
                <span>Commentaires</span>
            </div>*/}
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

                    <input type="submit"
                           className={styles.btnPrimary}
                           value="Envoyer"
                           disabled={loading}/>
                    {error &&
                    <span className={styles.errorMsg}>Une erreur est survenue lors de l'envoi du commentaire.</span>}
                </form>
            }
            {success && <div className={styles.successMsg}>Merci pour votre commentaire !</div>}
        </div>
    </div>
}

export default CommentSection;