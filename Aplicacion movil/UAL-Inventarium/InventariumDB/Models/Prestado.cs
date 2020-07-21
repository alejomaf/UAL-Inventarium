using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace InventariumDB.Models
{
    public class Prestado
{
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idPrestado { get; set; }
        [Required]
        public string retiradoPor { get; set; }
        public DateTime fechaSalida { get; set; }
        public DateTime fechaEntrada { get; set; }
        public DateTime fechaEstimadaEntrega { get; set; }

        [ForeignKey("Usuario")]
        public int idUsuario { get; set; }

        [ForeignKey("Objeto")]
        public int idObjeto { get; set; }
}
}
