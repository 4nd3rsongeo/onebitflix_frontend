import styles from "../../styles/search.module.scss"
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import Footer from "src/components/common/footer";
import HeaderAuth from "src/components/common/headerAuth";
import PageSpinner from "src/components/common/spinner";
import SearchCard from "src/components/searchCard";
import courseService, { CourseType } from "src/services/courseService";

export default function Search(){
    const router = useRouter();
    const searchName = router.query.name as string;

    const [searchResult, setSearchResult] = useState<CourseType[]>([]);
    const [loading, setLoading] = useState(true);

    const searchCourses = async () => {      
        const res = await courseService.getSearch(searchName);
        setSearchResult(res.data.courses);
    };

    // 1) Verifica login
    useEffect(() => {
        if(!sessionStorage.getItem('onebitflix-token')){
            router.push("/login")
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoading(false)
        }
    },[])

    // 2) Busca cursos
    useEffect(() => {
        if (!loading) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            searchCourses();
        }
    }, [searchName, loading]);

    // 3) Só aqui você pode retornar condicionalmente
    if(loading) {
        return <PageSpinner />
    }

    return(
        <>
        <Head>
            <title>OnebitFlix - {searchName}</title>
            <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        </Head>

        <main className={styles.main}>
            <div className={styles.headerFooterBg}>
                <HeaderAuth />
            </div>            

            {searchResult.length >= 1 ? (
                <div className={styles.searchContainer}>
                    <Container className="d-flex flex-wrap justify-content-center gap-5 py-4">
                        {searchResult.map((course) => (
                            <SearchCard key={course.id} course={course} />
                        ))}
                    </Container> 
                </div>                
            ) : (
                <div className={styles.searchContainer}>
                    <p className={styles.noSearchResult}>Nenhum resultado encontrado</p>
                </div>
            )}

            <div className={styles.headerFooterBg}>
                <Footer />
            </div>          
        </main>
        </>
    )
}