import useSWR from "swr";
import categoriesService, { CategoryType } from "src/services/categoriesService";
import styles from "../../../../styles/slideCategory.module.scss";
import ListCategoriesSlide from "../homeAuth/listCategoriesSlide";

export default function ListCategories(){
    const {data, error } = useSWR(
        "/categories", 
        categoriesService.getCategories
    );

    // console.log("CATEGORIES:", data);

    if(error) return error;
    if(!data){
        return(
            <>
                <p>Loading...</p>
            </>
        );
    }

    return(
        <>
            {data?.categories.map((category: CategoryType) => (
                <ListCategoriesSlide 
                    key={category.id} 
                    categoryId={category.id} 
                    categoryName={category.name} 
                />
            ))}
        </>
    );
}