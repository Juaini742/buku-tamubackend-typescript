import {Request, Response} from "express";
import PDFDocument from "pdfkit";
const {Guest} = require("../db/models");

export const PDFDownload = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=laporan.pdf");

    doc.pipe(res);

    doc
      .fontSize(18)
      .text(`Badan Pusat Statistik Kab. Hulu Sungai Tengah`, 50, 50, {
        align: "center",
      });

    doc.moveDown();
    const lorem =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.";

    doc
      .fontSize(12)
      .text(
        `Berikut adalah laporan lengkap mengenai data tamu yang telah direkam di Kantor Badan Pusat Statistik selama tahun 2024. Laporan ini merinci informasi terkait kunjungan tamu-tamu yang datang ke kantor tersebut, mencakup berbagai aspek seperti tujuan kunjungan, aktivitas yang dilakukan, dan berbagai statistik terkait. Data ini memberikan gambaran menyeluruh tentang interaksi dan kehadiran tamu-tamu yang berkontribusi pada kemajuan serta aktivitas di Badan Pusat Statistik selama tahun tersebut.`,
        {
          align: "justify",
        }
      );

    doc.moveDown();
    doc.moveDown();

    const criticTableHeaders = [
      "Tanggal Datang",
      "Nama",
      "Tanggal Lahir",
      "Data",
      "Pendidikan",
    ];
    const criticTableWidths = [80, 120, 80, 120, 80];

    const guestData = await Guest.findAll();

    let criticCurrentX = 50;
    let criticCurrentY = doc.y;

    // Header
    for (let i = 0; i < criticTableHeaders.length; i++) {
      doc
        .rect(criticCurrentX, criticCurrentY, criticTableWidths[i], 20)
        .fillAndStroke("#cccccc", "#000000");
      doc
        .fill("#000000")
        .text(criticTableHeaders[i], criticCurrentX + 5, criticCurrentY + 5, {
          width: criticTableWidths[i],
          height: 20,
          align: "left",
        });

      criticCurrentX += criticTableWidths[i];
    }

    criticCurrentY += 20;

    // Data
    for (const guest of guestData) {
      criticCurrentX = 50;

      let maxRowHeight = 0;

      // Iterasi pertama untuk menghitung tinggi maksimum
      for (let i = 0; i < criticTableHeaders.length; i++) {
        let cellContent;
        switch (i) {
          case 0:
            cellContent = guest.createdAt.toISOString().split("T")[0];
            break;
          case 1:
            cellContent = guest.name;
            break;
          case 2:
            cellContent = guest.born.toISOString().split("T")[0];
            break;
          case 3:
            cellContent = guest.data;
            break;
          case 4:
            cellContent = guest.educate;
            break;
          default:
            cellContent = "";
        }

        const cellHeight = doc.heightOfString(cellContent, {
          width: criticTableWidths[i],
        });

        if (cellHeight > maxRowHeight) {
          maxRowHeight = cellHeight;
        }
      }

      // Iterasi kedua untuk menggambar dan menetapkan tinggi maksimum untuk semua kolom
      criticCurrentX = 50;
      for (let i = 0; i < criticTableHeaders.length; i++) {
        let cellContent;
        switch (i) {
          case 0:
            cellContent = guest.createdAt.toISOString().split("T")[0];
            break;
          case 1:
            cellContent = guest.name;
            break;
          case 2:
            cellContent = guest.born.toISOString().split("T")[0];
            break;
          case 3:
            cellContent = guest.data;
            break;
          case 4:
            cellContent = guest.educate;
            break;
          default:
            cellContent = "";
        }

        doc
          .rect(
            criticCurrentX,
            criticCurrentY,
            criticTableWidths[i],
            maxRowHeight + 10
          )
          .fillAndStroke("#ffffff", "#000000");
        doc
          .fill("#000000")
          .text(cellContent, criticCurrentX + 5, criticCurrentY + 5, {
            width: criticTableWidths[i],
            height: maxRowHeight,
            align: "left",
          });

        criticCurrentX += criticTableWidths[i];
      }

      criticCurrentY += maxRowHeight + 10;
    }

    doc.moveDown();

    doc.moveDown();
    doc.moveDown();

    const textX = doc.x;

    doc.x = textX - 400;
    doc.text(
      `Jumlah total data tamu yang berkunjung adalah ${guestData.length} orang. ${lorem}`,
      {
        align: "justify",
      }
    );

    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();

    doc.text("Pimpinan BPS");
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.text("Bapa.....");

    doc.end();
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
