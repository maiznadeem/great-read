const fs = require("fs");
const axios = require("axios");
const { Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType, AlignmentType, ExternalHyperlink, FootnoteReferenceRun, PageBreak, CharacterSet, ShadingType } = require("docx");

const getWordDocument = async () => {
    const logo = fs.readFileSync('./assets/Logo.png');
    const amazon = fs.readFileSync('./assets/amazon.png');
    const perlego = fs.readFileSync('./assets/perlego.png');
    const font = fs.readFileSync("./assets/Manrope/static/Manrope-SemiBold.ttf");
    const imageURL = "https://great-read-mu.vercel.app/assets/HumilityIsTheNewSmart-bec576ec.jpg";

    const imageBuffer = await axios.get(imageURL, { responseType: 'arraybuffer' })
        .then(response => Buffer.from(response.data, 'binary'))
        .catch(error => {
            console.error("Error fetching image:", error);
            return null;
        });

    if (!imageBuffer) {
        console.error("Failed to fetch image from URL:", imageURL);
        return;
    }

    const bulletPoints = [
        'Sample bullet point 1',
        'Sample bullet point 2',
        'Sample bullet point 3',
    ];
    const categories = [
        "Hello World 1",
        "Hello World 2",
    ]

    const createTable = () => new Table({
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
                        children: [
                            ...bulletPoints.map(point => new Paragraph({
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
                            })),
                        ],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        children: [
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
                                        text: categories[0],
                                    }),
                                ],
                                alignment: AlignmentType.CENTER,
                                spacing: {
                                    before: 200,
                                },
                            }),
                        ],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        children: [
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
                                        text: categories[1],
                                    }),
                                ],
                                alignment: AlignmentType.CENTER,
                                spacing: {
                                    before: 200,
                                    after: 400,
                                },
                            }),
                        ],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                            new Paragraph({
                                children: [
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
                                        link: "http://www.example.com",
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
                        children: [
                            new Paragraph({
                                children: [
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
                                        link: "http://www.example.com",
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
    });

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
        children: [
            createTable(),
            new Paragraph({
                children: [
                    new TextRun("\n"),
                ],
                alignment: AlignmentType.LEFT,
            }),
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
                    new TextRun({
                        font: "Manrope",
                        text: "Add Your thoughts here.",
                        size: 22,
                    }),
                    new PageBreak(),
                ],
                alignment: AlignmentType.LEFT,
            }),
            createTable(),
        ],
    }

    const doc = new Document({
        sections: [],
        defaultFontName: "Manrope",
        fonts: [{ name: "Manrope", data: font, characterSet: CharacterSet.ANSI }],
    });

    doc.addSection(section);

    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("My Document.docx", buffer);
    });
};

module.exports = {
    getWordDocument,
};

// getWordDocument();
