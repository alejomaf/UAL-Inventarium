using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace UALInventarium.Models
{
    public class Usuario
{
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idUsuario { get; set; }

        [Required]

        public string nombre { get; set; }
        public string contrasena { get; set; }
        public string correoElectronico { get; set; }
        public int rango { get; set; }
        public int departamento { get; set; }
        public string telefono { get; set; }
}
}
