import { FC, useEffect, useState } from "react";
import styles from "./StatusNumber.module.scss";
import axios from "axios";
import { BASE_URL, authToken } from "@/shared/variables";

export const StatusNumber: FC = () => {
    const [count, setCount] = useState<number[]>([]);
    const getCounts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/applications/form/`, authToken);
            setCount([
                response.data.data.closed_count,
                response.data.data.created_count,
                response.data.data.in_progress_count,
            ]);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getCounts();
    }, []);
    return (
        <div className={styles.StatusNumber}>
            <div>
                Создано: <div>{count[1]}</div>
            </div>
            <div className={styles.Line} />
            <div>
                В работе: <div>{count[2]}</div>
            </div>
            <div className={styles.Line} />
            <div>
                Закрыто: <div>{count[0]}</div>
            </div>
        </div>
    );
};
