import doctorService from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await doctorService.getTopDoctorHome(+limit);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errorCode: -1,
      message: "Error from server...",
    });
  }
};

let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errorCode: -1,
      message: "Error from server...",
    });
  }
};

let postInforDoctor = async (req, res) => {
  try {
    let response = await doctorService.saveDetailInforDoctor(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      errorCode: -1,
      message: "Error from server...",
    });
  }
};

let getDetailDoctorById = async (req, res) => {
  try {
    let info = await doctorService.getDetailDoctorByIdService(req.query.id);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errorCode: -1,
      message: "Error from server...",
    });
  }
};

let getContentMarkdown = async (req, res) => {
  try {
    let content = await doctorService.getContentMarkdownService(req.query.id);
    return res.status(200).json(content);
  } catch (e) {
    return res.status(200).json({
      errorCode: -1,
      message: "Error from server...",
    });
  }
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  postInforDoctor: postInforDoctor,
  getDetailDoctorById: getDetailDoctorById,
  getContentMarkdown: getContentMarkdown,
};
