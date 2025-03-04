import { useCallback } from "react";
import { useAppStore } from "../utils/useAppStore";
import httpService from "../utils/axiosClient";

export function useBookmarkAction(projectId, bookmarkId) {
  const { setBookmarkUpdate, setProjectListUpdate } = useAppStore();
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
      setBookmarkUpdate(true);
      setProjectListUpdate(true);
    } catch (error) {
      console.log(error);
    }
  }, [projectId, setBookmarkUpdate, setProjectListUpdate]);
  return { addBookmark, removeBookmark, leaveProject };
}
