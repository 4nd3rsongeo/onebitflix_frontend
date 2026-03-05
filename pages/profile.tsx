import Head from "next/head";
import styles from "../styles/profile.module.scss";
import UserForm from "src/components/profile/user";
import HeaderAuth from "src/components/common/headerAuth";
import { Button, Col, Container, Row } from "reactstrap";
import Footer from "src/components/common/footer";

export default function UserInfo(){
    return(
        <>
            <div className={styles.header}>
                <Head>
                <title>Onebitflix - Meus Dados</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
                </Head>
            </div>
            
            <main className={styles.profile}>
                <HeaderAuth />
                <Container className="py-5">
                    <p className={styles.title}>Minha Conta</p>
                    <Row className="pt-3 pb-5">
                        <Col md={4} className={styles.btnColumn}>
                            <Button className={styles.renderForm}>DADOS PESSOAIS</Button>
                            <Button className={styles.renderForm}>SENHA</Button>
                        </Col>
                        <Col md>
                            <UserForm />
                        </Col>
                    </Row>
                        
                </Container>                
            </main>
            <div className={styles.footer}>
                <Footer />
            </div>
        </>
    )
}