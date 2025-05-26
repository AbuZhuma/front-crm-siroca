import { FC, useState } from "react";
import styles from "./HeaderBottom.module.scss";
import { Edit } from "iconsax-react";
import { Modal } from "antd";
import { CreateRequest } from "@/widgets";
import { FilterButton, ReportButton, ReqSearch, TimeFilter } from "./ui";
import { allCompaniesListApi, permissionsApi, postRequestApi } from "@/shared/api";
import { useMediaQuery } from "@/shared/hooks";
import { SuccessNotif } from "@/shared/ui";
import { role_type } from "@/shared/variables";

export const HeaderBottom: FC<{ isAdminManager: boolean }> = ({ isAdminManager }) => {
    const [modal, setModal] = useState<boolean>(false);
    const [isFilter, setIsFilter] = useState(false);
    const { formatedState } = permissionsApi();
    const { resetPostRequest } = postRequestApi();
    const { setCompanyInputState } = allCompaniesListApi();
    const onFilter = () => {
        setIsFilter(!isFilter);
    };
    const closeFunc = () => {
        setModal(false);
        resetPostRequest();
        setCompanyInputState("");
    };
    const w = useMediaQuery();
    return (
        <div
            className={styles.HeaderBottom}
            style={{ maxWidth: isAdminManager ? "1764px" : "1820px" }}
        >
            <TimeFilter
                isFilter={isFilter}
                isAdminManager={isAdminManager}
            />
            <div
                className={styles.BottomRight}
                style={{
                    width: isAdminManager ? (w >= 1820 ? "77%" : w >= 1520 ? "70%" : "67%") : w >= 1820 ? "77%" : "70%",
                    right: isAdminManager ? (w >= 1820 ? "2%" : "2%") : w >= 1820 ? "0%" : "2%",
                }}
            >
                <ReqSearch />
                <div className={styles.SecondRight}>
                    <FilterButton onClick={onFilter} />
                    {role_type === "" && (
                        <div style={{ display: "flex", gap: "16px" }}>
                            <button
                                aria-label="createRequest"
                                onClick={() => setModal(true)}
                                className={styles.ButtonRequest}
                            >
                                Создать заявку
                                <Edit
                                    size={24}
                                    color="white"
                                />
                            </button>
                            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                <ReportButton />
                            </div>
                        </div>
                    )}
                    {role_type === "client" && (
                        <div style={{ display: "flex", gap: "16px" }}>
                            {formatedState && formatedState.client_can_create_application_extra ? (
                                <button
                                    aria-label="createRequest"
                                    onClick={() => setModal(true)}
                                    className={styles.ButtonRequest}
                                >
                                    Создать заявку
                                    <Edit
                                        size={24}
                                        color="white"
                                    />
                                </button>
                            ) : null}

                            {formatedState && formatedState.client_can_get_reports_extra ? (
                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <ReportButton />
                                </div>
                            ) : null}
                        </div>
                    )}
                    {role_type === "manager" && (
                        <div style={{ display: "flex", gap: "16px" }}>
                            <button
                                aria-label="createRequest"
                                onClick={() => setModal(true)}
                                className={styles.ButtonRequest}
                            >
                                Создать заявку
                                <Edit
                                    size={24}
                                    color="white"
                                />
                            </button>
                            {formatedState && formatedState.manager_can_get_reports_extra ? (
                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <ReportButton />
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>
            <Modal
                centered
                width={w >= 1820 ? 500 : 375}
                open={modal}
                onCancel={closeFunc}
            >
                <div className={styles.modal}>
                    <CreateRequest setModal={setModal} />
                </div>
            </Modal>
            <SuccessNotif />
        </div>
    );
};
