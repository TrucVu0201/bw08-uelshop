var dsNhanVien = [];
var dsKhachHang = [];

/**
 * đây là hàm load tài khoản
 * đọc employees.json và customers.json để kiểm tra đăng nhập
 */
function loadTaiKhoan(fileNhanVien, fileKhachHang) {
    docJSON(fileNhanVien, function(data) {
        dsNhanVien = data;
    });
    docJSON(fileKhachHang, function(data) {
        dsKhachHang = data;
    });
}

// Tìm tài khoản trùng user + pass trong 1 danh sách
function timTaiKhoan(ds, user, pass) {
    for (var i = 0; i < ds.length; i++) {
        if (ds[i].username == user && ds[i].password == pass) return ds[i];
    }
    return null;
}

/**
 * đây là hàm đăng nhập
 * nhân viên -> trang Quản lý; khách hàng -> về trang sản phẩm
 */
function dangNhap() {
    // Mạng chậm, file tài khoản chưa tải xong thì đừng báo sai mật khẩu
    if (dsNhanVien.length == 0 || dsKhachHang.length == 0) {
        document.getElementById("loiDangNhap").textContent = "Đang tải dữ liệu tài khoản, vui lòng bấm lại sau giây lát.";
        return;
    }
    var user = document.getElementById("txtUser").value.trim();
    var pass = document.getElementById("txtPass").value;

    var nv = timTaiKhoan(dsNhanVien, user, pass);
    if (nv) {
        luuNguoiDung({ id: nv.id, name: nv.name, loai: "nhanvien", role: nv.role,
                       username: nv.username, email: nv.email, phone: nv.phone });
        window.location.href = "admin.html";
        return;
    }
    var kh = timTaiKhoan(dsKhachHang, user, pass);
    if (kh) {
        luuNguoiDung({ id: kh.id, name: kh.name, loai: "khach", username: kh.username, phone: kh.phone,
                       email: kh.email, address: kh.address });
        window.location.href = "../index.html";
        return;
    }
    document.getElementById("loiDangNhap").textContent = "Sai tên đăng nhập hoặc mật khẩu.";
}
