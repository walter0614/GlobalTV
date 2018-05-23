using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPI2.Models;

namespace WebAPI2.Controllers
{
    public class UserPersonsController : ApiController
    {
        private GlobalTVEntities db = new GlobalTVEntities();

        // GET: api/UserPersons
        public IQueryable<UserPerson> GetUserPerson()
        {
            return db.UserPerson;
        }

        // GET: api/UserPersons/5
        [ResponseType(typeof(UserPerson))]
        public IHttpActionResult GetUserPerson(int id)
        {
            UserPerson userPerson = db.UserPerson.Find(id);
            if (userPerson == null)
            {
                return NotFound();
            }

            return Ok(userPerson);
        }

        // PUT: api/UserPersons/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUserPerson(int id, UserPerson userPerson)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userPerson.idUserPerson)
            {
                return BadRequest();
            }

            db.Entry(userPerson).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserPersonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/UserPersons
        [ResponseType(typeof(UserPerson))]
        public IHttpActionResult PostUserPerson(UserPerson userPerson)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserPerson.Add(userPerson);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = userPerson.idUserPerson }, userPerson);
        }

        // DELETE: api/UserPersons/5
        [ResponseType(typeof(UserPerson))]
        public IHttpActionResult DeleteUserPerson(int id)
        {
            UserPerson userPerson = db.UserPerson.Find(id);
            if (userPerson == null)
            {
                return NotFound();
            }

            db.UserPerson.Remove(userPerson);
            db.SaveChanges();

            return Ok(userPerson);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserPersonExists(int id)
        {
            return db.UserPerson.Count(e => e.idUserPerson == id) > 0;
        }
    }
}