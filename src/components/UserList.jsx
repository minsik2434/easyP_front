import styles from "../css/user-list.module.css";
import SearchIcon from "../assets/icon/glass.svg";
import XIcon from "../assets/icon/x.svg";
import { useRef, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import httpService from "../utils/axiosClient";
import useDebounce from "../hooks/useDebounce";
const UserList = ({ projectId }) => {
  const [searchValue, setSearchValue] = useState("");
  const debounceSearch = useDebounce(searchValue, 500);
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    ["users", projectId, debounceSearch],
    async ({ pageParam = 0 }) => {
      let request = `/project/members/${projectId}?name=${debounceSearch}&page=${pageParam}`;
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
  const loaderRef = useRef();
  const participatingMembers = data
    ? data.pages.flatMap((page) => page.dtoList)
    : [];
  const owners = participatingMembers.filter(
    (member) => member.projectRole === "OWNER"
  );
  const members = participatingMembers.filter(
    (member) => member.projectRole === "MEMBER"
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
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <button className={styles.searchButton}>
          <div className={`default-icon ${styles.searchBarButtonIcon}`}>
            <img src={SearchIcon} />
          </div>
        </button>
        <input
          placeholder="이름"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
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
      <div className={styles.userContainer}>
        <div className={styles.managerWrapper}>
          {owners.length >= 1 && <span>관리자</span>}
          {owners.map((owner) => (
            <div className={styles.item} key={owner.id}>
              <div className={`default-icon ${styles.profileSize}`}>
                <img src={owner.profile} />
              </div>
              <span>{owner.name}</span>
            </div>
          ))}
        </div>
        <div>
          {members.length >= 1 && <span>멤버</span>}
          {members.map((member) => (
            <div className={styles.item} key={member.id}>
              <div className={`default-icon ${styles.profileSize}`}>
                <img src={member.profile} />
              </div>
              <span>{member.name}</span>
            </div>
          ))}
        </div>
        <div ref={loaderRef} style={{ height: "1px" }} />
      </div>
    </div>
  );
};

export default UserList;
