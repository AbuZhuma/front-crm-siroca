import { Modal } from "antd";
import { FC } from "react";
import { CreateJobTitle } from "@/widgets/CreateJobTitle/CreateJobTitle";
import { ReadyModal } from "@/widgets/ReadyModal/ReadyModal";
import { jobTitlesApi } from "@/shared/api";
import { IJobTitleModal } from "../types/types";
import { useMediaQuery } from "@/shared/hooks";
import { loadingStatus } from "@/widgets/Loading/api/loadingStatus";

export const JobTitleModals: FC<IJobTitleModal> = (props) => {
    const { position, modal, setModal, modalReady, setModalReady } = props;
    const { deleteJobTitle } = jobTitlesApi();
    const w = useMediaQuery();
    const {setStatus} = loadingStatus()
    return (
        <>
            <Modal
                centered
                width={w >= 1820 ? 700 : 524}
                open={modal}
                onCancel={() => setModal(false)}
                zIndex={10}
            >
                <CreateJobTitle setModal={setModal} />
            </Modal>
            <Modal
                centered
                open={modalReady}
                onCancel={() => setModalReady(false)}
                zIndex={12}
            >
                <ReadyModal
                    no={() => setModalReady(false)}
                    yes={() => {
                        deleteJobTitle(position);
                        setModalReady(false);
                        setStatus("norm");
                    }}
                >
                    <div>
                        <p>Вы уверены?</p>
                        <p>Данная должность будет удалена безвозвратно!</p>
                    </div>
                </ReadyModal>
            </Modal>
        </>
    );
};
