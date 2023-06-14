import db from "../models/index";

let getTopDoctorHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errorCode: 0,
        data: users,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: {
          roleId: "R2",
        },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({
        errorCode: 0,
        data: doctors,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let saveDetailInforDoctor = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !inputData.doctorId ||
        !inputData.contentHTML ||
        !inputData.contentmarkdown ||
        !inputData.action
      ) {
        resolve({
          errorCode: 1,
          errMessage: "Missing parameters",
          attb: {
            doctorId: inputData.doctorId,
            contentHTML: inputData.contentHTML,
            contentmarkdown: inputData.contentmarkdown,
          },
        });
      } else {
        // await db.Markdown.create({
        //   contentHTML: inputData.contentHTML,
        //   contentmarkdown: inputData.contentmarkdown,
        //   doctorId: inputData.doctorId,
        //   description: inputData.description,
        // });
        if (inputData.action === "CREATE") {
          await db.Markdown.create({
            contentHTML: inputData.contentHTML,
            contentmarkdown: inputData.contentmarkdown,
            doctorId: inputData.doctorId,
            description: inputData.description,
          });
        } else if (inputData.action === "EDIT") {
          let doctorMarkdown = await db.Markdown.findOne({
            where: {
              doctorId: inputData.doctorId,
            },
            raw: false,
          });
          if (doctorMarkdown) {
            (doctorMarkdown.contentHTML = inputData.contentHTML),
              (doctorMarkdown.contentmarkdown = inputData.contentmarkdown),
              (doctorMarkdown.description = inputData.description),
              await doctorMarkdown.save();
          }
        }
      }
      resolve({ errorCode: 0, errMessage: "save info doctor success" });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailDoctorByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errorCode: 1,
          errMessage: "missing input ....",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: inputId,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentmarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) {
          data = {};
        }
        resolve({
          errorCode: 0,
          data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getContentMarkdownService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errorCode: 1,
          errMessage: "missing input ....",
        });
      } else {
        let data = await db.Markdown.findOne({
          where: {
            doctorId: inputId,
          },
          attributes: {
            exclude: ["specialtyId", "clinicId", "createdAt", "updatedAt"],
          },
          raw: false,
          nest: true,
        });
        if (!data) {
          data = {};
        }
        resolve({
          errorCode: 0,
          data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  saveDetailInforDoctor: saveDetailInforDoctor,
  getDetailDoctorByIdService: getDetailDoctorByIdService,
  getContentMarkdownService: getContentMarkdownService,
};
