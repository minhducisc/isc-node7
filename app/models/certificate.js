var connection = require('../models/connection');

// Lấy danh sách tất cả chứng chỉ
var getListCertificate = function (req, res) {
    var query = 'SELECT TENCHUNGCHI,MACHUNGCHI FROM CHUNGCHI ';
    connection.query(query, function (err, rows) {
        res.json(rows);
    }); 
};

var getAll = function (req, res) {
    var query = 'SELECT * FROM CHUNGCHI ';
    connection.query(query, function (err, rows) {
        res.json(rows);
    });
};

// Lấy ra danh sách chứng chỉ theo ID
var getCertificateWithID = function (id, res) {
    var query = 'SELECT * FROM CHUNGCHI WHERE MACHUNGCHI = ' + id;
    console.log('Execute query:', query);
    connection.query(query, function (err, rows) {
        res.json(rows);
    });
};

//Thêm mới chứng chỉ
var insertCertificate = function(certificate, res){
    //console.log(certificate);
    var values = [
        [certificate.TenChungChi, certificate.GhiChu]
    ];
    connection.query("INSERT INTO CHUNGCHI(TENCHUNGCHI, GHICHU) VALUES ?", [values], function(err){
        if(err){
            res.end(err.message);
        } else {
            console.log('succes');
            res.end('succes');      
        }
    });
};

// Xóa chứng chỉ
var deleteCertificate = function(id, res){
    var query = "DELETE FROM CHUNGCHI WHERE MACHUNGCHI = ?";
    connection.query(query, [id], function(err, result){
        if(err){
            res.end(err.message);
        } else {
            console.log('Execute query:', query);
            res.end('delete succes');
        }
    });
};

module.exports = {
    getAll: getAll,
    getCertificateWithID: getCertificateWithID,
    insertCertificate: insertCertificate,
    getListCertificate: getListCertificate,
    deleteCertificate: deleteCertificate
};