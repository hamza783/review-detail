import React, { useEffect, useState } from "react";
import "./Home.css"
import SERVICE from "../../service";
// import components
import Grid from "../Grid/Grid";
import Card from "../Card/Card";


const INCREMENT_REVIEW=10; // number of reviews to fetch each time 
const TOTAL_COUNT= SERVICE.fetchTotalReviewsCount();
let reviewCount=INCREMENT_REVIEW;

const Home = () => {
    // hooks
    const [reviews, setReviews] = useState(); // hook for reviews
    const [loadMoreReviews, setLoadMoreReviews] = useState(false); // for to identify when user request to load more reviews
    const [error, setError] = useState(false);

    useEffect(() => {
        try {
            // only do it when reviews are empty
            if(!reviews) {
                setReviews(SERVICE.fetchReviewsSlice(0, reviewCount));
            }
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }, [reviews]);

    // when load more reviews is requested
    useEffect(() => {
        if(!loadMoreReviews) return;
        try {
            let data = SERVICE.fetchReviewsSlice(reviewCount, reviewCount+INCREMENT_REVIEW)
            data= [...reviews,...data];
            reviewCount=reviewCount+INCREMENT_REVIEW;
            setReviews(data);
        } catch(error) {
            console.log(error);
            setError(true);
        } finally {
            setLoadMoreReviews(false);
        }
    }, [loadMoreReviews,reviews])

    return (
        <div>
            {   error ? 
                    <div className="redMessage">Error occured!</div>
                :
                    <Grid>
                        {reviews ? reviews.map(rev => (
                            <Card key={rev.id} review={rev} detailView={false}></Card>
                        )) : <div className="redMessage">Loading...</div>}
                    </Grid>
            }
            {reviewCount < TOTAL_COUNT ? <button className="button" onClick={() => setLoadMoreReviews(true)}>Load More</button> : ""}
        </div>
    )
}

export default Home;