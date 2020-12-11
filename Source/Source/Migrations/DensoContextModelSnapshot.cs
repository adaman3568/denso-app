﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Source.Models;

namespace Source.Migrations
{
    [DbContext(typeof(DensoContext))]
    partial class DensoContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Source.Models.Car", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CarNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CarType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("Detail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Maker")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ParentCustomerId")
                        .HasColumnType("int");

                    b.Property<int>("ReleaseYear")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.HasIndex("ParentCustomerId");

                    b.ToTable("Cars");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            CarNo = "11-11",
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            ParentCustomerId = 1,
                            ReleaseYear = 0
                        },
                        new
                        {
                            ID = 2,
                            CarNo = "22-22",
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            ParentCustomerId = 1,
                            ReleaseYear = 0
                        },
                        new
                        {
                            ID = 3,
                            CarNo = "33-33",
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            ParentCustomerId = 2,
                            ReleaseYear = 0
                        },
                        new
                        {
                            ID = 4,
                            CarNo = "44-44",
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            ParentCustomerId = 2,
                            ReleaseYear = 0
                        });
                });

            modelBuilder.Entity("Source.Models.Comment", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("Detail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ParentCarId")
                        .HasColumnType("int");

                    b.Property<int?>("ParentCommentId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("datetime2");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("ParentCarId");

                    b.HasIndex("ParentCommentId");

                    b.HasIndex("UserId");

                    b.ToTable("Comments");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Detail = "test1",
                            ParentCarId = 1,
                            UserId = 1
                        },
                        new
                        {
                            ID = 2,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Detail = "test2",
                            ParentCarId = 2,
                            UserId = 1
                        },
                        new
                        {
                            ID = 3,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Detail = "test3",
                            ParentCarId = 3,
                            UserId = 1
                        },
                        new
                        {
                            ID = 4,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Detail = "test4",
                            ParentCarId = 4,
                            UserId = 1
                        },
                        new
                        {
                            ID = 5,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Detail = "test5",
                            ParentCarId = 1,
                            UserId = 1
                        },
                        new
                        {
                            ID = 6,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Detail = "test6",
                            ParentCarId = 2,
                            UserId = 1
                        },
                        new
                        {
                            ID = 7,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Detail = "test7",
                            ParentCarId = 3,
                            UserId = 1
                        });
                });

            modelBuilder.Entity("Source.Models.Company", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AccountCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.ToTable("Companies");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Rst.com"
                        });
                });

            modelBuilder.Entity("Source.Models.Customer", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("Detail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ParentCompanyId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.HasIndex("ParentCompanyId");

                    b.ToTable("Customers");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            Address = "東京都千代田区",
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Detail = "良い会社",
                            Name = "株式会社タイガー",
                            ParentCompanyId = 1
                        },
                        new
                        {
                            ID = 2,
                            Address = "福岡県福岡市",
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Detail = "良い会社",
                            Name = "株式会社Rejoist.",
                            ParentCompanyId = 1
                        });
                });

            modelBuilder.Entity("Source.Models.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ParentCompanyId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("datetime2");

                    b.Property<string>("uid")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("ParentCompanyId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Hiroshi",
                            ParentCompanyId = 1
                        },
                        new
                        {
                            ID = 2,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "杉山　隆",
                            ParentCompanyId = 1
                        });
                });

            modelBuilder.Entity("Source.Models.Car", b =>
                {
                    b.HasOne("Source.Models.Customer", "ParentCustomer")
                        .WithMany("Cars")
                        .HasForeignKey("ParentCustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Source.Models.Comment", b =>
                {
                    b.HasOne("Source.Models.Car", "ParentCar")
                        .WithMany("Comments")
                        .HasForeignKey("ParentCarId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Source.Models.Comment", "ParentComment")
                        .WithMany("RepComment")
                        .HasForeignKey("ParentCommentId");

                    b.HasOne("Source.Models.User", "User")
                        .WithMany("Comments")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Source.Models.Customer", b =>
                {
                    b.HasOne("Source.Models.Company", "ParentCompany")
                        .WithMany("Customers")
                        .HasForeignKey("ParentCompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Source.Models.User", b =>
                {
                    b.HasOne("Source.Models.Company", "ParentCompany")
                        .WithMany("Users")
                        .HasForeignKey("ParentCompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
