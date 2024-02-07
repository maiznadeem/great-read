const fs = require("fs");
const path = require('path');
const axios = require("axios");
const { Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType, AlignmentType, ExternalHyperlink, PageBreak, CharacterSet, ShadingType } = require("docx");
const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');
const Book = require("../models/Book");

const storage = new Storage({
    keyFilename: path.join(__dirname, 'service-account.json'),
});

const { convert } = require("./convertToPDF");


const getWordDocument = async (req, res) => {

    try {

        const previewOptions = req.body.previewOptions;
        const bookIds = req.body.books.map(book => book._id);
        const books = await Book.find({ _id: { $in: bookIds } }).populate('notes');


        const logo = fs.readFileSync('./assets/Logo.png');
        const amazon = fs.readFileSync('./assets/amazon.png');
        const perlego = fs.readFileSync('./assets/perlego.png');
        const font = fs.readFileSync("./assets/Manrope/static/Manrope-SemiBold.ttf");

        const createTable = async (book) => { 

            const imageBuffer = await axios.get(book.image, { responseType: 'arraybuffer' })
                .then(response => Buffer.from(response.data, 'binary'))
                .catch(error => {
                    console.error("Error fetching image:", error);
                    return null;
                });

            if (!imageBuffer) {
                console.error("Failed to fetch image from URL:", book.image);
                return;
            }

            return new Table({
                width: {
                    size: 100,
                    type: WidthType.PERCENTAGE,
                },
                borders: 0,
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                width: {
                                    size: 30,
                                    type: WidthType.PERCENTAGE,
                                },
                                rowSpan: 2,
                                columnSpan: 2,
                                children: [
                                    new Paragraph({
                                        children: [
                                            new ImageRun({
                                                type: "png",
                                                data: logo,
                                                transformation: {
                                                    width: 100,
                                                    height: 80,
                                                },
                                            }),
                                        ],
                                        alignment: AlignmentType.LEFT,
                                        spacing: {
                                            after: 600,
                                        },
                                    }),
                                    new Paragraph({
                                        children: [
                                            new ImageRun({
                                                type: "jpg",
                                                data: imageBuffer,
                                                transformation: {
                                                    width: 250,
                                                    height: 400,
                                                },
                                            }),
                                        ],
                                        alignment: AlignmentType.LEFT,
                                        spacing: {
                                            after: 400,
                                        },
                                    }),
                                ],
                            }),
                            new TableCell({
                                width: {
                                    size: 70,
                                    type: WidthType.PERCENTAGE,
                                },
                                children: [
                                    new Paragraph({
                                        run: {
                                            font: "Manrope",
                                        },
                                        shading: {
                                            fill: "956829",
                                            val: ShadingType.SOLID,
                                        },
                                        children: [
                                            new TextRun({
                                                font: "Manrope",
                                                text: 'HIGHLIGHTS',
                                                bold: true,
                                                size: 32,
                                                color: "FFFFFF",
                                            }),
                                        ],
                                        alignment: AlignmentType.CENTER,
                                        spacing: {
                                            after: 200,
                                        },
                                    }),
                                ],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                rowSpan: 4,
                                width: {
                                    size: 70,
                                    type: WidthType.PERCENTAGE,
                                },
                                children:
                                    (book.notes?.content ? book.notes.content.map(point => new Paragraph({
                                        children: [
                                            new TextRun({
                                                font: "Manrope",
                                                text: point,
                                                size: 22,
                                            }),
                                        ],
                                        bullet: {
                                            level: 0,
                                        },
                                    })) : []),
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                columnSpan: 2,
                                children: book.categories[0] && previewOptions.label ? [
                                    new Paragraph({
                                        shading: {
                                            fill: "EA580C",
                                            val: ShadingType.SOLID,
                                        },
                                        children: [
                                            new TextRun({
                                                color: "FFFFFF",
                                                size: 28,
                                                font: "Manrope",
                                                text: book.categories[0],
                                            }),
                                        ],
                                        alignment: AlignmentType.CENTER,
                                        spacing: {
                                            before: 200,
                                        },
                                    }),
                                ] : [ new Paragraph("") ],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                columnSpan: 2,
                                children: book.categories[1] && previewOptions.label ? [
                                    new Paragraph({
                                        shading: {
                                            fill: "2563EB",
                                            val: ShadingType.SOLID,
                                        },
                                        children: [
                                            new TextRun({
                                                color: "FFFFFF",
                                                size: 28,
                                                font: "Manrope",
                                                text: book.categories[1],
                                            }),
                                        ],
                                        alignment: AlignmentType.CENTER,
                                        spacing: {
                                            before: 200,
                                            after: 400,
                                        },
                                    }),
                                ] : [ new Paragraph("") ],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                width: {
                                    size: 15,
                                    type: WidthType.PERCENTAGE,
                                },
                                children: [
                                    new Paragraph({
                                        children: [
                                            previewOptions.links && book?.amazon &&
                                            new ExternalHyperlink({
                                                children: [
                                                    new ImageRun({
                                                        type: "png",
                                                        data: amazon,
                                                        transformation: {
                                                            width: 100,
                                                            height: 30,
                                                        },
                                                    }),
                                                ],
                                                link: book.amazon,
                                            }),
                                        ],
                                        alignment: AlignmentType.CENTER,
                                        spacing: {
                                            after: 200,
                                        },
                                    }),
                                ],
                            }),
                            new TableCell({
                                width: {
                                    size: 15,
                                    type: WidthType.PERCENTAGE,
                                },
                                children: [
                                    new Paragraph({
                                        children: [
                                            previewOptions.links && book?.perlego &&
                                            new ExternalHyperlink({
                                                children: [
                                                    new ImageRun({
                                                        type: "png",
                                                        data: perlego,
                                                        transformation: {
                                                            width: 100,
                                                            height: 30,
                                                        },
                                                    }),
                                                ],
                                                link: book?.perlego,
                                            }),
                                        ],
                                        alignment: AlignmentType.CENTER,
                                        spacing: {
                                            after: 200,
                                        },
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            })
        };

        const section = {
            properties: {
                page: {
                    margin: {
                        top: 500,
                        right: 500,
                        bottom: 500,
                        left: 500,
                    },
                },
            },
            children: (await Promise.all(books.map(async book => [
                await createTable(book),
                new Paragraph({
                    children: [
                        new TextRun("\n"),
                    ],
                    alignment: AlignmentType.LEFT,
                }),
                previewOptions.notes &&
                new Table({
                    borders: 0,
                    width: {
                        size: "100%",
                        type: WidthType.PERCENTAGE,
                    },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: "100%",
                                        type: WidthType.PERCENTAGE,
                                    },
                                    children: [
                                        new Paragraph({
                                            run: {
                                                font: "Manrope",
                                            },
                                            shading: {
                                                fill: "956829",
                                                val: ShadingType.SOLID,
                                            },
                                            children: [
                                                new TextRun({
                                                    font: "Manrope",
                                                    text: 'NOTES',
                                                    bold: true,
                                                    size: 32,
                                                    color: "FFFFFF",
                                                }),
                                            ],
                                            alignment: AlignmentType.CENTER,
                                            spacing: {
                                                after: 200,
                                            },
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
                new Paragraph({
                    children: [
                        previewOptions.notes && 
                        new TextRun({
                            font: "Manrope",
                            text: "",
                            size: 22,
                        }),
                        new PageBreak(),
                    ],
                    alignment: AlignmentType.LEFT,
                }),
            ]))).flat(),
        };        

        const doc = new Document({
            sections: [],
            defaultFontName: "Manrope",
            fonts: [{ name: "Manrope", data: font, characterSet: CharacterSet.ANSI }],
        });

        doc.addSection(section);

        const filename = uuidv4();

        await Packer.toBuffer(doc).then((buffer) => {
            fs.writeFileSync(`./assets/${filename}.docx`, buffer);
        });


        convert(filename)
            .then(() => {
                uploadDocs(filename)
                    .then((urls) => {
                        res.json({ urls: urls });
                    })
                    .catch((err) => {
                        console.error('Error uploading files:', err);
                        res.status(500).send('Error uploading files');
                    })
            })
            .catch((err) => {
                console.error('Error converting to PDF:', err);
                res.status(500).send('Error uploading files');
            })
        

    } catch (error) {
        console.error('Error retrieving file:', error);
        res.status(500).send('Error retrieving file');
    }

};


async function uploadDocs(filename) {
    try {
        const bucketName = 'great-read-purchase';
        const folderName = 'purchase';
        const objectNameDocx = `${folderName}/${filename}/${filename}.docx`;
        const objectNamePdf = `${folderName}/${filename}/${filename}.pdf`;

        const bucket = storage.bucket(bucketName);

        await Promise.all([
            new Promise((resolve, reject) => {
                const docxFile = bucket.file(objectNameDocx);
                const docxStream = docxFile.createWriteStream({
                    metadata: {
                        contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    }
                });
                fs.createReadStream(`./assets/${filename}.docx`)
                    .pipe(docxStream)
                    .on('error', reject)
                    .on('finish', resolve);
            }),
            new Promise((resolve, reject) => {
                const pdfFile = bucket.file(objectNamePdf);
                const pdfStream = pdfFile.createWriteStream({
                    metadata: {
                        contentType: 'application/pdf'
                    }
                });
                fs.createReadStream(`./assets/${filename}.pdf`)
                    .pipe(pdfStream)
                    .on('error', reject)
                    .on('finish', resolve);
            })
        ]);

        fs.unlinkSync(`./assets/${filename}.docx`);
        fs.unlinkSync(`./assets/${filename}.pdf`);

        const docxSignedUrl = await bucket.file(objectNameDocx).getSignedUrl({
            action: 'read',
            expires: Date.now() + 60 * 60 * 1000,
        });

        const pdfSignedUrl = await bucket.file(objectNamePdf).getSignedUrl({
            action: 'read',
            expires: Date.now() + 60 * 60 * 1000,
        });

        return [...docxSignedUrl, ...pdfSignedUrl];
    } catch (error) {
        console.error('Error uploading files:', error);
        throw error;
    }
}



module.exports = {
    getWordDocument,
};
