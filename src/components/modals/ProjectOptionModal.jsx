import PropTypes from "prop-types";
import { forwardRef } from "react";
import "../../css/project-option-modal.css";
const ProjectOptionModal = forwardRef(({ setProjectOptionModal }, ref) => {
  return (
    <div className="project-option-modal-container">
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
