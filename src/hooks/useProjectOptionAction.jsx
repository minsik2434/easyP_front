import { useCallback } from "react";
import { useAppStore } from "../utils/useAppStore";
import httpService from "../utils/axiosClient";
import { useQueryClient } from "react-query";

export function useProjectOptionAction(projectId, bookmarkId) {
  const { setBookmarkUpdate } = useAppStore();
  const queryClient = useQueryClient();
  const addBookmark = useCallback(async () => {
    try {
      await httpService.post(`/member/bookmark/${projectId}`);
      setBookmarkUpdate(true);
    } catch (error) {
      console.log(error);
    }
  }, [projectId, setBookmarkUpdate]);

  const removeBookmark = useCallback(async () => {
    try {
      await httpService.delete(`/member/bookmark/${bookmarkId}`);
      setBookmarkUpdate(true);
    } catch (error) {
      console.log(error);
    }
  }, [bookmarkId, setBookmarkUpdate]);

  const leaveProject = useCallback(async () => {
    try {
      await httpService.post(`/member/leave/${projectId}`);
      queryClient.setQueryData(["projects"], (oldData) => {
        if (!oldData) return oldData;
        return {
          pages: oldData.pages.map((page) => ({
            ...page,
            projectDtoList: page.projectDtoList.filter(
              (project) => project.id !== projectId
            ),
          })),
          pageParams: oldData.pageParams,
        };
      });

      queryClient.invalidateQueries(["projects"]);
      setBookmarkUpdate(true);
    } catch (error) {
      console.log(error);
    }
  }, [projectId, queryClient, setBookmarkUpdate]);
  return { addBookmark, removeBookmark, leaveProject };
}
