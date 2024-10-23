import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAttendanceData, postAttendance } from "../../services/apiTeacher";

function useTeacherAttendance(classId, date) {
    const queryClient = useQueryClient();

    // Fetch attendance data for a specific class on a specific date
    const { isLoading: isLoadingAttendance, data: attendanceData, error: attendanceError } = useQuery({
        queryKey: ["attendance", classId, date],
        queryFn: () => getAttendanceData(classId, date),
        enabled: !!classId && !!date, // Chỉ chạy khi có classId và date
        refetchOnWindowFocus: false,
    });

    // Mutation to post attendance data
    const { mutate: takeAttendance, isLoading: isPostingAttendance } = useMutation({
        mutationFn: ({ classId, date, attendanceList }) => postAttendance(classId, date, attendanceList),
        onSuccess: () => {
            // Invalidate and refetch attendance data after posting new data
            queryClient.invalidateQueries(["attendance", classId, date]);
        },
    });

    const attendance = attendanceData?.data?.attendance;

    return { 
        isLoadingAttendance, 
        attendance, 
        attendanceError, 
        takeAttendance, 
        isPostingAttendance 
    };
}

export default useTeacherAttendance;
