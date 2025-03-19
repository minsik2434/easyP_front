import { useParams } from "react-router-dom";
import styles from "../css/tasklist.module.css";
import ProjectNavBar from "./ProjectNavBar";
import { useCallback, useEffect, useRef, useState } from "react";
import httpService from "../utils/axiosClient";
import UserList from "./UserList";
import Arrow from "../assets/icon/arrow.svg";
import Task from "./Task";
import { useInfiniteQuery } from "react-query";
function TaskList() {
  const { projectId } = useParams();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [project, setProject] = useState({
    id: "",
    name: "",
    description: "",
    imgUrl: "",
    owner: {
      email: "",
      profile: "",
    },
    bookmarkId: "",
    bookmarked: false,
    updateAt: "",
  });
  const options = [
    { label: "정렬선택", value: "id" },
    { label: "제목순", value: "title" },
    { label: "변경순", value: "updateAt" },
    { label: "생성일순", value: "createAt" },
  ];
  const [selectedSort, setSelectedSort] = useState({
    label: "정렬 선택",
    value: "id",
  });
  const loaderRef = useRef();
  const handleOptionClick = useCallback((option) => {
    setSelectedSort(option);
    setIsSortOpen(false);
  }, []);
  const [projectUpdate, setProjectUpdate] = useState(false);
  useEffect(() => {
    const getProjectInfo = async () => {
      try {
        const response = await httpService.get(`/project/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjectInfo();
    setProjectUpdate(false);
  }, [projectId, projectUpdate]);
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    ["tasks", projectId, selectedSort.value],
    async ({ pageParam = 0 }) => {
      let request = `/task/${projectId}?sort=${selectedSort.value}&page=${pageParam}`;
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
  const tasks = data ? data.pages.flatMap((page) => page.dtoList) : [];
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
  return (
    <div>
      <div className={styles.navContainer}>
        <ProjectNavBar project={project} setProjectUpdate={setProjectUpdate} />
        <div className={styles.userList}>
          <UserList projectId={projectId} />
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.sortWrapper}>
          <div className={styles.sort}>
            <div className={styles.selectBox}>
              <div
                className={`${styles.defaultOption} icon-button`}
                onClick={() => {
                  setIsSortOpen((prev) => !prev);
                }}
              >
                <span>{selectedSort.label}</span>
                <div className={`default-icon ${styles.iconSize}`}>
                  <img src={Arrow} />
                </div>
              </div>
              {isSortOpen && (
                <ul className={styles.selectOptionList}>
                  {options.map((option, index) => (
                    <li
                      className="icon-button"
                      onClick={() => {
                        handleOptionClick(option);
                      }}
                      key={index}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className={styles.taskContainer}>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
        <div ref={loaderRef}></div>
      </div>
    </div>
  );
}
export default TaskList;
