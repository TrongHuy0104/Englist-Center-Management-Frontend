import { useQuery } from "@tanstack/react-query";
import { getTeacherSchedule } from "../../services/apiTeacher";

function useTeacherSchedule(teacherId) {
    const { isLoading, data, error } = useQuery({
        queryKey: ["teacherSchedule", teacherId],
        queryFn: () => getTeacherSchedule(teacherId),
        enabled: !!teacherId, // Chỉ chạy khi có teacherId
        refetchOnWindowFocus: false,
    });

    const schedule = data?.data?.data;

    return { isLoading, schedule, error };
}

export default useTeacherSchedule;
