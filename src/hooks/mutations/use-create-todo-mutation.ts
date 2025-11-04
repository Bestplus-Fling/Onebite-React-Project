import { createTodo } from "@/api/create-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
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
    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [newTodo];
        return [...prevTodos, newTodo];
      });
    },
    // 요청이 실패했을 때
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
