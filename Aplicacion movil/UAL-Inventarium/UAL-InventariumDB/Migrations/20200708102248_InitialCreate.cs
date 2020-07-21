using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UAL_InventariumDB.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Configuracion",
                columns: table => new
                {
                    idConfiguracion = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ip = table.Column<string>(nullable: false),
                    mac = table.Column<string>(nullable: true),
                    boca = table.Column<string>(nullable: true),
                    armario = table.Column<string>(nullable: true),
                    usuario = table.Column<string>(nullable: true),
                    contrasena = table.Column<string>(nullable: true),
                    idObjeto = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Configuracion", x => x.idConfiguracion);
                });

            migrationBuilder.CreateTable(
                name: "GrupoObjetos",
                columns: table => new
                {
                    idGrupoObjetos = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cantidad = table.Column<int>(nullable: false),
                    nombre = table.Column<string>(nullable: true),
                    imagen = table.Column<string>(nullable: true),
                    marca = table.Column<string>(nullable: true),
                    modelo = table.Column<string>(nullable: true),
                    cantidadDisponible = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GrupoObjetos", x => x.idGrupoObjetos);
                });

            migrationBuilder.CreateTable(
                name: "Objeto",
                columns: table => new
                {
                    idObjeto = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    mejorasEquipo = table.Column<string>(nullable: false),
                    codigo = table.Column<int>(nullable: false),
                    disponible = table.Column<bool>(nullable: false),
                    idGrupoObjetos = table.Column<int>(nullable: false),
                    idUbicacion = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Objeto", x => x.idObjeto);
                });

            migrationBuilder.CreateTable(
                name: "Prestado",
                columns: table => new
                {
                    idPrestado = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    retiradoPor = table.Column<string>(nullable: false),
                    fechaSalida = table.Column<DateTime>(nullable: false),
                    fechaEntrada = table.Column<DateTime>(nullable: false),
                    fechaEstimadaEntrega = table.Column<DateTime>(nullable: false),
                    idUsuario = table.Column<int>(nullable: false),
                    idObjeto = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prestado", x => x.idPrestado);
                });

            migrationBuilder.CreateTable(
                name: "Ubicacion",
                columns: table => new
                {
                    idUbicacion = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ubicacion = table.Column<string>(nullable: false),
                    planta = table.Column<string>(nullable: true),
                    edificio = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ubicacion", x => x.idUbicacion);
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    idUsuario = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(nullable: false),
                    contrasena = table.Column<string>(nullable: true),
                    correoElectronico = table.Column<string>(nullable: true),
                    rango = table.Column<int>(nullable: false),
                    departamento = table.Column<int>(nullable: false),
                    telefono = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuario", x => x.idUsuario);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Configuracion");

            migrationBuilder.DropTable(
                name: "GrupoObjetos");

            migrationBuilder.DropTable(
                name: "Objeto");

            migrationBuilder.DropTable(
                name: "Prestado");

            migrationBuilder.DropTable(
                name: "Ubicacion");

            migrationBuilder.DropTable(
                name: "Usuario");
        }
    }
}
