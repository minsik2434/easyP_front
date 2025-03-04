import styles from "../css/projectlist.module.css";
import Arrow from "../assets/icon/arrow.svg";
import List from "../assets/icon/list.svg";
import Grid from "../assets/icon/grid.svg";
import XIcon from "../assets/icon/x.svg";
import SearchIcon from "../assets/icon/glass.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import SquareProject from "./SquareProject";
import useLockScroll from "../hooks/useLockScroll";
import httpService from "../utils/axiosClient";
import Check from "../assets/icon/check.svg";
import { useMemberInfo } from "../utils/memberInfo";
import useClickOutside from "../hooks/useClickOutSide";
import FlatProject from "./FlatProject";
import CreateProjectModal from "./modals/CreateProjectModal";
import { useInfiniteQuery } from "react-query";
function ProjectList() {
  const [viewSelect, setViewSelect] = useState("grid");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [nameParam, setNameParam] = useState("");
  const { memberInfo } = useMemberInfo();
  const selectButtonRef = useRef(null);
  const selectBodyRef = useRef(null);
  const loaderRef = useRef(null);
  useLockScroll(isSortOpen);
  const [selectedSort, setSelectedSort] = useState({
    label: "정렬 선택",
    value: "id",
  });
  const [orderDirection, setOrderDirection] = useState("asc");
  const handleOptionClick = useCallback((option) => {
    setSelectedSort(option);
    setIsSortOpen(false);
  }, []);

  const handleSortDirectionClick = useCallback((direction) => {
    setOrderDirection(direction);
    setIsSortOpen(false);
  }, []);

  const handleKeydownSearch = useCallback(
    (e) => {
      if (e.key === "Enter") {
        setNameParam(searchValue);
      }
    },
    [searchValue]
  );
  const options = [
    { label: "정렬선택", value: "id" },
    { label: "이름순", value: "name" },
    { label: "변경순", value: "updateAt" },
    { label: "생성일순", value: "createAt" },
  ];
  useClickOutside([selectButtonRef, selectBodyRef], () => setIsSortOpen(false));
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    [
      "projects",
      memberInfo.email,
      selectedSort.value,
      orderDirection,
      nameParam,
    ],
    async ({ pageParam = 0 }) => {
      let request = `/member/${memberInfo.email}/project?sort=${selectedSort.value},${orderDirection}&page=${pageParam}`;
      if (nameParam) {
        request += `&name=${nameParam}`;
      }
      const response = await httpService.get(request);
      return response.data;
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.currentPage < lastPage.totalPage - 1
          ? lastPage.currentPage + 1
          : undefined;
      },
    }
  );

  useEffect(() => {
    if (!loaderRef.current || status !== "success") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.01 }
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, status]);
  const projects = data
    ? data.pages.flatMap((page) => page.projectDtoList)
    : [];
  return (
    <>
      <div className={styles.optionItemContainer}>
        <div className={styles.centerContent}>
          <div className={styles.searchBarWrapper}>
            <button className={styles.searchButton}>
              <div className={`${styles.searchBarButtonIcon} default-icon`}>
                <img src={SearchIcon} />
              </div>
            </button>
            <input
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              onKeyDown={handleKeydownSearch}
              placeholder="검색창"
            />
            <button
              className={`${styles.searchButton} ${
                searchValue ? "" : styles.noValue
              }`}
              onClick={() => setSearchValue("")}
            >
              <div className={`${styles.searchBarButtonIcon} default-icon`}>
                <img src={XIcon} />
              </div>
            </button>
          </div>
        </div>
        <div className={styles.rightContent}>
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
                  setIsSortOpen((prev) => !prev);
                }}
                ref={selectButtonRef}
              >
                <span>{selectedSort.label}</span>
                <div className={`default-icon ${styles.iconSize}`}>
                  <img src={Arrow} />
                </div>
              </div>
              {isSortOpen && (
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
                          <div
                            className={`default-icon ${styles.checkIconSize}`}
                          >
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
                          <div
                            className={`default-icon ${styles.checkIconSize}`}
                          >
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
            <button
              className={`${styles.createButton} icon-button`}
              onClick={() => setIsCreateOpen((prev) => !prev)}
            >
              <span>생성하기</span>
            </button>
          </div>
        </div>
      </div>
      {viewSelect === "grid" ? (
        <div
          className={`${styles.squareProjectListContainer} ${
            projects.length < 3 ? styles.lessThree : ""
          }`}
        >
          {projects.map((project) => (
            <SquareProject key={project.id} project={project} />
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
          {projects.map((project) => (
            <FlatProject key={project.id} project={project} />
          ))}
        </div>
      )}
      <div ref={loaderRef} style={{ height: "1px" }} />
      {isCreateOpen && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.createModal} modal-container`}>
            <CreateProjectModal setIsCreateOpen={setIsCreateOpen} />
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectList;
