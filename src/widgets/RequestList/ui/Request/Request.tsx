import { FC } from "react";
import styles from "./Request.module.scss";
import { IRequest } from "./types/types";
import { ItemInner } from "@/shared/ui";
import { priorityColor, statusColor } from "@/shared/helpers";
import { Popover } from "antd";
import { useMediaQuery } from "@/shared/hooks";
import { getOneRequestApi } from "@/shared/api";

export const Request: FC<IRequest> = (props) => {
    const { request, isAdminManager, setView, view } = props;
    const fetchData = getOneRequestApi();
    const w = useMediaQuery();
    const proc = w / 100;
    return (
        <div
            onClick={() => {
                setView(true);
                fetchData.getOneRequest(request.id);
            }}
            className={`${styles.Request} ${fetchData.oneRequest.id === request.id && view ? styles.active : ""}`}
            style={{
                width: isAdminManager
                    ? view
                        ? `${w > 1900 ? 1012 : proc * 52}px`
                        : `${w > 1900 ? 1724 : proc * 89}px`
                    : view
                      ? `${w > 1900 ? 1152 : proc * 54}px`
                      : `${w > 1900 ? 1820 : proc * 92}px`,
            }}
        >
            <ItemInner
                wordMaxLegth={view ? 4 : 10}
                content={request.task_number}
                width={isAdminManager ? (view ? 98.28 : 169) : view ? 113.83 : 180}
            />
            <ItemInner
                wordMaxLegth={view ? 4 : 11}
                content={request.company}
                width={isAdminManager ? (view ? 98.28 : 138) : view ? 113.83 : 150}
            />
            <ItemInner
                wordMaxLegth={view ? 4 : 23}
                content={request.title}
                width={isAdminManager ? (view ? 98.28 : 249) : view ? 113.83 : 260}
            />
            <Popover
                placement="top"
                content={<div>{request.short_description}</div>}
            >
                <ItemInner
                    wordMaxLegth={view ? 4 : 23}
                    content={
                        request.short_description !== null && request.short_description !== ""
                            ? request.short_description
                            : "-----------"
                    }
                    width={isAdminManager ? (view ? 127.5 : 230) : view ? 127.5 : 220}
                />
            </Popover>
            <ItemInner
                wordMaxLegth={view ? 4 : 10}
                content={
                    request.main_client !== null && request.main_client !== "" ? request.main_client : "-----------"
                }
                width={isAdminManager ? (view ? 98.28 : 142) : view ? 113.83 : 160}
            />
            <ItemInner
                wordMaxLegth={view ? 4 : 10}
                content={
                    request.main_manager !== null && request.main_manager !== "" ? request.main_manager : "-----------"
                }
                width={isAdminManager ? (view ? 98.28 : 188) : view ? 113.83 : 200}
            />
            <ItemInner
                wordMaxLegth={view ? 4 : 10}
                content={request.start_date !== null && request.start_date !== "" ? request.start_date : "-----------"}
                width={isAdminManager ? (view ? 98.28 : 164) : view ? 113.83 : 180}
            />
            <ItemInner
                wordMaxLegth={view ? 4 : 10}
                content={
                    request.finish_date !== null && request.finish_date !== "" ? request.finish_date : "-----------"
                }
                width={isAdminManager ? (view ? 98.28 : 194) : view ? 113.83 : 180}
            />
            <div
                className={styles.Last}
                style={{ width: isAdminManager ? (view ? "98.28px" : "125px") : view ? "113.83px" : "145px" }}
            >
                <div
                    style={{
                        border: `1px solid ${priorityColor(request.priority)}`,
                        color: `${priorityColor(request.priority)}`,
                    }}
                >
                    {request.priority.length > 8 ? `${request.priority.slice(0, 7)}...` : request.priority}
                </div>
            </div>
            <div
                className={styles.Last}
                style={{ width: isAdminManager ? (view ? "98.28px" : "125px") : view ? "113.83px" : "145px" }}
            >
                <div
                    style={{
                        border: `1px solid ${statusColor(request.status)}`,
                        color: `${statusColor(request.status)}`,
                    }}
                >
                    {request.status.length > 8 ? `${request.status.slice(0, 7)}...` : request.status}
                </div>
            </div>
        </div>
    );
};
