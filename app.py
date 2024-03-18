from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.sql import text

app = Flask(__name__)
CORS(app, resources={r"/forders": {"origins": "http://localhost:3000"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:admin123@localhost/txdb'
app.config["SQLALCHEMY_BINDS"] = {
    'rhdb':'mysql://root:admin123@localhost/rhdb'
}

db = SQLAlchemy(app)


#The following are the models for TXDB
class Event(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    wtidno = db.Column(db.String())
    parcel = db.Column(db.String())
    waterid = db.Column(db.String())
    lateral = db.Column(db.String())
    sidegate = db.Column(db.String())
    name1 = db.Column(db.String())
    phone1 = db.Column(db.String())
    rqstflo = db.Column(db.Float())
    hours = db.Column(db.Float())
    crop1 = db.Column(db.String())
    irrigtyp = db.Column(db.String())
    event_trandate = db.Column(db.Date())
    trantime = db.Column(db.Integer())
    excessiveorder = db.Column(db.String())
    deleted = db.Column(db.String())
    servarea = db.Column(db.String())
    flowid = db.Column(db.String())
    comment1 = db.Column(db.String())
    comment2 = db.Column(db.String())

class Parcd(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    tidpnumb = db.Column(db.String())
    piacr = db.Column(db.Float())
    lastirrigation = db.Column(db.String())

class Sbxdtl(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    flowid = db.Column(db.String())
    sbxcfs = db.Column(db.Float())
    sbxdft = db.Column(db.String())



#The following is the models for RHDB
class Orders(db.Model):
    __bind_key__ = 'rhdb'
 
    combo = db.Column(db.String(17), primary_key=True)
    lat = db.Column(db.String(10))
    sg = db.Column(db.String(10))
    name = db.Column(db.String(100))
    phone = db.Column(db.String(10))
    flow = db.Column(db.Float())
    hours = db.Column(db.Float())
    acre = db.Column(db.Float())
    crop = db.Column(db.String(2))
    type = db.Column(db.String(2))
    date = db.Column(db.Date())
    tranTime = db.Column(db.Integer())
    ex = db.Column(db.String(1))
    final = db.Column(db.String(1))
    comment = db.Column(db.String(255))
    SBXCFS = db.Column(db.Float())
    deleted = db.Column(db.String(1))
    sa = db.Column(db.String(2))
    head = db.Column(db.String(4))
    est_start = db.Column(db.DateTime())
    est_finish = db.Column(db.DateTime())
    wdo_notes = db.Column(db.String(255))
 
class Head1(db.Model):
    __bind_key__ = 'rhdb'
 
    combo = db.Column(db.String(17), primary_key=True)
    lat = db.Column(db.String(10))
    sg = db.Column(db.String(10))
    name = db.Column(db.String(100))
    phone = db.Column(db.String(10))
    flow = db.Column(db.Float())
    hours = db.Column(db.Float())
    est_start = db.Column(db.DateTime())
    prime_date = db.Column(db.Date())
    prime_time = db.Column(db.Integer())
    start_date = db.Column(db.Date())
    start_time = db.Column(db.Integer())
    finish_date = db.Column(db.Date())
    finish_time = db.Column(db.Integer())
    prime_total = db.Column(db.Integer())
    total_hours = db.Column(db.Integer())
    called = db.Column(db.String(1))
    wdo_notes = db.Column(db.String(255))
    comment = db.Column(db.String(255))
    abnormal = db.Column(db.String(1))

class Head2(db.Model):
    __bind_key__ = 'rhdb'
 
    combo = db.Column(db.String(17), primary_key=True)
    lat = db.Column(db.String(10))
    sg = db.Column(db.String(10))
    name = db.Column(db.String(100))
    phone = db.Column(db.String(10))
    flow = db.Column(db.Float())
    hours = db.Column(db.Float())
    est_start = db.Column(db.DateTime())
    prime_date = db.Column(db.Date())
    prime_time = db.Column(db.Integer())
    start_date = db.Column(db.Date())
    start_time = db.Column(db.Integer())
    finish_date = db.Column(db.Date())
    finish_time = db.Column(db.Integer())
    prime_total = db.Column(db.Integer())
    total_hours = db.Column(db.Integer())
    called = db.Column(db.String(1))
    wdo_notes = db.Column(db.String(255))
    comment = db.Column(db.String(255))
    abnormal = db.Column(db.String(1))

class Head3(db.Model):
    __bind_key__ = 'rhdb'
 
    combo = db.Column(db.String(17), primary_key=True)
    lat = db.Column(db.String(10))
    sg = db.Column(db.String(10))
    name = db.Column(db.String(100))
    phone = db.Column(db.String(10))
    flow = db.Column(db.Float())
    hours = db.Column(db.Float())
    est_start = db.Column(db.DateTime())
    prime_date = db.Column(db.Date())
    prime_time = db.Column(db.Integer())
    start_date = db.Column(db.Date())
    start_time = db.Column(db.Integer())
    finish_date = db.Column(db.Date())
    finish_time = db.Column(db.Integer())
    prime_total = db.Column(db.Integer())
    total_hours = db.Column(db.Integer())
    called = db.Column(db.String(1))
    wdo_notes = db.Column(db.String(255))
    comment = db.Column(db.String(255))
    abnormal = db.Column(db.String(1))

class Head4(db.Model):
    __bind_key__ = 'rhdb'
 
    combo = db.Column(db.String(17), primary_key=True)
    lat = db.Column(db.String(10))
    sg = db.Column(db.String(10))
    name = db.Column(db.String(100))
    phone = db.Column(db.String(10))
    flow = db.Column(db.Float())
    hours = db.Column(db.Float())
    est_start = db.Column(db.DateTime())
    prime_date = db.Column(db.Date())
    prime_time = db.Column(db.Integer())
    start_date = db.Column(db.Date())
    start_time = db.Column(db.Integer())
    finish_date = db.Column(db.Date())
    finish_time = db.Column(db.Integer())
    prime_total = db.Column(db.Integer())
    total_hours = db.Column(db.Integer())
    called = db.Column(db.String(1))
    wdo_notes = db.Column(db.String(255))
    comment = db.Column(db.String(255))
    abnormal = db.Column(db.String(1))

class Head5(db.Model):
    __bind_key__ = 'rhdb'
 
    combo = db.Column(db.String(17), primary_key=True)
    lat = db.Column(db.String(10))
    sg = db.Column(db.String(10))
    name = db.Column(db.String(100))
    phone = db.Column(db.String(10))
    flow = db.Column(db.Float())
    hours = db.Column(db.Float())
    est_start = db.Column(db.DateTime())
    prime_date = db.Column(db.Date())
    prime_time = db.Column(db.Integer())
    start_date = db.Column(db.Date())
    start_time = db.Column(db.Integer())
    finish_date = db.Column(db.Date())
    finish_time = db.Column(db.Integer())
    prime_total = db.Column(db.Integer())
    total_hours = db.Column(db.Integer())
    called = db.Column(db.String(1))
    wdo_notes = db.Column(db.String(255))
    comment = db.Column(db.String(255))
    abnormal = db.Column(db.String(1))

class UN(db.Model):
    __bind_key__ = 'rhdb'
 
    combo = db.Column(db.String(17), primary_key=True)
    lat = db.Column(db.String(10))
    sg = db.Column(db.String(10))
    name = db.Column(db.String(100))
    phone = db.Column(db.String(10))
    flow = db.Column(db.Float())
    hours = db.Column(db.Float())
    est_start = db.Column(db.DateTime())
    prime_date = db.Column(db.Date())
    prime_time = db.Column(db.Integer())
    start_date = db.Column(db.Date())
    start_time = db.Column(db.Integer())
    finish_date = db.Column(db.Date())
    finish_time = db.Column(db.Integer())
    prime_total = db.Column(db.Integer())
    total_hours = db.Column(db.Integer())
    called = db.Column(db.String(1))
    wdo_notes = db.Column(db.String(255))
    comment = db.Column(db.String(255))
    abnormal = db.Column(db.String(1))

class M(db.Model):
    __bind_key__ = 'rhdb'
 
    combo = db.Column(db.String(17), primary_key=True)
    lat = db.Column(db.String(10))
    sg = db.Column(db.String(10))
    name = db.Column(db.String(100))
    phone = db.Column(db.String(10))
    flow = db.Column(db.Float())
    hours = db.Column(db.Float())
    est_start = db.Column(db.DateTime())
    prime_date = db.Column(db.Date())
    prime_time = db.Column(db.Integer())
    start_date = db.Column(db.Date())
    start_time = db.Column(db.Integer())
    finish_date = db.Column(db.Date())
    finish_time = db.Column(db.Integer())
    prime_total = db.Column(db.Integer())
    total_hours = db.Column(db.Integer())
    called = db.Column(db.String(1))
    wdo_notes = db.Column(db.String(255))
    comment = db.Column(db.String(255))
    abnormal = db.Column(db.String(1))

class WDO(db.Model):
    __bind_key__ = 'rhdb'

    username = db.Column(db.String(20), primary_key=True)
    password = db.Column(db.String(10))





@app.route('/test_txdb')
def test_txdb():
    event_count = Event.query.count()
    return f"Number of events in TXDB: {event_count}"

@app.route('/test_rhdb')
def test_rhdb():
    wdo_count = WDO.query.count()
    return f"Number of WDOs in RHDB: {wdo_count}"




@app.route('/forders', methods=['GET'])
def forders():
    # Perform the SQL operation to transfer data from TXDB to RHDB.Orders
    transfer_query = text("""
        INSERT IGNORE INTO RHDB.Orders 
            (`COMBO`, `LAT`, `SG`, `NAME`, `PHONE`, `FLOW`, `HOURS`, `ACRE`, `CROP`, `TYPE`, `DATE`, `TRANTIME`, `EX`, `FINAL`, `COMMENT`, `SBXCFS`, `DELETED`, `SA`)
        SELECT 
            CONCAT(TRIM(EVENT.PARCEL), '  ', TRIM(EVENT.WATERID)) AS 'COMBO', 
            EVENT.LATERAL AS 'LAT', 
            EVENT.SIDEGATE AS 'SG', 
            EVENT.NAME1 AS 'NAME', 
            EVENT.PHONE1 AS 'PHONE', 
            EVENT.RQSTFLO AS 'FLOW', 
            EVENT.HOURS, 
            PARCD.PIACR AS 'ACRE', 
            EVENT.CROP1 AS 'CROP', 
            EVENT.IRRIGTYP AS 'TYPE', 
            EVENT.EVENT_TRANDATE AS 'DATE', 
            EVENT.TRANTIME, 
            EVENT.EXCESSIVEORDER AS 'EX', 
            PARCD.LASTIRRIGATION AS 'FINAL', 
            CONCAT(EVENT.COMMENT1,'    ',EVENT.COMMENT2) AS 'COMMENT', 
            SBXDTL.SBXCFS, 
            EVENT.DELETED, 
            EVENT.SERVAREA AS 'SA'  
        FROM 
            TXDB.EVENT EVENT
            JOIN TXDB.PARCD PARCD ON EVENT.WTIDNO = PARCD.TIDPNUMB 
            JOIN TXDB.SBXDTL SBXDTL ON EVENT.FLOWID = SBXDTL.FLOWID 
        WHERE 
            (
                (EVENT.IRRIGTYP='01' AND EVENT.ISPEC='WRQST' AND EVENT.SERVAREA='01' AND EVENT.EVENT_TRANDATE > '2023-06-01' AND EVENT.EVENT_TRANDATE < '2023-06-08' AND SBXDTL.SBXDFT='X') 
                OR 
                (EVENT.IRRIGTYP='01' AND EVENT.ISPEC='WRQST' AND EVENT.SERVAREA='03' AND EVENT.EVENT_TRANDATE > '2023-06-01' AND EVENT.EVENT_TRANDATE < '2023-06-08' AND SBXDTL.SBXDFT='X') 
                OR 
                (EVENT.IRRIGTYP='01' AND EVENT.ISPEC='wrqst' AND EVENT.SERVAREA='05' AND EVENT.EVENT_TRANDATE > '2023-06-01' AND EVENT.EVENT_TRANDATE < '2023-06-08' AND SBXDTL.SBXDFT='X')
            );
    """)
    
    # Execute the transfer query on TXDB
    # tx_result = db.engine.execute(transfer_query)

    with db.engine.connect() as connection:
        connection.execute(transfer_query)
    
    # Now, query the RHDB.Orders to fetch the transferred data
    orders_query = Orders.query.all()
    
    # Convert the query result into a list of dictionaries to jsonify
    orders_list = [
        {
            "Combo": order.combo, 
            "Lat": order.lat, 
            "SG": order.sg,
            "Name": order.name,
            "Flow": order.flow,
            "Hours": order.hours,
            "Acre": order.acre,
            "Crop": order.crop,
            "Type": order.type,
            "Date": order.date,
            "Trantime": order.trantime,
            "EX": order.ex,
            "Final": order.final,
            "Comment": order.comment,
            "Sbxcfs": order.sbxcfs,
            "Deleted": order.deleted,
            "SA": order.sa
        }
        for order in orders_query
    ]
    
    return jsonify(orders_list)




if __name__ == '__main__':
    app.run(debug=True)