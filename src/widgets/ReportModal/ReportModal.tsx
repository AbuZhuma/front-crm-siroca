import { CloseSquare, ImportCurve } from "iconsax-react";
import { ReportForm } from "./ReportForm/ReportForm";
import styles from "./ReportModal.module.scss";
import { FC, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/shared/variables";
import Excel from "@/shared/assets/excel.svg";
import { IReportModal } from "./types/types";
import { successNotifApi } from "@/shared/api";
import { loadingStatus } from "../Loading/api/loadingStatus";

interface ResultsData {
    company: (string | null)[];
    maneger: (string | null)[];
    begin: string;
    end: string;
}

export interface ExcelData {
    filtered_data_size: number;
    results: { company: string }[];
}

export const ReportModal: FC<IReportModal> = (props) => {
    const { setModal } = props;
    const [results, setResults] = useState<ResultsData | null>(null);
    const [excel, setExcel] = useState<ExcelData | false | null>();

    const subResults = async (e: ResultsData) => {
        setResults(e);
        try {
            const response = await axios.get(
                `${BASE_URL}/applications/filter/?
                ${e.company.length ? `company_name=${e.company.map((el) => (el === null ? "" : `${el}`))}` : ""}
                ${e.maneger.length ? `&manager_first_name=${e.maneger.map((el) => (el !== null ? `${el}` : ""))}` : ""}
                ${e.begin ? `&start_date=${e.begin}&` : ""}
                ${e.end ? `&finish_date=${e.end}` : ""}`,
                {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("access")}`,
                    },
                },
            );

            if (response.status === 200) {
                setExcel(response.data);
            } else {
                setExcel(false);
            }
        } catch (error) {
            setExcel(false);
        }
    };
    function removeSpaces(text: string) {
        return text.replace(/\s+/g, "");
    }
    const { setState } = successNotifApi();
    const {setStatus} = loadingStatus()
    const downLoad = async () => {
        try {
            await setStatus("norm")
            const response = await axios.get(
                `${BASE_URL}/applications/filter/export-to-excel/?${results?.company ? `company_name=${results.company.map((el) => (el === null ? "" : `${removeSpaces(el)}`))}` : ""}${results?.maneger ? `&manager_first_name=${results.maneger.map((el) => (el !== null ? `${removeSpaces(el)}` : "")).join("")}` : ""}${results?.begin ? `&start_date=${results.begin}&` : ""}${results?.end ? `&finish_date=${results.end}` : ""}`,
                {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("access")}`,
                    },
                    responseType: "arraybuffer", // Указываем тип ответа как массив байтов
                },
            );

            // Создаем объект Blob из полученных данных
            const blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            // Создаем ссылку для скачивания файла
            const url = window.URL.createObjectURL(blob);

            // Создаем ссылку для загрузки
            const a = document.createElement("a");
            a.href = url;
            a.download = `${results?.company.map(el => el)},Report.xlsx`; // Укажите имя файла
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            setModal(false);
            setState("Скачивание отчета успешно завершено!");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.RepModalWindow}>
            <div className={styles.Header1}>
                <p>Скачивание отчета</p>
                <CloseSquare
                    cursor={"pointer"}
                    onClick={() => setModal(false)}
                    color="black"
                    size={34}
                />
            </div>
            <div className={styles.Header2}>
                <p>Введите данные для поиска:</p>
            </div>
            <div className={styles.Form}>
                <ReportForm
                    onSub={subResults}
                    setExcel={setExcel}
                />
            </div>
            <div className={styles.Results}>
                <p>Результаты:</p>
            </div>
            {excel ? (
                <div className={styles.ExcelCont}>
                    <div className={styles.ExelUpload}>
                        <div className={styles.ItemXl}>
                            <img
                                className={styles.ExcelImg}
                                src={Excel}
                            />
                            <p className={styles.Name}>
                                {results?.company[0]
                                    ? results?.company.map((el, index) => (index === 1 ? ` ,${el}` : `${el}`))
                                    : "Отчет заявок"}
                            </p>
                        </div>
                        <p className={styles.kb}>{excel.filtered_data_size / 1000} kb</p>
                    </div>
                    <button
                        onClick={downLoad}
                        className={styles.DonwloadBtn}
                    >
                        Скачать <ImportCurve width={30} />
                    </button>
                </div>
            ) : null}
            {excel === false ? (
                <div className={styles.NotFount}>
                    <p>По вашему запросу ничего не найдено!</p>
                </div>
            ) : null}
        </div>
    );
};
