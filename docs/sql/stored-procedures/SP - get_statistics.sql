CREATE PROCEDURE get_statistics()
BEGIN
    -- Total de reclamos
    SELECT COUNT(*) AS total_reclamos FROM reclamos;
    
    -- Reclamos por oficina
    SELECT o.nombre AS oficina, COUNT(r.idReclamo) AS total_reclamos
    FROM reclamos r
    JOIN usuarios u ON r.idUsuarioCreador = u.idUsuario
    JOIN usuarios_oficinas uo ON u.idUsuario = uo.idUsuario
    JOIN oficinas o ON uo.idOficina = o.idOficina
    GROUP BY o.nombre;
    
    -- Reclamos por tipo
    SELECT rt.descripcion AS tipo_reclamo, COUNT(r.idReclamo) AS total_reclamos
    FROM reclamos r
    JOIN reclamos_tipo rt ON r.idReclamoTipo = rt.idReclamosTipo
    GROUP BY rt.descripcion;
    
    -- Reclamos resueltos y no resueltos
    SELECT 
        CASE 
            WHEN re.descripcion = 'Finalizado' THEN 'Resuelto'
            ELSE 'No resuelto'
        END AS estado,
        COUNT(r.idReclamo) AS total_reclamos
    FROM reclamos r
    JOIN reclamos_estado re ON r.idReclamoEstado = re.idReclamosEstado
    GROUP BY estado;
END