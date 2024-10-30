import { OfficeService } from '../services/officeService.js';
import { UserService } from '../services/userService.js';

const getOffice = async (req, res) => {
    const office = await OfficeService.getAllOffices();
    res.status(200).json(office);
};

const createOffice = async (req, res) => {
    try {
        const newOffice = await OfficeService.createOffice(req.body);
        res.status(201).json(newOffice);
    } catch (err) {
        res.status(500).json({ error: 'Error creating office' });
    }
};

const updateOffice = async (req, res) => {
    const { officeId } = req.params;
    const updates = req.body;
    try {
        const office = await OfficeService.findOfficeById(officeId);
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
        await OfficeService.updateOffice(fieldsToUpdate, [...values, officeId]);
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
        const office = await OfficeService.findOfficeById(officeId);
        if (!office) {
            return res.status(404).json({ message: 'Office not found' });
        }
        const employee = await UserService.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        const employeeInOffice = await OfficeService.employeeOfficeById(employeeId, officeId);
        if (employeeInOffice) {
            return res.status(409).json({ message: 'Employee already exists in this office' });
        }
        await OfficeService.addEmployee(officeId, employeeId);
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
        const office = await OfficeService.findOfficeById(officeId);
        if (!office) {
            return res.status(404).json({ message: 'Office not found' });
        }
        const employee = await UserService.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        const employeeInOffice = await OfficeService.employeeOfficeById(employeeId, officeId);
        if (!employeeInOffice) {
            return res.status(409).json({ message: 'Employee not exists in this office' });
        }
        await OfficeService.removeEmployee(officeId, employeeId);
        res.status(201).json({ message: 'Employee removed successfully' });
    } catch (err) {
        console.error('Error removing employee:', err);
        res.status(500).json({ error: 'Error removing employee' });
    }
};

export { getOffice, createOffice, updateOffice, employeeAdd, employeeRemove };
