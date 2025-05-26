import { Modal } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { ResetPassword, CreateJobTitle } from "@/widgets";
import { useMediaQuery } from "@/shared/hooks";

interface IEdituserModals {
    jobTitleModal: boolean;
    setJobTitleModal: Dispatch<SetStateAction<boolean>>;
    passwordModal: boolean;
    setPasswordModal: Dispatch<SetStateAction<boolean>>;
}

export const EditUserModals: FC<IEdituserModals> = (props) => {
    const { jobTitleModal, setJobTitleModal, passwordModal, setPasswordModal } = props;
    const w = useMediaQuery();
    return (
        <>
            <Modal
                width={w >= 1820 ? 700 : 524}
                centered
                open={jobTitleModal}
                onCancel={() => setJobTitleModal(false)}
                zIndex={10}
            >
                <CreateJobTitle setModal={setJobTitleModal} />
            </Modal>
            <Modal
                width={572}
                centered
                zIndex={12}
                open={passwordModal}
                onCancel={() => setPasswordModal(false)}
            >
                <ResetPassword setModal={setPasswordModal} />
            </Modal>
        </>
    );
};
