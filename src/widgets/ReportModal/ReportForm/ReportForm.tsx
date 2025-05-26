import React, { useState, FC, FormEvent, ChangeEvent, useEffect, KeyboardEvent, useRef } from "react";
import { Calendar, CloseSquare, SearchNormal } from "iconsax-react";
import styles from "./report.module.scss";
import { CustomDatePicker } from "@/shared/ui";
import { handleOutsideClick } from "@/shared/hooks";
import { ExcelData } from "../ReportModal";
import { profileApi, allUsersListApi, allCompaniesListApi } from "@/shared/api";
import { role_type } from "@/shared/variables";

interface ReportFormProps {
    onSub: (formData: FormData) => void;
    setExcel: (e: ExcelData | false | null) => void;
}

interface FormData {
    company: (string | null)[];
    maneger: (string | null)[];
    begin: string;
    end: string;
}

export const ReportForm: FC<ReportFormProps> = ({ onSub, setExcel }) => {
    const [openCompany, setOpenCompany] = useState<string>("");
    const [openManeger, setOpenManeger] = useState<string>("");
    const [openBegin, setOpenBegin] = useState<string>("");
    const [openEnd, setOpenEnd] = useState<string>("");

    const [showItems, setShowItems] = useState<(string | null)[]>([]);

    const [choosedFilters, setChoosedGilters] = useState<string[]>([]);
    const [choosedFiltersManager, setChoosedGiltersManager] = useState<string[]>([]);

    const { allCompaniesNamesList, getAllCompaniesList } = allCompaniesListApi();
    const { getAllUsersList, allManagersNamesList } = allUsersListApi();
    const { profileState } = profileApi();
    useEffect(() => {
        if (role_type === "client") {
            setChoosedGilters([profileState.main_company]);
        }
    }, [openCompany, choosedFilters]);
    const CleanFilters = () => {
        setChoosedGilters([]);
        setChoosedGiltersManager([]);
        setShowItems([]);
        setOpenCompany("");
        setOpenManeger("");
        setOpenBegin("");
        setOpenEnd("");
        setExcel(null);
    };

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (choosedFilters.length || choosedFiltersManager.length || openBegin.length || openEnd.length) {
            const formData: FormData = {
                company: choosedFilters,
                maneger: choosedFiltersManager,
                begin: openBegin,
                end: openEnd,
            };
            onSub(formData);
        } else {
            setExcel(false);
        }
    };

    const delSelect = (data: { type: string; text: string }) => {
        if (data.type === "manager") {
            const updatedFiltersManager = choosedFiltersManager.filter((el) => el !== data.text);
            setChoosedGiltersManager(updatedFiltersManager);
        } else {
            const updatedFilters = choosedFilters.filter((el) => el !== data.text);
            setChoosedGilters(updatedFilters);
        }
    };
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        setState: React.Dispatch<React.SetStateAction<string>>,
    ) => {
        if (e.target.id && e.target.id === "company") {
            const mapped = allCompaniesNamesList.map((el) => {
                if (el.includes(e.target.value)) {
                    return el;
                } else {
                    return null;
                }
            });
            setState(e.target.value);
            setShowItems(mapped);
        } else if (e.target.id && e.target.id === "manager") {
            setState(e.target.value);
        } else {
            setState(e.target.value);
        }
    };
    const addChoosed = (e: ChangeEvent<HTMLInputElement>) => {
        setOpenCompany("");
        if (!choosedFilters.includes(e.target.id) && e.target.checked === true) {
            setChoosedGilters([...choosedFilters, e.target.id]);
        } else if (!e.target.checked) {
            const find = [...choosedFilters];
            const filt = find.filter((el) => {
                if (el !== e.target.id) {
                    return el;
                } else {
                    return null;
                }
            });
            setChoosedGilters(filt);
        }
    };
    const addChoosedManager = (e: ChangeEvent<HTMLInputElement>) => {
        setOpenManeger("");
        if (!choosedFiltersManager.includes(e.target.id)) {
            setChoosedGiltersManager((prev) => [...prev, e.target.id]);
        }
    };

    const onEnter = (e: KeyboardEvent<HTMLUListElement>) => {
        if (e.key === "Enter") {
            setOpenCompany("");
            setOpenManeger("");
        }
    };

    const [startOpened, setStartOpened] = useState<boolean>(false);
    const [endOpened, setEndOpened] = useState<boolean>(false);

    const startRef = useRef<HTMLDivElement>(null);
    const endRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        getAllCompaniesList()
        getAllUsersList()
        handleOutsideClick(startRef, setStartOpened);
        handleOutsideClick(endRef, setEndOpened);
    }, []);

    return (
        <form
            onSubmit={submitForm}
            className={styles.Form}
        >
            <ul onKeyDown={onEnter}>
                <div className={styles.InputCont}>
                    <p>Компания</p>
                    <div className={styles.SearchIcn}>{role_type !== "client" && <SearchNormal size={16} />}</div>
                    <input
                        type="text"
                        placeholder="Введите текст..."
                        value={role_type === "" || role_type === "manager" ? openCompany : profileState.main_company}
                        id="company"
                        onChange={
                            role_type === "" || role_type === "manager"
                                ? (e) => handleInputChange(e, setOpenCompany)
                                : () => {}
                        }
                        className={styles.inpWithIcn}
                    />
                    <div className={styles.showItems}>
                        {openCompany &&
                            showItems &&
                            showItems.map((el, index) => {
                                if (el !== null && !choosedFilters.includes(el)) {
                                    return (
                                        <p
                                            id={`${index}`}
                                            key={index}
                                        >
                                            <label htmlFor={el}>{el} </label>
                                            <input
                                                type="checkbox"
                                                id={el}
                                                onChange={addChoosed}
                                            />
                                        </p>
                                    );
                                }
                            })}
                    </div>
                    <div className={styles.choosed}>
                        {role_type !== "client" &&
                            choosedFilters.map((el, i) => {
                                return (
                                    <div key={i}>
                                        <p>{el.length > 7 ? el.slice(0, 5) + ".." : el}</p>
                                        <CloseSquare
                                            cursor="pointer"
                                            size={20}
                                            onClick={() => {
                                                delSelect({ type: "company", text: el });
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        {choosedFiltersManager.map((el, i) => {
                            return (
                                <div key={i}>
                                    <p>{el.length > 5 ? el.slice(0, 5) + "..." : el}</p>
                                    <CloseSquare
                                        cursor="pointer"
                                        size={20}
                                        onClick={() => {
                                            delSelect({ type: "manager", text: el });
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.InputCont}>
                    <p>Менеджер</p>
                    <div className={styles.SearchIcn}>
                        <SearchNormal size={16} />
                    </div>
                    <input
                        type="text"
                        placeholder="Введите текст..."
                        value={openManeger}
                        id="manager"
                        onChange={(e) => handleInputChange(e, setOpenManeger)}
                        className={styles.inpWithIcn}
                    />
                    <div className={styles.showItems}>
                        {openManeger &&
                            allManagersNamesList &&
                            allManagersNamesList.map((el, index) => {
                                    return (
                                        <p
                                            id={`${index}`}
                                            key={index}
                                        >
                                            <label htmlFor={el}>{el} </label>
                                            <input
                                                type="checkbox"
                                                id={`${el}`}
                                                onChange={addChoosedManager}
                                            />
                                        </p>
                                    );
                            })}
                    </div>
                </div>
                <div className={styles.InputCont}>
                    <p>Дата начала</p>
                    <input
                        type="date"
                        placeholder=""
                        value={openBegin}
                        onChange={(e) => handleInputChange(e, setOpenBegin)}
                    />
                    <div className={styles.CalendarIcon}>
                        <div
                            ref={startRef}
                            onClick={() => setStartOpened(!startOpened)}
                        >
                            <Calendar />
                        </div>
                    </div>
                    {startOpened && (
                        <div
                            className={styles.DatePicker}
                            ref={startRef}
                        >
                            <CustomDatePicker
                                name="Дата начала"
                                value={openBegin}
                                onChange={(e) => e && handleInputChange(e, setOpenBegin)}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.InputCont}>
                    <p>Дата завершения</p>
                    <input
                        type="date"
                        placeholder=""
                        value={openEnd}
                        onChange={(e) => handleInputChange(e, setOpenEnd)}
                    />
                    <div className={styles.CalendarIcon}>
                        <div
                            ref={endRef}
                            onClick={() => setEndOpened(!endOpened)}
                        >
                            <Calendar />
                        </div>
                    </div>
                    {endOpened && (
                        <div
                            className={styles.DatePicker}
                            ref={endRef}
                        >
                            <CustomDatePicker
                                name="Дата завершения"
                                value={openEnd}
                                onChange={(e) => e && handleInputChange(e, setOpenEnd)}
                            />
                        </div>
                    )}
                </div>
            </ul>

            <div
                className={styles.EnterCont}
                style={{ marginTop: "-50px" }}
            >
                <a
                    href="#"
                    onClick={CleanFilters}
                >
                    Сбросить фильтр
                </a>
                <button type="submit">Применить</button>
            </div>
        </form>
    );
};
