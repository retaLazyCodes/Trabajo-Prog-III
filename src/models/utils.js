export function mapFields (fields) {
    const fieldMapping = {
        active: 'activo',
        name: 'nombre',
        lastname: 'apellido',
        email: 'correoElectronico',
        password: 'contrasenia',
        image: 'imagen'
    };

    return fields.map(field => {
        const [key, ...rest] = field.split(' ');
        const operator = rest.join(' ');
        const mappedKey = fieldMapping[key] || key;
        return `${mappedKey} ${operator}`;
    });
}

export function mapOffices (fields) {
    const fieldMapping = {
        name: 'nombre',
        claimTypeId: 'idReclamoTipo',
        active: 'activo'
    };

    return fields.map(field => {
        const [key, ...rest] = field.split(' ');
        const operator = rest.join(' ');
        const mappedKey = fieldMapping[key] || key;
        return `${mappedKey} ${operator}`;
    });
}
