import axios from "../utils/axios";

// Get data of a teacher by teacherId
export async function getTeacherById(idTeacher) {
    try {
        const res = await axios.get(`/api/v1/teacher/${idTeacher}`, { withCredentials: true });
        console.log('Teacher data:', res.data.data);
        return res;
    } catch (error) {
        console.error('Error fetching teacher by ID:', error);
        throw error;
    }
}

// Update data of a teacher by teacherId
export async function updateTeacherById(idTeacher, newData) {
    try {
        const res = await axios.put(`/api/v1/teacher/${idTeacher}`, newData, { withCredentials: true });
        console.log('Teacher updated successfully:', res.data.data);
        return res;
    } catch (error) {
        console.error('Error updating teacher profile:', error);
        throw error;
    }
}

// Get schedule of a teacher by teacherId
export async function getTeacherSchedule(teacherId) {
    try {
        const res = await axios.get(`/api/v1/teacher/${teacherId}/schedule`, { withCredentials: true });
        console.log('Teacher schedule:', res.data.data);
        return res;
    } catch (error) {
        console.error('Error fetching teacher schedule:', error);
        throw error;
    }
}

// Get classes of a teacher by teacherId
export async function getClassesByTeacherId(teacherId) {
    try {
        const res = await axios.get(`/api/v1/teacher/${teacherId}/classes`, { withCredentials: true });
        console.log('Teacher classes:', res.data.data.classes); // Log dữ liệu lớp học
        return res;
    } catch (error) {
        console.error('Error fetching teacher classes:', error);
        throw error;
    }
}
