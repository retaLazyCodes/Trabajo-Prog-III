import { Office } from '../models/office.js';
import { User } from '../models/user.js';

const getOffice = async (req, res) => {
    const office = await Office.getAllOffice();
    res.status(200).json(office);
};

const createOffice = async (req, res) => {
    const newOffice = await Office.createOffice(req.body);
    res.status(201).json(newOffice);
};

const updateOffice = async (req, res) => {
    const { officeId } = req.params;
    const updates = req.body;
    try {
        const office = await Office.findOfficeById(officeId);
        if (!office) {
            return res.status(404).json({ message: 'Office not found' });
        }
        const fieldsToUpdate = [];
        const values = [];
        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined) {
                fieldsToUpdate.push(`${key} = ?`);
                values.push(value);
            }
        }
        if (fieldsToUpdate.length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }
        await Office.updateOffice(fieldsToUpdate, [...values, officeId]);
        res.status(200).json({ message: 'Office updated successfully' });
    } catch (err) {
        console.error('Error updating office:', err);
        res.status(500).json({ error: 'Error updating office' });
    }
};

const employeeAdd = async (req, res) => {
    const { officeId } = req.params;
    const { employeeId } = req.body;
    try {
        const office = await Office.findOfficeById(officeId);
        if (!office) {
            return res.status(404).json({ message: 'Office not found' });
        }
        const employee = await User.findById(employeeId);
        console.log(employee, "________________________aca");
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        await Office.addEmployee(officeId, employeeId);
        res.status(200).json({ message: 'Employee added successfully' });
    } catch (err) {
        console.error('Error adding employee:', err);
        res.status(500).json({ error: 'Error adding employee' });
    }
};

const employeeRemove = async (req, res) => {
    const { officeId } = req.params;
    const { employeeId } = req.body;
    try {
        const office = await Office.findOfficeById(officeId);
        if (!office) {
            return res.status(404).json({ message: 'Office not found' });
        }
        await Office.removeEmployee(officeId, employeeId);
        res.status(200).json({ message: 'Employee removed successfully' });
    } catch (err) {
        console.error('Error removing employee:', err);
        res.status(500).json({ error: 'Error removing employee' });
    }
};

export { getOffice, createOffice, updateOffice, employeeAdd, employeeRemove };
