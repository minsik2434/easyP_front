import { useParams } from "react-router-dom";
import styles from "../css/tasklist.module.css";
import ProjectNavBar from "./ProjectNavBar";
import { useEffect, useState } from "react";
import httpService from "../utils/axiosClient";
function TaskList() {
  const { projectId } = useParams();
  const [projectInfo, setProjectInfo] = useState({
    id: "",
    name: "",
    description: "",
    imgUrl: "",
    owner: {
      email: "",
      profile: "",
    },
    updateAt: "",
  });
  useEffect(() => {
    const getProjectInfo = async () => {
      try {
        const response = await httpService.get(`/project/${projectId}`);
        setProjectInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjectInfo();
  }, [projectId]);
  return (
    <>
      <div className={styles.navContainer}>
        <ProjectNavBar project={projectInfo} />
      </div>
    </>
  );
}
export default TaskList;
