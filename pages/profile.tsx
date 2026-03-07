import Head from "next/head";
import styles from "../styles/profile.module.scss";
import UserForm from "src/components/profile/user";
import HeaderAuth from "src/components/common/headerAuth";
import { Button, Col, Container, Row } from "reactstrap";
import Footer from "src/components/common/footer";
import { useState } from "react";
import PasswordForm from "src/components/profile/password";


export default function UserInfo(){
    const [form, setForm] = useState("userForm");
    return(
        <>
            <div className={styles.header}>
                <Head>
                <title>Onebitflix - Meus Dados</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
                </Head>
            </div>
            
            <main className={styles.main}>
                <div className={styles.header}>
                    <HeaderAuth />
                </div>
                
                <Container className={styles.gridContainer} >
                    <p className={styles.title}>Minha Conta</p>
                    <Row className="pt-3 pb-5">
                        <Col md={4} className={styles.btnColumn}>
                            <Button className={styles.renderForm}
                            style={{color: form === "userForm" ? "#ff0044" : "white"}}
                            onClick={() => {
                                setForm("userForm");
                            }}>
                                DADOS PESSOAIS</Button>
                            <Button className={styles.renderForm} 
                            style={{color: form === "passwordForm" ? "#ff0044" : "white"}}
                            onClick={() => {
                                setForm("passwordForm");
                            }}>
                                SENHA
                            </Button>
                        </Col>
                        <Col md>
                            {form === "userForm" ? <UserForm /> : <PasswordForm />}                           
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