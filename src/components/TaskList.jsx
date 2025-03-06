import { useParams } from "react-router-dom";
import styles from "../css/tasklist.module.css";
import ProjectNavBar from "./ProjectNavBar";
import { useEffect, useState } from "react";
import httpService from "../utils/axiosClient";
function TaskList() {
  const { projectId } = useParams();
  const [project, setProject] = useState({
    id: "",
    name: "",
    description: "",
    imgUrl: "",
    owner: {
      email: "",
      profile: "",
    },
    bookmarkId: "",
    bookmarked: false,
    updateAt: "",
  });

  const [projectUpdate, setProjectUpdate] = useState(false);
  useEffect(() => {
    const getProjectInfo = async () => {
      try {
        const response = await httpService.get(`/project/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjectInfo();
    setProjectUpdate(false);
  }, [projectId, projectUpdate]);
  return (
    <>
      <div className={styles.navContainer}>
        <ProjectNavBar project={project} setProjectUpdate={setProjectUpdate} />
      </div>
    </>
  );
}
export default TaskList;
