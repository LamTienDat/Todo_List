import React, { Component } from "react";
import { connect } from "react-redux";
import "./TodoList.scss";

import {
  createNewTaskService,
  getAlltaskService,
  deleteTaskService,
  removeAllDoneTaskServie,
  editTaskService,
  removeAllTaskServie,
} from "../../services/taskService";
import ModalTodo from "./ModalTodo";
import ModalDetail from "./ModalDetail";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalNew: false,
      isOpenModalEdit: false,
      arrTasks: [],
      taskEdit: {},
      isSelected: false,
      selectedTasks: [],
      isChecked: false,
    };
  }

  async componentDidMount() {
    await this.getAllTask();
  }

  handleAddNewtask = () => {
    this.setState({
      isOpenModalNew: true,
    });
  };

  getAllTask = async () => {
    let res = await getAlltaskService();
    if (res && res.errorCode === 0) {
      this.setState({
        arrTasks: res.data,
      });
    }
    this.setState({ isSelected: false });
  };

  toggle = () => {
    this.setState({
      isOpenModalNew: !this.state.isOpenModalNew,
    });
  };
  toggleEdit = () => {
    this.setState({
      isOpenModalEdit: !this.state.isOpenModalEdit,
    });
  };

  createNewTask = async (data) => {
    try {
      let res = await createNewTaskService(data);
      if (res && res.errCode === 0) {
        await this.getAllTask();
        alert("Create task success !!");
        this.setState({
          isOpenModalNew: false,
        });
      } else {
        alert("Loii");
      }
      console.log("check res:", res);
    } catch (e) {
      console.log(e);
    }
  };

  editTask = async (task) => {
    console.log("save task ", task);
    try {
      let res = await editTaskService(task);
      if (res && res.errCode === 0) {
        await this.getAllTask();
        alert("edit sucess");
      } else {
        alert("Loii");
      }
      console.log("check res:", res);
    } catch (e) {
      console.log(e);
    }
  };
  handleViewDetail = (item) => {
    console.log(item.id);
    this.setState({
      isOpenModalEdit: true,
      taskEdit: item,
    });
  };

  handleRemoveTask = async (task) => {
    if (task) {
      console.log(task);
      try {
        let res = await deleteTaskService(task.id);
        if (res && res.errCode === 0) {
          await this.getAllTask();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  handleSelectedTask = (task) => {
    this.setState((prevState) => {
      const { selectedTasks } = prevState;
      const isSelected = selectedTasks.some(
        (selectedTask) => selectedTask.id === task.id
      );
      let newSelectedTasks;

      if (isSelected) {
        // Nếu task đã được chọn, hãy loại bỏ nó khỏi danh sách các task đã chọn
        newSelectedTasks = selectedTasks.filter(
          (selectedTask) => selectedTask.id !== task.id
        );
      } else {
        // Nếu task chưa được chọn, hãy thêm nó vào danh sách các task đã chọn
        newSelectedTasks = [...selectedTasks, task];
      }

      return {
        selectedTasks: newSelectedTasks,
        isSelected: newSelectedTasks.length > 0,
      };
    });
    // this.setState({
    //   isChecked: true,
    // });
  };

  handleDoneSelectedTasks = async () => {
    let { selectedTasks } = this.state;
    let res = await removeAllDoneTaskServie(selectedTasks);
    alert(res);
    await this.getAllTask();
    // this.setState({
    //   isChecked: false,
    // });
  };
  handleDeleteSelectedTasks = async () => {
    let { selectedTasks } = this.state;
    let res = await removeAllTaskServie(selectedTasks);
    alert(res);
    await this.getAllTask();
    // this.setState({
    //   isChecked: false,
    // });
  };
  render() {
    let tasks = this.state.arrTasks;

    // console.log("check tasks", this.state.selectedTasks);
    // console.log("check selected", this.state.selectedTasks);

    return (
      <>
        <div className="todo-list-container">
          <ModalTodo
            isOpen={this.state.isOpenModalNew}
            toggleFromParents={this.toggle}
            createNewTask={this.createNewTask}
          />
          {this.state.isOpenModalEdit && (
            <ModalDetail
              isOpen={this.state.isOpenModalEdit}
              toggleFromParents={this.toggleEdit}
              currentTask={this.state.taskEdit}
              editTask={this.editTask}
            />
          )}
          <div className="text-center">Todo List App</div>
          <button
            className="btn btn-primary add-new-task"
            onClick={() => this.handleAddNewtask()}
          >
            Add a new task +
          </button>
          <div className="content-container">
            {tasks.map((item, index) => {
              return (
                <div className="task">
                  <div className="left-content">
                    <input
                      type="checkbox"
                      className="check-box"
                      // checked={this.state.isChecked}
                      onChange={() => this.handleSelectedTask(item)}
                    />
                    <div className="name" key={index}>
                      {item.taskName}
                    </div>
                  </div>
                  <div className="right-content">
                    <button
                      className="view-detail"
                      onClick={() => this.handleViewDetail(item)}
                    >
                      Detail
                    </button>
                    <button
                      className="remove"
                      onClick={() => this.handleRemoveTask(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {this.state.isSelected && (
            <div className="pop-up">
              <button
                className="done-all"
                onClick={this.handleDoneSelectedTasks}
              >
                Done ALL
              </button>
              <button
                className="remove-all"
                onClick={this.handleDeleteSelectedTasks}
              >
                Remove ALL
              </button>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
