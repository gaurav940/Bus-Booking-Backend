const db = require("../models")
const model = require('../app/router.js')
const express = require('express');
const busRoute = require("../models/busRoute");
//const { QueryTypes } = require("sequelize/types");
let router = express.Router();
const Op = db.sequelize.Op;




router.post('/bus', async (req, res) => {
    const BUS = await db.Bus.create({
        Bus_Name: req.body.Bus_Name,
        source: req.body.source,
        destination: req.body.destination,
        seats: req.body.seats,
        seatType: req.body.seatType
    });


    const arr = [];
    req.body.features.forEach((element) => {
        arr.push({
            name: element.name,
            value: element.value,
            BusID: BUS.id
        })
    });

    const FEA = await db.Feature.bulkCreate(arr, { returning: true });
    if (FEA) { res.send("Bus Added Successfully!") };
});

router.post('/busroute', async (req, res) => {
    const ROUTE = await db.busRoute.create({
        dropPoint: req.body.dropPoint,
        distance: req.body.distance,
        fare: req.body.fare,
        BusID: req.body.BusID
    })

    if (ROUTE) {
        res.send("Route Added Successfully!")
    }
    else { res.send("Stop Making Errors!") }
});

// router.post('/busdate', async(req, res)=> {
//     const busdate = await db.BusDate.create({
//         bDate : req.body.bDate,

//     })
// })


router.post('/checkout', async (req, res) => {

    const data = await db.busRoute.findOne({
        where: { id: req.body.RouteID }
    })

    const bus = await db.Bus.findOne({
        where: { id: req.body.BusID }
    });
    
    let DATE = Date.parse(req.body.date)

    const busdate = await db.BusDate.findOne({
        where : { bDate : DATE, BusID: req.body.BusID}
    });

    

    const Booking = await db.Booking.create({
        Pname: req.body.Pname,
        Qty: req.body.Qty,
        Amount: data.fare,

        totalAmount: data.fare * req.body.Qty,
        bDate: new Date(DATE),
        status: true,
        BusID: req.body.BusID,
        RouteID: req.body.RouteID
    });


    if (Booking) {
        const date = await db.BusDate.findOne({
            where: { BusID: req.body.BusID, bDate: Booking.bDate }
        })
        if (!date) {
            res.send("No BUS found for the Given Date!")
            // const busdate = await db.BusDate.create({
            //     bDate: Booking.bDate,
            //     seats: bus.seats-req.body.Qty,
            //     BusID: Booking.id
            //})
            //res.send("Congratulations! Your Booking is CONFIRMED")
        }
        else {
                await db.BusDate.update(
                    { seats: busdate.seats - req.body.Qty },
                    { where: { BusID: req.body.BusID, bDate: Booking.bDate} }
                );
            res.send("Congratulations! Your Booking is CONFIRMED")
            }
    }
})

router.get('/search', async (req, res) => {

    const src = req.query.src;
    const dst = req.query.dst;


    if (!src && !dst) {

        const list = await db.Bus.findAll();
        res.send(list)
    }

    else if (src && !dst) {
        const list = await db.Bus.findAll({
            where: { source: src }
        })
        res.send(list)
    }

    else if (!src && dst) {
        const l1 = await db.busRoute.findAll({
            where: { dropPoint: dst }
        })
        const arr = [];
        for (var i = 0; i < l1.length; i++) {
            arr.push(await db.Bus.findAll({
                where: { id: l1[i].BusID }
            }));
            res.send(arr)
        }
    }

    else {
        const SRC = await db.Bus.findAll({
            where: { source: src }
        });

        const DST = await db.busRoute.findAll({
            where: { dropPoint: dst }
        });

        const bus = [];
        const LEN = new Set();
        for (var i = 0; i < SRC.length; i++) {
            for (var j = 0; j < DST.length; j++) {
                if ((DST[j].BusID === SRC[i].id) && !LEN.has(SRC[i].id)) {
                    bus.push(SRC[i])
                    LEN.add(SRC[i].id);
                }
            }
        }

        console.log(bus);
        if (LEN.size > 0) {
            res.send(bus);
        }

        else {
            res.send("No Buses Found!")
        }
    }
})

router.get('/filter', async (req, res) => {
    const seat = req.query.seat;
    const AC = req.query.AC;
    const wifi = req.query.wifi;


    const list = await db.Bus.findAll({
        where: {
            seatType: seat,
        },
    })

    // const arr=[];

    // for(var i=0;i<list.length;i++){

    // }

    if (list) { res.send(list) }
    else { res.send("Sorry No Bus Found!") };

})



module.exports = router








