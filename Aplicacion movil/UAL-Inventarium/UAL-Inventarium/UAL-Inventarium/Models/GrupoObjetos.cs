using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;


namespace UALInventarium.Models
{
    public class GrupoObjetos
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idGrupoObjetos { get; set; }

        [Required]

        public int cantidad { get; set; }

        public string nombre { get; set; }

        public string imagen { get; set; }

        public string marca { get; set; }


        public string modelo { get; set; }

        public int cantidadDisponible { get; set; }
    }


}