import styles from "../../css/notification.module.css";
import Alarm from "../../assets/icon/alarm.svg";
import { useAppStore } from "../../utils/useAppStore";
import { useEffect, useState } from "react";
const Notification = ({ notification }) => {
  const { removeNotification } = useAppStore();
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        removeNotification(notification.id);
      }, 300);
    }, 2000);
    return () => clearTimeout(timer);
  }, [notification.id, removeNotification]);
  let title;
  if (notification.type === "invite") {
    title = "프로젝트 초대 알림";
  }
  let content = notification.content + " 프로젝트에 초대되었습니다";
  return (
    <div
      className={`${styles.container} ${
        exiting ? styles["notification-exit"] : styles["notification-enter"]
      } modal-container`}
    >
      <div className={styles.titleWrapper}>
        <div className={`default-icon`}>
          <img src={Alarm} />
        </div>
        <span>{title}</span>
      </div>
      <div className={styles.contentWrapper}>
        <span>알림: {content}</span>
      </div>
    </div>
  );
};

export default Notification;
