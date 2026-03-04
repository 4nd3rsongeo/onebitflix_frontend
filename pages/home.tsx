import Head from "next/head"
import Footer from "src/components/common/footer"
import FavoriteCategory from "src/components/homeAuth/favoriteCategory"
import FeaturedCategory from "src/components/homeAuth/featuredCategory"
import FeaturedSession from "src/components/homeAuth/featuredSession"
import NewestCategory from "src/components/homeAuth/newestCategory"
import ListCategories from "src/components/listCategories"


export default function HomeAuth(){
    return(
        <>
            <Head>
                <title>Onebitflix - Home</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <FeaturedSession />
                <NewestCategory />
                <FavoriteCategory />
                <FeaturedCategory />
                <ListCategories />
                <Footer />
            </main>
        </>
    )
}