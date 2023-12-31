import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import NoData from "../../Shared/NoData/NoData.tsx";
import deleteImage from "../../assets/images/NoData.svg";
export default function TasksList() {
  const { baseUrl, requestHeaders, userRole }: any = useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [itemId, setItemId] = useState(0);
  const [ModalState, setModalState] = useState("close");
  const handleShow = () => setModalState("close");
  const getAllTasks = () => {
    axios
      .get(`${baseUrl}/Task/${userRole === "Manager" ? "manager" : ""}`, {
        headers: requestHeaders,
      })
      .then((res) => {
        console.log(res.data.data);
        setTasks(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  const handelAddTask = () => {
    navigate("addTask");
  };
  const handelDelete = (e) => {
    setItemId(e);
    axios
      .delete(`${baseUrl}/Task/${e}`, { headers: requestHeaders })
      .then((res) => {
        toast.success("deleted successfully");
        handleShow();
        getAllTasks();
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
    getAllTasks();
  }, []);

  return (
    <>
      <div className="header bg-white my-4 d-flex justify-content-between align-items-center p-3">
        <h3>Tasks</h3>
        {userRole === "Manager" ? (
          <button
            onClick={handelAddTask}
            className="btn border-1 rounded-4 border-black"
          >
            <i className="fa fa-plus"></i> Add New Task
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
            <h3>Delete This Taks ?</h3>
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
      {userRole == "Manager" ? (
        <div className="table-responsive">
          <table className="table table-hover ">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Statues</th>
                <th scope="col">User</th>
                <th scope="col">Project</th>
                <th scope="col">Date Created</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {tasks.length > 0 ? (
              tasks.map((task: any) => (
                <tbody key={task.id}>
                  <tr>
                    <td>{task?.title}</td>
                    <td>{task?.status}</td>
                    <td>{task?.employee.userName}</td>
                    <td>{task?.project?.title}</td>
                    <td>{task?.project?.creationDate}</td>
                    <td>
                      <i className="fa fa-edit mx-2"></i>
                      <i
                        className="fa-solid fa-trash text-danger"
                        onClick={() => showDeleteModal(task.id)}
                      ></i>
                    </td>
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
      ) : (
        <div>Welcome user</div>
      )}
    </>
  );
}
