import styles from "../css/alarm.module.css";
import XIcon from "../assets/icon/x.svg";
import ReactDOM from "react-dom";
import { parseDateTime } from "../utils/parseDateTime";
import httpService from "../utils/axiosClient";
import { useState } from "react";
import ErrorModal from "./modals/ErrorModal";
import { useQueryClient } from "react-query";
import { useAppStore } from "../utils/useAppStore";
const Alarm = ({ notification }) => {
  const queryClient = useQueryClient();
  const createAt = parseDateTime(notification.createAt);
  let desc;
  const [showModal, setShowModal] = useState(false);
  const { toggleNotificationUpdate } = useAppStore();
  if (notification.type === "invite") {
    desc = "에 초대되었습니다";
  }
  const inviteAccept = async () => {
    try {
      const requestBody = {
        projectId: notification.projectDto.projectId,
        notificationId: notification.id,
        inviteCode: notification.content,
      };
      await httpService.post(`/project/invite/accept`, requestBody);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "inviteCode expiration"
      ) {
        setShowModal(true);
      }
    } finally {
      queryClient.invalidateQueries(["notifications"]);
      toggleNotificationUpdate();
    }
  };

  const deleteAlarm = async () => {
    try {
      await httpService.delete(`/notification/${notification.id}`);
      queryClient.invalidateQueries(["notifications"]);
      toggleNotificationUpdate();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.projectWrapper}>
        <div className={`default-icon ${styles.projectImgSize}`}>
          <img src={notification.projectDto.imgUrl} />
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <span className={styles.projectName}>
          {notification.projectDto.name}
        </span>
        <span>{desc}</span>
      </div>
      <div className={styles.receivedDateWrapper}>
        <span className={styles.dateField}>{createAt}</span>
      </div>
      <div className={styles.actionButtonWrapper}>
        {!notification.read &&
          (notification.type === "invite" ? (
            <>
              <button className="icon-button" onClick={() => inviteAccept()}>
                수락
              </button>
              <button className="icon-button">거절</button>
            </>
          ) : (
            <button className="icon-button">확인</button>
          ))}
      </div>
      <div className={styles.deleteButtonWrapper}>
        <button className="icon-button" onClick={() => deleteAlarm()}>
          <div className="default-icon">
            <img src={XIcon} />
          </div>
        </button>
      </div>
      {showModal &&
        ReactDOM.createPortal(
          <div className={styles.modalOverlay}>
            <div className={`modal-container ${styles.errorModal}`}>
              <ErrorModal
                title={"초대 코드가 만료되었습니다"}
                content={"초대 코드가 만료되었습니다 다시 초대를 요청하세요"}
                setModal={setShowModal}
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Alarm;
