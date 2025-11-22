import { updatePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { Post, useMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdatePost(callbacks?: useMutationCallback) {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClinet.setQueryData<Post>(
        QUERY_KEYS.post.byId(updatedPost.id),
        (prevPost) => {
          // 캐시에도 보관되지 않은 데이트를 수정하려고 한 경우
          if (!prevPost)
            throw new Error(
              `${updatedPost.id}에 해당하는 포스트를 캐시 데이터에서 찾을 수 없습니다.`,
            );
          return { ...prevPost, ...updatedPost };
        },
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
