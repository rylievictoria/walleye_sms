import { GoogleSpreadsheet } from "google-spreadsheet";

export function filterNumbers(data, customers, phoneCol) {
    let numbers = [];
    // Asks if customer has all filters
    Object.keys(data).forEach((d) => {
        const [q, value] = d.split('|||');
        if (data[d] && d !== "message") {
            for(let i=0; i<customers[q].responses.length; i++) {
                if (customers[q].responses[i] === value) {
                    numbers.push(customers[phoneCol].options[i]);
                } else if (customers[q].responses[i].indexOf(value) >= 0) {
                    numbers.push(customers[phoneCol].options[i]);
                }
                // Uncomment to remove number of customer if value is not included in filter
                // else if (numbers.indexOf(customers[phoneCol].options[i]) >= 0) {
                //     numbers.remote(customers[phoneCol].options[i]);
                // }
            }
        }
    });
    numbers = [...new Set(numbers)];
    return numbers;
}

export function formatResponses(questions, responses) {
    let obj = {};
    for (let i = 0; i < questions.length; i++) {
        let q = questions[i];
        let all = [];
        let a = responses.map((r) => {
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