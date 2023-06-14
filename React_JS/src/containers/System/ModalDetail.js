import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "./Modal.scss";
import _ from "lodash";
import DatePicker from "../../components/Input/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
class ModalTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskId: "",
      taskName: "",
      description: "",
      dueDate: "",
      priority: "",
      taskStatus: "no",
    };
  }

  componentDidMount() {
    let tasks = this.props.currentTask;
    console.log("check task", tasks);

    this.setState({
      taskId: tasks.id,
      taskName: tasks.taskName,
      description: tasks.description,
      dueDate: tasks.dueDate,
      priority: tasks.priority,
      taskStatus: tasks.taskStatus,
    });
  }
  toggle = () => {
    this.props.toggleFromParents();
  };

  handleOnchangeInput = (event, id) => {
    let dueDate = this.state.dueDate;
    let copyState = { dueDate, ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {}
    );
  };
  onChangeDatePicker = (date) => {
    this.setState({
      dueDate: date[0],
    });
    console.log(this.state);
  };
  checkValidateInput = (taskName) => {
    let isValid = true;
    if (!taskName) {
      isValid = false;
      alert("Name of task is required !!!!");
    }
    return isValid;
  };
  handleSaveTask = () => {
    if (this.checkValidateInput(this.state.taskName) === true) {
      this.props.editTask(this.state);
    }
  };
  render() {
    // console.log(this.props.currentTask);
    return (
      <>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          className={"abc"}
        >
          <ModalHeader toggle={() => this.toggle()}>Edit Task</ModalHeader>
          <ModalBody>
            <div className="modal-container">
              <div className="modal-title">
                <input
                  className="input-title"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "taskName")
                  }
                  value={this.state.taskName}
                />
              </div>
              <div className="modal-description">
                <label>Description</label>
                <input
                  className="input-description"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "description")
                  }
                  value={this.state.description}
                />
              </div>
              <div className="modal-select">
                <div className="date">
                  <label>Due Date</label>
                  <DatePicker
                    onChange={this.onChangeDatePicker}
                    value={this.state.dueDate}
                    className="form-control"
                    minDate={new Date()}
                  />
                </div>
                <div className="priority">
                  <label>Priority</label>
                  <select
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "priority")
                    }
                    defaultValue="Normal"
                    value={this.state.priority}
                    className="form-control"
                  >
                    <option>Low</option>
                    <option>Normal</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.handleSaveTask()}
              className="add-task"
            >
              Save
            </Button>{" "}
            <Button color="secondary" onClick={() => this.toggle()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalTodo);
