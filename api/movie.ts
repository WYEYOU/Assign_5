import express from "express";
import { conn } from "../dbconnect";

export const router = express.Router();

router.get("/search", (req, res) => {
    conn.query('select * from movies where title like ?', ["%"+req.query.title+"%"], (err, mv_result, fields)=>{
      if(err) throw err;
      conn.query("select * from persons inner join stars on persons.pid = stars.pid_fk where stars.mvid_fk in (select mvid from movies where title like ?)",
        ["%"+req.query.title+"%"],(err, st_result, fields)=>{
            if(err) throw err;
            conn.query("select * from persons inner join creators on persons.pid = creators.pid_fk where creators.mvid_fk in (select mvid from movies where title like ?)",
                ["%"+req.query.title+"%"],(err,ct_result,fields)=>{
                    if(err) throw err;

                    // เช็คว่ามีข้อมูลหรือไม่
                    if (mv_result.length === 0 || st_result.length === 0 || ct_result.length === 0) {
                        // หากไม่มีข้อมูล ส่งข้อความกลับไปว่าไม่พบข้อมูล
                        res.status(404).json({ message: "ไม่พบข้อมูล" });
                    } else {
                        // หากมีข้อมูล ส่งข้อมูลกลับไป
                        res.json({
                            Movie: mv_result.map((movies: any) => ({
                                ...movies,
                                Stars: st_result.filter(
                                  (stars: any) => stars.mvid_fk === movies.mvid
                                ),
                                Creators: ct_result.filter(
                                  (creators: any) => creators.mvid_fk === movies.mvid
                                ),
                            })),
                        });
                    }
            });
        });
    });
});
