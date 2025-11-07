import { deleteTodo } from "@/api/delete-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: (deletedTodo) => {
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.todo.detail(deletedTodo.id),
      });

      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (pervTodoIds) => {
          if (!pervTodoIds) return [];
          return pervTodoIds.filter((id) => id !== deletedTodo.id);
        },
      );
    },
  });
}
