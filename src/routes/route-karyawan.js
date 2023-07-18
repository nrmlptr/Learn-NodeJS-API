//bertugas untuk menentukan end point dari Rest API yang sedang dibangun, beserta method apa saja yang diperbolehkan

const router = require('express').Router();
const { karyawan } = require('../controllers');

//get localhost:8080'karyawan => ambil data semua karyawan
router.get('/karyawan', karyawan.getDataKaryawan);

//get localhost:8080/karyawan/2 => ambil data semua karyawan berdasarkan id = 2
router.get('/karyawan/:id', karyawan.getDataKaryawanByID);

//post localhost:8080/karyawan/add => tambah data karyawan ke database
router.post('/karyawan/add', karyawan.addDataKaryawan);

//post localhost:8080/karyawan/2 => edit data karyawan
router.post('/karyawan/edit', karyawan.editDataKaryawan);

//post localhost:8080/karyawan/delete => delete data karyawan
router.post('/karyawan/delete/', karyawan.deleteDataKaryawan);


module.exports = router;