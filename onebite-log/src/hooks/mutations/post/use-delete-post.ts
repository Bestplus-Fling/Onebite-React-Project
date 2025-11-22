import { deleteImagesInPath } from "@/api/image";
import { deletePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { useMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePost(callbacks?: useMutationCallback) {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
        await deleteImagesInPath(`${deletedPost.author_id}/${deletedPost.id}`);
      }

      // 무한 스크롤 때문에 캐시 데이터 하나만 삭제할 수 없음
      // 삭제할 때 모든 캐시를 지우고, 처음부터 다시 불러와 버그를 예방
      queryClinet.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
