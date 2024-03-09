import express from "express";
import { conn } from "../dbconnect";
import mysql from "mysql";
import { PersonResponse } from "../model/config";

export const router = express.Router();

router.post("/add", (req, res) => {
    const person : PersonResponse = req.body;

    let sql = "insert into persons (name,img,age,detail) values(?,?,?,?);";

    sql = mysql.format(sql,[
        person.name,
        person.img,
        person.age,
        person.detail
    ]);

    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(201).json({success: true,result, message:" Congratulations!! "});
        }
    });
});

//delete Persons
router.delete("/del/:id", (req, res) => {
    const id = req.params.id;
    let sql = "delete from persons where pid =?";
    sql = mysql.format(sql,[id]);
    conn.query(sql,(err, result)=>{
        if (err) throw err;
        {
            res.status(201).json({success: true,result, message:" Delete Success!!"});
        }
    });
});

//add Stars
router.post("/addstar/:mvid/:pid",(req, res)=>{
    const mvid = req.params.mvid;
    const pid = req.params.pid;
    const type = "star";
    let sql = "insert into stars (mvid_fk,pid_fk,type) values(?,?,?)";
    sql = mysql.format(sql,[mvid,pid,type]);
    conn.query(sql,(err, result)=>{
        if (err) throw err;
        {
            res.status(201).json({success: true,result, message:" Add Star Success!!"});
        }
    });
});

//delete Stars
router.delete("/delstar/:mvid/:pid",(req, res)=>{
    const mvid = req.params.mvid;
    const pid = req.params.pid;
    let sql = "delete from stars where mvid_fk = ? AND pid_fk = ?";
    sql = mysql.format(sql,[mvid,pid]);
    conn.query(sql,(err, result)=>{
        if (err) throw err;
        {
            res.status(201).json({success: true,result, message:" Delete Star Success!!"});
        }
    });
});

//add Creators
router.post("/addcreator/:mvid/:pid",(req, res)=>{
    const mvid = req.params.mvid;
    const pid = req.params.pid;
    const type = req.body.type;
    let sql = "insert into creators (mvid_fk,pid_fk,type) values(?,?,?)";
    sql = mysql.format(sql,[mvid,pid,type]);
    conn.query(sql,(err, result)=>{
        if (err) throw err;
        {
            res.status(201).json({success: true,result, message:" Add Creator Success!!"});
        }
    });
});

//delete Creators
router.delete("/delcreator/:mvid/:pid",(req, res)=>{
    const mvid = req.params.mvid;
    const pid = req.params.pid;
    let sql = "delete from creators where mvid_fk =? AND pid_fk =?";
    sql = mysql.format(sql,[mvid,pid]);
    conn.query(sql,(err, result)=>{
        if (err) throw err;
        {
            res.status(201).json({success: true,result, message:" Delete Creator Success!!"});
        }
    });
});