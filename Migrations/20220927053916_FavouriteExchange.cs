using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMP.Migrations
{
    public partial class FavouriteExchange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FavouriteExchange",
                table: "AspNetUsers",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "FavouriteExchangeBase",
                table: "AspNetUsers",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FavouriteExchange",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "FavouriteExchangeBase",
                table: "AspNetUsers");
        }
    }
}
