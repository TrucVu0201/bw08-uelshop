// Câu 6: đối tượng GioHang giữ trạng thái giỏ hàng (lưu tạm trong localStorage)
var GioHang = {
    items: JSON.parse(localStorage.getItem("gioHang") || "[]"),

    // Thêm mới nếu chưa có, cùng sản phẩm + màu + size thì tăng số lượng
    them: function(sp, mau, size) {
        var daCo = null;
        for (var i = 0; i < this.items.length; i++) {
            var it = this.items[i];
            if (it.id == sp.id && it.mau == mau && it.size == size) {
                daCo = it;
                break;
            }
        }
        if (daCo) {
            if (daCo.soLuong >= sp.tonKho) {
                alert("Vượt quá tồn kho (" + sp.tonKho + ")");
                return;
            }
            daCo.soLuong++;
        } else {
            this.items.push({
                id: sp.id, title: sp.title, gia: sp.price,
                mau: mau, size: size, soLuong: 1
            });
        }
        this.luu();
        hienThiGioHang();
        document.getElementById("miniCart").style.display = "block";
    },

    // Tăng/giảm số lượng 1 dòng; về 0 thì xóa, không vượt tồn kho
    doiSoLuong: function(viTri, buoc) {
        var it = this.items[viTri];
        var sp = timSanPham(it.id);
        if (buoc > 0 && sp && it.soLuong >= sp.tonKho) return;
        it.soLuong += buoc;
        if (it.soLuong <= 0) {
            this.items.splice(viTri, 1);
        }
        this.luu();
        hienThiGioHang();
    },

    // Xóa 1 dòng trong giỏ
    xoa: function(viTri) {
        this.items.splice(viTri, 1);
        this.luu();
        hienThiGioHang();
    },

    // Tự động tính lại tổng tiền
    tongTien: function() {
        var tong = 0;
        for (var i = 0; i < this.items.length; i++) {
            tong += this.items[i].gia * this.items[i].soLuong;
        }
        return tong;
    },

    tongSoLuong: function() {
        var tong = 0;
        for (var i = 0; i < this.items.length; i++) {
            tong += this.items[i].soLuong;
        }
        return tong;
    },

    luu: function() {
        localStorage.setItem("gioHang", JSON.stringify(this.items));
    },

    xoaHet: function() {
        this.items = [];
        this.luu();
        hienThiGioHang();
    }
};

// Render bảng mini-cart
function hienThiGioHang() {
    var tbody = document.getElementById("gioBody");
    tbody.innerHTML = "";
    if (GioHang.items.length == 0) {
        tbody.innerHTML = '<tr><td colspan="5">Giỏ hàng trống.</td></tr>';
    }
    for (var i = 0; i < GioHang.items.length; i++) {
        var it = GioHang.items[i];
        var row = document.createElement("tr");

        var tdTen = document.createElement("td");
        tdTen.textContent = it.title.substring(0, 25);
        var tdBienThe = document.createElement("td");
        tdBienThe.textContent = it.size ? it.mau + " / " + it.size : it.mau;
        var tdSL = document.createElement("td");
        tdSL.className = "o-so-luong";
        tdSL.innerHTML = '<button onclick="GioHang.doiSoLuong(' + i + ', -1)">−</button><b>' + it.soLuong +
                         '</b><button onclick="GioHang.doiSoLuong(' + i + ', 1)">+</button>';
        var tdTien = document.createElement("td");
        tdTien.textContent = dinhDangTien(it.gia * it.soLuong);
        var tdXoa = document.createElement("td");
        var nutXoa = document.createElement("button");
        nutXoa.textContent = "Xóa";
        nutXoa.className = "lien-ket";
        nutXoa.setAttribute("onclick", "GioHang.xoa(" + i + ")");
        tdXoa.appendChild(nutXoa);

        row.appendChild(tdTen);
        row.appendChild(tdBienThe);
        row.appendChild(tdSL);
        row.appendChild(tdTien);
        row.appendChild(tdXoa);
        tbody.appendChild(row);
    }
    document.getElementById("tongTien").textContent = dinhDangTien(GioHang.tongTien());
    document.getElementById("soLuongGio").textContent = GioHang.tongSoLuong();
}

function batTatMiniCart() {
    var mini = document.getElementById("miniCart");
    mini.style.display = mini.style.display == "block" ? "none" : "block";
}
