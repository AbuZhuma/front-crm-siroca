import { Popover, TabsProps } from "antd";
import { RequestList } from "@/widgets";
import { ConfigProvider, Tabs } from "antd";
import {
    ChangeEvent,
    Dispatch,
    FC,
    KeyboardEvent,
    MouseEvent,
    RefObject,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import styles from "./TimeFilter.module.scss";
import { IGetRequest, getRequestApi } from "@/widgets/RequestList/api/getRequestApi";
import { ArrowLeft2, Calendar, CloseSquare } from "iconsax-react";
import { SelectFilterItem } from "./ui/SelectFilterItem";
import axios from "axios";
import { BASE_URL, authToken, prioritiesList, statusesList } from "@/shared/variables";
import { InputSelects } from "./ui/InputSelect";
import { useFilter } from "./api/useTimeFilter";
import { useMediaQuery } from "@/shared/hooks";
import { CustomDatePicker } from "@/shared/ui";
export interface FilterItem {
    selected: string[];
    text: string;
    type: string;
    prevValues: string[];
    isOpen: boolean;
    values: string[];
}

interface ITimeFilter {
    isAdminManager: boolean;
    isFilter: boolean;
}
export const TimeFilter: FC<ITimeFilter> = ({ isAdminManager, isFilter }) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const { setState } = useFilter();
    const w = useMediaQuery();
    const proc = w / 100;
    //There we saveing all choosed or not selects
    const [filterItems, setFilterItems] = useState<FilterItem[]>([
        { text: "Номер", type: "task_number", isOpen: false, values: [], prevValues: [], selected: [] },
        { text: "Компания", type: "company", isOpen: false, values: [], prevValues: [], selected: [] },
        { text: "Название", type: "title", isOpen: false, values: [], prevValues: [], selected: [] },
        {
            text: "Описание",
            type: "short_description",
            isOpen: false,
            values: [],
            prevValues: [],
            selected: [],
        },
        { text: "Заявитель", type: "main_client", isOpen: false, values: [], prevValues: [], selected: [] },
        { text: "Менеджер", type: "main_manager", isOpen: false, values: [], prevValues: [], selected: [] },
        { text: "Дата начала", type: "start_date", isOpen: false, values: [], prevValues: [], selected: [] },
        {
            text: "Дата завершения",
            type: "finish_date",
            isOpen: false,
            values: [],
            prevValues: [],
            selected: [],
        },
        { text: "Приоритет", type: "priority", isOpen: false, values: [], prevValues: [], selected: [] },
        { text: "Статус", type: "status", isOpen: false, values: [], prevValues: [], selected: [] },
    ]);
    const [startDate, setStartDate] = useState<string>("");
    const [finishDate, setFinishDate] = useState<string>("");
    const [startIsOpen, setStartIsOpen] = useState<boolean>(false);
    const [finishIsOpen, setFinishIsOpen] = useState<boolean>(false);
    //Thats for entDs, NOT MY CODE
    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Все время",
            children: (
                <RequestList
                    isAdminManager={isAdminManager}
                    api={"all_time=1"}
                />
            ),
        },
        {
            key: "2",
            label: "Неделя",
            children: (
                <RequestList
                    isAdminManager={isAdminManager}
                    api={"week=0"}
                />
            ),
        },
        {
            key: "3",
            label: "Месяц",
            children: (
                <RequestList
                    isAdminManager={isAdminManager}
                    api={"month=1"}
                />
            ),
        },
    ];
    //Fetching in zustand all state
    const fetchRequest = getRequestApi();
    const reqsFilter = fetchRequest.filterState;
    //Change filter state to defoult mean
    const fullFilterState = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/applications/form/?page=${fetchRequest.now}`, authToken);
            fetchRequest.setFilterState(response.data.data.results);
        } catch (error) {
            console.log(error);
        }
    };

    //Beetwin all selects value
    const beetwinSelcetsVal = () => {
        fullFilterState();
        const timeState = [...filterItems];
        timeState.forEach((el: FilterItem) => {
            if (el.type === "status" || el.type === "priority") {
                el.values = el.type === "priority" ? prioritiesList : statusesList;
                el.prevValues = el.type === "priority" ? prioritiesList : statusesList;
            } else {
                const vals = reqsFilter.map((elem: IGetRequest) => {
                    const id = el.type;
                    return String(elem[id]); // Преобразуем значение в строку
                });
                el.values = vals;
                el.prevValues = vals;
            }
        });
        setFilterItems(timeState);
    };
    //Func to close of already open selecters
    const closeAllSelect = (): void => {
        // setIsMounted(false);
        setFilterItems((prevFilterItems: FilterItem[]) =>
            prevFilterItems.map((el: FilterItem) => (el.text ? { ...el, isOpen: false } : el)),
        );
    };

    //Func to open selector or dropdawn
    const openDropDown = (e: React.MouseEvent<HTMLDivElement>) => {
        beetwinSelcetsVal();
        const targetId = (e.target as HTMLDivElement)?.id; // Проверяем, что e.target является HTMLDivElement и имеет свойство id
        if (targetId) {
            setFilterItems((prevFilterItems: FilterItem[]) =>
                prevFilterItems.map((el: FilterItem) =>
                    el.text === targetId ? { ...el, isOpen: !el.isOpen } : { ...el, isOpen: false },
                ),
            );
        }
    };
    //Func to push or edit filter items with id
    const updateFilterItems = (newFilterItem: FilterItem) => {
        setFilterItems((prevFilterItems: FilterItem[]) => {
            const existingItemIndex = prevFilterItems.findIndex((item) => item.type === newFilterItem.type);

            if (existingItemIndex !== -1) {
                return prevFilterItems.map((item, index) => {
                    if (index === existingItemIndex) {
                        return { ...item, selected: [...item.selected, ...newFilterItem.selected] };
                    }
                    return item;
                });
            } else {
                return [...prevFilterItems, newFilterItem];
            }
        });
    };
    //There i calling update func on confirm the selects
    const getSelect = (e: { type: string; selected: string[]; value?: string[] }) => {
        closeAllSelect();
        setIsMounted(true);
        updateFilterItems({
            type: e.type,
            selected: e.selected,
            isOpen: true,
            values: [],
            prevValues: [],
            text: "",
        });
    };

    //Func to get date input values
    const onChangeDate = (e: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>) => {
        if ("key" in e && e.key === "Enter") {
            const timeState = [...filterItems];
            timeState.forEach((el, i) => {
                if (
                    (el.type === "finish_date" && e.currentTarget.id === "finish_date") ||
                    (el.type === "start_date" && e.currentTarget.id === "start_date")
                ) {
                    timeState[i].selected = el.type === "finish_date" ? [finishDate] : [startDate];
                }
            });
            setIsMounted(true);
            setFilterItems(timeState);
        } else if ("button" in e) {
            const timeState = [...filterItems];
            timeState.forEach((el, i) => {
                if (
                    (el.type === "finish_date" && e.currentTarget.id === "finish_date") ||
                    (el.type === "start_date" && e.currentTarget.id === "start_date")
                ) {
                    timeState[i].selected = el.type === "finish_date" ? [finishDate] : [startDate];
                }
            });
            setIsMounted(true);
            setFilterItems(timeState);
        }
    };
    const onChangeCurDate = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.id === "finish_date") {
            setFinishDate(e.currentTarget.value);
        } else {
            setStartDate(e.currentTarget.value);
        }
    };

    //There im uping the filters to backend, im mapping all choosed selects end filter.
    //Thats already working

    const upSelects = async () => {
        try {
            const url = `${BASE_URL}/applications/form/?${filterItems
                .map((el) => {
                    return `&${el.type}=${el.selected.map((el) => {
                        return el;
                    })}`;
                })
                .join("")}`;
            const response = await axios.get(url, authToken);
            fetchRequest.setState(response.data.data.results);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    //Calling beetwinSelcetsVal
    useEffect(() => {
        beetwinSelcetsVal();
    }, []);
    //Thats useEf to caling the uoSelects on changes to mount and filter state

    const efSist = [
        filterItems[0].selected,
        filterItems[1].selected,
        filterItems[2].selected,
        filterItems[3].selected,
        filterItems[4].selected,
        filterItems[5].selected,
        filterItems[6].selected,
        filterItems[7].selected,
        filterItems[8].selected,
        filterItems[9].selected,
    ];
    useEffect(() => {
        setState(filterItems);
        if (isMounted) {
            upSelects();
        }
    }, efSist);
    //For clear the choosed filters

    const clearFilter = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/applications/form/?page=1`, authToken);
            fetchRequest.setState(response.data.data.results);
            fetchRequest.setFilterState(response.data.data.results);
            const timeState = [...filterItems];
            timeState.map((el: FilterItem) => {
                el.selected = [];
                el.values = [];
            });
            setStartDate("");
            setFinishDate("");
            setFilterItems(timeState);
            setIsMounted(false);
            setState(timeState);
        } catch (error) {
            console.log(error);
        }
    };

    //Thats func to dell the select about id
    const delSelect = (e: { target: { id: string; className: string } }) => {
        setFilterItems((prevFilterItems: FilterItem[]) =>
            prevFilterItems.map((el: FilterItem) =>
                el.type === e.target.id
                    ? {
                          ...el,
                          selected: el.selected.filter((el) => {
                              if (el === e.target.className) {
                                  return;
                              } else {
                                  return el;
                              }
                          }),
                      }
                    : { ...el, selected: el.selected },
            ),
        );
    };
    const timeFilter = (
        selectRef: RefObject<HTMLDivElement | HTMLInputElement>,
        selectRef2: RefObject<HTMLDivElement | HTMLInputElement>,
        setIsOpen?: Dispatch<SetStateAction<boolean>>,
        closeFunc?: () => void,
    ) => {
        const clickOutside: EventListener = (event: Event) => {
            const target = event.target as Node;
            if (
                setIsOpen &&
                selectRef.current &&
                !selectRef.current.contains(target) &&
                setIsOpen &&
                selectRef2.current &&
                !selectRef2.current.contains(target)
            ) {
                setIsOpen(false);
            } else if (closeFunc) {
                closeFunc();
            }
        };
        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    };
    const selectedRef = useRef<HTMLDivElement>(null);
    const selectedRef2 = useRef<HTMLDivElement>(null);
    useEffect(() => {
        timeFilter(selectedRef, selectedRef2, closeAllSelect);
    }, []);
    const smallTopInner = w > 1900 ? 1716 : proc * 89;
    const handleChangeDateStart = (e: ChangeEvent<HTMLInputElement> | undefined) => {
        e ? setStartDate(e.target.value) : null;
    };
    const handleChangeDateFinish = (e: ChangeEvent<HTMLInputElement> | undefined) => {
        e ? setFinishDate(e.target.value) : null;
    };
    return (
        <div>
            {isFilter ? ( //isFilter is the handle state open/close
                <div className={styles.DetailFilters}>
                    <ul style={{ width: w > 1900 ? 1760 : `${proc * 89}px` }}>
                        {filterItems.map((el: FilterItem, i) => {
                            //There im mapping filter items selector, dropdawn
                            //Cutting the words if is the long
                            const displayedText = el.text.length > 10 ? el.text.substring(0, 10) + "..." : el.text;
                            //There im geting date selectors
                            if (el.type === "finish_date" || el.type === "start_date") {
                                return (
                                    <div
                                        key={i}
                                        className={styles.filterDateInput}
                                    >
                                        <input
                                            className={styles.date}
                                            type="date"
                                            id={el.type}
                                            value={el.type === "finish_date" ? finishDate : startDate}
                                            onChange={(e) => onChangeCurDate(e)}
                                            onKeyDown={(e) => onChangeDate(e)}
                                        />
                                        <div className={styles.CalendarHide}>
                                            <Popover
                                                placement="bottomRight"
                                                content={
                                                    <div className={styles.Hidden}>
                                                        <CustomDatePicker
                                                            name="date"
                                                            value={el.type === "finish_date" ? finishDate : startDate}
                                                            onChange={
                                                                el.type === "finish_date"
                                                                    ? handleChangeDateFinish
                                                                    : handleChangeDateStart
                                                            }
                                                        />
                                                        <button
                                                            id={el.type}
                                                            className={styles.UseButton}
                                                            onClick={onChangeDate}
                                                        >
                                                            Применить
                                                        </button>
                                                    </div>
                                                }
                                                trigger={"click"}
                                                open={el.type === "finish_date" ? finishIsOpen : startIsOpen}
                                                onOpenChange={() => {
                                                    if (el.type === "finish_date") {
                                                        setFinishIsOpen(false);
                                                    } else {
                                                        setStartIsOpen(false);
                                                    }
                                                }}
                                            >
                                                <Calendar
                                                    cursor="pointer"
                                                    size={w < 1820 ? 17 : 25}
                                                    onClick={() => {
                                                        if (el.type === "finish_date") {
                                                            setFinishIsOpen(true);
                                                        } else [setStartIsOpen(true)];
                                                    }}
                                                />
                                            </Popover>
                                        </div>
                                    </div>
                                );
                            } else {
                                //Just if item not date type
                                return (
                                    <div
                                        ref={selectedRef2}
                                        key={el.text}
                                        className={el.isOpen ? styles.ItemOpen : styles.Item}
                                    >
                                        {el.isOpen ? ( //if selector is open we will render input
                                            <div>
                                                <div style={{ display: "flex" }}>
                                                    <div ref={selectedRef2}>
                                                        <InputSelects
                                                            setState={setFilterItems}
                                                            state={filterItems}
                                                            i={i}
                                                            placeholder={displayedText}
                                                            className={styles.SelInput}
                                                        />
                                                    </div>

                                                    <div
                                                        key={i}
                                                        className={styles.Icn}
                                                        style={el.isOpen ? { transform: "rotate(90deg)" } : undefined}
                                                        id={el.text}
                                                        onClick={(e) => openDropDown(e)}
                                                    >
                                                        <ArrowLeft2 id={el.text} />
                                                    </div>
                                                </div>

                                                {el.isOpen && (
                                                    <div ref={selectedRef}>
                                                        <SelectFilterItem
                                                            getSelect={getSelect}
                                                            el={el}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            //else just p
                                            <>
                                                <p
                                                    onClick={(e) => openDropDown(e)}
                                                    id={el.text}
                                                    key={el.text}
                                                >
                                                    {displayedText}
                                                </p>
                                                <div
                                                    key={`${el.text}-icon`}
                                                    id={el.text}
                                                    className={styles.Icn}
                                                    onClick={(e) => openDropDown(e)}
                                                >
                                                    <ArrowLeft2 id={el.text} />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            }
                        })}
                        <button
                            className={styles.Clear}
                            onClick={clearFilter}
                        >
                            <p> Сбросить фильтр </p>
                        </button>
                    </ul>
                    <div className={styles.selected}>
                        {/* There im rendering always choosed selects */}
                        {filterItems
                            ? filterItems.map((el) => {
                                  return el.selected.map((elim) => {
                                      return (
                                          <div
                                              className={styles.selectedItem}
                                              key={elim}
                                          >
                                              <p>{elim.length > 5 ? elim.substring(0, 8) + "..." : elim}</p>
                                              <div
                                                  onClick={() =>
                                                      delSelect({ target: { id: el.type, className: `${elim}` } })
                                                  }
                                                  id={el.type}
                                                  className={`${elim}`}
                                              >
                                                  <CloseSquare
                                                      size={16}
                                                      id={el.type}
                                                      className={`${elim}`}
                                                  />
                                              </div>
                                          </div>
                                      );
                                  });
                              })
                            : null}
                    </div>
                </div>
            ) : null}
            {/* After not my code  */}
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            inkBarColor: "#1C6AD2",
                            itemColor: "#252525",
                            itemHoverColor: "#1C6AD2",
                            itemSelectedColor: "#1C6AB1",
                            fontFamily: "Geologica",
                            fontSize: 20,
                            margin: isFilter ? (isMounted ? 110 : 70) : 10,
                        },
                    },
                }}
            >
                <Tabs
                    defaultActiveKey="1"
                    items={items}
                    tabBarStyle={{
                        padding: "24px",
                        width: isAdminManager ? `${smallTopInner}px` : `${smallTopInner}px`,
                        fontWeight: 900,
                        backgroundColor: "white",
                    }}
                />
            </ConfigProvider>
        </div>
    );
};
