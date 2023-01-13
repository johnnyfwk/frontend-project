import axios from 'axios';

const gamesBaseUrl = axios.create({
    baseURL: 'https://backend-project-ji5u.onrender.com/api'
})

export function getReviews(category) {
    return gamesBaseUrl
        .get('/reviews', {param: {"category": category}})
        .then((response) => {
            return response.data.reviews;
        })
}

export function getCategories() {
    return gamesBaseUrl
        .get('/categories')
        .then((response) => {
            return response.data.categories;
        })
}

export function getSingleReview(reviewId) {
    return gamesBaseUrl
        .get(`/reviews/${reviewId}`)
        .then((response) => {
            return response.data.review;
        })
}

export function getCommentsByReviewId(reviewId) {
    return gamesBaseUrl
        .get(`/reviews/${reviewId}/comments`)
        .then((response) => {
            return response.data.comments;
        })
}

export function patchVotesByReviewId(reviewId, increment) {
    return gamesBaseUrl
        .patch(`/reviews/${reviewId}`, {inc_votes: increment})
}

export function postReviewComment(username, reviewId, reviewComment) {
    return gamesBaseUrl
        .post(`/reviews/${reviewId}/comments`, {"username": username, "body": reviewComment})
        .then((response) => {
            return response;
        })
}