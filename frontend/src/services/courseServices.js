import API from "./api";

export const getCourses = async () => {
    const res = await API.get('/courses')
    return res.data
}

export const getCourseById = async (id) => {
    const res = await API.get(`/courses/${id}`)
    return res.data
}
