import axios from 'axios';

const gamesBaseUrl = axios.create({
    baseURL: 'https://backend-project-ji5u.onrender.com/api'
})

export function getReviews(category) {
    return gamesBaseUrl
        .get('/reviews')
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