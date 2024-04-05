from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.sql import text

app = Flask(__name__)

CORS(app, resources={r"/forders": {"origins": "http://localhost:3000"}})
# CORS(app, resources={r"*": {"origins": "*"}})

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
    trantime = db.Column(db.Integer())
    ex = db.Column(db.String(1))
    final = db.Column(db.String(1))
    comment = db.Column(db.String(255))
    sbxcfs = db.Column(db.Float())
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




# @app.route('/forders', methods=['GET'])
# def forders():
#     # Perform the SQL operation to transfer data from TXDB to RHDB.Orders
#     transfer_query = text("""
#         INSERT IGNORE INTO rhdb.orders 
#             (`COMBO`, `LAT`, `SG`, `NAME`, `PHONE`, `FLOW`, `HOURS`, `ACRE`, `CROP`, `TYPE`, `DATE`, `TRANTIME`, `EX`, `FINAL`, `COMMENT`, `SBXCFS`, `DELETED`, `SA`)
#         SELECT 
#             CONCAT(TRIM(event.PARCEL), '  ', TRIM(event.WATERID)) AS 'COMBO', 
#             event.LATERAL AS 'LAT', 
#             event.SIDEGATE AS 'SG', 
#             event.NAME1 AS 'NAME', 
#             event.PHONE1 AS 'PHONE', 
#             event.RQSTFLO AS 'FLOW', 
#             event.HOURS, 
#             parcd.PIACR AS 'ACRE', 
#             event.CROP1 AS 'CROP', 
#             event.IRRIGTYP AS 'TYPE', 
#             event.event_TRANDATE AS 'DATE', 
#             event.TRANTIME, 
#             event.EXCESSIVEORDER AS 'EX', 
#             parcd.LASTIRRIGATION AS 'FINAL', 
#             CONCAT(event.COMMENT1,'    ',event.COMMENT2) AS 'COMMENT', 
#             sbxdtl.SBXCFS, 
#             event.DELETED, 
#             event.SERVAREA AS 'SA'  
#         FROM 
#             txdb.event event
#             JOIN txdb.parcd parcd ON event.WTIDNO = parcd.TIDPNUMB 
#             JOIN txdb.sbxdtl sbxdtl ON event.FLOWID = sbxdtl.FLOWID 
#             WHERE 
#             (
#                 (event.IRRIGTYP='01' AND LOWER(event.ISPEC)='wrqst' AND event.SERVAREA='01' AND event.event_TRANDATE > '2023-06-01' AND event.event_TRANDATE < '2023-06-08' AND LOWER(sbxdtl.SBXDFT)='x') 
#                 OR 
#                 (event.IRRIGTYP='01' AND LOWER(event.ISPEC)='wrqst' AND event.SERVAREA='03' AND event.event_TRANDATE > '2023-06-01' AND event.event_TRANDATE < '2023-06-08' AND LOWER(sbxdtl.SBXDFT)='x') 
#                 OR 
#                 (event.IRRIGTYP='01' AND LOWER(event.ISPEC)='wrqst' AND event.SERVAREA='05' AND event.event_TRANDATE > '2023-06-01' AND event.event_TRANDATE < '2023-06-08' AND LOWER(sbxdtl.SBXDFT)='x')
#             );
#     """)
    
#     # Execute the transfer query on TXDB
#     # tx_result = db.engine.execute(transfer_query)

#     with db.engine.connect() as connection:
#         connection.execute(transfer_query)
    
#     # Now, query the RHDB.Orders to fetch the transferred data
#     orders_query = Orders.query.all()
    
#     # Convert the query result into a list of dictionaries to jsonify
#     orders_list = [
#         {
#             "Combo": order.combo, 
#             "Lat": order.lat, 
#             "SG": order.sg,
#             "Name": order.name,
#             "Flow": order.flow,
#             "Hours": order.hours,
#             "Acre": order.acre,
#             "Crop": order.crop,
#             "Type": order.type,
#             "Date": order.date,
#             "Trantime": order.trantime,
#             "EX": order.ex,
#             "Final": order.final,
#             "Comment": order.comment,
#             "Sbxcfs": order.sbxcfs,
#             "Deleted": order.deleted,
#             "SA": order.sa
#         }
#         for order in orders_query
#     ]
    
#     return jsonify(orders_list)



@app.route('/forders', methods=['GET'])
def forders():
    try:
        # Perform the SQL operation to transfer data from TXDB to RHDB.Orders
        transfer_query = text("""
            INSERT IGNORE INTO rhdb.orders 
                (`COMBO`, `LAT`, `SG`, `NAME`, `PHONE`, `FLOW`, `HOURS`, `ACRE`, `CROP`, `TYPE`, `DATE`, `TRANTIME`, `EX`, `FINAL`, `COMMENT`, `SBXCFS`, `DELETED`, `SA`)
            SELECT 
                CONCAT(TRIM(event.PARCEL), '  ', TRIM(event.WATERID)) AS 'COMBO', 
                event.LATERAL AS 'LAT', 
                event.SIDEGATE AS 'SG', 
                event.NAME1 AS 'NAME', 
                event.PHONE1 AS 'PHONE', 
                event.RQSTFLO AS 'FLOW', 
                event.HOURS, 
                parcd.PIACR AS 'ACRE', 
                event.CROP1 AS 'CROP', 
                event.IRRIGTYP AS 'TYPE', 
                event.event_TRANDATE AS 'DATE', 
                event.TRANTIME, 
                event.EXCESSIVEORDER AS 'EX', 
                parcd.LASTIRRIGATION AS 'FINAL', 
                CONCAT(event.COMMENT1,'    ',event.COMMENT2) AS 'COMMENT', 
                sbxdtl.SBXCFS, 
                event.DELETED, 
                event.SERVAREA AS 'SA'  
            FROM 
                txdb.event event
                JOIN txdb.parcd parcd ON event.WTIDNO = parcd.TIDPNUMB 
                JOIN txdb.sbxdtl sbxdtl ON event.FLOWID = sbxdtl.FLOWID;
            # WHERE 
            #     (
            #         (event.IRRIGTYP='01' AND LOWER(event.ISPEC)='wrqst' AND event.SERVAREA='01' AND event.event_TRANDATE > '2023-06-01' AND event.event_TRANDATE < '2023-06-08' AND LOWER(sbxdtl.SBXDFT)='x') 
            #         OR 
            #         (event.IRRIGTYP='01' AND LOWER(event.ISPEC)='wrqst' AND event.SERVAREA='03' AND event.event_TRANDATE > '2023-06-01' AND event.event_TRANDATE < '2023-06-08' AND LOWER(sbxdtl.SBXDFT)='x') 
            #         OR 
            #         (event.IRRIGTYP='01' AND LOWER(event.ISPEC)='wrqst' AND event.SERVAREA='05' AND event.event_TRANDATE > '2023-06-01' AND event.event_TRANDATE < '2023-06-08' AND LOWER(sbxdtl.SBXDFT)='x')
            #     );
        """)
        
        # with db.engine.connect() as connection:
        #     result = connection.execute(transfer_query)
        #     print(f"Data transfer successful. Rows affected: {result.rowcount}")

        with db.engine.begin() as connection:
            connection.execute(transfer_query)
            print("Data transfer successful.")
        
        # Now, query the RHDB.Orders to fetch the transferred data
        orders_query = Orders.query.all()
        
        # Convert the query result into a list of dictionaries to jsonify
        orders_list = [
            {
                "combo": order.combo, 
                "lat": order.lat, 
                "sg": order.sg,
                "name": order.name,
                "flow": order.flow,
                "hours": order.hours,
                "acre": order.acre,
                "crop": order.crop,
                "type": order.type,
                "date": order.date,
                "trantime": order.trantime,
                "ex": order.ex,
                "final": order.final,
                "comment": order.comment,
                "sbxcfs": order.sbxcfs,
                "deleted": order.deleted,
                "sa": order.sa
            }
            for order in orders_query
        ]
        
        return jsonify(orders_list)
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500


@app.route('/h1', methods=['GET'])
def forders():
    try:
        # Perform the SQL operation to transfer data from TXDB to RHDB.Orders
        transfer_query = text("""
            INSERT IGNORE INTO rhdb.head1
                ('COMBO', 'LAT', 'SG', 'NAME', 'FLOW', 'HOURS', 'EST_START', 'PRIME_DATE', 'PRIME_TIME', 'START_DATE', 'START_TIME',
                              'FINISH_DATE', 'FINISH_TIME', 'PRIME_TOTAL', 'TOTAL_HOURS', 'CALLED', 'NOTES', `COMMENT`, 'ABNORMAL')
                orders.COMBO AS 'COMBO', 
                orders.LATERAL AS 'LAT', 
                orders.SIDEGATE AS 'SG', 
                orders.NAME1 AS 'NAME', 
                orders.COMMENT AS 'COMMENT'
            FROM 
                rhdb.orders orders
            WHERE 
                 (
                   orders.heads='h1'             
                  );
        """)
        
        # with db.engine.connect() as connection:
        #     result = connection.execute(transfer_query)
        #     print(f"Data transfer successful. Rows affected: {result.rowcount}")

        with db.engine.begin() as connection:
            connection.execute(transfer_query)
            print("Data transfer successful.")
        
        # Now, query the RHDB.Orders to fetch the transferred data
        orders_query = Orders.query.all()
        
        # Convert the query result into a list of dictionaries to jsonify
        orders_list = [
            {
                "combo": order.combo, 
                "lat": order.lat, 
                "sg": order.sg,
                "name": order.name,
                "comment": order.comment
            }
            for order in orders_query
        ]
        
        return jsonify(orders_list)
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500

@app.route('/h2', methods=['GET'])
def forders():
    try:
        # Perform the SQL operation to transfer data from TXDB to RHDB.Orders
        transfer_query = text("""
            INSERT IGNORE INTO rhdb.head2
                ('COMBO', 'LAT', 'SG', 'NAME', 'FLOW', 'HOURS', 'EST_START', 'PRIME_DATE', 'PRIME_TIME', 'START_DATE', 'START_TIME',
                              'FINISH_DATE', 'FINISH_TIME', 'PRIME_TOTAL', 'TOTAL_HOURS', 'CALLED', 'NOTES', `COMMENT`, 'ABNORMAL')
                orders.COMBO AS 'COMBO', 
                orders.LATERAL AS 'LAT', 
                orders.SIDEGATE AS 'SG', 
                orders.NAME1 AS 'NAME', 
                orders.COMMENT AS 'COMMENT'
            FROM 
                rhdb.orders orders
            WHERE 
                 (
                   orders.heads='h2'             
                  );
        """)
        
        # with db.engine.connect() as connection:
        #     result = connection.execute(transfer_query)
        #     print(f"Data transfer successful. Rows affected: {result.rowcount}")

        with db.engine.begin() as connection:
            connection.execute(transfer_query)
            print("Data transfer successful.")
        
        # Now, query the RHDB.Orders to fetch the transferred data
        orders_query = Orders.query.all()
        
        # Convert the query result into a list of dictionaries to jsonify
        orders_list = [
            {
                "combo": order.combo, 
                "lat": order.lat, 
                "sg": order.sg,
                "name": order.name,
                "comment": order.comment
            }
            for order in orders_query
        ]
        
        return jsonify(orders_list)
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500
    
@app.route('/h3', methods=['GET'])
def forders():
    try:
        # Perform the SQL operation to transfer data from TXDB to RHDB.Orders
        transfer_query = text("""
            INSERT IGNORE INTO rhdb.head3
                ('COMBO', 'LAT', 'SG', 'NAME', 'FLOW', 'HOURS', 'EST_START', 'PRIME_DATE', 'PRIME_TIME', 'START_DATE', 'START_TIME',
                              'FINISH_DATE', 'FINISH_TIME', 'PRIME_TOTAL', 'TOTAL_HOURS', 'CALLED', 'NOTES', `COMMENT`, 'ABNORMAL')
                orders.COMBO AS 'COMBO', 
                orders.LATERAL AS 'LAT', 
                orders.SIDEGATE AS 'SG', 
                orders.NAME1 AS 'NAME', 
                orders.COMMENT AS 'COMMENT'
            FROM 
                rhdb.orders orders
            WHERE 
                 (
                   orders.heads='h3'             
                  );
        """)

        with db.engine.begin() as connection:
            connection.execute(transfer_query)
            print("Data transfer successful.")

        orders_query = Orders.query.all()
        
        # Convert the query result into a list of dictionaries to jsonify
        orders_list = [
            {
                "combo": order.combo, 
                "lat": order.lat, 
                "sg": order.sg,
                "name": order.name,
                "comment": order.comment
            }
            for order in orders_query
        ]
        
        return jsonify(orders_list)
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500
    
@app.route('/h4', methods=['GET'])
def forders():
    try:
        # Perform the SQL operation to transfer data from TXDB to RHDB.Orders
        transfer_query = text("""
            INSERT IGNORE INTO rhdb.head4
                ('COMBO', 'LAT', 'SG', 'NAME', 'FLOW', 'HOURS', 'EST_START', 'PRIME_DATE', 'PRIME_TIME', 'START_DATE', 'START_TIME',
                              'FINISH_DATE', 'FINISH_TIME', 'PRIME_TOTAL', 'TOTAL_HOURS', 'CALLED', 'NOTES', `COMMENT`, 'ABNORMAL')
                orders.COMBO AS 'COMBO', 
                orders.LATERAL AS 'LAT', 
                orders.SIDEGATE AS 'SG', 
                orders.NAME1 AS 'NAME', 
                orders.COMMENT AS 'COMMENT'
            FROM 
                rhdb.orders orders
            WHERE 
                 (
                   orders.heads='h4'             
                  );
        """)
        
        # with db.engine.connect() as connection:
        #     result = connection.execute(transfer_query)
        #     print(f"Data transfer successful. Rows affected: {result.rowcount}")

        with db.engine.begin() as connection:
            connection.execute(transfer_query)
            print("Data transfer successful.")
        
        # Now, query the RHDB.Orders to fetch the transferred data
        orders_query = Orders.query.all()
        
        # Convert the query result into a list of dictionaries to jsonify
        orders_list = [
            {
                "combo": order.combo, 
                "lat": order.lat, 
                "sg": order.sg,
                "name": order.name,
                "comment": order.comment
            }
            for order in orders_query
        ]
        
        return jsonify(orders_list)
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500
    
@app.route('/h5', methods=['GET'])
def forders():
    try:
        # Perform the SQL operation to transfer data from TXDB to RHDB.Orders
        transfer_query = text("""
            INSERT IGNORE INTO rhdb.head5
                ('COMBO', 'LAT', 'SG', 'NAME', 'FLOW', 'HOURS', 'EST_START', 'PRIME_DATE', 'PRIME_TIME', 'START_DATE', 'START_TIME',
                              'FINISH_DATE', 'FINISH_TIME', 'PRIME_TOTAL', 'TOTAL_HOURS', 'CALLED', 'NOTES', `COMMENT`, 'ABNORMAL')
                orders.COMBO AS 'COMBO', 
                orders.LATERAL AS 'LAT', 
                orders.SIDEGATE AS 'SG', 
                orders.NAME1 AS 'NAME', 
                orders.COMMENT AS 'COMMENT'
            FROM 
                rhdb.orders orders
            WHERE 
                 (
                   orders.heads='h5'             
                  );
        """)
        
        # with db.engine.connect() as connection:
        #     result = connection.execute(transfer_query)
        #     print(f"Data transfer successful. Rows affected: {result.rowcount}")

        with db.engine.begin() as connection:
            connection.execute(transfer_query)
            print("Data transfer successful.")
        
        # Now, query the RHDB.Orders to fetch the transferred data
        orders_query = Orders.query.all()
        
        # Convert the query result into a list of dictionaries to jsonify
        orders_list = [
            {
                "combo": order.combo, 
                "lat": order.lat, 
                "sg": order.sg,
                "name": order.name,
                "comment": order.comment
            }
            for order in orders_query
        ]
        
        return jsonify(orders_list)
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500



if __name__ == '__main__':
    app.run(debug=True)