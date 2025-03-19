import { forwardRef, useRef } from "react";
import styles from "../../css/change-status.module.css";
import useClickOutside from "../../hooks/useClickOutSide";
import httpService from "../../utils/axiosClient";
import { useMutation, useQueryClient } from "react-query";
const ChangeStatusModal = forwardRef(({ setModal, taskId }, ref) => {
  const modalRef = useRef(null);
  const queryClient = useQueryClient();
  useClickOutside([modalRef, ref], () => setModal(false));
  const mutation = useMutation(
    (newStatus) =>
      httpService.patch(`/task/${taskId}/status`, { status: newStatus }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
      onError: (error) => {
        console.error("상태 변경 에러", error);
      },
    }
  );

  const handleStatusChange = (status) => {
    mutation.mutate(status);
    setModal(false);
  };

  const statusBackground = {
    Done: "#367535",
    Progress: "#122c58",
    Review: "#4b3975",
    Hold: "#cd59dc",
  };

  return (
    <div className={`${styles.container} modal-container`} ref={modalRef}>
      <div className={styles.buttonWrapper}>
        <button
          style={{ backgroundColor: statusBackground["Done"] }}
          onClick={() => handleStatusChange("Done")}
        >
          Done
        </button>
        <button
          style={{ backgroundColor: statusBackground["Progress"] }}
          onClick={() => handleStatusChange("Progress")}
        >
          Progress
        </button>
        <button
          style={{ backgroundColor: statusBackground["Review"] }}
          onClick={() => handleStatusChange("Review")}
        >
          Review
        </button>
        <button
          style={{ backgroundColor: statusBackground["Hold"] }}
          onClick={() => handleStatusChange("Hold")}
        >
          Hold
        </button>
      </div>
    </div>
  );
});
ChangeStatusModal.displayName = "ChangeStatusModal";
export default ChangeStatusModal;
