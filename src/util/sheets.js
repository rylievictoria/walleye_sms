import { GoogleSpreadsheet } from "google-spreadsheet";

function formatResponses(questions, responses) {
    let obj = {};
    for (let i = 0; i < questions.length; i++) {
        let q = questions[i];
        let all = [];
        let a = responses.map((r) => {
            console.log(r[i]);
            if (r[i] && r[i].trim()) {
                all.push(...r[i].split(','));
            }
            return r[i];
        });
        all = [...new Set(all)];
        if (all.length > 0) {
            obj[q] = {
                responses: a,
                options: all
            };
        }
    }
    return obj;
}

// Fetch a Google Sheet
export async function getResponses(sheetLink) {
    const sheetID = sheetLink.slice(sheetLink.lastIndexOf("/d/") + 3, sheetLink.lastIndexOf('/edit#'));
    const pageID = sheetLink.slice(sheetLink.lastIndexOf("gid=") + 4, sheetLink.length);

    const doc = new GoogleSpreadsheet(sheetID, pageID);

    try {
        await doc.useApiKey(process.env.REACT_APP_SHEETS_API_KEY);
        await doc.loadInfo();
        let sheet = doc.sheetsById[pageID];
        let rows = await sheet.getRows();
        let responses = rows.map(r => r._rawData);
        await sheet.loadHeaderRow();
        let questions = sheet.headerValues;
        return formatResponses(questions, responses);
    } catch (e) {
        console.error('Error: ', e);
    }
  }