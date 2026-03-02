import HeaderGeneric from "src/components/common/headerGeneric";
import styles from "../styles/registerLogin.module.scss";
import Head from "next/head";

export default function Register(){
    return(
        <>
            <Head>
                <title>Onebitflix - Registro</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <HeaderGeneric 
                    logoUrl="/" 
                    btnUrl="/login" 
                    btnContent="quero fazer login"
                />
            </main>
        </>
    )
}

