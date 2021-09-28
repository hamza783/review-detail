import React, {useState} from 'react';
import './Card.css'
import { Link } from 'react-router-dom';
import StarRatings from "react-star-ratings"
// import icons
import messageIcon from '../../Images/messagesIcon.png';
import replyIcon from '../../Images/replyIcon.png';
import editIcon from '../../Images/editIcon.png'
import { useEffect } from 'react/cjs/react.development';

const Card = ({review, detailView}) => {
    const publishedAt = new Date(review.published_at);
    if(!review.reply)
        review.reply=''; // initialize the reply if reply doesn't exist
    
    // hooks
    const [replyState, setReplyState] = useState(review.reply);
    const [disableInput, setDisableInput] = useState(true);

    useEffect(() => {
        if(!disableInput || review.reply===replyState) return;
        // save response
        review.reply=replyState;
    }, [disableInput, replyState, review])

    return (
        <Link style={{ textDecoration: 'none', color: 'black'}} to={`/${review.id}`}>
            <div className={detailView ? "cardDetail" : "card"}>
                <div className="main">
                    <h4>{review.place}</h4>
                    <StarRatings
                        rating={review.rating}
                        starRatedColor="orange"
                        starDimension='20px'
                        numberOfStars={5}
                        name='rating'
                    />
                    <br />
                    {review.content.length > 150 && !detailView ? review.content.substring(0,150)+"..." : review.content}
                </div>
                <div className="footer">
                    <p>{review.author}</p>
                    <p>{publishedAt.toLocaleDateString("en-US")}</p>
                    {/* show message icon if not detail view and reply exist */}
                    {review.reply && !detailView ? 
                        <img width="15px" height="15px"
                            src={messageIcon}
                            alt=""/>
                        : <p></p>
                    }
                </div>
            </div>
            {/* show reply card only if in detail view*/}
            { detailView ?
                <div className="replyContent">
                    {/* reply image: to save reply. pencil image: to edit reply*/}
                    {!disableInput ? 
                        <img width="15px" height="15px"
                            src={replyIcon}
                            alt=""
                            className="replyImg"
                            onClick={()=>{setDisableInput(true)}}/> 
                        : 
                        <img width="15px" height="15px"
                            src={editIcon}
                            alt=""
                            className="editImg"
                            onClick={()=>{setDisableInput(false)}}/>
                    }
                    <textarea className="textArea" rows="5" cols="50" 
                        onChange ={event => setReplyState(event.currentTarget.value)}
                        value={replyState} 
                        disabled={disableInput} />                    
                </div>
                : ""
            }
        </Link>
    )
}

export default Card;