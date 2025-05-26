import styles from "./JobTitles.module.scss";
import { Trash } from "iconsax-react";
import { jobTitlesApi } from "@/shared/api";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { ButtonCreate, ListTop, ListTopName, ItemInner, SearchInput } from "@/shared/ui";
import { JobTitleModals } from "./ui/JobTitleModals";

export const JobTitles: FC = () => {
    const [state, setState] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    const [position, setPosition] = useState<number>(0);
    const [modalReady, setModalReady] = useState<boolean>(false);
    const { jobTitlesList, setSearchList, searchList, getJobTitlesList } = jobTitlesApi();
    useEffect(() => {
        getJobTitlesList();
    }, []);
    const handleClick = () => {
        setState(!state);
        setPosition(0);
    };
    const search = (searchState: string) => {
        const results = jobTitlesList.filter((item) => item.title.toLowerCase().includes(searchState.toLowerCase()));
        setSearchList(results);
    };
    return (
        <>
            <div className={styles.JobTitles}>
                <div className={styles.Name}>Поиск по должностям</div>
                <div className={styles.Input}>
                    <SearchInput
                        onKeyDown={search}
                        closeFunc={() => setSearchList(jobTitlesList)}
                    />
                    <ButtonCreate onClick={() => setModal(true)} />
                    <button
                        className={styles.Trash}
                        onClick={handleClick}
                    >
                        <Trash color="white" />
                    </button>
                    <button
                        className={styles.Delete}
                        onClick={() => position > 0 && setModalReady(true)}
                        style={
                            position > 0
                                ? { color: "#e51616" }
                                : { color: "#a8a8a8" } && state
                                  ? { display: "block" }
                                  : { display: "none" }
                        }
                    >
                        Удалить
                    </button>
                    <button
                        className={styles.Cancel}
                        onClick={handleClick}
                        style={{ display: state ? "block" : "none" }}
                    >
                        Отменить
                    </button>
                </div>
                <div className={styles.JobTitlesList}>
                    <div className={styles.Top}>
                        <ListTop width={422}>
                            <ListTopName
                                name="Должности"
                                width={422}
                            />
                        </ListTop>
                    </div>
                    <div
                        className={styles.Inner}
                        style={{ overflowY: jobTitlesList.length > 11 ? "scroll" : "hidden" }}
                    >
                        {searchList.length > 0 ? (
                            searchList.map((card, i) => (
                                <div
                                    key={i}
                                    className={styles.Item}
                                >
                                    <ItemInner
                                        wordMaxLegth={40}
                                        width={422}
                                        content={card.title}
                                    />
                                    <input
                                        style={{ display: state ? "block" : "none" }}
                                        type="radio"
                                        name="delete"
                                        value={card.id}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setPosition(Number(e.target.value))
                                        }
                                    />
                                </div>
                            ))
                        ) : (
                            <div className={styles.Nothing}>По вашему запросу ничего не найдено</div>
                        )}
                    </div>
                </div>
            </div>
            <JobTitleModals
                position={position}
                modal={modal}
                setModal={setModal}
                modalReady={modalReady}
                setModalReady={setModalReady}
            />
        </>
    );
};
