import { ClaimTypeService } from '../services/claimTypeService.js';

const getAllClaimTypes = async (req, res) => {
    const claimType = await ClaimTypeService.getAllClaimTypes();
    res.status(200).json(claimType);
};

const createClaimType = async (req, res) => {
    try {
        const newClaimType = await ClaimTypeService.createClaimType(req.body);
        res.status(201).json(newClaimType);
    } catch (err) {
        res.status(500).json({ error: 'Error creating claim type' });
    }
};

const updateClaimType = async (req, res) => {
    const { claimTypeId } = req.params;
    const updates = req.body;
    try {
        const claimType = await ClaimTypeService.findClaimTypesById(claimTypeId);
        if (!claimType) {
            return res.status(404).json({ message: 'claim type not found' });
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
        await ClaimTypeService.updateClaimType(fieldsToUpdate, [...values, claimTypeId]);
        res.status(200).json({ message: 'Claim type updated successfully' });
    } catch (err) {
        console.error('Error updating claim type:', err);
        res.status(500).json({ error: 'Error updating claim type' });
    }
};

export { getAllClaimTypes, createClaimType, updateClaimType };
