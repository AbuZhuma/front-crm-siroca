import axios from "axios";
import { create } from "zustand";
import { BASE_URL, authToken } from "@/shared/variables";
import { IGetOneRequestApi } from "./types";

export const getOneRequestApi = create<IGetOneRequestApi>((set) => ({
    oneRequest: {
        id: 0,
        logs: [],
        company: "",
        main_client: "",
        main_manager: "",
        checklists: [],
        comments: [],
        task_number: "",
        title: "",
        description: "",
        short_description: "",
        files: [],
        jira: "",
        status: "",
        payment_state: "",
        priority: "",
        application_date: "",
        confirm_date: "",
        offer_date: "",
        start_date: "",
        finish_date: "",
        deadline_date: "",
    },
    addChecklistToOneRequest: (checklist) => {
        set((prevState) => ({
            oneRequest: {
                ...prevState.oneRequest,
                checklists: [...prevState.oneRequest.checklists, checklist],
            },
        }));
    },
    deleteChecklistFromChecklists: (id) => {
        set((prevState) => ({
            oneRequest: {
                ...prevState.oneRequest,
                checklists: prevState.oneRequest.checklists.filter((checklist) => checklist.id !== id),
            },
        }));
    },
    setSubtaskToOneRequest: (subtask) => {
        set((prevState) => {
            const { checklists } = prevState.oneRequest;
            const updatedChecklists = checklists.map((checklist) => {
                if (checklist.id === subtask.checklist) {
                    const subtaskExists = checklist.subtasks?.some(
                        (existingSubtask) => existingSubtask.id === subtask.id,
                    );
                    if (!subtaskExists) {
                        return {
                            ...checklist,
                            subtasks: checklist.subtasks && [...checklist.subtasks, subtask],
                        };
                    }
                }
                return checklist;
            });
            return {
                oneRequest: {
                    ...prevState.oneRequest,
                    checklists: updatedChecklists,
                },
            };
        });
    },
    editSubtaskInOneRequest: (subtask) => {
        set((prevState) => {
            const updatedOneRequest = { ...prevState.oneRequest };
            const updatedChecklists = updatedOneRequest.checklists.map((checklist) => {
                if (checklist.subtasks) {
                    const updatedSubtasks = checklist.subtasks.map((existingSubtask) => {
                        if (existingSubtask.id === subtask.id) {
                            return subtask;
                        }
                        return existingSubtask;
                    });
                    return {
                        ...checklist,
                        subtasks: updatedSubtasks,
                    };
                }
                return checklist;
            });
            return {
                oneRequest: {
                    ...updatedOneRequest,
                    checklists: updatedChecklists,
                },
            };
        });
    },
    setSubtaskCompletedFromOneRequest: (id) => {
        set((prevState) => {
            const updatedOneRequest = { ...prevState.oneRequest };
            const updatedChecklists = updatedOneRequest.checklists.map((checklist) => {
                if (checklist.subtasks) {
                    const updatedSubtasks = checklist.subtasks.map((subtask) => {
                        if (subtask.id === id) {
                            return {
                                ...subtask,
                                completed: !subtask.completed,
                            };
                        }
                        return subtask;
                    });
                    return {
                        ...checklist,
                        subtasks: updatedSubtasks,
                    };
                }
                return checklist;
            });
            return {
                oneRequest: {
                    ...updatedOneRequest,
                    checklists: updatedChecklists,
                },
            };
        });
    },
    deleteSubtaskFromOneRequest: (id) => {
        set((prevState) => {
            const updatedOneRequest = { ...prevState.oneRequest };
            const updatedChecklists = updatedOneRequest.checklists.map((checklist) => {
                if (checklist.subtasks) {
                    const updatedSubtasks = checklist.subtasks.filter((subtask) => subtask.id !== id);
                    return {
                        ...checklist,
                        subtasks: updatedSubtasks,
                    };
                }
                return checklist;
            });
            return {
                oneRequest: {
                    ...updatedOneRequest,
                    checklists: updatedChecklists,
                },
            };
        });
    },
    setFile: (file) => {
        set((prevState) => ({
            oneRequest: {
                ...prevState.oneRequest,
                files: [...prevState.oneRequest.files, file],
            },
        }));
    },
    deleteFileFromFiles: (id) => {
        set((prevState) => ({
            oneRequest: {
                ...prevState.oneRequest,
                files: prevState.oneRequest.files.filter((file) => file.id !== id),
            },
        }));
    },
    setComment: (comment) => {
        set((prevState) => ({
            oneRequest: {
                ...prevState.oneRequest,
                comments: [...prevState.oneRequest.comments, comment],
            },
        }));
    },
    editCommentInOneRequest: (updatedComment) => {
        set((prevState) => {
            const updatedComments = prevState.oneRequest.comments.map((comment) =>
                comment.id === updatedComment.id ? updatedComment : comment,
            );
            return {
                oneRequest: {
                    ...prevState.oneRequest,
                    comments: updatedComments,
                },
            };
        });
    },

    deleteCommentFromComments: (id) => {
        set((prevState) => ({
            oneRequest: {
                ...prevState.oneRequest,
                comments: prevState.oneRequest.comments.filter((comment) => comment.id !== id),
            },
        }));
    },
    getOneRequest: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/applications/form_view/${id}/`, authToken);
            set({ oneRequest: response.data });
        } catch (error) {
            console.log(error, "getOneRequestError");
        }
    },
}));
