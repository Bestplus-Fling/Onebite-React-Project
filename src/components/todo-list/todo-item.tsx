import { Button } from "@/components/ui/button";
import { useDeleteTodo } from "@/store/todos";
import type { Todo } from "@/types";

export default function TodoItem({ id, content }: Todo) {
  const deleteTodo = useDeleteTodo();
  const handleDeleteClick = () => {
    deleteTodo(id);
  };
  return (
    <div className="flex items-center justify-between border p-2">
      {content}
      <Button onClick={handleDeleteClick} variant={"destructive"}>
        삭제
      </Button>
    </div>
  );
}
