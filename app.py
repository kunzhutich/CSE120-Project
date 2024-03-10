from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:admin123@localhost/TXDB'
app.config["SQLALCHEMY_BINDS"] = {
    'RHDB':'mysql://root:admin123@localhost/RHDB'
}

db = SQLAlchemy(app)

#The following is the models for TXDB
class Event(db.Model):
    parcel = db.Column(db.String())


#The following is the models for RHDB
class Orders(db.Model):
    __bind_key__ = 'RHDB'
 
    combo = db.Column(db.String(), primary_key=True)
    lateral = db.Column(db.String())
    sideGate = db.Column(db.String())
    name = db.Column(db.String())
    phone = db.Column(db.String())
    flow = db.Column(db.String())
    hours = db.Column(db.String())
    acre = db.Column(db.Float())
    crop = db.Column(db.String())
    irrigationType = db.Column(db.String())
    date = db.Column(db.String())
    tranTime = db.Column(db.Float())
    excessive = db.Column(db.Char())
    final = db.Column(db.Char())
    comment = db.Column(db.String())
    SBXCFS = db.Column(db.String())
    deleted = db.Column(db.String())
    sa = db.Column(db.String())
    head = db.Column(db.String())
    estStart = db.Column(db.String())
    estFinish = db.Column(db.String())
    attention = db.Column(db.String())
 
    def __init__(combo, lateral, sideGate, name, phone, flow, hours, acre, crop, irrigationType, date, tranTime, excessive, final, comment, 
                    SBXCFS, deleted, sa, head, estStart, estFinish, attention):
        self.combo = combo
        self.lateral = lateral
        self.sideGate = sideGate
        self.name = name
        self.phone = phone
        self.flow = flow
        self.hours = hours
        self.acre = acre
        self.crop = crop
        self.irrigationType = irrigationType
        self.date = date
        self.tranTime = tranTime
        self.excessive = excessive
        self.final = final
        self.comment = comment
        self.SBXCFS = SBXCFS
        self.deleted = deleted
        self.sa = sa
        self.head = head
        self.estStart = estStart
        self.estFinish = estFinish
        self.attention = attention

 
    def __repr__(self):
        return f"{self.name}"

if __name__ == '__main__':
    app.run(debug=True)