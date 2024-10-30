CREATE PROCEDURE get_claims()
BEGIN    
    DECLARE totalClaims INT;
    DECLARE claimsNotCompleted INT;
    DECLARE claimsCompleted INT;
    DECLARE descriptionTypeFrequentClaim VARCHAR(255);
    DECLARE amountTypeFrequentClaim INT;

    
    SELECT COUNT(*) INTO totalClaims FROM reclamos;
    SELECT COUNT(*) INTO claimsNotCompleted FROM reclamos WHERE reclamos.idReclamoEstado <> 4;
    SELECT COUNT(*) INTO claimsCompleted FROM reclamos WHERE reclamos.idReclamoEstado = 4;

    SELECT rt.descripcion, COUNT(*) INTO descriptionTypeFrequentClaim, amountTypeFrequentClaim
    FROM reclamos AS r
    INNER JOIN reclamos_tipo AS rt ON rt.idReclamoTipo = r.idReclamoTipo
    GROUP BY r.idReclamoTipo
    ORDER BY amountTypeFrequentClaim DESC 
    LIMIT 1;

    
    SELECT 
        totalClaims,
        claimsNotCompleted,
        claimsCompleted,
        descriptionTypeFrequentClaim,
        amountTypeFrequentClaim;
END