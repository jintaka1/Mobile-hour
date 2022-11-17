import express, { request, response } from "express";
import access_control from "../access_control.js";
import { getAllChangelogwithstaffs, getChangelogBySearch } from "../models/changelog.js";
const changelogController = express.Router();

changelogController.get(
  "/changelog",
  access_control(["manager"]),
  (request, response) => {
    if (request.query.search_term){
      getChangelogBySearch(request.query.search_term).then(([changelogs])=>{
        response.status(200).render("changelog_view.ejs", {
          changelogs: changelogs,
          access_role: request.session.user.access_role,
        });
      })
    }else{
    getAllChangelogwithstaffs().then(([changelogs]) => {
      response.status(200).render("changelog_view.ejs", {
        changelogs: changelogs,
        access_role: request.session.user.access_role,
      });
    });
    }}
);

export default changelogController;
