import "../css/sidebar.css";
import Dot from "../assets/icon/dot.svg";
import PropTypes from "prop-types";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
function SideBar({ isSidebarOpen }) {
  const [items, setItems] = useState([
    { id: "item-1", content: "title2" },
    { id: "item-2", content: "title" },
  ]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="sidebar-droppable">
        {(provided) => (
          <div
            className="side-bar-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    className="side-bar-content-wrapper"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div
                      className={`side-bar-content-button ${
                        isSidebarOpen ? "open" : ""
                      }`}
                    >
                      <div className="side-bar-content-icon">
                        <img src={Dot} alt="icon" />
                      </div>
                      {isSidebarOpen && (
                        <div className="side-bar-content-title">
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
