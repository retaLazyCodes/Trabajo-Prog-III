DELIMITER $$

CREATE PROCEDURE user_statics_by_office()
BEGIN
   SELECT 
    oficinas.idOficina AS idOficina,
    oficinas.nombre AS nombre,
    COUNT(usuarios_oficinas.idOficina) AS Cantidad_Usuarios_Activos
FROM 
    oficinas
LEFT JOIN 
    usuarios_oficinas ON oficinas.idOficina = usuarios_oficinas.idOficina AND usuarios_oficinas.activo = 1
GROUP BY 
    oficinas.idOficina, oficinas.nombre
ORDER BY 
    Cantidad_Usuarios_Activos DESC;
END$$

DELIMITER ;