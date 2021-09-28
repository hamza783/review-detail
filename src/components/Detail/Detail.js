import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import SERVICE from "../../service";
// import icons
import backIcon from '../../Images/back.png';
// import components
import Grid from "../Grid/Grid";
import Card from "../Card/Card";

const Detail = () => {
    // get review id from the url
    const {reviewId} = useParams();

    // hook
    const [review, setReview] = useState();
    const [error, setError] = useState(false);
    
    useEffect(() => {
        try {
            setReview(SERVICE.fetchReviewById(reviewId));
        } catch(error) {
            console.log(error);
            setError(true);
        }
    }, [reviewId, error]);

    return (
        <div style={{"textAlign": "left", "padding": "10px"}}>
            {/* back arrow image */}
            <Link style={{ textDecoration: 'none', color: 'black'}} to="/">
                <img width="50px" height="50px"
                                        src={backIcon}
                                        alt=""/>
            </Link>
            {error ?
                <div className="redMessage">Error occured!</div> 
                :
                <Grid>
                    {  review ? 
                        <div>
                            <Card key={review.id} review={review} detailView={true}></Card>
                        </div>
                        :   <div className="redMessage">Loading...</div>
                    }
                </Grid> 
            }
        </div>
    )
}

export default Detail;