const getClaimsByOffice = async (req, res) => {
    try {
        const claims = [1, 2, 3];
        res.status(200).json(claims);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los reclamos de la oficina' });
    }
};

const attendClaim = async (req, res) => {
    try {
        const claimId = req.params.id;
        const claim = { name: 'reclamo1' };
        res.status(200).json(claim);
    } catch (error) {
        res.status(500).json({ message: 'Error al atender el reclamo' });
    }
};

const createClaim = async (req, res) => {
    try {
        const newClaim = { ...req.body, clientId: req.user.id };
        res.status(201).json(newClaim);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el reclamo' });
    }
};

const getClientClaims = async (req, res) => {
    try {
        const clientId = req.user.id;
        const claims = [1, 2, 3];
        res.status(200).json(claims);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los reclamos del cliente' });
    }
};

const cancelClaim = async (req, res) => {
    try {
        const claimId = req.params.id;
        claim = { name: 'reclamo1' };
        res.status(200).json(claim);
    } catch (error) {
        res.status(500).json({ message: 'Error al cancelar el reclamo' });
    }
};

export { getClaimsByOffice, attendClaim, createClaim, getClientClaims, cancelClaim };