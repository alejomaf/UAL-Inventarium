using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace UALInventarium.Models
{
    public class Ubicacion
{
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idUbicacion { get; set; }

        [Required]
        public string ubicacion { get; set; }

        public string planta { get; set; }

        public string edificio { get; set; }
}
}
