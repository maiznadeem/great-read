const conversion_cloud = require('groupdocs-conversion-cloud');
const fs = require('fs');

const clientId = process.env.GROUPDOCS_CLIENT_ID;
const clientSecret = process.env.GROUPDOCS_CLIENT_SECRET;

const convert = (filename) => {
    return new Promise(async (resolve, reject) => {
        const convertApi = conversion_cloud.ConvertApi.fromKeys(clientId, clientSecret);
        const fileApi = conversion_cloud.FileApi.fromKeys(clientId, clientSecret);

        try {
            const uploadRequest = new conversion_cloud.UploadFileRequest(`${filename}.docx`, fs.createReadStream(`./assets/${filename}.docx`));
            await fileApi.uploadFile(uploadRequest);

            let settings = new conversion_cloud.ConvertSettings();
            settings.filePath = `${filename}.docx`;
            settings.format = "pdf";
            settings.outputPath = "ConvertedFiles";

            let result = await convertApi.convertDocument(new conversion_cloud.ConvertDocumentRequest(settings));

            const convertedFilePath = result[0].path;
            const downloadRequest = new conversion_cloud.DownloadFileRequest(convertedFilePath);
            const downloadResponse = await fileApi.downloadFile(downloadRequest);
            const outputPath = `./assets/${filename}.pdf`;
            fs.writeFileSync(outputPath, downloadResponse);

            resolve();
        } catch (err) {
            console.log("Error occurred during conversion:", err);
            reject(err);
        }
    });
}

module.exports = {
    convert
}
