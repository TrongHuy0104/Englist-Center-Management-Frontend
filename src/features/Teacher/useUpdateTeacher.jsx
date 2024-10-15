import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeacherById } from "../../services/apiTeacher";

function useUpdateTeacher() {
    const queryClient = useQueryClient();

    const { mutate, isLoading, error, isSuccess } = useMutation({
        mutationFn: ({ teacherId, newData }) => updateTeacherById(teacherId, newData),
        onSuccess: () => {
            // Làm mới dữ liệu sau khi cập nhật thành công
            queryClient.invalidateQueries(["teacher"]);
        },
    });

    return { mutate, isLoading, error, isSuccess };
}

export default useUpdateTeacher;
