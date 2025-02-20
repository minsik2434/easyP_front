import "../css/projectlist.css";
import Arrow from "../assets/icon/arrow.svg";
import List from "../assets/icon/list.svg";
import Grid from "../assets/icon/grid.svg";
import { useRef, useState } from "react";
import Project from "./Project";
import useLockScroll from "../hooks/useLockScroll";
import useClickOutside from "../hooks/useClickOutSide";
function ProjectList() {
  const [viewSelect, setViewSelect] = useState("grid");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("정렬 선택");
  const selectButtonRef = useRef(null);
  const selectBodyRef = useRef(null);
  const handleOptionClick = (option) => {
    setSelected(option.label);
    setIsOpen(false);
  };
  useLockScroll(isOpen);
  const options = [
    { label: "정렬선택", value: "default" },
    { label: "이름순", value: "name" },
    { label: "최근순", value: "recent" },
  ];

  useClickOutside([selectButtonRef, selectBodyRef], () => setIsOpen(false));
  return (
    <>
      <div className="option-item-container">
        <div className="option-item">
          <button
            className={`view-button ${viewSelect === "list" ? "select" : ""} `}
            onClick={() => setViewSelect("list")}
          >
            <div className="view-button-icon">
              <img src={Grid} />
            </div>
          </button>
          <button
            className={`view-button ${viewSelect === "grid" ? "select" : ""} `}
            onClick={() => setViewSelect("grid")}
          >
            <div className="view-button-icon">
              <img src={List} />
            </div>
          </button>
        </div>
        <div className="option-item">
          <div className="select">
            <div
              className="select-default"
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
              ref={selectButtonRef}
            >
              <span>{selected}</span>
              <div className="select-icon">
                <img src={Arrow} />
              </div>
            </div>
            {isOpen && (
              <ul className="select-option-list" ref={selectBodyRef}>
                {options.map((option, index) => (
                  <li key={index} onClick={() => handleOptionClick(option)}>
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="option-item">
          <button className="create-button">
            <span>생성하기</span>
          </button>
        </div>
      </div>
      <div className="project-list-container">
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
      </div>
    </>
  );
}

export default ProjectList;
