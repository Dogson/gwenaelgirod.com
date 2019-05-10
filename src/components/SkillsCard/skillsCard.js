import React, {Component} from 'react';
import cx from "classnames";
import {FaJsSquare, FaGlobe, FaToolbox, FaCertificate, FaCoffee} from 'react-icons/fa';
import styles from "./skillsCard.module.scss"

export class SkillsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderIcon() {
        const classNames = cx(styles.cardIcon, this.state.className);
        switch (this.props.title) {
            case 'javascript':
                return <FaJsSquare className={classNames}/>;
            case 'web' :
                return <FaGlobe className={classNames}/>;
            case 'outils' :
                return <FaToolbox className={classNames}/>;
        }
    }

    renderSkills() {
        return this.props.skills.map((skill, i) => {
            if (i === this.props.skills.length - 1) {
                return <div className={styles.skill} key={i}>{skill}</div>
            }
            return <div className={styles.skill} key={i}>{skill}
                <div className={styles.separatorIcon}><FaCoffee/></div>
            </div>
        })
    }


    render() {
        const containerClassNames = cx(styles.cardContainer, this.state.className);
        return <div className={containerClassNames}
                    onMouseEnter={() => {
                        this.setState({className: cx(styles.shadowed, styles.big)})
                    }}
                    onMouseLeave={() => {
                        this.setState({className: ''})
                    }}
        >
            {this.renderIcon()}
            <div className={styles.cardBody}>
                <div className={styles.cardTitle}>{this.props.title}</div>
                <div className={styles.skillsContainer}>
                    {this.renderSkills()}
                </div>
            </div>
        </div>
    }
}