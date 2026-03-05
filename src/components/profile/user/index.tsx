import { useEffect, useState } from "react";
import styles from "../../../../styles/profile.module.scss";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { profileService } from "src/services/profileService";
import ToastComponent from "src/components/common/toast";
import { useRouter } from "next/router";

export default function UserForm(){
    const router = useRouter();
    const [color, setColor] = useState("");
    const [toastIsOpen, setToastIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [initialEmail, setInitialEmail] = useState(email);
    const [createdAt, setCreatedAt] = useState("");
    const date = new Date(createdAt);
    const month = date.toLocaleDateString("default", { month: "long" });


    useEffect(() => {
        profileService.fetchCurrent().then((user) => {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setPhone(user.phone);
            setEmail(user.email);
            setInitialEmail(user.email);
            setCreatedAt(user.createdAt);
        })
    }, []);

    const handleUserUpdate = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await profileService.userUpdate({
            firstName, 
            lastName, 
            phone, 
            email, 
            createdAt
        });

        if(res === 200) {
            setToastIsOpen(true);
            setColor("bg-success");
            setErrorMessage("Perfil atualizado com sucesso!");
            setTimeout(() => setToastIsOpen(false), 1000 * 3);
            if(initialEmail !== email) {
                sessionStorage.clear();
                router.push("/");
            }
        } else  {
            setToastIsOpen(true);
            setColor("bg-danger");
            setErrorMessage("Você não pode mudar para esse email!");
            setTimeout(() => setToastIsOpen(false), 1000 * 3);
        }   

    }



    return(
        <>
            <Form className={styles.form} onSubmit={handleUserUpdate}>
                <div className={styles.formName}>
                    <p className={styles.nameAbbreviation}>
                        {firstName.charAt(0).toUpperCase()}{lastName.charAt(0).toUpperCase()}
                    </p>
                    <p className={styles.userName}>{firstName} {lastName}</p>
                </div>
                <div className={styles.memberTime}>
                    <img src="/profile/iconUserAccount.svg" alt="iconProfile" className={styles.memberTimeImg}/>
                    <p className={styles.memberTimeText}>
                        Membro desde {month} de {date.getFullYear()}.
                    </p>
                </div>
                <hr />
                <div className={styles.inputFlexDiv}>
                    <FormGroup>
                        <Label for="firstName">
                            NOME
                        </Label>
                        <Input 
                            name = "firstName"
                            type = "text"
                            id = "firstName"
                            placeholder = "qual é o seu primeiro nome?"
                            required
                            maxLength={20}
                            className={styles.inputFlex}
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">
                            SOBRENOME
                        </Label>
                        <Input 
                            name = "lastName"
                            type = "text"
                            id = "lastName"
                            placeholder = "qual é o seu sobrenome?"
                            required
                            maxLength={20}
                            className={styles.inputFlex}
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                        />
                    </FormGroup>
                </div>
                <div className={styles.inputNormalDiv}>
                    <FormGroup>
                        <Label for="phone">
                            WHATSAPP / TELEGRAM
                        </Label>
                        <Input 
                            name = "phone"
                            type = "tel"
                            id = "phone"
                            placeholder = "(XX) XXXXX-XXXX"
                            required
                            maxLength={20}
                            className={styles.inputFlex}
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">
                            E-MAIL
                        </Label>
                        <Input 
                            name = "email"
                            type = "email"
                            id = "email"
                            placeholder = "email@exemplo.com"
                            required
                            maxLength={20}
                            className={styles.input}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </FormGroup>
                    <Button className={styles.formBtn} outline type="submit">
                        Salvar Alterações
                    </Button>
                </div>
            </Form>
            <ToastComponent color={color} isOpen={toastIsOpen} message={errorMessage} />
        </>
    )
}