using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPI2.Models;

namespace WebAPI2.Controllers
{
    public class UsersController : ApiController
    {
        private GlobalTVEntities db = new GlobalTVEntities();

        // GET: api/Users
        public IQueryable<User> GetUser()
        {
            return db.User.ToList().Select(item => new User()
            {
                UserName= item.UserName,
                Id= item.Id,
                Email= item.Email,
                FirstName= item.FirstName,
                LastName= item.LastName,
                PasswordHash= item.PasswordHash,
                UserPerson = item.UserPerson.Select(userP => new UserPerson()
                {
                    idUserPerson = userP.idUserPerson,
                    idUser = userP.idUser,
                    idEmpleado = userP.idEmpleado,
                    Empleado = userP.Empleado == null ? null : new Empleado()
                    {
                        idEmpleado = userP.Empleado.idEmpleado,
                        creacion = userP.Empleado.creacion,
                        estado = userP.Empleado.estado,
                        identificacion = userP.Empleado.identificacion,
                        telefono = userP.Empleado.telefono,
                        celular = userP.Empleado.celular,
                        direccion = userP.Empleado.direccion,
                        genero = userP.Empleado.genero,
                        fechaNacimiento = userP.Empleado.fechaNacimiento,
                    }
                }).ToList()
            }).ToList().AsQueryable();
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(string id)
        {
            User user = db.User.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public User PutUser(string id, User model)
        {
            db.Entry(model).State = EntityState.Modified;
            try{
                db.SaveChanges();
                var store = new UserStore<ApplicationUser>(new ApplicationDbContext());
                var manager = new UserManager<ApplicationUser>(store);
                if (manager.HasPassword(id)){
                    manager.RemovePassword(id);
                }
                var newPasswordHash = manager.PasswordHasher.HashPassword(model.PasswordHash);
                ApplicationUser user = manager.FindById(id);
                store.SetPasswordHashAsync(user, newPasswordHash);
                manager.UpdateAsync(user);
                return model;
            }
            catch (DbUpdateConcurrencyException){
                if (!UserExists(id))
                {
                    model.Id = "";
                    return model;
                }
                else
                {
                    throw;
                }
            }

            
        }


        // POST: api/Users
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(User user)
        {

            db.User.Add(user);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(string id)
        {
            User user = db.User.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.User.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(string id)
        {
            return db.User.Count(e => e.Id == id) > 0;
        }
    }
}