import { useEffect, useRef, useState } from "react";
import styles from "../../css/invite.module.css";
import useClickOutside from "../../hooks/useClickOutSide";
import ReactDOM from "react-dom";
import Glass from "../../assets/icon/glass.svg";
import XIcon from "../../assets/icon/x.svg";
import { useInfiniteQuery } from "react-query";
import httpService from "../../utils/axiosClient";
import useDebounce from "../../hooks/useDebounce";
import ErrorModal from "./ErrorModal";
function InviteModal({ setIsInviteOpen, projectId }) {
  const modalRef = useRef();
  const [searchValue, setSearchValue] = useState("");
  const debounceSearch = useDebounce(searchValue, 500);
  const [showModal, setShowModal] = useState(false);
  const [selectedInviteMember, setSelectedInviteMember] = useState(null);
  const loaderRef = useRef(null);
  const [error, setError] = useState({ title: "", content: "" });
  useClickOutside([modalRef], () => {
    if (!showModal) {
      setIsInviteOpen(false);
    }
  });
  const sendInvite = async () => {
    try {
      const requestBody = {
        projectId: projectId,
        inviteeEmail: selectedInviteMember.email,
      };
      await httpService.post("/project/invite", requestBody);
      setIsInviteOpen(false);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "already in the Project"
      ) {
        setError({
          title: "초대할 수 없습니다",
          content: `${selectedInviteMember.email} 님은 이미 프로젝트에 참여중입니다`,
        });
        setShowModal(true);
      } else if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === "cannot invite unless OWNER, MANAGER"
      ) {
        setError({
          title: "초대할 수 없습니다",
          content: "초대할 수 있는 권한이 없습니다",
        });
        setShowModal(true);
      } else if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "already invited Member"
      ) {
        setError({
          title: "초대할 수 없습니다",
          content: "이미 초대된 회원입니다",
        });
      }
    }
  };
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    ["inviteMembers", debounceSearch],
    async ({ pageParam = 0 }) => {
      let request = `/member?email=${debounceSearch}&page=${pageParam}`;
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
  const inviteMembers = data ? data.pages.flatMap((page) => page.dtoList) : [];
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
    <div className={styles.container} ref={modalRef}>
      <div className={styles.title}>
        <span>초대하기</span>
      </div>
      <div className={styles.searchContainer}>
        <span>이메일을 입력해주세요</span>
        <div className={styles.searchWrapper}>
          <div className={`default-icon ${styles.searchButtonIcon}`}>
            <img src={Glass} />
          </div>
          <input
            placeholder="email"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setSelectedInviteMember(null);
            }}
          />
          <button
            className={`${styles.xbutton} ${searchValue ? "" : styles.noValue}`}
            onClick={() => {
              setSearchValue("");
              setSelectedInviteMember(null);
            }}
          >
            <div className={`${styles.searchBarButtonIcon} default-icon`}>
              <img src={XIcon} />
            </div>
          </button>
        </div>
        {searchValue !== "" && !selectedInviteMember && (
          <div className={styles.inviteMemberList}>
            {inviteMembers.map((inviteMember) => (
              <div
                className={styles.inviteMember}
                key={inviteMember.email}
                onClick={() => setSelectedInviteMember(inviteMember)}
              >
                <div className={styles.profileImageWrapper}>
                  <div className={`default-icon ${styles.profileImageSize}`}>
                    <img src={inviteMember.profile} />
                  </div>
                </div>
                <div className={styles.inviteMemberInfo}>
                  <span className={styles.emailTag}>{inviteMember.email}</span>
                  <span className={styles.nameTag}>{inviteMember.name}</span>
                </div>
              </div>
            ))}
            <div ref={loaderRef} />
          </div>
        )}
        {selectedInviteMember && (
          <div className={styles.selectedInviteMemberWrapper}>
            <div className={styles.profileImageWrapper}>
              <div className={`default-icon ${styles.profileImageSize}`}>
                <img src={selectedInviteMember.profile} />
              </div>
            </div>
            <div className={styles.inviteMemberInfo}>
              <span className={styles.emailTag}>
                {selectedInviteMember.email}
              </span>
              <span className={styles.nameTag}>
                {selectedInviteMember.name}
              </span>
            </div>
            <button
              className={styles.cancelButton}
              onClick={() => setSelectedInviteMember(null)}
            >
              <div className={`default-icon ${styles.cancelIconSize}`}>
                <img src={XIcon} />
              </div>
            </button>
          </div>
        )}
      </div>
      {selectedInviteMember && (
        <div className={styles.inviteButtonWrapper}>
          <button className={styles.inviteButton} onClick={() => sendInvite()}>
            초대하기
          </button>
        </div>
      )}
      {showModal &&
        ReactDOM.createPortal(
          <div className={styles.modalOverlay}>
            <div className={`modal-container ${styles.errorModal}`}>
              <ErrorModal
                title={error.title}
                content={error.content}
                setModal={setShowModal}
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default InviteModal;
