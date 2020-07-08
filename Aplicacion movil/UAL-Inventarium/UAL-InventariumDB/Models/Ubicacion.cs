using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace UAL_InventariumDB.Models
{
    public class Ubicacion
{
        [Key]
        public int idUbicacion { get; set; }

        [Required]
        public string ubicacion { get; set; }

        public string planta { get; set; }

        public string edificio { get; set; }
}
}
