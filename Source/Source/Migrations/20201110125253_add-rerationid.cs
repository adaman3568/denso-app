using Microsoft.EntityFrameworkCore.Migrations;

namespace Source.Migrations
{
    public partial class addrerationid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Customers_ParentCustomerID",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Users_UserID",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Customers_Companies_ParentCompanyID",
                table: "Customers");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Companies_ParentCompanyID",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "ParentCompanyID",
                table: "Users",
                newName: "ParentCompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Users_ParentCompanyID",
                table: "Users",
                newName: "IX_Users_ParentCompanyId");

            migrationBuilder.RenameColumn(
                name: "ParentCompanyID",
                table: "Customers",
                newName: "ParentCompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Customers_ParentCompanyID",
                table: "Customers",
                newName: "IX_Customers_ParentCompanyId");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Comments",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_UserID",
                table: "Comments",
                newName: "IX_Comments_UserId");

            migrationBuilder.RenameColumn(
                name: "ParentCustomerID",
                table: "Cars",
                newName: "ParentCustomerId");

            migrationBuilder.RenameIndex(
                name: "IX_Cars_ParentCustomerID",
                table: "Cars",
                newName: "IX_Cars_ParentCustomerId");

            migrationBuilder.AlterColumn<int>(
                name: "ParentCompanyId",
                table: "Users",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ParentCompanyId",
                table: "Customers",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Customers",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Comments",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ParentCustomerId",
                table: "Cars",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Customers_ParentCustomerId",
                table: "Cars",
                column: "ParentCustomerId",
                principalTable: "Customers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Users_UserId",
                table: "Comments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_Companies_ParentCompanyId",
                table: "Customers",
                column: "ParentCompanyId",
                principalTable: "Companies",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Companies_ParentCompanyId",
                table: "Users",
                column: "ParentCompanyId",
                principalTable: "Companies",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Customers_ParentCustomerId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Users_UserId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Customers_Companies_ParentCompanyId",
                table: "Customers");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Companies_ParentCompanyId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Customers");

            migrationBuilder.RenameColumn(
                name: "ParentCompanyId",
                table: "Users",
                newName: "ParentCompanyID");

            migrationBuilder.RenameIndex(
                name: "IX_Users_ParentCompanyId",
                table: "Users",
                newName: "IX_Users_ParentCompanyID");

            migrationBuilder.RenameColumn(
                name: "ParentCompanyId",
                table: "Customers",
                newName: "ParentCompanyID");

            migrationBuilder.RenameIndex(
                name: "IX_Customers_ParentCompanyId",
                table: "Customers",
                newName: "IX_Customers_ParentCompanyID");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Comments",
                newName: "UserID");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_UserId",
                table: "Comments",
                newName: "IX_Comments_UserID");

            migrationBuilder.RenameColumn(
                name: "ParentCustomerId",
                table: "Cars",
                newName: "ParentCustomerID");

            migrationBuilder.RenameIndex(
                name: "IX_Cars_ParentCustomerId",
                table: "Cars",
                newName: "IX_Cars_ParentCustomerID");

            migrationBuilder.AlterColumn<int>(
                name: "ParentCompanyID",
                table: "Users",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ParentCompanyID",
                table: "Customers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "UserID",
                table: "Comments",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ParentCustomerID",
                table: "Cars",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Customers_ParentCustomerID",
                table: "Cars",
                column: "ParentCustomerID",
                principalTable: "Customers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Users_UserID",
                table: "Comments",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_Companies_ParentCompanyID",
                table: "Customers",
                column: "ParentCompanyID",
                principalTable: "Companies",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Companies_ParentCompanyID",
                table: "Users",
                column: "ParentCompanyID",
                principalTable: "Companies",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
