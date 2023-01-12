export function createUserFriendlyCategoryName(category) {
    if (category.includes("-")) {
        const categoryAsArray = category.split("-");
        const wordsCapitalised = categoryAsArray.map((word) => {
            return word[0].toUpperCase() + word.slice(1);
        })
        const categoryCapitalised = wordsCapitalised.join(" ");
        return categoryCapitalised;
    }
    else {
        return category[0].toUpperCase() + category.slice(1);
    }
}