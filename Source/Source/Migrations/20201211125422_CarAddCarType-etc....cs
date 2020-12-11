using Microsoft.EntityFrameworkCore.Migrations;

namespace Source.Migrations
{
    public partial class CarAddCarTypeetc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CarType",
                table: "Cars",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Maker",
                table: "Cars",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReleaseYear",
                table: "Cars",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CarType",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Maker",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "ReleaseYear",
                table: "Cars");
        }
    }
}
