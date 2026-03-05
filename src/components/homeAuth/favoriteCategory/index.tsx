import courseService from "src/services/courseService";
import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import SlideComponent from "src/components/common/slideComponent";
import PageSpinner from "src/components/common/spinner";

export default function FavoriteCategory(){
    const {data, error } = useSWR("/favorites", courseService.getFavCourses);

    if(error) return error;
    if(!data){
        return <PageSpinner />
    }
    return(
        <>
            <p className={styles.titleCategory}>FAVORITOS</p>
            {data.data.length >= 1 ? (
                <SlideComponent courses={data.data} />
            ) : (
                <p className={styles.notFound}><strong>Nenhum curso favorito encontrado.</strong></p>
            )}
        </>
    )
}