using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMP.Migrations
{
    public partial class percentage_move : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Percentage",
                table: "TaxationType");

            migrationBuilder.AddColumn<string>(
                name: "Percentage",
                table: "TypeOfActivity",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Percentage",
                table: "TypeOfActivity");

            migrationBuilder.AddColumn<string>(
                name: "Percentage",
                table: "TaxationType",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
