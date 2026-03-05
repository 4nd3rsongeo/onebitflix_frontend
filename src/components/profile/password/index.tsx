import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../../styles/profile.module.scss";
import { useEffect, useState } from "react";
import { profileService } from "src/services/profileService";
import ToastComponent from "src/components/common/toast";

export default function PasswordForm(){
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [color, setColor] = useState("");
    const [toastIsOpen, setToastIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        profileService.fetchCurrent().then((password) => {
            setCurrentPassword(password.currentPassword);
            setNewPassword(password.newPassword);
        });
    }, []);


    const handlePasswordUpdate = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        if(newPassword !== confirmNewPassword) {
            setToastIsOpen(true);
            setColor("bg-danger");
            setErrorMessage("Senha e confirmação não coincidem.");
            setTimeout(() => {
                setToastIsOpen(false);
            }, 1000*3);
            return
        }
        if(currentPassword === newPassword) {
            setToastIsOpen(true);
            setColor("bg-danger");
            setErrorMessage("A nova senha deve ser diferente da senha atual.");
            setTimeout(() => {
                setToastIsOpen(false);
            }, 1000*3);
        } else {
            const res = await profileService.passwordUpdate({
                currentPassword,
                newPassword
            })

            if(res === 200 || res === 204) {     
                setToastIsOpen(true);
                setColor("bg-success");
                setErrorMessage("Senha atualizada com sucesso!");   

                setCurrentPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
            }

            if(res === 400) {     
                setToastIsOpen(true);
                setColor("bg-danger");
                setErrorMessage("Senha atual incorreta.");
                setTimeout(() => {
                    setToastIsOpen(false);
                }, 1000*3);
            }
        }     
    };

    return (
        <>
            <Form onSubmit={handlePasswordUpdate} className={styles.form}>
                <div className={styles.inputNormalDiv}>
                    <FormGroup>
                        <Label className={styles.label} for="currentPassword">
                            SENHA ATUAL
                        </Label>
                        <Input
                            name="currentPassword"
                            type="password"
                            id="currentPassword"
                            placeholder="Digite sua senha atual"
                            required
                            minLength={6}
                            maxLength={20}
                            value={currentPassword}
                            onChange={(event) => {
                                setCurrentPassword(event.currentTarget.value)
                            }}
                            className={styles.input}
                        />
                    </FormGroup>
                </div>
                <div className={styles.inputFlexDiv}>
                    <FormGroup>
                        <Label className={styles.label} for="newPassword">
                            NOVA SENHA
                        </Label>
                        <Input
                            name="newPassword"
                            type="password"
                            id="newPassword"
                            placeholder="Digite sua nova senha"
                            required
                            minLength={6}
                            maxLength={20}
                            value={newPassword}
                            onChange={(event) => {
                                setNewPassword(event.currentTarget.value)
                            }}
                            className={styles.inputFlex}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className={styles.label} for="confirmNewPassword">
                            CONFIRMAR NOVA SENHA
                        </Label>
                        <Input
                            name="confirmNewPassword"
                            type="password"
                            id="confirmNewPassword"
                            placeholder="Confirme sua nova senha"
                            required
                            minLength={6}
                            maxLength={20}
                            value={confirmNewPassword}
                            onChange={(event) => {
                                setConfirmNewPassword(event.currentTarget.value)
                            }}
                            className={styles.inputFlex}
                        />
                    </FormGroup>
                    <Button type="submit" className={styles.formBtn} outline>
                        Salvar Alterações
                    </Button>
                </div>
            </Form>
            <ToastComponent color={color} isOpen={toastIsOpen} message={errorMessage} />
        </>
    )
}