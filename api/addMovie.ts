import express from "express";
import { conn } from "../dbconnect";
import mysql from "mysql";
import { MovieResponse } from "../model/config";

export const router = express.Router();

//insert Movies
router.post("/add", (req, res) => {
    const movie: MovieResponse = req.body; 

    let sql = "insert into movies (title, poster, year, rating, runtime, plot_movie) values (?,?,?,?,?,?)";

    sql = mysql.format(sql,[
        movie.title, 
        movie.poster, 
        movie.year, 
        movie.rating, 
        movie.runtime, 
        movie.plot_movie
    ]);

    conn.query(sql,(err, result)=>{
        if (err) throw err;
        {
            res.status(201).json({success: true,result, message:" Congratulations!! "});
        }
    });
});

// router.post("/add", (req, res) => {
//     const title = req.body.title;
//     const poster = req.body.poster;
//     const year = req.body.year;
//     const rating = req.body.rating;
//     const runtime = req.body.runtime;
//     const plot_movie = req.body.plot_movie;

//     let sql = "insert into movies (title, poster, year, rating, runtime, plot_movie) values (?,?,?,?,?,?)";

//     sql = mysql.format(sql,[
//         title, 
//         poster, 
//         year, 
//         rating, 
//         runtime, 
//         plot_movie
//     ]);

//     conn.query(sql,(err, result)=>{
//         if (err) throw err;
//         {
//             res.status(201).json({success: true,result, message:" Congratulations!! "});
//         }
//     });
// });

//delete Movies
router.delete("/del/:id", (req, res) => {
    const id = req.params.id;
    let sql = "delete from movies where mvid =?";
    sql = mysql.format(sql,[id]);
    conn.query(sql,(err, result)=>{
        if (err) throw err;
        {
            res.status(201).json({success: true,result, message:" Delete Success!!"});
        }
    });
});