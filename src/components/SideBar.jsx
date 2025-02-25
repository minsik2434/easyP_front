import styles from "../css/sidebar.module.css";
import Dot from "../assets/icon/dot.svg";
import PropTypes from "prop-types";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import httpService from "../utils/axiosClient";
import { useMemberInfo } from "../utils/memberInfo";
function SideBar({ isSidebarOpen }) {
  const { memberInfo } = useMemberInfo();
  const [bookmarks, setBookmarks] = useState([]);
  const onDragEnd = async (result) => {
    const newBookmarks = Array.from(bookmarks);
    const [removed] = newBookmarks.splice(result.source.index, 1);
    newBookmarks.splice(result.destination.index, 0, removed);
    setBookmarks(newBookmarks);

    if (result.source.index !== result.destination.index) {
      const requestBody = {
        bookmarkId: bookmarks[result.source.index].id,
        changeSequence: result.destination.index,
      };
      try {
        await httpService.patch(
          "/member/bookmark/sequence/update",
          requestBody
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const getBookmark = async () => {
      try {
        const response = await httpService.get(
          `/member/bookmark/${memberInfo.email}`
        );
        setBookmarks(response.data.projectDtoList);
      } catch (error) {
        console.log(error);
      }
    };
    getBookmark();
  }, [memberInfo.email]);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
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
                      >
                        <div
                          className={`${styles.contentButton} ${
                            isSidebarOpen ? styles.open : ""
                          }`}
                        >
                          <div className={`default-icon ${styles.iconSize}`}>
                            {bookmark.projectDto.imgUrl ? (
                              <img
                                src={bookmark.projectDto.imgUrl}
                                alt="icon"
                              />
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
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

SideBar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
};
export default SideBar;
