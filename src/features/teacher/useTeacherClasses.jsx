import { useQuery } from "@tanstack/react-query";
import { getTeacherClasses } from "../../services/apiTeacher";

function useTeacherClasses(teacherId) {
    const { isLoading, data, error } = useQuery({
        queryKey: ["teacherClasses", teacherId],
        queryFn: () => getTeacherClasses(teacherId),
        enabled: !!teacherId, // Chỉ chạy khi có teacherId
        refetchOnWindowFocus: false,
    });

    const classes = data?.data?.data;

    return { isLoading, classes, error };
}

export default useTeacherClasses;
