from flask import Flask
from flask_sqlalchemy import SQLAlchemy

 
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:admin123@localhost/TXDB'
app.config["SQLALCHEMY_BINDS"] = {
    'RHDB':'mysql://root:admin123@localhost/RHDB'
}

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#db.init_app(app)
db = SQLAlchemy()
 
@app.before_first_request
def create_table():
    db.create_all()
 
# app.run(host='localhost', port=5000)

# @app.route('/data/create' , methods = ['GET','POST'])
# def create():
#     if request.method == 'GET':
#         return render_template('createpage.html')
 
#     if request.method == 'POST':
#         combo = request.form['combo']
#         lateral = request.form['lateral']
#         sideGate = request.form['sideGate']
#         name = request.form['name']
#         phone = request.form['phone']
#         flow = request.form['flow']
#         hours = request.form['hours']
#         acre = request.form['acre']
#         crop = request.form['crop']
#         irrigationType = request.form['irrigationType']
#         date = request.form['date']
#         tranTime = request.form['tranTime']
#         excessive = request.form['excessive']
#         final = request.form['final']
#         comment = request.form['comment']
#         SBXCFS = request.form['SBXCFS']
#         deleted = request.form['deleted']
#         sa = request.form['sa']
#         head = request.form['head']
#         estStart = request.form['estStart']
#         estFinish = request.form['estFinish']
#         attention = request.form['atention']
#         db.session.add(order)
#         db.session.commit()
#         return redirect('/data')
   
# @app.route('/data')
# def RetrieveDataList():
#     orders = Orders.query.all()
#     return render_template('datalist.html',orders = orders)

# @app.route('/data/<int:ocombo>')
# def RetrieveSingleOrder(ocombo):
#     employee = Orders.query.filter_by(combo=ocombo).first()
#     if order:
#         return render_template('data.html', order = order)
#     return f"Order with combo ={ocombo} doenst exist"

# @app.route('/data/<int:ocombo>/update',methods = ['GET','POST'])
# def update(ocombo):
#     order = Orders.query.filter_by(combo=ocombo).first()
#     if request.method == 'POST':
#         if order:
#             db.session.delete(order)
#             db.session.commit()
 
#             combo = request.form['combo']
#             lateral = request.form['lateral']
#             sideGate = request.form['sideGate']
#             name = request.form['name']
#             phone = request.form['phone']
#             flow = request.form['flow']
#             hours = request.form['hours']
#             acre = request.form['acre']
#             crop = request.form['crop']
#             irrigationType = request.form['irrigationType']
#             date = request.form['date']
#             tranTime = request.form['tranTime']
#             excessive = request.form['excessive']
#             final = request.form['final']
#             comment = request.form['comment']
#             SBXCFS = request.form['SBXCFS']
#             deleted = request.form['deleted']
#             sa = request.form['sa']
#             head = request.form['head']
#             estStart = request.form['estStart']
#             estFinish = request.form['estFinish']
#             attention = request.form['atention']
#             order = Orders(combo = ocombo, lateral=lateral, sideGate = sideGate, name = name, phone = phone, flow = flow, hours = hours,
#                               acre = acre, crop = crop, irrigationType = irrigationType,
#                                date = date, tranTime = tranTime, excessive = excessive, final = final, comment = comment, SBXCFS = SBXCFS, 
#                                deleted = deleted, sa = sa, head = head, estStart = estStart, estFinish = estFinish, attention = attention)
 
#             db.session.add(order)
#             db.session.commit()
#             return redirect(f'/data/{ocombo}')
#         return f"Employee with id = {ocombo} Does nit exist"
 
#     return render_template('update.html', order = order)
