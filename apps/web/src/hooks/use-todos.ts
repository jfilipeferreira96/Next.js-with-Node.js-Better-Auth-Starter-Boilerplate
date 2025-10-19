import { Todo, todosApi } from "@/lib/api/todos";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/contexts/AuthContext";

const TODOS_KEY = ["todos"];

// Helper
function useOptimisticMutation<TVariables, TReturn = void>(mutationFn: (variables: TVariables) => Promise<TReturn>, updater: (old: Todo[] | undefined, variables: TVariables) => Todo[]) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: TODOS_KEY });
      const previous = queryClient.getQueryData<Todo[]>(TODOS_KEY);
      queryClient.setQueryData<Todo[]>(TODOS_KEY, (old) => updater(old, variables));
      return { previous };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(TODOS_KEY, context?.previous);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_KEY });
    },
  });
}

export function useTodos() {
  return useQuery({
    queryKey: TODOS_KEY,
    queryFn: todosApi.getAll,
  });
}

export function useAddTodo() {
  const { user } = useUser();

  return useOptimisticMutation(todosApi.create, (old, title) => [
    {
      id: `temp-${Date.now()}`,
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: user?.id || "temp",
    },
    ...(old || []),
  ]);
}

export function useToggleTodo() {
  return useOptimisticMutation(
    ({ id, completed }: { id: string; completed: boolean }) => todosApi.update(id, completed),
    (old, { id, completed }) => old?.map((todo) => (todo.id === id ? { ...todo, completed } : todo)) || []
  );
}

export function useDeleteTodo() {
  return useOptimisticMutation(todosApi.delete, (old, id) => old?.filter((todo) => todo.id !== id) || []);
}
