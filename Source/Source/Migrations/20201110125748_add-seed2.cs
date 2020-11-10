using Microsoft.EntityFrameworkCore.Migrations;

namespace Source.Migrations
{
    public partial class addseed2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "ID", "Email", "Name", "ParentCompanyId" },
                values: new object[] { 1, null, "Hiroshi", 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1);
        }
    }
}
