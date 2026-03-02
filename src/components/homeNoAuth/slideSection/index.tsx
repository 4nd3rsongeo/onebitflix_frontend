import { CourseType } from "src/services/courseService";
import styles from "./styles.module.scss";
import { Button, Container } from "reactstrap";
import SlideComponent from "src/components/common/slideComponent";
import Link from "next/link";

interface props {
    newestCourses: CourseType[];
}

const SlideSection = function ({newestCourses }: props) {
    return (
        <>
            <Container className="d-flex flex-column align-items-center py-5">
                <p className={styles.sectionTitle}>AULAS JÁ DISPONÍVEIS</p>
                <SlideComponent courses = {newestCourses} />
                <Link href="/register">
                    <Button outline color="light" className={styles.slideSectionBtn}>
                        Se cadastre para acessar!
                    </Button>
                </Link>
            </Container>
        </>
    )
};

export default SlideSection;