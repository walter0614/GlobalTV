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
    public class ViewsController : ApiController
    {
        private GlobalTVEntities db = new GlobalTVEntities();

        // GET: api/Views
        public IQueryable<View> GetView()
        {
            return db.View.ToList().Select(item => new View()
            {
                IdView = item.IdView,
                NameView = item.NameView,
            }).ToList().AsQueryable();
        }

        // GET: api/Views/5
        [ResponseType(typeof(View))]
        public IHttpActionResult GetView(int id)
        {
            View view = db.View.Find(id);
            if (view == null)
            {
                return NotFound();
            }

            return Ok(view);
        }

        // PUT: api/Views/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutView(int id, View view)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != view.IdView)
            {
                return BadRequest();
            }

            db.Entry(view).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ViewExists(id))
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

        // POST: api/Views
        [ResponseType(typeof(View))]
        public IHttpActionResult PostView(View view)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.View.Add(view);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = view.IdView }, view);
        }

        // DELETE: api/Views/5
        [ResponseType(typeof(View))]
        public IHttpActionResult DeleteView(int id)
        {
            View view = db.View.Find(id);
            if (view == null)
            {
                return NotFound();
            }

            db.View.Remove(view);
            db.SaveChanges();

            return Ok(view);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ViewExists(int id)
        {
            return db.View.Count(e => e.IdView == id) > 0;
        }
    }
}