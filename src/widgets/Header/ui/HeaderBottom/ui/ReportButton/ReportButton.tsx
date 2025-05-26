import { Modal } from "antd";
import styles from "./ReportButton.module.scss";
import { FC, useState } from "react";
import { ReportModal } from "@/widgets";
import { ImportCurve } from "iconsax-react";

export const ReportButton: FC = () => {
    const [modal, setModal] = useState<boolean>(false);
    return (
        <>
            <div
                onClick={() => setModal(true)}
                className={styles.Report}
            >
                <ImportCurve
                    size={27}
                    color="white"
                />
            </div>
            <Modal
                centered
                width={871}
                open={modal}
                onCancel={() => setModal(false)}
            >
                <ReportModal setModal={setModal} />
            </Modal>
        </>
    );
};
