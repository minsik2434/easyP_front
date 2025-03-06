import { useEffect, useRef, useState } from "react";
import styles from "../../css/invite.module.css";
import useClickOutside from "../../hooks/useClickOutSide";
import Glass from "../../assets/icon/glass.svg";
import XIcon from "../../assets/icon/x.svg";
import { useInfiniteQuery } from "react-query";
import httpService from "../../utils/axiosClient";
import useDebounce from "../../hooks/useDebounce";
function InviteModal({ setIsInviteOpen }) {
  const modalRef = useRef();
  const [searchValue, setSearchValue] = useState("");
  const debounceSearch = useDebounce(searchValue, 500);
  const [selectedInviteMember, setSelectedInviteMember] = useState(null);
  const loaderRef = useRef(null);
  useClickOutside([modalRef], () => setIsInviteOpen(false));

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    ["inviteMembers", searchValue],
    async ({ pageParam = 0 }) => {
      let request = `/member?email=${searchValue}&page=${pageParam}`;
      const response = await httpService.get(request);
      return response.data;
    },
    {
      enabled: debounceSearch !== "" && searchValue !== "",
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
          <button className={styles.inviteButton}>초대하기</button>
        </div>
      )}
    </div>
  );
}

export default InviteModal;
