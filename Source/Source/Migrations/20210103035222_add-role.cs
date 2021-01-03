using Microsoft.EntityFrameworkCore.Migrations;
using Source.Models;

namespace Source.Migrations
{
    public partial class addrole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RoleID",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AppRole",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppRole", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleID",
                table: "Users",
                column: "RoleID");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_AppRole_RoleID",
                table: "Users",
                column: "RoleID",
                principalTable: "AppRole",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.InsertData(nameof(AppRole), nameof(AppRole.RoleType), RoleType.Admin);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_AppRole_RoleID",
                table: "Users");

            migrationBuilder.DropTable(
                name: "AppRole");

            migrationBuilder.DropIndex(
                name: "IX_Users_RoleID",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RoleID",
                table: "Users");
        }
    }
}
