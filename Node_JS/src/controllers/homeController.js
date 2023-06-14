import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepages.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let getPost = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send("post");
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUsers();
  // console.log("-------------");
  // console.log(data);
  // console.log("-------------");
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  //   console.log(userId);
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    // check userData not found

    return res.render("editCRUD.ejs", {
      user: userData,
    });
  } else {
    return res.send("user not found");
  }
};

let deleteCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let allUser = await CRUDService.deleteUserById(userId);
    return res.render("displayCRUD.ejs", {
      dataTable: allUser,
    });
  } else {
    return res.send("delete wrong !");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let allUser = await CRUDService.updateUserData(data);
  return res.render("displayCRUD.ejs", {
    dataTable: allUser,
  });
};
module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  getPost: getPost,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
