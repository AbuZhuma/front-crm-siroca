import { FC } from "react";
import styles from "./DatesContainer.module.scss";
import { editRequestApi } from "../../api/editRequestApi";
import { PayContainer } from "./ui/PayContainer/PayContainer";
import { DateInput } from "./ui/DateInput/DateInput";
import { CustomInput } from "@/shared/ui";

export const DatesContainer: FC = () => {
    const { requestState, requestChange } = editRequestApi();
    return (
        <div className={styles.DatesContainer}>
            <div className={styles.Dates}>
                <div className={styles.Inner}>
                    <DateInput
                        text="Дата начала"
                        name="start_date"
                        value={requestState.start_date}
                    />
                    <div className={styles.DateInput}>
                        <p>Срок выполнения</p>
                        <CustomInput
                            placeholder="N часов"
                            value={requestState.deadline_date === null ? "" : requestState.deadline_date}
                            name="deadline_date"
                            change={requestChange}
                            width={282}
                        />
                    </div>
                    <DateInput
                        text="Дата отправки"
                        name="offer_date"
                        value={requestState.offer_date}
                    />
                </div>
                <div className={styles.Inner}>
                    <DateInput
                        text="Дата завершения"
                        name="finish_date"
                        value={requestState.finish_date}
                    />
                    <DateInput
                        text="Дата подачи"
                        name="application_date"
                        value={requestState.application_date}
                    />
                    <DateInput
                        text="Дата утверждения"
                        name="confirm_date"
                        value={requestState.confirm_date}
                    />
                </div>
            </div>
            <PayContainer />
        </div>
    );
};
