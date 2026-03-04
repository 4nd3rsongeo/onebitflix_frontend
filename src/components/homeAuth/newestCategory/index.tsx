import useSWR from "swr";
import courseService from "src/services/courseService";
import SlideComponent from "src/components/common/slideComponent";
import styles from "../../../../styles/slideCategory.module.scss";

export default function NewestCategory(){
    const {data, error } = useSWR("/newest", courseService.getNewestCourses);

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
            <p className={styles.titleCategory}>LANÇAMENTOS</p>
            <SlideComponent courses={data.data}/>
        </>
    )
}