import * as fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';

const excelFolderPath = 'test-data' + path.sep;

export function readDataFromExcelFile(fileName) {
    const fullPath = excelFolderPath + fileName;
    console.log('Reading Excel file from:', fullPath);
    if (!fs.existsSync(fullPath)) {
        throw new Error(`Excel file not found: ${fullPath}`);
    }
    const workbook = XLSX.readFile(fullPath);
    const dataFromFirstSheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    return dataFromFirstSheet;
}