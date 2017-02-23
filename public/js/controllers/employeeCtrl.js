'use strict';

app.controller('employeeCtrl', ['$scope', 'Upload', '$timeout', '$http', 'QLNS', function($scope, Upload, $timeout, $http, QLNS){
    
    $scope.employee = {
        Ho: '',
        Ten: '',
        NgaySinh: '',
        DiaChi: '',
        GioiTinh: '',
        DienThoai: '',
        Email: '',
        MaSoBaoHiem: '',
        TrinhDo: '',
        TonGiao: '',
        ChungChiChuyenNghanh: '',
        ChungChiAnhVan: '',
        imgEmployPath: '',
        CVPath: '',
        ScoreTablePath: '',
        CertificatePath: '',
        HouseholdPath: '',
        DiplomaPath: '',
        HealthCertificationPath: '',
        PhongBan: '',
        ChucVu: '',
        maPhongBan: '',
        maChucVu: '',
        maChuyenNghanh: '',
        ChuyenNghanh: '',
        TuNgay: '',
        DenNgay: '',
        MaNhanVien: ''
    };

var clearEmployee = function(){
        $scope.employee = {
        Ho: '',
        Ten: '',
        NgaySinh: '',
        DiaChi: '',
        GioiTinh: '',
        DienThoai: '',
        Email: '',
        MaSoBaoHiem: '',
        TrinhDo: '',
        TonGiao: '',
        ChungChiChuyenNghanh: '',
        ChungChiAnhVan: '',
        imgEmployPath: '',
        CVPath: '',
        ScoreTablePath: '',
        CertificatePath: '',
        HouseholdPath: '',
        DiplomaPath: '',
        HealthCertificationPath: '',
        PhongBan: '',
        ChucVu: '',
        maPhongBan: '',
        maChucVu: '',
        maChuyenNghanh: '',
        ChuyenNghanh: '',
        TuNgay: '',
        DenNgay: '',
        MaNhanVien: ''
    };
    $scope.CVs[0].name = '';
    $scope.ScoreTables[0].name = '';
    $scope.Certificates[0].name = '';
    $scope.Households[0].name = '';
    $scope.Diplomas[0].name = '';
    $scope.HealthCertifications[0].name = '';
};
    // Lưu
    $scope.Save = function(){     
        //console.log($scope.employee);
        if(!checkDepartment()){
            alert('Vui lòng chọn Phòng Ban');
        } else if(!checkRole()){
            alert('VUi lòng chọn Chức Vụ');
        } else if(!checkMajor()){
            alert('Vui lòng chọn Chuyên Nghành');
        } else if(!checkGender()){
            alert('Vui lòng chọn Giới Tính');
        } else{
            QLNS.employee.POST($scope.employee).then(function(res){
                alert(res.data);
                clearEmployee();
                refesh();
            });
        }
    };

    $scope.selectDepartment = function(mpb, pb){
        $scope.employee.maPhongBan = mpb;
        $scope.employee.PhongBan = pb;
        console.log(pb);
    };

    $scope.selectRole = function(mcv, cv){
        $scope.employee.maChucVu = mcv;
        $scope.employee.ChucVu = cv;
        console.log(cv);
    };

    $scope.selectMajoring = function(mcn, cn){
        $scope.employee.maChuyenNghanh = mcn;
        $scope.employee.ChuyenNghanh = cn;
        console.log(cn);
    };

    $scope.selectGender = function(genderName){
        if(genderName === 'Nam'){
            $scope.employee.GioiTinh = 1;
            $scope.gender = genderName;
        } else if(genderName === 'Nữ'){
            $scope.employee.GioiTinh = 0;
            $scope.gender = genderName;
        }
    };

    //Refesh Add Employee page
    var refesh = function(){
        $scope.employee.PhongBan = 'Chọn';
        $scope.employee.ChucVu = 'Chọn';
        $scope.employee.ChuyenNghanh = 'Chọn';
        $scope.gender = 'Chọn';
        QLNS.department.GETNAME().then(function(res){
            //console.log(res.data);
            $scope.departments = res.data;
        });
        QLNS.role.GETNAME().then(function(res){
            //console.log(res.data);
            $scope.roles = res.data;
        });
        QLNS.majoring.GET().then(function(res){
            //console.log(res.data);
            $scope.majoring = res.data;
        });
    };
    refesh();

    // Check Phòng Ban
    var checkDepartment = function(){
        return !($scope.employee.PhongBan === 'Chọn' || $scope.employee.PhongBan === '');
    };

    // check Chức Vụ
    var checkRole = function(){
        return !($scope.employee.ChucVu === 'Chọn' || $scope.employee.ChucVu === '');
    };

    // check Chuyên Nghành
    var checkMajor = function(){
        return !($scope.employee.ChuyenNghanh === 'Chọn' || $scope.employee.ChuyenNghanh === '');
    };

    // check Giới Tính
    var checkGender = function(){
        return !($scope.gender === 'Chọn' || $scope.gender === '');
    };

    // Image Employee
    $scope.$watch('imgEmploys', function () {
        //console.log($scope.imgEmploys);  
        $scope.uploadImage($scope.imgEmploys);
    });
    $scope.$watch('imgEmploy', function () {
        if ($scope.imgEmploy != null) {
            //console.log($scope.files);
            $scope.imgEmploys = [$scope.imgEmploy]; 
        }
    });
    $scope.logimg = '';

    // CV
    $scope.$watch('CVs', function () {
        //console.log($scope.CVs[0].name);   
        $scope.uploadCV($scope.CVs);   
    });
    $scope.$watch('CV', function () {
        if ($scope.CV != null) {
            //console.log($scope.files);
            $scope.CVs = [$scope.CV]; 
        }
    });
    $scope.logCV = '';

    // Bảng điểm
    $scope.$watch('ScoreTables', function () {
        //console.log($scope.ScoreTables); 
        $scope.uploadScoreTable($scope.ScoreTables);
    });
    $scope.$watch('ScoreTable', function () {
        if ($scope.ScoreTable != null) {
            //console.log($scope.files);
            $scope.ScoreTables = [$scope.ScoreTable]; 
        }
    });
    $scope.logScoreTable = '';

    // Chứng chỉ
    $scope.$watch('Certificates', function () {
        //console.log($scope.Certificates);
        $scope.uploadCertificate($scope.Certificates);
    });
    $scope.$watch('Certificate', function () {
        if ($scope.Certificate != null) {
            //console.log($scope.files);
            $scope.Certificates = [$scope.Certificate]; 
        }
    });
    $scope.logCertificate = '';

    // Hộ khẩu
    $scope.$watch('Households', function () {
        //console.log($scope.Households);
        $scope.uploadHousehold($scope.Households);
    });
    $scope.$watch('Household', function () {
        if ($scope.Household != null) {
            //console.log($scope.files);
            $scope.Households = [$scope.Household]; 
        }
    });
    $scope.logHousehold = '';

    // Bằng tốt nghiệp
    $scope.$watch('Diplomas', function () {
        //console.log($scope.Diplomas); 
        $scope.uploadDiploma($scope.Diplomas);
    });
    $scope.$watch('Diploma', function () {
        if ($scope.Diploma != null) {
            //console.log($scope.files);
            $scope.Diplomas = [$scope.Diploma]; 
        }
    });
    $scope.logDiploma = '';

    // Giấy khám sức khỏe
    $scope.$watch('HealthCertifications', function () {
        //console.log($scope.HealthCertifications);
        $scope.uploadHealthCertification($scope.HealthCertifications);
    });
    $scope.$watch('HealthCertification', function () {
        if ($scope.HealthCertification != null) {
            //console.log($scope.files);
            $scope.HealthCertifications = [$scope.HealthCertification]; 
        }
    });
    $scope.logHealthCertification = '';

    // phương thức upload ảnh vào thư mục uploads/employeeImage
    $scope.uploadImage = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                Upload.upload({
                    url: '/api/uploadImage',
                    data: {
                      file: file  
                    }
                }).then(function (resp) {
                    //console.log(resp.data);
                    $scope.employee.imgEmployPath = resp.data.originalname;
                    $timeout(function() {
                        $scope.logimg = 'file: ' +
                        resp.config.data.file.name +
                        ', Response: ' + JSON.stringify(resp.data) +
                        '\n' + $scope.logimg;
                    });
                }, null, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                    		evt.loaded / evt.total);
                    $scope.logimg = 'progress: ' + progressPercentage + 
                    	'% ' + evt.config.data.file.name + '\n' + 
                      $scope.logimg;
                });
              }
            }
        }
    };

    // phương thức upload CV vào thư mục uploads/CV
    $scope.uploadCV = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                Upload.upload({
                    url: '/api/uploadCV',
                    data: {
                      file: file  
                    }
                }).then(function (resp) {
                    $scope.employee.CVPath = resp.data.path;
                    $timeout(function() {
                        $scope.logCV = 'file: ' +
                        resp.config.data.file.name +
                        ', Response: ' + JSON.stringify(resp.data) +
                        '\n' + $scope.logCV;
                    });
                }, null, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                    		evt.loaded / evt.total);
                    $scope.logCV = 'progress: ' + progressPercentage + 
                    	'% ' + evt.config.data.file.name + '\n' + 
                      $scope.logCV;

                      console.log($scope.logCV);
                });
              }
            }
        }
    };

    // phương thức upload ảnh vào thư mục uploads/ScoreTable
    $scope.uploadScoreTable = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                Upload.upload({
                    url: '/api/uploadScoreTable',
                    data: {
                      file: file  
                    }
                }).then(function (resp) {
                    $scope.employee.ScoreTablePath = resp.data.path;
                    $timeout(function() {
                        $scope.logScoreTable = 'file: ' +
                        resp.config.data.file.name +
                        ', Response: ' + JSON.stringify(resp.data) +
                        '\n' + $scope.logScoreTable;
                    });
                }, null, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                    		evt.loaded / evt.total);
                    $scope.logScoreTable = 'progress: ' + progressPercentage + 
                    	'% ' + evt.config.data.file.name + '\n' + 
                      $scope.logScoreTable;
                });
              }
            }
        }
    };

    // phương thức upload ảnh vào thư mục uploads/Certificate
    $scope.uploadCertificate = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                Upload.upload({
                    url: '/api/uploadCertificate',
                    data: {
                      file: file  
                    }
                }).then(function (resp) {
                    $scope.employee.CertificatePath = resp.data.path;
                    $timeout(function() {
                        $scope.logCertificate = 'file: ' +
                        resp.config.data.file.name +
                        ', Response: ' + JSON.stringify(resp.data) +
                        '\n' + $scope.logCertificate;
                    });
                }, null, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                    		evt.loaded / evt.total);
                    $scope.logCertificate = 'progress: ' + progressPercentage + 
                    	'% ' + evt.config.data.file.name + '\n' + 
                      $scope.logCertificate;
                });
              }
            }
        }
    };

    // phương thức upload ảnh vào thư mục uploads/Household
    $scope.uploadHousehold = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                Upload.upload({
                    url: '/api/uploadHousehold',
                    data: {
                      file: file  
                    }
                }).then(function (resp) {
                    $scope.employee.HouseholdPath = resp.data.path;
                    $timeout(function() {
                        $scope.logHousehold = 'file: ' +
                        resp.config.data.file.name +
                        ', Response: ' + JSON.stringify(resp.data) +
                        '\n' + $scope.logHousehold;
                    });
                }, null, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                    		evt.loaded / evt.total);
                    $scope.logHousehold = 'progress: ' + progressPercentage + 
                    	'% ' + evt.config.data.file.name + '\n' + 
                      $scope.logHousehold;
                });
              }
            }
        }
    };

    // phương thức upload ảnh vào thư mục uploads/Diploma
    $scope.uploadDiploma = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                Upload.upload({
                    url: '/api/uploadDiploma',
                    data: {
                      file: file  
                    }
                }).then(function (resp) {
                    $scope.employee.DiplomaPath = resp.data.path;
                    $timeout(function() {
                        $scope.logDiploma = 'file: ' +
                        resp.config.data.file.name +
                        ', Response: ' + JSON.stringify(resp.data) +
                        '\n' + $scope.logDiploma;
                    });
                }, null, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                    		evt.loaded / evt.total);
                    $scope.logDiploma = 'progress: ' + progressPercentage + 
                    	'% ' + evt.config.data.file.name + '\n' + 
                      $scope.logDiploma;
                });
              }
            }
        }
    };

    // phương thức upload ảnh vào thư mục uploads/HealthCertification
    $scope.uploadHealthCertification = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                Upload.upload({
                    url: '/api/uploadHealthCertification',
                    data: {
                      file: file  
                    }
                }).then(function (resp) {
                    $scope.employee.HealthCertificationPath = resp.data.path;
                    $timeout(function() {
                        $scope.logHealthCertification = 'file: ' +
                        resp.config.data.file.name +
                        ', Response: ' + JSON.stringify(resp.data) +
                        '\n' + $scope.logHealthCertification;
                    });
                }, null, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                    		evt.loaded / evt.total);
                    $scope.logHealthCertification = 'progress: ' + progressPercentage + 
                    	'% ' + evt.config.data.file.name + '\n' + 
                      $scope.logHealthCertification;
                });
              }
            }
        }
    };

}]);