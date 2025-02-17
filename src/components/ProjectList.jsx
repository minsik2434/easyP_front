import "../css/projectlist.css";
import Arrow from "../assets/icon/arrow.svg";
import { useEffect, useRef, useState } from "react";
function ProjectList() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("정렬 선택");
  const selectRef = useRef(null);
  const handleOptionClick = (option) => {
    setSelected(option.label);
    setIsOpen(false);
  };
  const options = [
    { label: "정렬선택", value: "default" },
    { label: "이름순", value: "name" },
    { label: "최근순", value: "recent" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="option-item-container">
        <div className="option-item">
          <div className="select" ref={selectRef}>
            <div
              className="select-default"
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            >
              <span>{selected}</span>
              <div className="select-icon">
                <img src={Arrow} />
              </div>
            </div>
            {isOpen && (
              <ul className="select-option-list">
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
            <div className="test">생성하기</div>
          </button>
        </div>
      </div>
      <div>main Project</div>
    </>
  );
}

export default ProjectList;
