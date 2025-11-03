import { createTodo } from "@/api/create-todo";
import { useMutation } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  return useMutation({
    mutationFn: createTodo,
    // 요청이 시작되었을 때
    onMutate: () => {},
    // 요청이 종료되었을 때
    onSettled: () => {},
    // 요청이 성공했을 때
    onSuccess: () => {
      window.location.reload();
    },
    // 요청이 실패했을 때
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
