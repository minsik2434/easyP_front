import styles from "../css/projectlist.module.css";
import Arrow from "../assets/icon/arrow.svg";
import List from "../assets/icon/list.svg";
import Grid from "../assets/icon/grid.svg";
import { useEffect, useRef, useState } from "react";
import SquareProject from "./SquareProject";
import useLockScroll from "../hooks/useLockScroll";
import httpService from "../utils/axiosClient";
import Check from "../assets/icon/check.svg";
import { useMemberInfo } from "../utils/memberInfo";
import useClickOutside from "../hooks/useClickOutSide";
import FlatProject from "./FlatProject";
function ProjectList() {
  const [viewSelect, setViewSelect] = useState("grid");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState({
    label: "정렬 선택",
    value: "id",
  });
  const [orderDirection, setOrderDirection] = useState("asc");
  const selectButtonRef = useRef(null);
  const selectBodyRef = useRef(null);
  const [belongProjectResponse, setBelongProjectReponse] = useState({
    projectDtoList: [],
    currentPage: 0,
    totalPage: 0,
    pageSize: 0,
    totalElement: 0,
  });
  const { memberInfo } = useMemberInfo();
  const handleOptionClick = (option) => {
    setSelectedSort(option);
    setIsOpen(false);
  };

  const handleSortDirectionClick = (direction) => {
    setOrderDirection(direction);
    setIsOpen(false);
  };

  useLockScroll(isOpen);
  const options = [
    { label: "정렬선택", value: "id" },
    { label: "이름순", value: "name" },
    { label: "변경순", value: "updateAt" },
    { label: "생성일순", value: "createAt" },
  ];
  useClickOutside([selectButtonRef, selectBodyRef], () => setIsOpen(false));
  useEffect(() => {
    const getProjectList = async () => {
      try {
        const response = await httpService.get(
          `/member/${memberInfo.email}/project?sort=${selectedSort.value},${orderDirection}`
        );
        setBelongProjectReponse(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjectList();
  }, [memberInfo.email, orderDirection, selectedSort.value]);
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
              <span>{selectedSort.label}</span>
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
                <div className={styles.orderBox}>
                  <li
                    className="icon-button"
                    onClick={() => handleSortDirectionClick("asc")}
                  >
                    <div className={styles.orderButtonWrapper}>
                      <span>오름차순</span>
                      {orderDirection == "asc" ? (
                        <div className={`default-icon ${styles.checkIconSize}`}>
                          <img src={Check}></img>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </li>
                  <li
                    className="icon-button"
                    onClick={() => handleSortDirectionClick("desc")}
                  >
                    <div className={styles.orderButtonWrapper}>
                      <span>내림차순</span>
                      {orderDirection == "desc" ? (
                        <div className={`default-icon ${styles.checkIconSize}`}>
                          <img src={Check}></img>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </li>
                </div>
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
      {viewSelect === "grid" ? (
        <div
          className={`${styles.squareProjectListContainer} ${
            belongProjectResponse.projectDtoList.length < 3
              ? styles.lessThree
              : ""
          }`}
        >
          {belongProjectResponse.projectDtoList.map((project, index) => (
            <SquareProject key={index} project={project} />
          ))}
        </div>
      ) : (
        <div className={styles.flatProjectListContainer}>
          <div className={styles.flatCategory}>
            <div className={styles.categoryTitle}>
              <span>제목</span>
            </div>
            <div className={styles.categoryUpdate}>
              <span>변경일</span>
            </div>
            <div className={styles.categoryOption}>
              <span>옵션</span>
            </div>
          </div>
          {belongProjectResponse.projectDtoList.map((project, index) => (
            <FlatProject key={index} project={project} />
          ))}
        </div>
      )}
    </>
  );
}

export default ProjectList;
