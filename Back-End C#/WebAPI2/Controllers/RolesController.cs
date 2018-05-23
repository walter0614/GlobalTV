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
    public class RolesController : ApiController
    {
        private GlobalTVEntities db = new GlobalTVEntities();

        // GET: api/Roles
        public IQueryable<Role> GetRole()
        {
            return db.Role.ToList().Select(item => new Role()
            {
                Id = item.Id,
                Name = item.Name,
                RoleView = item.RoleView.Select(rolV => new RoleView()
                {
                    IdRoleView = rolV.IdRoleView,
                    IdRole = rolV.IdRole,
                    IdView = rolV.IdView,
                    View = rolV.View == null ? null : new View()
                    {
                        IdView = rolV.View.IdView,
                        NameView = rolV.View.NameView
                    }
                }).ToList()
            }).ToList().AsQueryable();
        }

        // GET: api/Roles/5
        [ResponseType(typeof(Role))]
        public IQueryable<Role> GetRole(string id)
        {
            return db.Role.ToList().Where(item => item.Id == id)
                .Select(item => new Role()
                {
                    Id = item.Id,
                    Name = item.Name
                })
            .ToList().AsQueryable();
        }

        // PUT: api/Roles/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRole(string id, Role role)
        {

            if (id != role.Id)
            {
                return BadRequest();
            }

            db.Entry(role).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoleExists(id))
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

        // POST: api/Roles
        [ResponseType(typeof(Role))]
        public IHttpActionResult PostRole(Role role)
        {
            role.Id = Guid.NewGuid().ToString("N");

            db.Role.Add(role);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (RoleExists(role.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = role.Id }, role);
        }

        // DELETE: api/Roles/5
        [ResponseType(typeof(Role))]
        public IHttpActionResult DeleteRole(string id)
        {
            Role role = db.Role.Find(id);
            if (role == null)
            {
                return NotFound();
            }

            db.Role.Remove(role);
            db.SaveChanges();

            return Ok(role);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoleExists(string id)
        {
            return db.Role.Count(e => e.Id == id) > 0;
        }
    }
}