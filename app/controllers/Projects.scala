package controllers

import play.api.libs.json._
import play.api.mvc._
import services.DBs

/**
  * Created by skarb on 14/04/2016.
  */
class Projects extends Controller {

  def list = Action {
    Ok(DBs.projects.list)
  }

  def get(id: String) = Action {
    val value: JsValue = DBs.projects.get(id)
    Ok(value)
  }


  def create = Action(BodyParsers.parse.json) { implicit request =>
    request.body.asOpt[JsObject].map(obj => {
      val id = DBs.projects.save(obj)
      Created.withHeaders("Location" -> routes.Projects.get(id).absoluteURL())
    }).getOrElse(BadRequest)
  }

  def update(id: String) = Action(BodyParsers.parse.json) { implicit request =>
    request.body.asOpt[JsObject].map(obj => {
      if (id == (obj \ "id").get.as[String]) {
        DBs.projects.save(obj)
        Ok
      } else {
        BadRequest("Ids not Match")
      }
    }).getOrElse(BadRequest)
  }
}
