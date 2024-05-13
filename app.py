from flask import Flask, jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.sql import text, or_
from sqlalchemy import text, func
from datetime import datetime, timedelta

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
# CORS(app, resources={r"*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:admin123@localhost/txdb'
app.config["SQLALCHEMY_BINDS"] = {
    'rhdb':'mysql://root:admin123@localhost/rhdb'
}

db = SQLAlchemy(app)


#The following are the models for TXDB
class Event(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    ispec = db.Column(db.String())
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
    prime_datetime = db.Column(db.DateTime())
    start_datetime = db.Column(db.DateTime())
    finish_datetime = db.Column(db.DateTime())
    prime_total = db.Column(db.Float())
    total_hours = db.Column(db.Float())
    called = db.Column(db.String(1))
    wdo_notes = db.Column(db.String(255))
    farmer_comments = db.Column(db.String(255))

class WDO(db.Model):
    __bind_key__ = 'rhdb'

    username = db.Column(db.String(20), primary_key=True)
    password = db.Column(db.String(10))
    sa = db.Column(db.String(2))






@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    user = db.session.query(WDO).filter_by(username=username, password=password).first()
    
    if user:
        return jsonify({"sa": user.sa}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401


@app.route('/updateOrder/<string:combo>', methods=['PUT'])
def updateOrder(combo):
    order = Orders.query.filter_by(combo=combo).first()
    if not order:
        return jsonify({"error": "Order not found"}), 404

    data = request.json
    previous_head = order.head

    for field in data:
        if hasattr(order, field):
            if field in ['est_start', 'est_finish', 'prime_datetime', 'start_datetime', 'finish_datetime']:
                if data[field] is not None:  
                    try:
                        datetime_value = datetime.strptime(data[field], '%Y-%m-%d %H:%M:%S')
                        setattr(order, field, datetime_value)
                    except ValueError:
                        return jsonify({"error": "Incorrect datetime format"}), 400
                else:
                    setattr(order, field, None)
            elif field == 'head' and data[field] == '':
                setattr(order, field, None)
            else:
                setattr(order, field, data[field])

    if previous_head != order.head:
        order.est_start = None
        order.est_finish = None
        order.prime_datetime = None
        order.start_datetime = None
        order.finish_datetime = None
        order.prime_total = None
        order.total_hours = None
        order.called = None

    db.session.commit()
    return jsonify({"message": "Order updated successfully"}), 200


@app.route('/forders', methods=['GET'])
def forders():
    try:
        sa = request.headers.get('SA')

        # Perform the SQL operation to transfer data from TXDB to RHDB.Orders
        transfer_query = text("""
            INSERT INTO rhdb.orders 
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
                JOIN txdb.sbxdtl sbxdtl ON event.FLOWID = sbxdtl.FLOWID
            WHERE       
                LOWER(event.ISPEC)='wrqst'    
            AND event.event_TRANDATE > '2023-06-01' 
            AND event.event_TRANDATE < '2023-06-08' 
            AND LOWER(sbxdtl.SBXDFT)='x'
            AND NOT EXISTS (
                SELECT 1
                FROM rhdb.orders o
                WHERE o.COMBO = CONCAT(TRIM(event.PARCEL), '  ', TRIM(event.WATERID))
                AND o.LAT = event.LATERAL
                AND o.SG = event.SIDEGATE
                AND o.NAME = event.NAME1
                AND o.PHONE = event.PHONE1
                AND o.FLOW = event.RQSTFLO
                AND o.HOURS = event.HOURS
                AND o.ACRE = parcd.PIACR
                AND o.CROP = event.CROP1
                AND o.TYPE = event.IRRIGTYP
                AND o.DATE = event.event_TRANDATE
                AND o.TRANTIME = event.TRANTIME
                AND o.EX = event.EXCESSIVEORDER
                AND o.FINAL = parcd.LASTIRRIGATION
                AND o.COMMENT = CONCAT(event.COMMENT1,'    ',event.COMMENT2)
                AND o.SBXCFS = sbxdtl.SBXCFS
                AND o.DELETED = event.DELETED
                AND o.SA = event.SERVAREA
            );
        """)

        with db.engine.begin() as connection:
            connection.execute(transfer_query)
            print("Data transfer and abnormal status update successful.")

        
        # Now, query the RHDB.Orders to fetch the transferred data
        orders_query = Orders.query.filter(
            Orders.sa == sa, 
            Orders.type == "01"
        ).all()
        
        # Convert the query result into a list of dictionaries to jsonify
        orders_list = [
            {
                "combo": order.combo, 
                "lat": order.lat, 
                "sg": order.sg,
                "name": order.name,
                "phone": order.phone,
                "flow": order.flow,
                "hours": order.hours,
                "acre": order.acre,
                "crop": order.crop,
                "type": order.type,
                "date": order.date.strftime('%Y-%m-%d'),
                "trantime": order.trantime,
                "ex": order.ex,
                "final": order.final,
                "comment": order.comment,
                "sbxcfs": order.sbxcfs,
                "deleted": order.deleted,
                "sa": order.sa,
                "head": order.head,
                "est_start": order.est_start.strftime('%Y-%m-%d %H:%M:%S') if order.est_start else None,
                "est_finish": order.est_finish.strftime('%Y-%m-%d %H:%M:%S') if order.est_finish else None,
                "called": order.called    
            }
            for order in orders_query
        ]
        
        return jsonify(orders_list)
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500
    

@app.route('/morders', methods=['GET'])
def morders():
    try:
        sa = request.headers.get('SA')

        # Perform the SQL operation to transfer data from TXDB to RHDB.Orders
        transfer_query = text("""
            INSERT INTO rhdb.orders 
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
                JOIN txdb.sbxdtl sbxdtl ON event.FLOWID = sbxdtl.FLOWID
            WHERE       
                LOWER(event.ISPEC)='wrqst'    
            AND event.event_TRANDATE > '2023-06-01' 
            AND event.event_TRANDATE < '2023-06-08' 
            AND LOWER(sbxdtl.SBXDFT)='x'
            AND NOT EXISTS (
                SELECT 1
                FROM rhdb.orders o
                WHERE o.COMBO = CONCAT(TRIM(event.PARCEL), '  ', TRIM(event.WATERID))
                AND o.LAT = event.LATERAL
                AND o.SG = event.SIDEGATE
                AND o.NAME = event.NAME1
                AND o.PHONE = event.PHONE1
                AND o.FLOW = event.RQSTFLO
                AND o.HOURS = event.HOURS
                AND o.ACRE = parcd.PIACR
                AND o.CROP = event.CROP1
                AND o.TYPE = event.IRRIGTYP
                AND o.DATE = event.event_TRANDATE
                AND o.TRANTIME = event.TRANTIME
                AND o.EX = event.EXCESSIVEORDER
                AND o.FINAL = parcd.LASTIRRIGATION
                AND o.COMMENT = CONCAT(event.COMMENT1,'    ',event.COMMENT2)
                AND o.SBXCFS = sbxdtl.SBXCFS
                AND o.DELETED = event.DELETED
                AND o.SA = event.SERVAREA
            );
        """)

        with db.engine.begin() as connection:
            connection.execute(transfer_query)
            print("Data transfer and abnormal status update successful.")
        
        # Now, query the RHDB.Orders to fetch the transferred data
        orders_query = Orders.query.filter(
            Orders.sa == sa,
            or_(Orders.type == "02", Orders.type == "03")
        ).all()
        
        # Convert the query result into a list of dictionaries to jsonify
        orders_list = [
            {
                "combo": order.combo, 
                "lat": order.lat, 
                "sg": order.sg,
                "name": order.name,
                "phone": order.phone,
                "flow": order.flow,
                "hours": order.hours,
                "acre": order.acre,
                "crop": order.crop,
                "type": order.type,
                "date": order.date.strftime('%Y-%m-%d'),
                "trantime": order.trantime,
                "ex": order.ex,
                "final": order.final,
                "comment": order.comment,
                "sbxcfs": order.sbxcfs,
                "deleted": order.deleted,
                "sa": order.sa,
                "head": order.head,
                "est_start": order.est_start.strftime('%Y-%m-%d %H:%M:%S') if order.est_start else None,
                "est_finish": order.est_finish.strftime('%Y-%m-%d %H:%M:%S') if order.est_finish else None,
                "called": order.called    
            }
            for order in orders_query
        ]
        
        return jsonify(orders_list)
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500


@app.route('/H1', methods=['GET'])
def h1():
    try:
        sa = request.headers.get('SA')

        orders_query = Orders.query.filter(
            Orders.sa == sa,
            func.upper(Orders.head) == 'H1'
        ).all()
        
        orders_list = [
            {
                "combo": order.combo, 
                "lat": order.lat,
                "sg": order.sg,
                "name": order.name,
                "phone": order.phone,
                "flow": order.flow,
                "hours": order.hours,
                "ex": order.ex,
                "final": order.final,
                "est_start": order.est_start.strftime('%Y-%m-%d %H:%M:%S') if order.est_start else None,
                "est_finish": order.est_finish.strftime('%Y-%m-%d %H:%M:%S') if order.est_finish else None,
                "prime_datetime": order.prime_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.prime_datetime else None,
                "start_datetime": order.start_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.start_datetime else None,
                "finish_datetime": order.finish_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.finish_datetime else None,
                "prime_total": order.prime_total,
                "total_hours": order.total_hours,
                "called": order.called,
                "wdo_notes": order.wdo_notes,
                "farmer_comments": order.farmer_comments
            }
            for order in orders_query
        ]
        
        return jsonify(orders_list)
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500


@app.route('/H2', methods=['GET'])
def h2():
    try:
        sa = request.headers.get('SA')
        
        orders_query = Orders.query.filter(
            Orders.sa == sa,
            func.upper(Orders.head) == 'H2'
        ).all()

        orders_list = [
            {
                "combo": order.combo, 
                "lat": order.lat,
                "sg": order.sg,
                "name": order.name,
                "phone": order.phone,
                "flow": order.flow,
                "hours": order.hours,
                "ex": order.ex,
                "final": order.final,
                "est_start": order.est_start.strftime('%Y-%m-%d %H:%M:%S') if order.est_start else None,
                "est_finish": order.est_finish.strftime('%Y-%m-%d %H:%M:%S') if order.est_finish else None,
                "prime_datetime": order.prime_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.prime_datetime else None,
                "start_datetime": order.start_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.start_datetime else None,
                "finish_datetime": order.finish_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.finish_datetime else None,
                "prime_total": order.prime_total,
                "total_hours": order.total_hours,
                "called": order.called,
                "wdo_notes": order.wdo_notes,
                "farmer_comments": order.farmer_comments
            }
            for order in orders_query
        ]
        
        return jsonify(orders_list)
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500
    
@app.route('/H3', methods=['GET'])
def h3():
    try:
        sa = request.headers.get('SA')
        
        orders_query = Orders.query.filter(
            Orders.sa == sa,
            func.upper(Orders.head) == 'H3'
        ).all()

        orders_list = [
            {
                "combo": order.combo, 
                "lat": order.lat,
                "sg": order.sg,
                "name": order.name,
                "phone": order.phone,
                "flow": order.flow,
                "hours": order.hours,
                "ex": order.ex,
                "final": order.final,
                "est_start": order.est_start.strftime('%Y-%m-%d %H:%M:%S') if order.est_start else None,
                "est_finish": order.est_finish.strftime('%Y-%m-%d %H:%M:%S') if order.est_finish else None,
                "prime_datetime": order.prime_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.prime_datetime else None,
                "start_datetime": order.start_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.start_datetime else None,
                "finish_datetime": order.finish_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.finish_datetime else None,
                "prime_total": order.prime_total,
                "total_hours": order.total_hours,
                "called": order.called,
                "wdo_notes": order.wdo_notes,
                "farmer_comments": order.farmer_comments
            }
            for order in orders_query
        ]
        
        return jsonify(orders_list)
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500
    
@app.route('/H4', methods=['GET'])
def h4():
    try:
        sa = request.headers.get('SA')
        
        orders_query = Orders.query.filter(
            Orders.sa == sa,
            func.upper(Orders.head) == 'H4'
        ).all()

        orders_list = [
            {
                "combo": order.combo, 
                "lat": order.lat,
                "sg": order.sg,
                "name": order.name,
                "phone": order.phone,
                "flow": order.flow,
                "hours": order.hours,
                "ex": order.ex,
                "final": order.final,
                "est_start": order.est_start.strftime('%Y-%m-%d %H:%M:%S') if order.est_start else None,
                "est_finish": order.est_finish.strftime('%Y-%m-%d %H:%M:%S') if order.est_finish else None,
                "prime_datetime": order.prime_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.prime_datetime else None,
                "start_datetime": order.start_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.start_datetime else None,
                "finish_datetime": order.finish_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.finish_datetime else None,
                "prime_total": order.prime_total,
                "total_hours": order.total_hours,
                "called": order.called,
                "wdo_notes": order.wdo_notes,
                "farmer_comments": order.farmer_comments
            }
            for order in orders_query
        ]
        
        return jsonify(orders_list)
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500
    
@app.route('/H5', methods=['GET'])
def h5():
    try:
        sa = request.headers.get('SA')
        
        orders_query = Orders.query.filter(
            Orders.sa == sa,
            func.upper(Orders.head) == 'H5'
        ).all()

        orders_list = [
            {
                "combo": order.combo, 
                "lat": order.lat,
                "sg": order.sg,
                "name": order.name,
                "phone": order.phone,
                "flow": order.flow,
                "hours": order.hours,
                "ex": order.ex,
                "final": order.final,
                "est_start": order.est_start.strftime('%Y-%m-%d %H:%M:%S') if order.est_start else None,
                "est_finish": order.est_finish.strftime('%Y-%m-%d %H:%M:%S') if order.est_finish else None,
                "prime_datetime": order.prime_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.prime_datetime else None,
                "start_datetime": order.start_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.start_datetime else None,
                "finish_datetime": order.finish_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.finish_datetime else None,
                "prime_total": order.prime_total,
                "total_hours": order.total_hours,
                "called": order.called,
                "wdo_notes": order.wdo_notes,
                "farmer_comments": order.farmer_comments
            }
            for order in orders_query
        ]
        
        return jsonify(orders_list)
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500
    
@app.route('/UN', methods=['GET'])
def un():
    try:
        sa = request.headers.get('SA')
        
        orders_query = Orders.query.filter(
            Orders.sa == sa,
            func.upper(Orders.head) == 'UN'
        ).all()

        orders_list = [
            {
                "combo": order.combo, 
                "lat": order.lat,
                "sg": order.sg,
                "name": order.name,
                "phone": order.phone,
                "flow": order.flow,
                "hours": order.hours,
                "ex": order.ex,
                "final": order.final,
                "est_start": order.est_start.strftime('%Y-%m-%d %H:%M:%S') if order.est_start else None,
                "est_finish": order.est_finish.strftime('%Y-%m-%d %H:%M:%S') if order.est_finish else None,
                "prime_datetime": order.prime_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.prime_datetime else None,
                "start_datetime": order.start_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.start_datetime else None,
                "finish_datetime": order.finish_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.finish_datetime else None,
                "prime_total": order.prime_total,
                "total_hours": order.total_hours,
                "called": order.called,
                "wdo_notes": order.wdo_notes,
                "farmer_comments": order.farmer_comments
            }
            for order in orders_query
        ]
        
        return jsonify(orders_list)
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500

@app.route('/M', methods=['GET'])
def MTable(): 
    try:
        sa = request.headers.get('SA')
        
        orders_query = Orders.query.filter(
            Orders.sa == sa,
            func.upper(Orders.head) == 'M'
        ).all()

        orders_list = [
            {
                "combo": order.combo, 
                "lat": order.lat,
                "sg": order.sg,
                "name": order.name,
                "phone": order.phone,
                "flow": order.flow,
                "hours": order.hours,
                "ex": order.ex,
                "final": order.final,
                "est_start": order.est_start.strftime('%Y-%m-%d %H:%M:%S') if order.est_start else None,
                "est_finish": order.est_finish.strftime('%Y-%m-%d %H:%M:%S') if order.est_finish else None,
                "prime_datetime": order.prime_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.prime_datetime else None,
                "start_datetime": order.start_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.start_datetime else None,
                "finish_datetime": order.finish_datetime.strftime('%Y-%m-%d %H:%M:%S') if order.finish_datetime else None,
                "prime_total": order.prime_total,
                "total_hours": order.total_hours,
                "called": order.called,
                "wdo_notes": order.wdo_notes,
                "farmer_comments": order.farmer_comments
            }
            for order in orders_query
        ]
        
        return jsonify(orders_list)
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500


if __name__ == '__main__':
    app.run(debug=True)