using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace UAL_InventariumDB.Models
{
    class Objeto
{
        [Key]
        public int idObjeto { get; set; }

        [Required]
        public string mejorasEquipo { get; set; }
        public int codigo { get; set; }
        public bool disponible { get; set; }

        [ForeignKey("GrupoObjetos")]
        public int idGrupoObjetos { get; set; }

        [ForeignKey("Ubicacion")]

        public int idUbicacion { get; set; }

}
}
