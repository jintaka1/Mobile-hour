import express, { query, request, response } from "express";
import bcrypt from "bcryptjs";
import {
  createStaff,
  deleteStaffById,
  getAllStaff,
  getStaffById,
  getStaffByUsername,
  updateStaffById,
} from "../models/staff.js";
import { creatChangelog } from "../models/changelog.js";
import access_control from "../access_control.js";

const staffController = express.Router();

//if no user session go to login page
// if there is user session go to product_admin page
staffController.get("/staff_login", (request, response) => {
  if (request.session.user) {
    response.redirect("/staff_profile");
  } else {
    response.render("staff_login.ejs");
  }
});

staffController.get("/staff_profile", (request, response) => {
  if (request.session.user.staff_id) {
    getStaffById(request.session.user.staff_id).then(([staffs]) => {
      if (staffs.length > 0) {
        const staff = staffs[0];
        response.render("staff_profile.ejs", {
          staff: staff,
          access_role: staff.staff_role,
        });
      }
    });
  }
});

staffController.post(
  "/edit_staff_profile",
  access_control(["manager", "stock", "sales"]),
  (request, response) => {
    const edit_detail = request.body;
    if (!edit_detail.password.startsWith("$2a")) {
      edit_detail.password = bcrypt.hashSync(edit_detail.password);
    }
    updateStaffById(
      edit_detail.staff_id,
      edit_detail.first_name,
      edit_detail.last_name,
      edit_detail.access_role,
      edit_detail.username,
      edit_detail.password
    ).then(([result]) => {
      const change_description =
          "Staff memeber " + edit_detail.first_name + " has been updated";
        creatChangelog(change_description, request.session.user.staff_id);
      response.redirect("/staff_profile");
    });
  }
);

staffController.post("/staff_login", (request, response) => {
  const login_username = request.body.username;
  const login_password = request.body.password;
  getStaffByUsername(login_username).then(([staffs]) => {
    if (staffs.length > 0) {
      let staff = staffs[0];

      if (bcrypt.compareSync(login_password, staff.staff_password)) {
        request.session.user = {
          staff_id: staff.staff_id,
          access_role: staff.staff_role,
        };

        response.redirect("/staff_profile");
      } else {
        response.render("status.ejs", { status: "Invalid password" });
      }
    } else {
      response.render("status.ejs", { status: "staff not found" });
    }
  });
});

staffController.get("/staff_logout", (request, response) => {
  request.session.destroy();
  response.redirect("/");
});

staffController.get(
  "/staff_admin",
  access_control(["manager"]),
  (request, response) => {
    const edit_id = request.query.edit_id;
    if (edit_id) {
      getStaffById(edit_id).then(([staffs]) => {
        if (staffs.length > 0) {
          const staff = staffs[0];
          getAllStaff().then(([staffs]) => {
            response.render("staff_admin.ejs", {
              staffs: staffs,
              edit_staff: staff,
              access_role: request.session.user.access_role,
            });
          });
        }
      });
    } else {
      getAllStaff().then(([staffs]) => {
        response.render("staff_admin.ejs", {
          staffs: staffs,
          edit_staff: {
            staff_id: 0,
            first_name: "",
            last_name: "",
            access_role: "",
            staffname: "",
            password: "",
          },
          access_role: request.session.user.access_role,
        });
      });
    }
  }
);

staffController.post(
  "/edit_staff",
  access_control(["manager"]),
  (request, response) => {
    const edit_details = request.body;

    if (edit_details.action == "create") {
      createStaff(
        edit_details.first_name,
        edit_details.last_name,
        edit_details.access_role,
        edit_details.username,
        bcrypt.hashSync(edit_details.password)
      ).then(([result]) => {
        const change_description =
          "Staff member " + edit_details.first_name + " has been created";
        creatChangelog(change_description, request.session.user.staff_id);
        response.redirect("/staff_admin");
      });
    } else if (edit_details.action == "update") {
      if (!edit_details.password.startsWith("$2a")) {
        edit_details.password = bcrypt.hashSync(edit_details.password);
      }
      updateStaffById(
        edit_details.staff_id,
        edit_details.first_name,
        edit_details.last_name,
        edit_details.access_role,
        edit_details.username,
        edit_details.password
      ).then(([result]) => {
        const change_description =
          "Staff member " + edit_details.first_name + " has been updated";
        creatChangelog(change_description, request.session.user.staff_id);
        response.redirect("/staff_admin");
      });
    } else if (edit_details.action == "delete") {
      deleteStaffById(edit_details.staff_id).then(([result]) => {
        const change_description =
          "Staff member " + edit_details.first_name + " has been deleted";
        creatChangelog(change_description, request.session.user.staff_id);
        response.redirect("/staff_admin");
      });
    }
  }
);


export default staffController;
