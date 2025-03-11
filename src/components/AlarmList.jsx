import { useState } from "react";
import styles from "../css/alarm-list.module.css";
import Alarm from "./Alarm";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useMemberInfo } from "../utils/memberInfo";
import httpService from "../utils/axiosClient";
import { useAppStore } from "../utils/useAppStore";
const AlarmList = () => {
  const [searchValue, setSearchValue] = useState("all");
  const { memberInfo } = useMemberInfo();
  const { toggleNotificationUpdate } = useAppStore();
  const queryClient = useQueryClient();
  const deleteAll = async () => {
    try {
      await httpService.delete("/notification/all");
      queryClient.invalidateQueries(["notifications"]);
      toggleNotificationUpdate();
    } catch (error) {
      console.log(error);
    }
  };
  const checkAll = async () => {
    try {
      await httpService.patch("/notification/isRead/all");
      queryClient.invalidateQueries(["notifications"]);
      toggleNotificationUpdate();
    } catch (error) {
      console.log(error);
    }
  };
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    ["notifications", memberInfo.email, searchValue],
    async ({ pageParam = 0 }) => {
      let request = `/member/notifications?search=${searchValue}&page=${pageParam}`;
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
  const notifications = data ? data.pages.flatMap((page) => page.dtoList) : [];
  return (
    <>
      <div className={styles.optionItemContainer}>
        <div className={styles.buttonWrapper}>
          <button
            className={`${styles.searchButton} ${
              searchValue === "all" ? styles.selected : ""
            }`}
            onClick={() => setSearchValue("all")}
          >
            전체
          </button>
          <button
            className={`${styles.searchButton} ${
              searchValue === "noRead" ? styles.selected : ""
            }`}
            onClick={() => setSearchValue("noRead")}
          >
            미확인
          </button>
        </div>
        <div className={styles.buttonWrapper}>
          <button className={styles.actionButton} onClick={() => checkAll()}>
            전체 읽음
          </button>
          <button className={styles.actionButton} onClick={() => deleteAll()}>
            전체 삭제
          </button>
        </div>
      </div>
      <div className={styles.alarmListContainer}>
        {notifications.map((notif) => (
          <Alarm key={notif.id} notification={notif} />
        ))}
      </div>
    </>
  );
};

export default AlarmList;
