import { createTodo } from "@/api/create-todo";
import { QUERY_KEYS } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    // 요청이 시작되었을 때
    onMutate: () => {},
    // 요청이 종료되었을 때
    onSettled: () => {},
    // 요청이 성공했을 때
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
    },
    // 요청이 실패했을 때
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
