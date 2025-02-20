import styles from "../css/projectlist.module.css";
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
  const [selectedSort, setSelectedSort] = useState("정렬 선택");
  const selectButtonRef = useRef(null);
  const selectBodyRef = useRef(null);
  const handleOptionClick = (option) => {
    setSelectedSort(option.label);
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
      <div className={styles.optionItemContainer}>
        <div className={styles.optionItem}>
          <button
            className={`${styles.viewButton} ${
              viewSelect === "list" ? styles.select : ""
            }`}
            onClick={() => setViewSelect("list")}
          >
            <div className="default-icon">
              <img src={Grid} />
            </div>
          </button>
          <button
            className={` ${styles.viewButton} ${
              viewSelect === "grid" ? styles.select : ""
            }`}
            onClick={() => setViewSelect("grid")}
          >
            <div className="default-icon">
              <img src={List} />
            </div>
          </button>
        </div>
        <div className={styles.optionItem}>
          <div className={styles.selectBox}>
            <div
              className={`${styles.defaultOption} icon-button`}
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
              ref={selectButtonRef}
            >
              <span>{selectedSort}</span>
              <div className={`default-icon ${styles.iconSize}`}>
                <img src={Arrow} />
              </div>
            </div>
            {isOpen && (
              <ul className={styles.selectOptionList} ref={selectBodyRef}>
                {options.map((option, index) => (
                  <li
                    className="icon-button"
                    key={index}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={styles.optionItem}>
          <button className={`${styles.createButton} icon-button`}>
            <span>생성하기</span>
          </button>
        </div>
      </div>
      <div className={styles.projectListContainer}>
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
