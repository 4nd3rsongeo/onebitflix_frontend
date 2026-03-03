import HeaderGeneric from "src/components/common/headerGeneric";
import styles from "../styles/registerLogin.module.scss";
import Head from "next/head";
import { Container, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Footer from "src/components/common/footer";
import authService from "src/services/authService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ToastComponent from "src/components/common/toast";


export default function Register(){
    const router = useRouter();
    const[toastIsOpen, setToastIsOpen] = useState(false);
    const[toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        if(sessionStorage.getItem("onebitflix-token")){
            router.push("/home");
        }
    }, []);



    const handleRegister = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Captura todos os campos do formulário de forma simples
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const firstName = formData.get("firstName")!.toString()
    const lastName = formData.get("lastName")!.toString()
    const phone = formData.get("phone")!.toString()
    const birth = formData.get("birth")!.toString()
    const email = formData.get("email")!.toString()
    const password = formData.get("password")!.toString()
    const confirmPassword = formData.get("confirmPassword")!.toString()
    const params = {firstName, lastName, phone, birth, email, password}

    if(password != confirmPassword){
        //alert("A senha e a confirmação são diferentes!");
        setToastIsOpen(true);
        setTimeout(() => {
            setToastIsOpen(false)
        }, 1000 * 5);
        setToastMessage("Senha e confirmação diferentes")
        return;
    }

    try {
        const response = await authService.register(params);

        if (response.status === 201) {
            // Transformando a resposta do banco em uma instância da sua classe
           
            alert(`Bem-vindo, ${params.firstName}!`);
            router.push("/login?registered=true")
            router.push("/login")

            
            // Redirecionar para login ou dashboard
        }
    } catch (error: any) {
        // Se cair no catch, o Axios geralmente coloca o erro em error.response
        // Se for Axios, a mensagem do backend está em error.response.data.message
        // const serverMessage = error.response?.data?.message;
        
        // if (serverMessage) {
        //     alert(serverMessage); // Vai mostrar "Este e-mail já está cadastrado."
        // } else {
        //     alert("Ocorreu um erro inesperado no servidor.");
        // }
        
        // console.error("Erro capturado:", error);
        setToastIsOpen(true);
        setTimeout(() => {
            setToastIsOpen(false)
        }, 1000 * 5);
        setToastMessage(error.message)
    }
};



    return(
        <>
            <Head>
                <title>Onebitflix - Registro</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
                <script src="https://jsuites.net/v5/jsuites.js"></script>
            </Head>
            <main className={styles.main}>
                <HeaderGeneric 
                    logoUrl="/" 
                    btnUrl="/login" 
                    btnContent="quero fazer login"
                />
                <Container className="py-5">
                    <p className={styles.formTitle}><strong>Bem-vindo(a) ao OneBitFlix!</strong></p>
                    <Form className={styles.form} onSubmit={handleRegister}>
                        <p className="text-center"><strong>Faça a sua conta!</strong></p>
                        <FormGroup>
                            <Label for="firstName" className={styles.label}>NOME</Label>
                            <Input 
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="Qual o seu nome?"
                                required
                                maxLength={120}
                                className={styles.inputName}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName" className={styles.label}>SOBRENOME</Label>
                            <Input 
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Qual o seu sobrenome?"
                                required
                                maxLength={120}
                                className={styles.inputName}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone" className={styles.label}>WHATSAPP / TELEGRAM</Label>
                            <Input 
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="(XX) 9XXXX XXXX"
                                data-mask="[-]+55 (00) 00000-0000"
                                required
                                className={styles.input}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email" className={styles.label}>EMAIL</Label>
                            <Input 
                                id="email"
                                name="email"
                                type="tel"
                                placeholder="email@provider.com"
                                required
                                maxLength={120}
                                className={styles.input}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="birth" className={styles.label}>DATA DE NASCIMENTO</Label>
                            <Input 
                                id="birth"
                                name="birth"
                                type="date"
                                min="1930-01-01"
                                max="2022-12-31"
                                required                                
                                className={styles.input}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" className={styles.label}>SENHA</Label>
                            <Input 
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Digite a sua senha (Min: 6 | Max: 32)"
                                required      
                                minLength={6}
                                maxLength={32}                          
                                className={styles.input}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword" className={styles.label}>CONFIRME SUA SENHA</Label>
                            <Input 
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirme a sua senha"
                                required      
                                minLength={6}
                                maxLength={32}                          
                                className={styles.input}
                            />
                        </FormGroup>
                        <Button type="submit" outline className={styles.formBtn}>
                            CADASTRAR
                        </Button>
                    </Form>
                </Container>
                <Footer />
                <ToastComponent 
                color="bg-danger" 
                isOpen={toastIsOpen} 
                message={toastMessage}
                />
            </main>
        </>
    )
}

