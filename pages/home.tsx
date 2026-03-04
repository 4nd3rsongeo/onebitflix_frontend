import Head from "next/head"
import FeaturedSession from "src/components/homeAuth/featuredSession"
import NewestCategory from "src/components/homeAuth/newestCategory"


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
            </main>
        </>
    )
}