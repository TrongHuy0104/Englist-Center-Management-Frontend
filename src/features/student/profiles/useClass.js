import { useQuery } from "@tanstack/react-query";
import { getClassById } from "../../../services/apiClass";

export const useClass = (classIds) => {
  const {
    data: classData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classes", classIds],
    queryFn: async () => {
      if (!classIds || classIds.length === 0) return [];
      const classPromises = classIds.map(async (id) => {
        const result = await getClassById(id);
        return result;
      });
      const classData = await Promise.all(classPromises);
      return classData;
    },
    enabled: !!classIds && classIds.length > 0,
    refetchOnWindowFocus: false,
  });

  return { classes: classData || [], isLoading, error };
};

export default useClass;
