import styles from "../css/sidebar.module.css";
import Dot from "../assets/icon/dot.svg";
import PropTypes from "prop-types";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
function SideBar({ isSidebarOpen }) {
  const [items, setItems] = useState([
    { id: "item-1", content: "title1" },
    { id: "item-2", content: "title2" },
    { id: "item-3", content: "title3" },
  ]);

  const onDragEnd = (result) => {
    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sidebar-droppable">
        {(provided) => (
          <div
            className={styles.container}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
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
                      <div className="default-icon">
                        <img src={Dot} alt="icon" />
                      </div>
                      {isSidebarOpen && (
                        <div className={styles.sideBarContentTitle}>
                          {item.content}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
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
