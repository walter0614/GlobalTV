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
    
    public partial class OrdenInventario
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public OrdenInventario()
        {
            this.ElementoInventarioKardex = new HashSet<ElementoInventarioKardex>();
            this.ElementoInventarioKardex1 = new HashSet<ElementoInventarioKardex>();
            this.OrdenTrabajoOrdenInventario = new HashSet<OrdenTrabajoOrdenInventario>();
            this.OrdenTrabajoOrdenInventario1 = new HashSet<OrdenTrabajoOrdenInventario>();
        }
    
        public int idOrdenInventario { get; set; }
        public string descripcion { get; set; }
        public System.DateTime creacion { get; set; }
        public bool estado { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ElementoInventarioKardex> ElementoInventarioKardex { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ElementoInventarioKardex> ElementoInventarioKardex1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OrdenTrabajoOrdenInventario> OrdenTrabajoOrdenInventario { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OrdenTrabajoOrdenInventario> OrdenTrabajoOrdenInventario1 { get; set; }
    }
}
