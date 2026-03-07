import styles from "../../styles/coursePage.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container } from "reactstrap";
import Footer from "src/components/common/footer";
import HeaderAuth from "src/components/common/headerAuth";
import PageSpinner from "src/components/common/spinner";
import EpisodeList from "src/components/episodeList";
import courseService, { CourseType } from "src/services/courseService";

export default function CoursePage() {
  const [course, setCourse] = useState<CourseType | null>(null);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const getCourse = async function () {
    if (typeof id !== "string") return;
    const res = await courseService.getEpisodes(id);
    // setCourse(res.data.course);
    if (res.status === 200) {
      setCourse(res.data);
      setLiked(res.data.liked);
      setFavorited(res.data.favorited);
    } else {
      router.push("/404");
    }
  };
  //se mudar o id, tem que buscar o curso de novo
  useEffect(() => {
    getCourse();
  }, [id]);

    const handleLikeCourse = async () => {
        console.log("like",liked)
        if(typeof id !== "string") return;
        if (liked===true) {
            await courseService.removeLike(id);
            setLiked(false);
        } else {
            await courseService.like(id);
            setLiked(true);
        }
    };

    const handleFavCourse = async () => {   
        if(typeof id !== "string") return;
        if (favorited===true) {
            await courseService.removeFav(id);
            setFavorited(false);
        } else {
            await courseService.addToFav(id);
            setFavorited(true);
        }
    };      

    if(course === undefined) return <PageSpinner /> 

  return (
    <>
      <Head>
        <title>OnebitFlix - {course?.name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      {/* <main className={styles.test}>
                <HeaderAuth />
                <h1>{course?.name}</h1>
            </main> */}

      <main className={styles.main}>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), 
                    url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "450px",
          }}
        >
          <HeaderAuth />
        </div>
      </main>
      <Container className={styles.courseInfo}>
        <p className={styles.courseTitle}>{course?.name}</p>
        <p className={styles.courseDescription}>{course?.synopsis}</p>
        <Button outline className={styles.courseBtn} disabled={course?.episodes?.length === 0? true: false}>
          ASSISTIR AGORA
          <img
            src="/buttonPlay.svg"
            alt="buttonImg"
            className={styles.buttonImg}
          />
        </Button>
        <div className={styles.interactions}>
          {liked===false ? (
            <img
            src="/course/iconLike.svg"
            alt="likeImage"
            className={styles.interactionImages}
            onClick={handleLikeCourse}
          />) : (
            <img
            src="/course/iconLiked.svg"
            alt="likeImage"
            className={styles.interactionImages}
            onClick={handleLikeCourse}
            />
          )}
            {favorited===false ? (
              <img
                src="/course/iconAddFav.svg"
                alt="favoriteImage"
                className={styles.interactionImages}
                onClick={handleFavCourse}
              />
            ) : (
              <img
                src="/course/iconFavorited.svg"
                alt="favoriteImage"
                className={styles.interactionImages}
                onClick={handleFavCourse}
              />
            )}
        </div>
      </Container>
      <Container className={styles.episodeInfo}>
            <p className={styles.episodeDivision}>EPISÓDIOS</p>
            <p className={styles.episodeLength}>
                {course?.episodes?.length} episódios
            </p>
            {course?.episodes?.length === 0 ? (
                <p>
                    <strong>Não temos episódios ainda...&#x1f606; &#x1f918;</strong>
                </p>
            ):(
                course?.episodes?.map((episode) => (
                <EpisodeList key={episode.id} episode={episode} course={course}/>
                ))
            )}
      </Container>
      <Footer />
    </>
  );
}
