import { PdfReader } from "pdfreader";

export function extractTextFromPDF(buffer) {
    return new Promise((resolve, reject) => {
        let text = "";

        new PdfReader().parseBuffer(buffer, (err, item) => {
            if (err) {
                reject(err);
            } else if (!item) {
                resolve(text);
            } else if (item.text) {
                text += item.text + " ";
            }
        });
    });
}