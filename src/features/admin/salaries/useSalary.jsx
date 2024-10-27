import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllSalaries,
  CreateSalary,
  updateSalary,
} from "../../../services/apiSalary.js";
// import { getTeacherShifts } from "../../../services/apiAttendance.js";

function useSalary(page = 1, limit = 10) {
  const queryClient = useQueryClient(); // QueryClient để thao tác lại với cache

  // Lấy danh sách phí
  const { isLoading, data, error } = useQuery({
    queryKey: ["salaries", page, limit],
    queryFn: () => getAllSalaries(page, limit),
    refetchOnWindowFocus: false,
  });

  // Hàm tạo mới phí
  const createSalaryMutation = useMutation({
    mutationFn: CreateSalary,
    onSuccess: () => {
      queryClient.invalidateQueries(["salaries"]);
    },
  });

  // Hàm cập nhật phí
  const updateSalaryMutation = useMutation({
    mutationFn: (updatedSalaryData) =>
      updateSalary(updatedSalaryData.id, updatedSalaryData),
    onSuccess: () => {
      queryClient.invalidateQueries(["salaries"]);
    },
  });

  // Lấy danh sách phí từ dữ liệu trả về
  const salaries = data?.data;

  return {
    isLoading,
    salaries,
    error,
    createSalary: createSalaryMutation.mutate, // Gọi hàm tạo mới
    updateSalary: updateSalaryMutation.mutate, // Gọi hàm cập nhật
  };
}

export default useSalary;
