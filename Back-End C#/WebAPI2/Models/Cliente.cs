//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebAPI2.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Cliente
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Cliente()
        {
            this.ClienteServicio = new HashSet<ClienteServicio>();
            this.ClienteServicio1 = new HashSet<ClienteServicio>();
            this.OrdenTrabajoCliente = new HashSet<OrdenTrabajoCliente>();
            this.OrdenTrabajoCliente1 = new HashSet<OrdenTrabajoCliente>();
        }
    
        public int idCliente { get; set; }
        public System.DateTime creacion { get; set; }
        public bool estado { get; set; }
        public string identificacion { get; set; }
        public string primerNombre { get; set; }
        public string segundoNombre { get; set; }
        public string primerApellido { get; set; }
        public string segundoApellido { get; set; }
        public Nullable<long> telefono { get; set; }
        public long celular { get; set; }
        public string direccion { get; set; }
        public bool genero { get; set; }
        public System.DateTime fechaNacimiento { get; set; }
        public string correo { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ClienteServicio> ClienteServicio { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ClienteServicio> ClienteServicio1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OrdenTrabajoCliente> OrdenTrabajoCliente { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OrdenTrabajoCliente> OrdenTrabajoCliente1 { get; set; }
    }
}