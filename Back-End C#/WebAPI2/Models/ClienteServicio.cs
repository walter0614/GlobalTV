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
    
    public partial class ClienteServicio
    {
        public int idClienteServicio { get; set; }
        public Nullable<int> idCliente { get; set; }
        public Nullable<int> idServicio { get; set; }
        public Nullable<System.DateTime> creacion { get; set; }
        public Nullable<bool> estado { get; set; }
    
        public virtual Cliente Cliente { get; set; }
        public virtual Cliente Cliente1 { get; set; }
        public virtual Servicio Servicio { get; set; }
        public virtual Servicio Servicio1 { get; set; }
    }
}
