import api from "./api";

export const createNote = async(data) => {
    try {
        const response = await api.post("/note/create", data);
        return response.data;
    } catch (error) {
        console.error("Error in Note Creating..", error);
        throw Error;
    }
}

export const updateNote = async (id, data) => {
    const response = await api.patch(`/note/update/${id}`, data);
    return response.data;
}

export const deleteNoteById = async (id) => {
    try {
        const response = await api.delete(`/note/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error In Deleting Note", error);
    }
}