package controllers

import java.util.UUID

import org.mapdb.HTreeMap

import scala.collection.JavaConverters._
import play.api.libs.json.{JsArray, JsObject}
import play.api.mvc._
import services.DBs

/**
  * Created by skarb on 19/04/2016.
  */


class Tasks extends Controller {

  def generateId(idProject: String): String = {
    "tasks." + idProject + "." + UUID.randomUUID().toString
  }

  def list(idProject: String) = Action {
    val map: HTreeMap[String, String] = DBs.tasks.map
    val keys: Seq[String] = map.keySet().asScala.to[Seq]
    val array: JsArray = JsArray(keys.filter(p => p.startsWith("tasks." + idProject)).map(k => DBs.tasks.get(k)))
    Ok(array)
  }

  def create(idProject: String) = Action(BodyParsers.parse.json) { implicit request =>
    request.body.asOpt[JsObject].map(obj => {
      val id = generateId(idProject)
      DBs.tasks.serialize(id, obj)
      Created(id).withHeaders("Location" -> routes.Projects.get(id).absoluteURL())
    }).getOrElse(BadRequest)
  }

}
