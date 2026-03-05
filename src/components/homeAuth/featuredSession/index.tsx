import { Button, Container } from "reactstrap";
import styles from "./styles.module.scss";
import useSWR from "swr";
import courseService, { CourseType } from "src/services/courseService";
import HeaderAuth from "src/components/common/headerAuth";
import Link from "next/link";
import PageSpinner from "src/components/common/spinner";


export default function FeaturedSession(){
    const {data, error} = useSWR("/featured", courseService.getFeaturedCourses);
    

    if (error) return <p>Erro ao carregar cursos.</p>;

    if(!data) {return <PageSpinner />};

    return(
        <>
            <HeaderAuth />
            {data.data.map((course: CourseType) => (
                <div 
                style={{
                    backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), 
                    url(${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "480px"
                }} 
                    key={course.id}
                    >
                    
                    <Container className="pt-4">
                        <p className={styles.title}>{course.name}</p>
                        <p className={styles.description}>{course.synopsis}</p>
                        <Link href={`/courses/${course.id}`}>
                            <Button outline color="light" className={styles.button}>
                                ACESSE AGORA!
                                <img src="/buttonPlay.svg" alt="buttonImg" className={styles.buttonImg} />
                            </Button>
                        </Link>
                    </Container>
                </div>
            ))[0]}
        </>
    )

    


}