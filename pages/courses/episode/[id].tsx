import { useRouter } from "next/router";
import styles from "../../../styles/episodePlayer.module.scss";
import Head from "next/head";
import HeaderGeneric from "src/components/common/headerGeneric";
import { useEffect, useRef, useState } from "react";
import courseService, { CourseType } from "src/services/courseService";
import PageSpinner from "src/components/common/spinner";
import { Button, Container } from "reactstrap";

import ReactPlayer from "react-player";
import watchEpisodeService from "src/services/episodeService";

const EpisodePlayer = function () {
    const router = useRouter();
    const [course, setCourse] = useState<CourseType>();
    const [isReady, setIsready] = useState(false);
    const [mounted, setMounted] = useState(false); // Garante que estamos no cliente
    const [getEpisodeTime, setGetEpisodeTime] = useState(0);
    const [episodeTime, setEpisodeTime] = useState(0);

    const playerRef = useRef<ReactPlayer>(null)

    // 1. Pegamos os valores da query de forma segura
    const { id, courseid } = router.query;
    const episodeOrder = parseFloat(id?.toString() || "0");
    const episodeId = parseFloat(router.query.episodeid?.toString() || "0");
    const courseId = courseid?.toString() || "";
    const [loading, setLoading]=useState(true);

    useEffect(() => {
        if(!sessionStorage.getItem('onebitflix-token')){
            router.push("/login")
        } else {
            setLoading(false)
        }
    },[])

    
    const handleGetEpisodeTime = async() => {
        const res = await watchEpisodeService.getWatchTime(episodeId);
        console.log("veja: ",res)
        console.log("episodeId: ",episodeId)
        if(res.data !== null){
            setGetEpisodeTime(res.data.seconds)
        }
    };

    const handleSetEpisodeTime = async() => {
        await watchEpisodeService.setWatchTime({
            episodeId: episodeId,
            seconds: Math.round(episodeTime)
        })
        
    }

    useEffect(() => {
        handleGetEpisodeTime();
    }, [router])

    const handlePlayerTime = () => {
        playerRef.current?.seekTo(getEpisodeTime)
        setIsready(true)
    }

    if(isReady === true) {
        setTimeout(() => {
            handleSetEpisodeTime();
        }, 1000 * 3)
    }

    const handleLastEpisode = () => {
        if (course) {
            router.push(`/courses/episode/${episodeOrder - 1}?courseid=${course.id}&episodeid=${
                episodeId - 1
            }`)
        }
    };

    const handleNextEpisode = () => {
        if (course) {
            router.push(`/courses/episode/${episodeOrder + 1}?courseid=${course.id}&episodeid=${
                episodeId + 1
            }`)
        }
    };

    useEffect(() => {
        setMounted(true); // O componente montou no navegador
        if (courseId) {
        getCourse();
        }
    }, [courseId]);

    const getCourse = async function () {
        const res = await courseService.getEpisodes(courseId);
        if (res.status === 200) {
        setCourse(res.data);
        }
    };

    // 2. Proteção: Se ainda não carregou o curso ou não montou, mostra o spinner
    if (!mounted || !course || !course.episodes) {
        return <PageSpinner />;
    }

    if(episodeOrder + 1 < course?.episodes?.length){
        if(Math.round(episodeTime) === course.episodes[episodeOrder].secondsLong) {
            handleNextEpisode();
        }
    }
    

    

    if(loading) {
        return <PageSpinner />
    }


    // 3. Só construímos a URL aqui, com a certeza de que o sessionStorage existe
    const token =
        typeof window !== "undefined"
        ? sessionStorage.getItem("onebitflix-token")
        : "";
    const videoUrl = `${process.env.NEXT_PUBLIC_BASEURL}/episodes/stream?videoUrl=${course.episodes[episodeOrder]?.videoUrl}&token=${token}`;

    return (
        <>
        <Head>
            <title>Onebitflix - {course.episodes[episodeOrder]?.name}</title>
        </Head>
        <main>
            <HeaderGeneric
            logoUrl="/home"
            btnContent={"Voltar para o curso"}
            btnUrl={`/courses/${courseId}`}
            />
            <Container className="d-flex flex-column align-items-center gap-3 pt-3">
            <p className={styles.episodeTitle}>
                {course.episodes[episodeOrder]?.name}
            </p>
            {/* O ReactPlayer agora só renderiza se a URL existir e estivermos no client */}
            <div className={styles.playerWrapper}>
                <ReactPlayer
                className={styles.player}
                url={videoUrl}
                controls
                ref={playerRef}
                width="100%"
                height="100%"
                onStart={handlePlayerTime}
                onProgress={(progress) => {
                    setEpisodeTime(progress.playedSeconds)
                }}
                />
            </div>
            <div className={styles.episodeButtonDiv}>
                <Button 
                    className={styles.episodeButton}
                    disabled={episodeOrder === 0 ? true : false}
                    onClick={handleLastEpisode}
                >
                <img
                    src="/episode/iconArrowLeft.svg"
                    alt="setaEsquerda"
                    className={styles.arrowImg}
                />
                </Button>
                <Button 
                    className={styles.episodeButton}
                    disabled={episodeOrder + 1 === course.episodes.length ? true : false}
                    onClick={handleNextEpisode}
                >
                <img
                    src="/episode/iconArrowRight.svg"
                    alt="setaDireita"
                    className={styles.arrowImg}
                />
                </Button>
            </div>
            <p className={styles.episodeSynopsis}>
                {course.episodes[episodeOrder].synopsis}
            </p>
            </Container>
        </main>
        </>
    );
};

export default EpisodePlayer;
