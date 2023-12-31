import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import NoData from "../../Shared/NoData/NoData.tsx";
import deleteImage from "../../assets/images/NoData.svg";
export default function ProjectsList() {
  const navigate = useNavigate();
  const handelAddProject = () => {
    navigate("addProject");
  };
  const { baseUrl, requestHeaders, userRole }: any = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [itemId, setItemId] = useState(0);
  const [ModalState, setModalState] = useState("close");
  const handleShow = () => setModalState("close");

  const getAllProjects = () => {
    axios
      .get(
        userRole == "Manager"
          ? `${baseUrl}/Project/manager`
          : `${baseUrl}/Project/employee`,
        {
          headers: requestHeaders,
        }
      )
      .then((res) => {
        setProjects(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  const handelDelete = (e) => {
    setItemId(e);
    axios
      .delete(`${baseUrl}/Project/${e}`, { headers: requestHeaders })
      .then((res) => {
        toast.success("deleted successfully");
        handleShow();
        getAllProjects();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  const showDeleteModal = (id) => {
    setModalState("show-Delete-Modal");
    setItemId(id);
  };
  const handelUpdate = (project) => {
    navigate("updateProject");
  };

  useEffect(() => {
    getAllProjects();
  }, []);
  return (
    <>
      <div className="header bg-white my-4 d-flex justify-content-between align-items-center p-3">
        <h3>Projects</h3>
        {userRole === "Manager" ? (
          <button
            onClick={handelAddProject}
            className="btn border-1 rounded-4 border-black"
          >
            <i className="fa fa-plus"></i> Add New Project
          </button>
        ) : (
          ""
        )}
      </div>

      <Modal show={ModalState === "show-Delete-Modal"} onHide={handleShow}>
        <Modal.Body className="px-5">
          <div className="text-center">
            <img src={deleteImage} alt="deleteimage" />
          </div>
          <div className="text-center my-3 ">
            <h3>Delete This Project ?</h3>
            <p>
              are you sure you want to delete this item ? if you are sure just
              click on delete it .
            </p>
          </div>
          <div className="text-end ">
            <button
              className="btn btn-outline-danger"
              onClick={() => handelDelete(itemId)}
            >
              Delete this item
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="table-responsive">
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Statues</th>
              <th scope="col">Num Tasks</th>
              <th scope="col">Date Created</th>
              {userRole === "Manager" ? <th scope="col">Actions</th> : ""}
            </tr>
          </thead>
          {projects.length > 0 ? (
            projects.map((project: any) => (
              <tbody key={project.id}>
                <tr>
                  <td>{project?.title}</td>
                  <td>{project?.description}</td>
                  <td>{project?.task?.length}</td>
                  <td>{project.creationDate}</td>
                  {userRole === "Manager" ? (
                    <td>
                      <i
                        className="fa fa-edit mx-2"
                        onClick={() => handelUpdate(project)}
                      ></i>
                      <i
                        className="fa-solid fa-trash text-danger "
                        onClick={() => showDeleteModal(project.id)}
                      ></i>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              </tbody>
            ))
          ) : (
            <tr>
              <td colSpan={6}>
                <NoData />
              </td>
            </tr>
          )}
        </table>
      </div>
    </>
  );
}
