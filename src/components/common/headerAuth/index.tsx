import { Container, Form, Input } from "reactstrap";
import styles from "./styles.module.scss";
import Link from "next/link";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

Modal.setAppElement("#__next");

export default function HeaderAuth() {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [initials, setInitials] = useState("");

    useEffect(() => {
        const firstName = sessionStorage.getItem("onebitflix-firstName");
        const lastName = sessionStorage.getItem("onebitflix-lastName");

        if (firstName && lastName) {
            setInitials(`${firstName.charAt(0)}${lastName.charAt(0)}`);
        }
    }, []);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        router.push("/")
    }


    return (
        <>
        <Container className={styles.nav}>
            <Link href="/home">
            <img
                src="/logoOnebitflix.svg"
                alt="logoOnebitflix"
                className={styles.imgLogoNav}
            />
            </Link>
            <div className="d-flex align-items-center">
            <Form>
                <Input
                name="search"
                type="search"
                placeholder="Pesquisar"
                className={styles.input}
                />
            </Form>
            <img
                src="homeAuth/iconSearch.svg"
                alt="lupaHeader"
                className={styles.searchImg}
            />
            <p className={styles.userProfile} onClick={handleOpenModal}>
                {initials}
            </p>
            </div>
            <Modal
            isOpen={modalOpen}
            onRequestClose={handleCloseModal}
            shouldCloseOnEsc={true}
            className={styles.modal}
            overlayClassName={styles.overlayModal}
            >
                <Link href="/profile">
                    <p className={styles.modalLink}>Meus dados</p>
                </Link>
                <p className={styles.modalLink} onClick={handleLogout}>Sair</p>
            </Modal>
        </Container>
        </>
    );
}
