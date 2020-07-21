using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace UAL_InventariumDB.Models
{
    public class Configuracion
{
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idConfiguracion { get; set; }

        [Required]
        public string ip { get; set; }
        public string mac { get; set; }
        public string boca { get; set; }
        public string armario { get; set; }
        public string usuario { get; set; }
        public string contrasena { get; set; }

        [ForeignKey("Objeto")]
        public int idObjeto { get; set; }
}
}
