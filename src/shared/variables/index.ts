export const BASE_URL = import.meta.env.VITE_API_URL;
export let authToken = {
    headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
    },
};

export const prioritiesList: string[] = ["Самый высокий", "Высокий", "Средний", "Низкий", "Самый низкий"];
export const statusesList: string[] = ["К выполнению", "В работе", "В тестировании", "Выполнено", "Проверено"];

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
export const currentDate = `${year}-${month}-${day}`;

export let role_type = localStorage.getItem("role_type");
export let id = localStorage.getItem("id");
export const updateVariables = () => {
    role_type = localStorage.getItem("role_type")
    id = localStorage.getItem("id")
    authToken = {
        headers: {
            Authorization: `JWT ${localStorage.getItem("access")}`,
        },
    };
}
export const PATHS = {
    auth: "/",
    admin: "/admin",
    rolessettings: "/rolessettings",
    main: "/main",
};
