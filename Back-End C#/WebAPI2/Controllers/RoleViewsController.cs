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
    public class RoleViewsController : ApiController
    {
        private GlobalTVEntities db = new GlobalTVEntities();

        // GET: api/RoleViews
        public IQueryable<RoleView> GetRoleView()
        {
            return db.RoleView;
        }

        // GET: api/RoleViews/5
        [ResponseType(typeof(RoleView))]
        public IHttpActionResult GetRoleView(int id)
        {
            RoleView roleView = db.RoleView.Find(id);
            if (roleView == null)
            {
                return NotFound();
            }

            return Ok(roleView);
        }

        // PUT: api/RoleViews/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRoleView(int id, RoleView roleView)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != roleView.IdRoleView)
            {
                return BadRequest();
            }

            db.Entry(roleView).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoleViewExists(id))
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

        // POST: api/RoleViews
        [ResponseType(typeof(RoleView))]
        public IHttpActionResult PostRoleView(RoleView roleView)
        {
            db.RoleView.Add(roleView);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = roleView.IdRoleView }, roleView);
        }

        // DELETE: api/RoleViews/5
        [ResponseType(typeof(RoleView))]
        public IHttpActionResult DeleteRoleView(int id)
        {
            RoleView roleView = db.RoleView.Find(id);
            if (roleView == null)
            {
                return NotFound();
            }

            db.RoleView.Remove(roleView);
            db.SaveChanges();

            return Ok(roleView);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoleViewExists(int id)
        {
            return db.RoleView.Count(e => e.IdRoleView == id) > 0;
        }
    }
}