import Data from './resources/reviews.json'

const service = {

    fetchReviews: () => {
        // fetch all reviews
        return Data;
    },

    fetchReviewsSlice: (start,end) => {
        // fetch some reviews
        return Data.slice(start,end);
    },

    fetchReviewById: (reviewId) => {
        return Data.find(review => review.id === reviewId);
    },

    fetchTotalReviewsCount: () => {
        let len = 0;
        try {
            len = Data.length
        } catch(error) {
            console.log(error);
        }
        return len;
    }
}

export default service;