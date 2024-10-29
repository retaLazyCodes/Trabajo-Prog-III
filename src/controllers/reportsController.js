import { ReportsService } from '../services/reportsService.js';
import { createObjectCsvStringifier } from 'csv-writer';

const getStatistics = async (req, res) => {
    try {
        const statistics = await ReportsService.getStatistics();
        res.status(200).json(statistics);
    } catch (error) {
        res.status(500).json({ error: 'Error statistics not found' });
    }
};

const downloadClaimsCSV = async (req, res) => {
    try {
        const claims = await ReportsService.getClaimsForCSV();

        const csvStringifier = createObjectCsvStringifier({
            header: [
                { id: 'id', title: 'ID' },
                { id: 'descripcion', title: 'Descripción' },
                { id: 'tipo', title: 'Tipo' },
                { id: 'oficina', title: 'Oficina' },
                { id: 'estado', title: 'Estado' },
                { id: 'fechaCreacion', title: 'Fecha de creación' }
            ]
        });

        const header = csvStringifier.getHeaderString();
        const records = csvStringifier.stringifyRecords(claims);

        const csvContent = header + records;

        res.header('Content-Type', 'text/csv');
        res.attachment('Reclamos - Reporte.csv');
        res.send(csvContent);
    } catch (error) {
        console.error('Error generating CSV file:', error);
        res.status(500).json({ error: 'Error generating CSV file' });
    }
};

export { getStatistics, downloadClaimsCSV };
