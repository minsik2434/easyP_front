import styles from "../css/task.module.css";
import Dot from "../assets/icon/dot.svg";
import { useEffect, useRef, useState } from "react";
import httpService from "../utils/axiosClient.js";
import TaskOptionModal from "./modals/TaskOptionModal";
import ChangeStatusModal from "./modals/ChangeStatusModal.jsx";
import { useMemberInfo } from "../utils/memberInfo.js";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import Comment from "./Comment.jsx";
const Task = ({ task }) => {
  const statusBackground = {
    Done: "#367535",
    Progress: "#122c58",
    Review: "#4b3975",
    Hold: "#cd59dc",
  };
  const loaderRef = useRef();
  const [isOptionModal, setIsOptionModal] = useState(false);
  const [isChangeStatus, setIsChangeStatus] = useState(false);
  const { memberInfo } = useMemberInfo();
  const modalButtonRef = useRef(null);
  const statusModalRef = useRef(null);
  const [commentInput, setCommentInput] = useState();
  const queryClient = useQueryClient();
  const addComment = async ({ newContent }) => {
    const response = await httpService.post(`/task/comment/${task.id}`, {
      content: newContent,
    });
    return response.data;
  };
  const addCommentMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([`comment_${task.id}`, task.id]);
    },
    onError: (error) => {
      console.error("댓글 추가 에러", error);
    },
  });
  const handleAddComment = () => {
    addCommentMutation.mutate({ newContent: commentInput });
  };
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    [`comment_${task.id}`, task.id],
    async ({ pageParam = 0 }) => {
      let request = `/task/comment/${task.id}?page=${pageParam}`;
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
  const comments = data ? data.pages.flatMap((page) => page.dtoList) : [];

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
      <div className={styles.contentWrapper}>
        <div className={styles.titleContainer}>
          <div className={styles.statusContainer}>
            <div className={styles.statusWrapper}>
              <button
                className={styles.status}
                style={{
                  backgroundColor: statusBackground[task.status],
                }}
                onClick={() => {
                  setIsChangeStatus((prev) => !prev);
                }}
                ref={statusModalRef}
              >
                {task.status}
              </button>
              {isChangeStatus && (
                <div className={styles.changeStatus}>
                  <ChangeStatusModal
                    setModal={setIsChangeStatus}
                    taskId={task.id}
                    ref={statusModalRef}
                  />
                </div>
              )}
            </div>
            <div className={styles.option}>
              {memberInfo.email === task.writer.email && (
                <button
                  className={`${styles.optionButton} icon-button`}
                  onClick={() => setIsOptionModal((prev) => !prev)}
                  ref={modalButtonRef}
                >
                  <div className="default-icon">
                    <img src={Dot} />
                  </div>
                </button>
              )}

              {isOptionModal && (
                <div className={styles.optionModal}>
                  <TaskOptionModal
                    setModal={setIsOptionModal}
                    ref={modalButtonRef}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.title}>
            <span>{task.title}</span>
          </div>
        </div>
        <div className={styles.writerContainer}>
          <div className={styles.writerWraper}>
            <div className={`default-icon ${styles.writerProfileSize}`}>
              <img src={task.writer.profile} />
            </div>
            <div className={styles.writerInfo}>
              <span className={styles.writerName}>{task.writer.name}</span>
              <span className={styles.writerEmail}>{task.writer.email}</span>
            </div>
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionWrapper}>
            <p>{task.description}</p>
          </div>
        </div>
        <div className={styles.commentContainer}>
          <div className={`${styles.commentProfileSize} default-icon`}>
            <img src={memberInfo.profile} />
          </div>
          <div className={styles.commentInput}>
            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
          </div>
          <button
            className={`${styles.commentSubmit}`}
            onClick={() => {
              handleAddComment();
              setCommentInput("");
            }}
          >
            확인
          </button>
        </div>
        <div className={styles.commentListContainer}>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} taskId={task.id} />
          ))}
          <div ref={loaderRef}></div>
        </div>
      </div>
    </div>
  );
};
export default Task;
