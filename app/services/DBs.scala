package services

import java.io.File
import java.util.UUID

import org.mapdb._
import play.api.libs.json._

import scala.collection.JavaConverters._


/**
  * Created by skarb on 14/04/2016.
  */
object DBs {
  private val dbDirectory = new File("data").mkdir()
  private val dbFile = new File("data/tinderbox_data")

  /**
    * The database context.
    */
  val db = {
    // if we don't set the ClassLoader it will be stuck in SBT
    // Thread.currentThread().setContextClassLoader(play.api.Play.classloader)
    // create the DB
    DBMaker.newFileDB(dbFile).closeOnJvmShutdown.encryptionEnable("password").make
  }


  def commit = {
    db.commit()
  }

  case class Type(id: String) {
    val map: HTreeMap[String, String] = Option[HTreeMap[String, String]](db.getHashMap(id))
      .getOrElse(db.createHashMap(id).keySerializer(Serializer.STRING).valueSerializer(Serializer.STRING).make())


    def save(data: JsObject) = {
      val id = (data \ "id").getOrElse(JsString(UUID.randomUUID().toString)).as[String]
      serialize(id, data)
    }

    def get(key: String): JsValue = {
      Option(map.get(key)).map(s => Json.parse(s)).getOrElse(Json.obj())
    }

    def list:JsArray = {
      val scala: Seq[Object] = map.values().asScala.to[Seq]
      JsArray(scala.map(v => v.toString).map(v => Json.parse(v)))
    }

    def serialize(id: String, data: JsObject): String = {
      map.remove(id)
      val ob = data.deepMerge(Json.obj("id" -> id))
      map.put(id, Json.stringify(ob))
      commit
      id
    }
  }



  val projects = Type("projects")
  val tasks = Type("tasks")
}
