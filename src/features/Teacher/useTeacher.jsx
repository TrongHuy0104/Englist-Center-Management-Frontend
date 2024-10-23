// src/features/authentication/useTeacher.jsx
import { useQuery } from "@tanstack/react-query";
import { getClassesByTeacherId, getTeacherSchedule } from "../../services/apiTeacher";

function useTeacher(teacherId) {
    // Query để lấy danh sách lớp học của giáo viên
    const {
        isLoading: loadingClasses,
        data: classesData,
        error: classesError,
    } = useQuery({
        queryKey: ["teacherClasses", teacherId],
        queryFn: () => getClassesByTeacherId(teacherId),
        enabled: !!teacherId, // Chỉ thực hiện truy vấn nếu teacherId hợp lệ
        refetchOnWindowFocus: false,
    });

    // Query để lấy thời gian biểu của giáo viên
    const {
        isLoading: loadingSchedule,
        data: scheduleData,
        error: scheduleError,
    } = useQuery({
        queryKey: ["teacherSchedule", teacherId],
        queryFn: () => getTeacherSchedule(teacherId),
        enabled: !!teacherId, // Chỉ thực hiện truy vấn nếu teacherId hợp lệ
        refetchOnWindowFocus: false,
    });

    // Lấy danh sách lớp học và thời gian biểu
    const classes = classesData?.data?.classes || []; // Lấy danh sách lớp học
    const schedules = scheduleData?.data?.schedules || []; // Lấy danh sách thời gian biểu

    return {
        loadingClasses,
        classes,
        classesError,
        loadingSchedule,
        schedules,
        scheduleError,
        isLoading: loadingClasses || loadingSchedule, // Trạng thái loading tổng thể
        error: classesError || scheduleError, // Trạng thái lỗi tổng thể
    };
}

export default useTeacher;
