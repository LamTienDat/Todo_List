import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "./Modal.scss";
import DatePicker from "../../components/Input/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class ModalTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: "",
      description: "",
      dueDate: "",
      priority: "Normal",
      taskStatus: "no",
    };
  }

  componentDidMount() {}
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
  checkValidateInput = (taskName) => {
    let isValid = true;
    if (!taskName) {
      isValid = false;
      alert("Name of task is required !!!!");
    }
    return isValid;
  };
  onChangeDatePicker = (date) => {
    this.setState({
      dueDate: date[0],
    });
    console.log(this.state);
  };
  handleAddNewTask = () => {
    if (this.checkValidateInput(this.state.taskName) === true) {
      this.props.createNewTask(this.state);
    }
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          className={"abc"}
        >
          <ModalHeader toggle={() => this.toggle()}>New Task</ModalHeader>
          <ModalBody>
            <div className="modal-container">
              <div className="modal-title">
                <input
                  placeholder="Add new task ....."
                  className="input-title"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "taskName")
                  }
                />
              </div>
              <div className="modal-description">
                <label>Description</label>
                <input
                  className="input-description"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "description")
                  }
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
                    value={this.state.value}
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
              onClick={() => this.handleAddNewTask()}
              className="add-task"
            >
              Add
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
