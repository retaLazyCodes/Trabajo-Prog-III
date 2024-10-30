import { ReportsService } from '../services/reportsService.js';
import { createObjectCsvStringifier } from 'csv-writer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import puppeteer from 'puppeteer';

const getStatistics = async (req, res) => {
    try {
        const statistics = await ReportsService.getStatistics();
        res.status(200).json(statistics);
    } catch (error) {
        res.status(500).json({ error: 'Error statistics not found' });
    }
};

const downloadClaims = async (req, res) => {
    const { format } = req.params;

    try {
        const claims = await ReportsService.getClaims();

        const modifiedClaims = claims[0].map((claim) => ({
            ...claim,
            descriptionTypeFrequentClaim: `${claim.descriptionTypeFrequentClaim} (${claim.amountTypeFrequentClaim})`
        }));

        if (format === 'csv') {
            const csvStringifier = createObjectCsvStringifier({
                header: [
                    { id: 'totalClaims', title: 'Total de reclamos' },
                    { id: 'claimsNotCompleted', title: 'Reclamos no finalizados' },
                    { id: 'claimsCompleted', title: 'Reclamos finalizados' },
                    { id: 'descriptionTypeFrequentClaim', title: 'Tipo de reclamo más frecuente' }
                ]
            });

            const header = csvStringifier.getHeaderString();
            const records = csvStringifier.stringifyRecords(modifiedClaims);

            const csvContent = header + records;

            res.header('Content-Type', 'text/csv');
            res.attachment('Claims - Report.csv');
            res.send(csvContent);
        } else if (format === 'pdf') {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const templatePath = path.join(__dirname, '../templates', 'claimsReport.hbs');
            const templateHtml = fs.readFileSync(templatePath, 'utf-8');
            const compiledTemplate = handlebars.compile(templateHtml);

            const html = compiledTemplate({ claims: modifiedClaims });

            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(html);

            const pdfBuffer = await page.pdf({
                format: 'A4',
                printBackground: true,
                preferCSSPageSize: true
            });

            // Esto debe borrarse cuando se descargue bien el PDF
            fs.writeFileSync('./Claims - Report.pdf', pdfBuffer);

            await browser.close();

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="Claims - Report.pdf"');
            res.setHeader('Content-Length', pdfBuffer.length);
            res.send(pdfBuffer);
        } else {
            res.status(400).json({ error: `Invalid format: ${format}. Use 'csv' or 'pdf'.` });
        }
    } catch (error) {
        console.error(`Error generating ${format} file:`, error);
        res.status(500).json({ error: `Error generating ${format} file` });
    }
};

export { getStatistics, downloadClaims };
