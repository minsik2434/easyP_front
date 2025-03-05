import styles from "../css/sidebar.module.css";
import Dot from "../assets/icon/dot.svg";
import PropTypes from "prop-types";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useCallback, useEffect, useRef, useState } from "react";
import httpService from "../utils/axiosClient";
import { useMemberInfo } from "../utils/memberInfo";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery, useQueryClient } from "react-query";
function SideBar({ isSidebarOpen }) {
  const { memberInfo } = useMemberInfo();
  const loaderRef = useRef(null);
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const [isDragging, setIsDragging] = useState(false);
  const dragDataRef = useRef(null);

  const forwardTask = (projectId) => {
    nav(`/project/${projectId}/tasks`);
  };
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    ["bookmarks", memberInfo.email],
    async ({ pageParam = 0 }) => {
      const request = `/member/bookmark/${memberInfo.email}?page=${pageParam}`;
      const response = await httpService.get(request);
      return response.data;
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.currentPage < lastPage.totalPage - 1
          ? lastPage.currentPage + 1
          : undefined,
    }
  );

  const bookmarks = data
    ? data.pages.flatMap((page) => page.projectDtoList)
    : [];

  useEffect(() => {
    if (!loaderRef.current || status !== "success" || isDragging) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, status, isDragging]);

  const onDragStart = useCallback(() => {
    if (!data) return;
    const flatBookmarks = data.pages.flatMap((page) => page.projectDtoList);
    const pageSizes = data.pages.map((page) => page.projectDtoList.length);
    dragDataRef.current = { flatBookmarks, pageSizes };
    setIsDragging(true);
  }, [data]);

  const onDragEnd = useCallback(
    async (result) => {
      setIsDragging(false);
      if (!result.destination || !data) {
        dragDataRef.current = null;
        return;
      }
      const { flatBookmarks, pageSizes } = dragDataRef.current || {};
      if (!flatBookmarks || !pageSizes) return;

      const updatedFlat = Array.from(flatBookmarks);
      const [movedItem] = updatedFlat.splice(result.source.index, 1);
      updatedFlat.splice(result.destination.index, 0, movedItem);
      let currentIndex = 0;
      const newPages = data.pages.map((page, idx) => {
        const size = pageSizes[idx];
        const items = updatedFlat.slice(currentIndex, currentIndex + size);
        currentIndex += size;
        return { ...page, projectDtoList: items };
      });

      queryClient.setQueryData(["bookmarks", memberInfo.email], (oldData) => {
        if (!oldData) return oldData;
        return { ...oldData, pages: newPages };
      });
      if (result.source.index !== result.destination.index) {
        const requestBody = {
          bookmarkId: movedItem.id,
          changeSequence: result.destination.index,
        };
        try {
          await httpService.patch(
            "/member/bookmark/sequence/update",
            requestBody
          );
        } catch (error) {
          console.error("Error updating bookmark order: ", error);
          queryClient.invalidateQueries(["bookmarks", memberInfo.email]);
        }
      }
      dragDataRef.current = null;
    },
    [data, queryClient, memberInfo.email]
  );

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable droppableId="sidebar-droppable">
        {(provided) => (
          <div
            className={styles.container}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className={styles.test}>
              {bookmarks.map((bookmark, index) => (
                <Draggable
                  key={bookmark.id}
                  draggableId={bookmark.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className={`${styles.contentWrapper} ${
                        snapshot.isDragging ? styles.dragging : ""
                      }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => forwardTask(bookmark.projectDto.id)}
                    >
                      <div
                        className={`${styles.contentButton} ${
                          isSidebarOpen ? styles.open : ""
                        }`}
                      >
                        <div className={`default-icon ${styles.iconSize}`}>
                          {bookmark.projectDto.imgUrl ? (
                            <img src={bookmark.projectDto.imgUrl} alt="icon" />
                          ) : (
                            <img src={Dot} alt="icon" />
                          )}
                        </div>
                        {isSidebarOpen && (
                          <div className={styles.sideBarContentTitle}>
                            {bookmark.projectDto.name}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
            {provided.placeholder}
            <div ref={loaderRef} style={{ height: "1px" }} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

SideBar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default SideBar;
