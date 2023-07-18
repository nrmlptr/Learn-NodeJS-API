// controller yang memuat semua aksi CRUD yang ditampung ke dalam function dan dieksekusi berdasarkan permintaan dari router

const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    //ambil semua data karyawan
    getDataKaryawan(req, res){
        pool.getConnection(function(err, connection){
            if (err) throw err;
            connection.query(
                `SELECT * FROM tb_karyawan;`,
                function (error, results){
                    if(error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil mengambil data!',
                        data: results
                    });
                });
                connection.release();
        })
    },

    //ambill data karyawan berdasarkan ID karyawan
    getDataKaryawanByID(req, res){
        let id = req.params.id;
        pool.getConnection(function(err, connection){
            if (err) throw err;
            connection.query(
                `SELECT FROM tb_karyawan WHERE id_karyawan = ?;`,[id],
                function(error, results){
                    if(error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil Mengambil Data dengan ID Tersebut!',
                        data: results
                    });
                });
                connection.release();
        })
    },
    //simpan data karyawan
    addDataKaryawan(req, res){
        let data = {
            nm_karyawan         : req.body.nama,
            umur_karyawan       : req.body.umur,
            alamat_karyawan     : req.body.alamat,
            jabatan_karyawan    : req.body.jabatan
        }
        pool.getConnection(function(err, connection){
            if (err) throw err;
            connection.query(
                `INSERT INTO tb_karyawan SET ?;`,[data],
                function (error, results){
                    if(error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil Menambahkan Data!',
                    });
                });
                connection.release();
        })
    },
    //update data karyawan
    editDataKaryawan(req, res){
        let dataEdit = {
            nm_karyawan             : req.body.nama,
            umur_karyawan           : req.body.umur,
            alamat_karyawan         : req.body.alamat,
            jabatan_karyawan        : req.body.jabatan
        }
        let id = req.body.id
        pool.getConnection(function(err, connection){
            if(err) throw err;
            connection.query(
                `UPDATE tb_karyawan SET ? WHERE id_karyawan = ?;`,[dataEdit, id],
                function (error, results){
                    if(error) throw error;
                    res.send({
                        success     : true,
                        message     : 'Berhasil Merubah Data!',
                    });
                });
                connection.release();
        })
    },
    //delete data karyawan
    deleteDataKaryawan(req, res){
        let id = req.body.id
        pool.getConnection(function(err, connection){
            if(err) throw err;
            connection.query(
                `DELETE FROM tb_karyawan WHERE id_karyawan = ?;`, [id],
                function(error, results){
                    if(error) throw error;
                    res.send({
                        success     :true,
                        message     : 'Berhasil Menghapus Data!'
                    });
                });
                connection.release();
        })
    }
}