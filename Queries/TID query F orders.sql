SELECT CONCAT(EVENT.PARCEL,'  ', EVENT.WATERID) AS 'COMBO', 
        EVENT.LATERAL AS 'LAT', 
        EVENT.SIDEGATE AS 'SG', 
        EVENT.NAME1, 
        EVENT.PHONE1, 
        EVENT.RQSTFLO AS 'FLOW', 
        EVENT.HOURS, 
        PARCD.PIACR AS 'ACRE', 
        EVENT.CROP1, 
        EVENT.IRRIGTYP AS 'TYPE', 
        EVENT.EVENT_TRANDATE AS 'DATE', 
        EVENT.TRANTIME, 
        EVENT.EXCESSIVEORDER AS 'EX', 
        PARCD.LASTIRRIGATION AS 'FINAL', 
        CONCAT(EVENT.COMMENT1,'    ',EVENT.COMMENT2) AS 'COMMENT', 
        SBXDTL.SBXCFS, 
        EVENT.DELETED, 
        EVENT.SERVAREA

FROM TXDB.dbo.EVENT EVENT, TXDB.dbo.PARCD PARCD, TXDB.dbo.SBXDTL SBXDTL

WHERE EVENT.WTIDNO = PARCD.TIDPNUMB 
    AND EVENT.FLOWID = SBXDTL.FLOWID 
    AND (
        (EVENT.IRRIGTYP='01') 
        AND (EVENT.ISPEC='WRQST') 
        AND (EVENT.SERVAREA='01') 
        AND (EVENT.EVENT_TRANDATE > {ts '2023-06-01 00:00:00'} And EVENT.EVENT_TRANDATE < {ts '2023-06-08 00:00:00'}) 
        AND (SBXDTL.SBXDFT='X') 
        OR 
        (EVENT.IRRIGTYP='01') 
        AND (EVENT.ISPEC='WRQST') 
        AND (EVENT.SERVAREA='03') 
        AND (EVENT.EVENT_TRANDATE > {ts '2023-06-01 00:00:00'} And EVENT.EVENT_TRANDATE < {ts '2023-06-08 00:00:00'}) 
        AND (SBXDTL.SBXDFT='X') 
        OR 
        (EVENT.IRRIGTYP='01') 
        AND (EVENT.ISPEC='wrqst') 
        AND (EVENT.SERVAREA='05') 
        AND (EVENT.EVENT_TRANDATE > {ts '2023-06-01 00:00:00'} And EVENT.EVENT_TRANDATE < {ts '2023-06-08 00:00:00'}) 
        AND (SBXDTL.SBXDFT='X')
    );