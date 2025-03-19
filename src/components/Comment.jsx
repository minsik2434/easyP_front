import { useState } from "react";
import styles from "../css/comment.module.css";
import { useMemberInfo } from "../utils/memberInfo";
import httpService from "../utils/axiosClient";
import { useMutation, useQueryClient } from "react-query";
const Comment = ({ comment, taskId }) => {
  const { memberInfo } = useMemberInfo();
  const [editState, setEditState] = useState(false);
  const [editInput, setEditInput] = useState(comment.content);
  const queryClient = useQueryClient();
  const updateComment = async ({ commentId, newContent }) => {
    const response = await httpService.patch(`/task/comment/${commentId}`, {
      content: newContent,
    });
    return response.data;
  };

  const deleteComment = async (commentId) => {
    const response = await httpService.delete(`/task/comment/${commentId}`);
    return response.data;
  };
  const updateMutation = useMutation(updateComment, {
    onSuccess: () => {
      // 수정 성공 시 캐시 무효화하여 최신 댓글 목록을 불러옴
      queryClient.invalidateQueries([`comment_${taskId}`, taskId]);
      setEditState(false);
    },
    onError: (error) => {
      console.error("댓글 수정 에러", error);
    },
  });
  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      // 삭제 성공 시 캐시 무효화하여 최신 댓글 목록을 불러옴
      queryClient.invalidateQueries([`comment_${taskId}`, taskId]);
    },
    onError: (error) => {
      console.error("댓글 삭제 에러", error);
    },
  });

  const handleUpdate = () => {
    updateMutation.mutate({ commentId: comment.id, newContent: editInput });
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate(comment.id);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`default-icon ${styles.writerProfileSize}`}>
        <img src={comment.writer.profile} />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.commentHeadWrapper}>
          <span>{comment.writer.name}</span>
          {memberInfo.email === comment.writer.email && (
            <div className={styles.optionButtonWrapper}>
              {!editState ? (
                <button onClick={() => setEditState(true)}>수정</button>
              ) : (
                ""
              )}

              <button onClick={handleDelete}>삭제</button>
            </div>
          )}
        </div>
        {editState === false ? (
          <p>{comment.content}</p>
        ) : (
          <div className={styles.editContainer}>
            <div className={styles.editInput}>
              <textarea
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
              />
            </div>
            <div className={styles.editButtonWrapper}>
              <button
                style={{ backgroundColor: "#1e90ff" }}
                onClick={handleUpdate}
              >
                확인
              </button>
              <button
                style={{ backgroundColor: "#df3262" }}
                onClick={() => {
                  setEditInput(comment.content);
                  setEditState(false);
                }}
              >
                취소
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
