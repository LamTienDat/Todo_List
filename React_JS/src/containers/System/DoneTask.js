import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoneTask.scss";
import {
  getAllDoneTaskService,
  removeAllDoneTask,
} from "../../services/taskService";

class DoneTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrTasks: [],
    };
  }

  async componentDidMount() {
    await this.getAllDoneTask();
  }

  getAllDoneTask = async () => {
    let res = await getAllDoneTaskService();
    console.log(res);
    if (res && res.errorCode === 0) {
      this.setState({
        arrTasks: res.data,
      });
    }
  };
  handleRemoveAll = async () => {
    let res = await removeAllDoneTask();
    if (res && res.errorCode === 0) {
      alert("Removed all done task !");
    }
    await this.getAllDoneTask();
  };

  render() {
    let tasks = this.state.arrTasks;
    console.log(tasks);
    return (
      <>
        <div className="todo-list-container">
          <div className="text-center">Done task</div>
          <button
            className="btn btn-primary add-new-task"
            onClick={() => this.handleRemoveAll()}
          >
            Remove all
          </button>
          <div className="content-container">
            {tasks.map((item, index) => {
              return (
                <div className="task">
                  <div className="left-content">
                    <div className="name" key={index}>
                      {item.taskName}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoneTask);
