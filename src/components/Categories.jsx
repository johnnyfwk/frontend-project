import { useState, useEffect } from "react"
import * as api from '../utils/api';
import * as utils from '../utils/utils';
import CategoryCard from './CategoryCard';

export default function Categories() {
    const [categoriesWithUserFriendlyNames, setCategoriesWithUserFriendlyNames] = useState( [] );

    useEffect(() => {
        api.getCategories()
            .then((response) => {                
                const newCategories = [];
                response.forEach((element) => {
                    const category = {
                        "slug": element.slug,
                        "description": element.description,
                        "userFriendlyName": utils.createUserFriendlyCategoryName(element.slug)
                    };
                    newCategories.push(category);
                });
                setCategoriesWithUserFriendlyNames(newCategories);
            })
    }, []);

    return (
        <main>
            <h1>Categories</h1>
            <section id='category-cards'>
                {categoriesWithUserFriendlyNames.map((category) => {
                    return <CategoryCard key={category.slug} category={category}/>
                })}
            </section>
        </main>
    )
}