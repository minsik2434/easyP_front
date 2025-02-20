import "../../css/project-option-modal.css";
import styles from "../../css/project-option.module.css";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const ProjectOptionModal = forwardRef(({ setProjectOptionModal }, ref) => {
  return (
    <div className={`${styles.modalContainer} modal-container`}>
      <div className="option-wrapper">
        <div>asdfasdf</div>
        <div>asdfasdf</div>
        <div>asdfasdf</div>
      </div>
    </div>
  );
});

ProjectOptionModal.propTypes = {
  setProjectOptionModal: PropTypes.func.isRequired,
};

ProjectOptionModal.displayName = "ProjectOptionModal";
export default ProjectOptionModal;
