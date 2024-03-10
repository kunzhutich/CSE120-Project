from flask import Flask
from flask_sqlalchemy import SQLAlchemy
 
db = SQLAlchemy()
 
class Orders(db.Model):
    __tablename__ = "orders"
 
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



class Head1(db.Model):
    __tablename__ = "head1"

    combo = db.Column(db.String(), primary_key=True)
    lateral = db.Column(db.String())
    sideGate = db.Column(db.String())
    name = db.Column(db.String())
    phone = db.Column(db.String())
    flow = db.Column(db.Float())
    hours = db.Column(db.Float())
    # acre = db.Column(db.Float())
    # crop = db.Column(db.String())
    # irrigationType = db.Column(db.String())
    # date = db.Column(db.Date())
    # tranTime = db.Column(db.Float())
    # excessive = db.Column(db.Char())
    # final = db.Column(db.Char())
    # comment = db.Column(db.String())
    # SBXCFS = db.Column(db.Float())
    # deleted = db.Column(db.Char())
    # sa = db.Column(db.String())
    estStart = db.Column(db.String())
    primeDate = db.Column(db.Date())
    primeStart = db.Column(db.Int())
    startDate = db.Column(db.Date())
    startTime = db.Column(db.Int())
    finishDate = db.Column(db.Date())
    finishTime = db.Column(db.Int())
    primeTotal = db.Column(db.Int())
    totalHours = db.Column(db.Int())
    wdoNotes = db.Column(db.String())
    comments = db.Column(db.String())
    abnormal = db.Column(db.Char())


    def __init__(combo, lateral, sideGate, name, phone, flow, hours, estStart, primeDate, primeStart, startDate, startTime, finishDate, finishTime, 
                 primeTotal, totalHours, wdoNotes, comments, abnormal):
        self.combo = combo
        self.lateral = lateral
        self.sideGate = sideGate
        self.name = name
        self.phone = phone
        self.flow = flow
        self.hours = hours
        self.estStart = estStart
        self.primeDate = primeDate
        self.primeStart = primeStart
        self.startDate = startDate
        self.startTime = startTime
        self.finishDate = finishDate
        self.finishTime = finishTime
        self.primeTotal = primeTotal
        self.totalHourse = totalHours
        self.wdoNotes = wdoNotes
        self.comments = comments
        self.abnormal = abnormal


        def __repr__(self):
            return f"{self.name}"
        


class Head2(db.Model):
    __tablename__ = "head2"

    combo = db.Column(db.String(), primary_key=True)
    lateral = db.Column(db.String())
    sideGate = db.Column(db.String())
    name = db.Column(db.String())
    phone = db.Column(db.String())
    flow = db.Column(db.Float())
    hours = db.Column(db.Float())
    # acre = db.Column(db.Float())
    # crop = db.Column(db.String())
    # irrigationType = db.Column(db.String())
    # date = db.Column(db.Date())
    # tranTime = db.Column(db.Float())
    # excessive = db.Column(db.Char())
    # final = db.Column(db.Char())
    # comment = db.Column(db.String())
    # SBXCFS = db.Column(db.Float())
    # deleted = db.Column(db.Char())
    # sa = db.Column(db.String())
    estStart = db.Column(db.String())
    primeDate = db.Column(db.Date())
    primeStart = db.Column(db.Int())
    startDate = db.Column(db.Date())
    startTime = db.Column(db.Int())
    finishDate = db.Column(db.Date())
    finishTime = db.Column(db.Int())
    primeTotal = db.Column(db.Int())
    totalHours = db.Column(db.Int())
    wdoNotes = db.Column(db.String())
    comments = db.Column(db.String())
    abnormal = db.Column(db.Char())


    def __init__(combo, lateral, sideGate, name, phone, flow, hours, estStart, primeDate, primeStart, startDate, startTime, finishDate, finishTime, 
                 primeTotal, totalHours, wdoNotes, comments, abnormal):
        self.combo = combo
        self.lateral = lateral
        self.sideGate = sideGate
        self.name = name
        self.phone = phone
        self.flow = flow
        self.hours = hours
        self.estStart = estStart
        self.primeDate = primeDate
        self.primeStart = primeStart
        self.startDate = startDate
        self.startTime = startTime
        self.finishDate = finishDate
        self.finishTime = finishTime
        self.primeTotal = primeTotal
        self.totalHourse = totalHours
        self.wdoNotes = wdoNotes
        self.comments = comments
        self.abnormal = abnormal


        def __repr__(self):
            return f"{self.name}"
        


class Head3(db.Model):
    __tablename__ = "head3"

    combo = db.Column(db.String(), primary_key=True)
    lateral = db.Column(db.String())
    sideGate = db.Column(db.String())
    name = db.Column(db.String())
    phone = db.Column(db.String())
    flow = db.Column(db.Float())
    hours = db.Column(db.Float())
    # acre = db.Column(db.Float())
    # crop = db.Column(db.String())
    # irrigationType = db.Column(db.String())
    # date = db.Column(db.Date())
    # tranTime = db.Column(db.Float())
    # excessive = db.Column(db.Char())
    # final = db.Column(db.Char())
    # comment = db.Column(db.String())
    # SBXCFS = db.Column(db.Float())
    # deleted = db.Column(db.Char())
    # sa = db.Column(db.String())
    estStart = db.Column(db.String())
    primeDate = db.Column(db.Date())
    primeStart = db.Column(db.Int())
    startDate = db.Column(db.Date())
    startTime = db.Column(db.Int())
    finishDate = db.Column(db.Date())
    finishTime = db.Column(db.Int())
    primeTotal = db.Column(db.Int())
    totalHours = db.Column(db.Int())
    wdoNotes = db.Column(db.String())
    comments = db.Column(db.String())
    abnormal = db.Column(db.Char())


    def __init__(combo, lateral, sideGate, name, phone, flow, hours, estStart, primeDate, primeStart, startDate, startTime, finishDate, finishTime, 
                 primeTotal, totalHours, wdoNotes, comments, abnormal):
        self.combo = combo
        self.lateral = lateral
        self.sideGate = sideGate
        self.name = name
        self.phone = phone
        self.flow = flow
        self.hours = hours
        self.estStart = estStart
        self.primeDate = primeDate
        self.primeStart = primeStart
        self.startDate = startDate
        self.startTime = startTime
        self.finishDate = finishDate
        self.finishTime = finishTime
        self.primeTotal = primeTotal
        self.totalHourse = totalHours
        self.wdoNotes = wdoNotes
        self.comments = comments
        self.abnormal = abnormal


        def __repr__(self):
            return f"{self.name}"
        


class Head4(db.Model):
    __tablename__ = "head4"

    combo = db.Column(db.String(), primary_key=True)
    lateral = db.Column(db.String())
    sideGate = db.Column(db.String())
    name = db.Column(db.String())
    phone = db.Column(db.String())
    flow = db.Column(db.Float())
    hours = db.Column(db.Float())
    # acre = db.Column(db.Float())
    # crop = db.Column(db.String())
    # irrigationType = db.Column(db.String())
    # date = db.Column(db.Date())
    # tranTime = db.Column(db.Float())
    # excessive = db.Column(db.Char())
    # final = db.Column(db.Char())
    # comment = db.Column(db.String())
    # SBXCFS = db.Column(db.Float())
    # deleted = db.Column(db.Char())
    # sa = db.Column(db.String())
    estStart = db.Column(db.String())
    primeDate = db.Column(db.Date())
    primeStart = db.Column(db.Int())
    startDate = db.Column(db.Date())
    startTime = db.Column(db.Int())
    finishDate = db.Column(db.Date())
    finishTime = db.Column(db.Int())
    primeTotal = db.Column(db.Int())
    totalHours = db.Column(db.Int())
    wdoNotes = db.Column(db.String())
    comments = db.Column(db.String())
    abnormal = db.Column(db.Char())


    def __init__(combo, lateral, sideGate, name, phone, flow, hours, estStart, primeDate, primeStart, startDate, startTime, finishDate, finishTime, 
                 primeTotal, totalHours, wdoNotes, comments, abnormal):
        self.combo = combo
        self.lateral = lateral
        self.sideGate = sideGate
        self.name = name
        self.phone = phone
        self.flow = flow
        self.hours = hours
        self.estStart = estStart
        self.primeDate = primeDate
        self.primeStart = primeStart
        self.startDate = startDate
        self.startTime = startTime
        self.finishDate = finishDate
        self.finishTime = finishTime
        self.primeTotal = primeTotal
        self.totalHourse = totalHours
        self.wdoNotes = wdoNotes
        self.comments = comments
        self.abnormal = abnormal


        def __repr__(self):
            return f"{self.name}"
        


class Head5(db.Model):
    __tablename__ = "head5"

    combo = db.Column(db.String(), primary_key=True)
    lateral = db.Column(db.String())
    sideGate = db.Column(db.String())
    name = db.Column(db.String())
    phone = db.Column(db.String())
    flow = db.Column(db.Float())
    hours = db.Column(db.Float())
    # acre = db.Column(db.Float())
    # crop = db.Column(db.String())
    # irrigationType = db.Column(db.String())
    # date = db.Column(db.Date())
    # tranTime = db.Column(db.Float())
    # excessive = db.Column(db.Char())
    # final = db.Column(db.Char())
    # comment = db.Column(db.String())
    # SBXCFS = db.Column(db.Float())
    # deleted = db.Column(db.Char())
    # sa = db.Column(db.String())
    estStart = db.Column(db.String())
    primeDate = db.Column(db.Date())
    primeStart = db.Column(db.Int())
    startDate = db.Column(db.Date())
    startTime = db.Column(db.Int())
    finishDate = db.Column(db.Date())
    finishTime = db.Column(db.Int())
    primeTotal = db.Column(db.Int())
    totalHours = db.Column(db.Int())
    wdoNotes = db.Column(db.String())
    comments = db.Column(db.String())
    abnormal = db.Column(db.Char())


    def __init__(combo, lateral, sideGate, name, phone, flow, hours, estStart, primeDate, primeStart, startDate, startTime, finishDate, finishTime, 
                 primeTotal, totalHours, wdoNotes, comments, abnormal):
        self.combo = combo
        self.lateral = lateral
        self.sideGate = sideGate
        self.name = name
        self.phone = phone
        self.flow = flow
        self.hours = hours
        self.estStart = estStart
        self.primeDate = primeDate
        self.primeStart = primeStart
        self.startDate = startDate
        self.startTime = startTime
        self.finishDate = finishDate
        self.finishTime = finishTime
        self.primeTotal = primeTotal
        self.totalHourse = totalHours
        self.wdoNotes = wdoNotes
        self.comments = comments
        self.abnormal = abnormal


        def __repr__(self):
            return f"{self.name}"
        


class UN(db.Model):
    __tablename__ = "UN"

    combo = db.Column(db.String(), primary_key=True)
    lateral = db.Column(db.String())
    sideGate = db.Column(db.String())
    name = db.Column(db.String())
    phone = db.Column(db.String())
    flow = db.Column(db.Float())
    hours = db.Column(db.Float())
    # acre = db.Column(db.Float())
    # crop = db.Column(db.String())
    # irrigationType = db.Column(db.String())
    # date = db.Column(db.Date())
    # tranTime = db.Column(db.Float())
    # excessive = db.Column(db.Char())
    # final = db.Column(db.Char())
    # comment = db.Column(db.String())
    # SBXCFS = db.Column(db.Float())
    # deleted = db.Column(db.Char())
    # sa = db.Column(db.String())
    estStart = db.Column(db.String())
    primeDate = db.Column(db.Date())
    primeStart = db.Column(db.Int())
    startDate = db.Column(db.Date())
    startTime = db.Column(db.Int())
    finishDate = db.Column(db.Date())
    finishTime = db.Column(db.Int())
    primeTotal = db.Column(db.Int())
    totalHours = db.Column(db.Int())
    wdoNotes = db.Column(db.String())
    comments = db.Column(db.String())
    abnormal = db.Column(db.Char())


    def __init__(combo, lateral, sideGate, name, phone, flow, hours, estStart, primeDate, primeStart, startDate, startTime, finishDate, finishTime, 
                 primeTotal, totalHours, wdoNotes, comments, abnormal):
        self.combo = combo
        self.lateral = lateral
        self.sideGate = sideGate
        self.name = name
        self.phone = phone
        self.flow = flow
        self.hours = hours
        self.estStart = estStart
        self.primeDate = primeDate
        self.primeStart = primeStart
        self.startDate = startDate
        self.startTime = startTime
        self.finishDate = finishDate
        self.finishTime = finishTime
        self.primeTotal = primeTotal
        self.totalHourse = totalHours
        self.wdoNotes = wdoNotes
        self.comments = comments
        self.abnormal = abnormal


        def __repr__(self):
            return f"{self.name}"
        


class M(db.Model):
    __tablename__ = "M"

    combo = db.Column(db.String(), primary_key=True)
    lateral = db.Column(db.String())
    sideGate = db.Column(db.String())
    name = db.Column(db.String())
    phone = db.Column(db.String())
    flow = db.Column(db.Float())
    hours = db.Column(db.Float())
    # acre = db.Column(db.Float())
    # crop = db.Column(db.String())
    # irrigationType = db.Column(db.String())
    # date = db.Column(db.Date())
    # tranTime = db.Column(db.Float())
    # excessive = db.Column(db.Char())
    # final = db.Column(db.Char())
    # comment = db.Column(db.String())
    # SBXCFS = db.Column(db.Float())
    # deleted = db.Column(db.Char())
    # sa = db.Column(db.String())
    estStart = db.Column(db.String())
    primeDate = db.Column(db.Date())
    primeStart = db.Column(db.Int())
    startDate = db.Column(db.Date())
    startTime = db.Column(db.Int())
    finishDate = db.Column(db.Date())
    finishTime = db.Column(db.Int())
    primeTotal = db.Column(db.Int())
    totalHours = db.Column(db.Int())
    wdoNotes = db.Column(db.String())
    comments = db.Column(db.String())
    abnormal = db.Column(db.Char())


    def __init__(combo, lateral, sideGate, name, phone, flow, hours, estStart, primeDate, primeStart, startDate, startTime, finishDate, finishTime, 
                 primeTotal, totalHours, wdoNotes, comments, abnormal):
        self.combo = combo
        self.lateral = lateral
        self.sideGate = sideGate
        self.name = name
        self.phone = phone
        self.flow = flow
        self.hours = hours
        self.estStart = estStart
        self.primeDate = primeDate
        self.primeStart = primeStart
        self.startDate = startDate
        self.startTime = startTime
        self.finishDate = finishDate
        self.finishTime = finishTime
        self.primeTotal = primeTotal
        self.totalHourse = totalHours
        self.wdoNotes = wdoNotes
        self.comments = comments
        self.abnormal = abnormal


        def __repr__(self):
            return f"{self.name}"