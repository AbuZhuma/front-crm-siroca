import { FC } from "react";
import styles from "./PayContainer.module.scss";
import { editRequestApi } from "../../../../api/editRequestApi";

export const PayContainer: FC = () => {
    const { requestState, requestChange } = editRequestApi();
    return (
        <div className={styles.PayContainer}>
            <div className={styles.Text}>Статус оплаты:</div>
            <div className={styles.Pay}>
                <div className={styles.UniPay}>
                    <input
                        id="paid"
                        type="radio"
                        name="payment_state"
                        onChange={requestChange}
                        value={"Оплачено"}
                        checked={requestState.payment_state === "Оплачено" ? true : false}
                    />
                    <label htmlFor="paid">Оплачено</label>
                </div>
                <div className={styles.UniPay}>
                    <input
                        id="not_paid"
                        type="radio"
                        name="payment_state"
                        onChange={requestChange}
                        value={"Не оплачено"}
                        checked={requestState.payment_state === "Не оплачено" ? true : false}
                    />
                    <label htmlFor="not_paid">Не оплачено</label>
                </div>
                <div className={styles.UniPay}>
                    <input
                        id="wait_paid"
                        type="radio"
                        name="payment_state"
                        onChange={requestChange}
                        value={"Ожидание оплаты"}
                        checked={requestState.payment_state === "Ожидание оплаты" ? true : false}
                    />
                    <label htmlFor="wait_paid">Ожидание оплаты</label>
                </div>
            </div>
        </div>
    );
};
