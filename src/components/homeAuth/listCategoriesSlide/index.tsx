import styles from "../../../../styles/slideCategory.module.scss";
import SlideComponent from "src/components/common/slideComponent";
import PageSpinner from "src/components/common/spinner";
import categoriesService from "src/services/categoriesService";
import useSWR from "swr";

interface props {
    categoryId: number;
    categoryName: string;
}

export default function ListCategoriesSlide({categoryId, categoryName}: props){
    const {data, error } = useSWR(
        `/categories/${categoryId}`,  
        () => categoriesService.getCourses(categoryId)
        );
    console.log(data);
   
    if(error) return error;
    if(!data){ return <PageSpinner />}; 

    return(
        <>
            <p className={styles.titleCategory}>{categoryName}</p>
            <SlideComponent courses={data.courses} />            
        </>
    )
}