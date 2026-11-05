// Câu 7: form thanh toán, kiểm tra ngay khi gõ (keyup) hoặc rời ô (blur)

// Regex tự định nghĩa
var REGEX_DIEN_THOAI = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;   // số di động Việt Nam
var REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Hiện/ẩn lỗi ngay dưới ô nhập
function baoLoi(idO, idLoi, thongBao) {
    document.getElementById(idLoi).textContent = thongBao;
    document.getElementById(idO).className = thongBao ? "o-loi" : "o-dung";
    return thongBao == "";
}

function kiemTraHoTen() {
    var v = document.getElementById("txtHoTen").value.trim();
    return baoLoi("txtHoTen", "loiHoTen", v.length < 2 ? "Vui lòng nhập họ tên." : "");
}

function kiemTraDienThoai() {
    var v = document.getElementById("txtDienThoai").value.trim();
    return baoLoi("txtDienThoai", "loiDienThoai",
        REGEX_DIEN_THOAI.test(v) ? "" : "Số điện thoại VN gồm 10 số, bắt đầu 03/05/07/08/09 (hoặc +84).");
}

function kiemTraEmail() {
    var v = document.getElementById("txtEmail").value.trim();
    return baoLoi("txtEmail", "loiEmail",
        REGEX_EMAIL.test(v) ? "" : "Email không hợp lệ, ví dụ: ten@gmail.com");
}

function kiemTraDiaChi() {
    var v = document.getElementById("txtDiaChi").value.trim();
    return baoLoi("txtDiaChi", "loiDiaChi", v.length < 5 ? "Vui lòng nhập địa chỉ giao hàng." : "");
}

// Mở form thanh toán; nếu khách đã đăng nhập thì điền sẵn thông tin
function moThanhToan() {
    document.getElementById("miniCart").style.display = "none";
    document.getElementById("ketQuaThanhToan").textContent = "";
    var u = layNguoiDung();
    if (u && u.loai == "khach") {
        document.getElementById("txtHoTen").value = u.name;
        document.getElementById("txtDienThoai").value = u.phone;
        document.getElementById("txtEmail").value = u.email;
        document.getElementById("txtDiaChi").value = u.address;
    }
    document.getElementById("tongThanhToan").textContent = dinhDangTien(GioHang.tongTien());
    document.getElementById("hopThanhToan").style.display = "flex";
}

/**
 * đây là hàm thanh toán
 * hợp lệ thì tạo đơn hàng, lưu vào localStorage "donHang" rồi xóa giỏ
 */
function thanhToan() {
    var ketQua = document.getElementById("ketQuaThanhToan");
    var hopLe = kiemTraHoTen() & kiemTraDienThoai() & kiemTraEmail() & kiemTraDiaChi();
    if (!hopLe) {
        ketQua.className = "loi";
        ketQua.textContent = "Vui lòng sửa các ô báo lỗi.";
        return;
    }
    if (GioHang.items.length == 0) {
        ketQua.className = "loi";
        ketQua.textContent = "Giỏ hàng đang trống.";
        return;
    }

    var u = layNguoiDung();
    var donHang = {
        id: "OL" + Date.now(),
        date: new Date().toISOString().substring(0, 10),
        employeeId: "ONLINE",
        customerId: u && u.loai == "khach" ? u.id : "KHACHLE",
        customerName: document.getElementById("txtHoTen").value.trim(),
        phone: document.getElementById("txtDienThoai").value.trim(),
        email: document.getElementById("txtEmail").value.trim(),
        address: document.getElementById("txtDiaChi").value.trim(),
        items: GioHang.items,
        total: GioHang.tongTien()
    };
    // Gửi API thanh toán (giả lập): chờ phản hồi rồi mới lưu đơn
    ketQua.className = "dang-xu-ly";
    ketQua.textContent = "Đang gửi yêu cầu thanh toán...";
    guiApiThanhToan(donHang, function(phanHoi) {
        if (phanHoi.status != 200) {
            ketQua.className = "loi";
            ketQua.textContent = "Thanh toán thất bại: " + phanHoi.message;
            return;
        }
        var dsDon = JSON.parse(localStorage.getItem("donHang") || "[]");
        dsDon.push(donHang);
        localStorage.setItem("donHang", JSON.stringify(dsDon));

        GioHang.xoaHet();
        ketQua.className = "thanh-cong";
        ketQua.textContent = "Thanh toán thành công! Mã đơn: " + donHang.id + " - Tổng: " + dinhDangTien(donHang.total) +
                             " (mã giao dịch " + phanHoi.transactionId + ")";
    });
}

/**
 * đây là hàm gửi API thanh toán giả lập
 * không có server thật nên dùng setTimeout để giả độ trễ mạng, trả về phản hồi dạng JSON
 * @param {*} donHang - dữ liệu đơn gửi đi
 * @param {*} xuLy - hàm nhận phản hồi { status, message, transactionId }
 */
function guiApiThanhToan(donHang, xuLy) {
    var yeuCau = JSON.stringify(donHang);
    console.log("POST /api/thanh-toan", yeuCau);
    setTimeout(function() {
        var phanHoi = { status: 200, message: "OK", transactionId: "GD" + Date.now() };
        console.log("Phản hồi API:", JSON.stringify(phanHoi));
        xuLy(phanHoi);
    }, 800);
}
