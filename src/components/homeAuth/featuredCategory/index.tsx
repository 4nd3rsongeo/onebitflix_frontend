import useSWR from "swr";
import styles from "../../../../styles/slideCategory.module.scss";
import courseService from "src/services/courseService";
import SlideComponent from "src/components/common/slideComponent";
import PageSpinner from "src/components/common/spinner";

export default function FeaturedCategory(){
    const {data, error } = useSWR("/courses/featured", courseService.getFeaturedCourses);

    if(error) return error;
    if(!data){ return <PageSpinner />};

    return(
        <>
            <p className={styles.titleCategory}>DESTAQUES</p>
            <SlideComponent courses={data.data} />
        </>
    )
}