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

export function createUserFriendlyReviewPropertyNames(property) {
    if (property.includes("_")) {
        const categoryAsArray = property.split("_");
        const wordsCapitalised = categoryAsArray.map((word) => {
            return word[0].toUpperCase() + word.slice(1);
        })
        const categoryCapitalised = wordsCapitalised.join(" ");
        return categoryCapitalised;
    }
    else {
        return property[0].toUpperCase() + property.slice(1);
    }
}