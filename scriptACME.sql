USE [sebastian_soteno_prueba]
GO
/****** Object:  Table [dbo].[Disponibilidad]    Script Date: 08/03/2023 09:52:05 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Disponibilidad](
	[idDisponibilidad] [int] IDENTITY(1,1) NOT NULL,
	[cantidad] [int] NOT NULL,
	[idProducto] [int] NOT NULL,
	[idSucursal] [int] NOT NULL,
 CONSTRAINT [PK_Disponibilidad] PRIMARY KEY CLUSTERED 
(
	[idDisponibilidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Productos]    Script Date: 08/03/2023 09:52:05 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Productos](
	[idProducto] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](250) NOT NULL,
	[codigo_barras] [int] NOT NULL,
	[precio_unitario] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Productos] PRIMARY KEY CLUSTERED 
(
	[idProducto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sucursal]    Script Date: 08/03/2023 09:52:05 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sucursal](
	[idSucursal] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](250) NOT NULL,
	[activa] [int] NULL,
 CONSTRAINT [PK_Sucursal] PRIMARY KEY CLUSTERED 
(
	[idSucursal] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Disponibilidad] ON 

INSERT [dbo].[Disponibilidad] ([idDisponibilidad], [cantidad], [idProducto], [idSucursal]) VALUES (1, 5, 1, 1)
INSERT [dbo].[Disponibilidad] ([idDisponibilidad], [cantidad], [idProducto], [idSucursal]) VALUES (2, 8, 1, 2)
INSERT [dbo].[Disponibilidad] ([idDisponibilidad], [cantidad], [idProducto], [idSucursal]) VALUES (3, 6, 2, 1)
INSERT [dbo].[Disponibilidad] ([idDisponibilidad], [cantidad], [idProducto], [idSucursal]) VALUES (4, 4, 2, 2)
INSERT [dbo].[Disponibilidad] ([idDisponibilidad], [cantidad], [idProducto], [idSucursal]) VALUES (5, 1, 3, 1)
INSERT [dbo].[Disponibilidad] ([idDisponibilidad], [cantidad], [idProducto], [idSucursal]) VALUES (6, 2, 3, 2)
SET IDENTITY_INSERT [dbo].[Disponibilidad] OFF
GO
SET IDENTITY_INSERT [dbo].[Productos] ON 

INSERT [dbo].[Productos] ([idProducto], [nombre], [codigo_barras], [precio_unitario]) VALUES (1, N'Café Legal', 100010, N'$7.00')
INSERT [dbo].[Productos] ([idProducto], [nombre], [codigo_barras], [precio_unitario]) VALUES (2, N'Chocolate Abuelita', 100011, N'$15.00')
INSERT [dbo].[Productos] ([idProducto], [nombre], [codigo_barras], [precio_unitario]) VALUES (3, N'Bonafina', 100012, N'$12.00')
SET IDENTITY_INSERT [dbo].[Productos] OFF
GO
SET IDENTITY_INSERT [dbo].[Sucursal] ON 

INSERT [dbo].[Sucursal] ([idSucursal], [nombre], [activa]) VALUES (1, N'Sucursal A', 1)
INSERT [dbo].[Sucursal] ([idSucursal], [nombre], [activa]) VALUES (2, N'Sucursal B', 1)
SET IDENTITY_INSERT [dbo].[Sucursal] OFF
GO
ALTER TABLE [dbo].[Disponibilidad]  WITH CHECK ADD  CONSTRAINT [FK_Disponibilidad_Productos] FOREIGN KEY([idProducto])
REFERENCES [dbo].[Productos] ([idProducto])
GO
ALTER TABLE [dbo].[Disponibilidad] CHECK CONSTRAINT [FK_Disponibilidad_Productos]
GO
ALTER TABLE [dbo].[Disponibilidad]  WITH CHECK ADD  CONSTRAINT [FK_Disponibilidad_Sucursal] FOREIGN KEY([idSucursal])
REFERENCES [dbo].[Sucursal] ([idSucursal])
GO
ALTER TABLE [dbo].[Disponibilidad] CHECK CONSTRAINT [FK_Disponibilidad_Sucursal]
GO
