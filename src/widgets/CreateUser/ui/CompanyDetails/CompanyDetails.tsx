import styles from "./CompanyDetails.module.scss";
import { Modal } from "antd";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { ButtonCreate, ItemExists } from "@/shared/ui";
import { CreateJobTitle } from "@/widgets/CreateJobTitle/CreateJobTitle";
import { postUserApi } from "../../api/postUserApi";
import { allCompaniesListApi, jobTitlesApi } from "@/shared/api";
import { inputBorder } from "@/shared/helpers";
import { useMediaQuery } from "@/shared/hooks";

export const CompanyDetails: FC<{ company?: string }> = ({ company }) => {
    const {
        companyInputState,
        setCompanyInputState,
        searchCompaniesNamesList,
        companyInputChange,
        companyExists,
        getAllCompaniesList,
    } = allCompaniesListApi();
    const {
        postUserState,
        addCompanyToPostUser,
        postUserChange,
        postUserAdded,
        jobTitleExists,
        setJobTitleExist,
        addJobTitleToPostUser,
    } = postUserApi();
    const { jobTitlesList, getJobTitlesList, setJobTitleSearchInput, searchJobTitleList, searchJobTitleChange } =
        jobTitlesApi();
    const [jobTitleModal, setJobTitleModal] = useState<boolean>(false);
    const jobTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        postUserChange(e), setJobTitleExist(jobTitlesList), searchJobTitleChange(e);
    };
    const addCompany = (company: string) => {
        setCompanyInputState(company);
        addCompanyToPostUser(company);
    };
    const addJobTitle = (jobTitle: string) => {
        addJobTitleToPostUser(jobTitle), setJobTitleSearchInput(jobTitle);
        setJobTitleExist(jobTitlesList);
    };
    const companyChange = (e: ChangeEvent<HTMLInputElement>) => {
        postUserChange(e), companyInputChange(e);
    };
    useEffect(() => {
        company && addCompanyToPostUser(company);
    }, [company]);
    useEffect(() => {
        getJobTitlesList();
        getAllCompaniesList();
    }, []);
    const w = useMediaQuery();
    return (
        <div className={styles.CompanyDetails}>
            <div className={styles.Bottom}>
                <div className={styles.Text}>Компания</div>
                <div className={styles.AddCompany}>
                    {company ? (
                        <div className={styles.CompanyAdded}>{company}</div>
                    ) : (
                        <div className={styles.Input}>
                            <input
                                value={postUserState.main_company}
                                type="text"
                                style={{
                                    border: inputBorder(companyInputState, postUserAdded.main_company, companyExists),
                                }}
                                name="main_company"
                                placeholder="Напишите..."
                                onChange={companyChange}
                            />
                            <ItemExists
                                inputState={companyInputState}
                                exists={companyExists}
                                text="Компании с таким названием не существует! Повторите попытку, или создайте новую компанию."
                            />
                        </div>
                    )}
                    <div className={styles.SearchList}>
                        {searchCompaniesNamesList.map((company, i) => (
                            <p
                                key={i}
                                onClick={() => addCompany(company)}
                            >
                                {company}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.Bottom}>
                <div className={styles.Text}>Должность в компании</div>
                <div className={styles.AddJobTitle}>
                    <div className={styles.Input}>
                        <input
                            value={postUserState.job_title}
                            name="job_title"
                            style={{
                                border: inputBorder(postUserState.job_title, postUserAdded.job_title, jobTitleExists),
                            }}
                            placeholder="Напишите..."
                            onChange={jobTitleChange}
                        />
                        <ItemExists
                            inputState={postUserState.job_title}
                            exists={jobTitleExists}
                            text="Данной должности не существует! Повторите попытку, или создайте новую должность."
                        />
                    </div>
                    <div className={styles.SearchList}>
                        {searchJobTitleList.map((jobTitle, i) => (
                            <p
                                key={i}
                                onClick={() => addJobTitle(jobTitle)}
                            >
                                {jobTitle}
                            </p>
                        ))}
                    </div>
                    <ButtonCreate onClick={() => setJobTitleModal(true)} />
                </div>
            </div>
            <Modal
                width={w >= 1820 ? 700 : 524}
                centered
                open={jobTitleModal}
                onCancel={() => setJobTitleModal(false)}
                zIndex={10}
            >
                <CreateJobTitle setModal={setJobTitleModal} />
            </Modal>
        </div>
    );
};
