import { useMemo } from "react";

export function useBookmarkState(projectId, bookmarks) {
  return useMemo(() => {
    const foundBookmark = bookmarks.find(
      (bookmark) => bookmark.projectDto.id === projectId
    );
    return {
      isBookmarking: !!foundBookmark,
      bookmarkId: foundBookmark ? foundBookmark.id : null,
    };
  }, [bookmarks, projectId]);
}
