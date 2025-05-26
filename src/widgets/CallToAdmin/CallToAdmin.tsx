import { Call, CloseSquare, Sms, Whatsapp } from "iconsax-react";
import styles from "./CallToAdmin.module.scss";
import { ICallToAdminModal } from "./types";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/shared/variables";

export const CallToAdmin: FC<ICallToAdminModal> = (props) => {
    const [contacts, setContacts] = useState({
        email: "",
        phone_number: "",
        whatsapp_number: "",
    });
    const getContacts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users/admin_contacts_list/`);
            setContacts(response.data[0]);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getContacts();
    }, []);
    const { setModal } = props;

    return (
        <div className={styles.CallToAdmin}>
            <div className={styles.header}>
                <div className={styles.tpg}>
                    <p className={styles.prgTp}>Возникли проблемы со входом?</p>
                    <p className={styles.prgBt}>Обратитесь к Администратору!</p>
                </div>
                <CloseSquare
                    cursor={"pointer"}
                    size={34}
                    onClick={() => setModal(false)}
                />
            </div>
            <div className={styles.Contacts}>
                <p className={styles.contPrg}>Контакты:</p>
                <div className={styles.Contact}>
                    <Whatsapp
                        size={34}
                        variant="Bold"
                        color="#717171"
                    />
                    <p>
                        WhatsApp:{" "}
                        <a href={`https://wa.me/${contacts ? contacts.whatsapp_number : ""}`}>
                            {" "}
                            wa.me/{contacts ? contacts.whatsapp_number : ""}
                        </a>
                    </p>
                </div>
                <div className={styles.Contact}>
                    <Sms
                        size={34}
                        variant="Bold"
                        color="#717171"
                    />
                    <p>
                        Электронная почта:{" "}
                        <a href={`mailto:${contacts ? contacts.email : ""}`}>{contacts ? contacts.email : ""}</a>
                    </p>
                </div>
                <div className={styles.Contact}>
                    <Call
                        size={34}
                        variant="Bold"
                        color="#717171"
                    />
                    <p>
                        Телефон для справок:{" "}
                        <a href={`tel:+${contacts ? contacts.phone_number : ""}`}>
                            {contacts ? contacts.phone_number : ""}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};
