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
    
    public partial class OrdenTrabajoOrdenInventario
    {
        public int idOrdenTrabajoOrdenInventario { get; set; }
        public Nullable<int> idOrdenTrabajo { get; set; }
        public Nullable<int> idOrdenInventario { get; set; }
        public System.DateTime creacion { get; set; }
        public bool estado { get; set; }
    
        public virtual OrdenInventario OrdenInventario { get; set; }
        public virtual OrdenInventario OrdenInventario1 { get; set; }
        public virtual OrdenTrabajo OrdenTrabajo { get; set; }
        public virtual OrdenTrabajo OrdenTrabajo1 { get; set; }
    }
}