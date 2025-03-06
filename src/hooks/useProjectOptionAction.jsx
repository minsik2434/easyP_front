import { useCallback } from "react";
import httpService from "../utils/axiosClient";
import { useMutation, useQueryClient } from "react-query";

export function useProjectOptionAction(projectId, bookmarkId) {
  const queryClient = useQueryClient();
  const addBookmarkMutation = useMutation(
    () => httpService.post(`/member/bookmark/${projectId}`),
    {
      onMutate: async () => {
        await queryClient.cancelQueries("projects");
        const previousProjects = queryClient.getQueryData("projects");
        queryClient.setQueryData("projects", (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              projectDtoList: page.dtoList.map((proj) =>
                proj.id === projectId
                  ? {
                      ...proj,
                      bookmarked: true,
                      bookmarkId: -1,
                    }
                  : proj
              ),
            })),
          };
        });
        return { previousProjects };
      },
      onError: (err, variables, context) => {
        if (context?.previousProjects) {
          queryClient.setQueryData("projects", context.previousProjects);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("projects");
        queryClient.invalidateQueries("bookmarks");
      },
    }
  );

  const removeBookmarkMutation = useMutation(
    () => httpService.delete(`/member/bookmark/${bookmarkId}`),
    {
      onMutate: async () => {
        await queryClient.cancelQueries("projects");
        const previousProjects = queryClient.getQueryData("projects");
        queryClient.setQueryData("projects", (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              projectDtoList: page.dtoList.map((proj) =>
                proj.id === projectId
                  ? {
                      ...proj,
                      bookmarked: false,
                      bookmarkId: null,
                    }
                  : proj
              ),
            })),
          };
        });
        return { previousProjects };
      },
      onError: (err, variables, context) => {
        if (context?.previousProjects) {
          queryClient.setQueryData("projects", context.previousProjects);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("projects");
        queryClient.invalidateQueries("bookmarks");
      },
    }
  );

  const addBookmark = useCallback(() => {
    addBookmarkMutation.mutate();
  }, [addBookmarkMutation]);

  const removeBookmark = useCallback(() => {
    removeBookmarkMutation.mutate();
  }, [removeBookmarkMutation]);

  const leaveProject = useCallback(async () => {
    try {
      await httpService.post(`/member/leave/${projectId}`);
      queryClient.invalidateQueries(["projects"]);
      queryClient.invalidateQueries(["bookmarks"]);
    } catch (error) {
      console.log(error);
    }
  }, [projectId, queryClient]);
  return { addBookmark, removeBookmark, leaveProject };
}
