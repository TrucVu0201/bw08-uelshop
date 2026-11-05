// Câu 8: trang quản lý bán hàng (chỉ nhân viên đã đăng nhập mới vào được)
var dsSP = [];
var tenNhanVien = {};
var tenKhachHang = {};
var tatCaDon = []; // giữ lại để lọc
var boLocPhu = null; // lọc thêm khi bấm vào biểu đồ: { kieu, giaTri, nhan }

// Gắn sự kiện bấm cho 1 phần tử của biểu đồ -> lọc bảng đơn hàng
function ganLoc(el, kieu, giaTri, nhan) {
    el.classList.add("bam-duoc");
    el.title = "Bấm để xem các đơn liên quan";
    el.onclick = function() {
        locTheo(kieu, giaTri, nhan);
    };
}

// Lọc bảng đơn theo phần tử vừa bấm rồi cuộn xuống bảng
function locTheo(kieu, giaTri, nhan) {
    boLocPhu = { kieu: kieu, giaTri: giaTri, nhan: nhan };
    locDonHang();
    document.getElementById("khuDonHang").scrollIntoView({ behavior: "smooth" });
}

function boLoc() {
    boLocPhu = null;
    locDonHang();
}

// Đơn có thỏa bộ lọc phụ không
function hopBoLocPhu(d) {
    if (!boLocPhu) return true;
    if (boLocPhu.kieu == "ngay") return d.date == boLocPhu.giaTri;
    if (boLocPhu.kieu == "nhanvien") return d.employee == boLocPhu.giaTri;
    for (var i = 0; i < d.items.length; i++) {
        if (boLocPhu.kieu == "sanpham" && d.items[i].id == boLocPhu.giaTri) return true;
        if (boLocPhu.kieu == "danhmuc" && timSP(d.items[i].id).category == boLocPhu.giaTri) return true;
    }
    return false;
}

// Chưa đăng nhập bằng tài khoản nhân viên thì chuyển về trang đăng nhập
function kiemTraQuyen(trangDangNhap) {
    var u = layNguoiDung();
    if (!u || u.loai != "nhanvien") {
        window.location.href = trangDangNhap;
    }
}

/**
 * đây là hàm load đơn hàng
 * đọc lần lượt products.xml, employees.json, customers.json rồi carts.xml
 * @param {*} thuMuc - thư mục dataset
 */
function loadDonHang(thuMuc) {
    docXML(thuMuc + "products.xml", function(xml) {
        dsSP = docSanPham(xml);
        docJSON(thuMuc + "employees.json", function(nv) {
            for (var i = 0; i < nv.length; i++) tenNhanVien[nv[i].id] = nv[i].name;
            docJSON(thuMuc + "customers.json", function(kh) {
                for (var j = 0; j < kh.length; j++) tenKhachHang[kh[j].id] = kh[j].name;
                docXML(thuMuc + "carts.xml", function(cartsXml) {
                    tatCaDon = docCarts(cartsXml).concat(docDonOnline());
                    // Đơn mới nhất lên đầu
                    tatCaDon.sort(function(a, b) {
                        return a.date < b.date ? 1 : -1;
                    });
                    thongKe(tatCaDon);
                    veDoanhThuTheoNgay(tatCaDon);
                    veDoanhThuTheoDanhMuc(tatCaDon);
                    veTopVaTonKho(tatCaDon);
                    veHieuSuatNhanVien(tatCaDon);
                    hienThiDonHang(tatCaDon);
                });
            });
        });
    });
}

function timSP(id) {
    for (var i = 0; i < dsSP.length; i++) {
        if (dsSP[i].id == id) return dsSP[i];
    }
    return { id: id, title: "SP " + id, image: "", category: "khác", tonKho: 0 };
}

// Ngày 2026-10-03 -> 03/10
function ngayNgan(d) {
    return d.substring(8, 10) + "/" + d.substring(5, 7);
}

// Chuyển carts.xml thành mảng đơn hàng
function docCarts(xml) {
    var ds = [];
    var carts = xml.getElementsByTagName("cart");
    for (var i = 0; i < carts.length; i++) {
        var c = carts[i];
        var items = [];
        var nodes = c.getElementsByTagName("item");
        var tong = 0;
        for (var j = 0; j < nodes.length; j++) {
            var it = {
                id: nodes[j].getAttribute("product_id"),
                mau: nodes[j].getAttribute("color"),
                size: nodes[j].getAttribute("size"),
                soLuong: parseInt(nodes[j].getAttribute("quantity")),
                gia: parseFloat(nodes[j].getAttribute("price"))
            };
            tong += it.soLuong * it.gia;
            items.push(it);
        }
        var khId = layText(c, "customer_id");
        var nvId = layText(c, "employee_id");
        ds.push({
            id: c.getAttribute("id"),
            date: layText(c, "date"),
            employee: tenNhanVien[nvId] || nvId,
            customer: tenKhachHang[khId] || khId,
            kenh: "cuahang",
            items: items,
            total: tong
        });
    }
    return ds;
}

// Đơn đặt online ở Câu 7 (lưu trong localStorage)
function docDonOnline() {
    var dsOnline = JSON.parse(localStorage.getItem("donHang") || "[]");
    var ds = [];
    for (var i = 0; i < dsOnline.length; i++) {
        var d = dsOnline[i];
        ds.push({
            id: d.id, date: d.date, employee: "-", customer: d.customerName,
            phone: d.phone, address: d.address,
            kenh: "online", items: d.items, total: d.total
        });
    }
    return ds;
}

function demSoSP(don) {
    var n = 0;
    for (var i = 0; i < don.items.length; i++) n += don.items[i].soLuong;
    return n;
}

/**
 * đây là hàm thống kê 4 chỉ số chính
 */
function thongKe(dsDon) {
    var doanhThu = 0, soSP = 0, soOnline = 0;
    var maSP = {};
    for (var i = 0; i < dsDon.length; i++) {
        doanhThu += dsDon[i].total;
        if (dsDon[i].kenh == "online") soOnline++;
        soSP += demSoSP(dsDon[i]);
        for (var j = 0; j < dsDon[i].items.length; j++) maSP[dsDon[i].items[j].id] = true;
    }
    document.getElementById("tkDoanhThu").textContent = dinhDangTien(doanhThu);
    document.getElementById("tkDoanhThuPhu").textContent = "Từ " + dsDon.length + " đơn";
    document.getElementById("tkSoDon").textContent = dsDon.length;
    document.getElementById("tkSoDonPhu").textContent = (dsDon.length - soOnline) + " tại cửa hàng · " + soOnline + " online";
    document.getElementById("tkTrungBinh").textContent = dinhDangTien(dsDon.length ? doanhThu / dsDon.length : 0);
    document.getElementById("tkSoSP").textContent = soSP;
    document.getElementById("tkSoSPPhu").textContent = Object.keys(maSP).length + " mã sản phẩm khác nhau";
}

// Biểu đồ cột dọc: doanh thu theo ngày (vẽ bằng div + CSS)
function veDoanhThuTheoNgay(dsDon) {
    var theoNgay = {};
    for (var i = 0; i < dsDon.length; i++) {
        theoNgay[dsDon[i].date] = (theoNgay[dsDon[i].date] || 0) + dsDon[i].total;
    }
    var ngays = Object.keys(theoNgay).sort();
    var max = 0;
    for (var j = 0; j < ngays.length; j++) max = Math.max(max, theoNgay[ngays[j]]);

    var khung = document.getElementById("bieuDoNgay");
    khung.innerHTML = "";
    for (var k = 0; k < ngays.length; k++) {
        var cot = document.createElement("div");
        cot.className = "cot";
        var giaTri = document.createElement("span");
        giaTri.className = "gia-tri";
        giaTri.textContent = "$" + Math.round(theoNgay[ngays[k]]);
        var thanh = document.createElement("div");
        thanh.className = "thanh";
        thanh.style.height = (theoNgay[ngays[k]] / max * 100) + "%";
        var nhan = document.createElement("span");
        nhan.className = "nhan-ngay";
        nhan.textContent = ngayNgan(ngays[k]);
        cot.appendChild(giaTri);
        cot.appendChild(thanh);
        cot.appendChild(nhan);
        ganLoc(cot, "ngay", ngays[k], "Ngày " + ngayNgan(ngays[k]));
        khung.appendChild(cot);
    }
}

// Vẽ 1 dòng thanh ngang: nhãn - thanh - giá trị
function taoThanhNgang(nhan, phanTram, giaTri) {
    var dong = document.createElement("div");
    dong.className = "dong-ngang";
    dong.innerHTML = '<span class="ten"></span><div class="nen"><div class="thanh"></div></div><b></b>';
    dong.querySelector(".ten").textContent = nhan;
    dong.querySelector(".thanh").style.width = phanTram + "%";
    dong.querySelector("b").textContent = giaTri;
    return dong;
}

// Biểu đồ thanh ngang: doanh thu theo danh mục
function veDoanhThuTheoDanhMuc(dsDon) {
    var theoDM = {};
    var tong = 0;
    for (var i = 0; i < dsDon.length; i++) {
        for (var j = 0; j < dsDon[i].items.length; j++) {
            var it = dsDon[i].items[j];
            var dm = timSP(it.id).category;
            theoDM[dm] = (theoDM[dm] || 0) + it.soLuong * it.gia;
            tong += it.soLuong * it.gia;
        }
    }
    var mang = Object.keys(theoDM).sort(function(a, b) {
        return theoDM[b] - theoDM[a];
    });
    var khung = document.getElementById("bieuDoDanhMuc");
    khung.innerHTML = "";
    for (var k = 0; k < mang.length; k++) {
        var pt = theoDM[mang[k]] / tong * 100;
        var dongDM = taoThanhNgang(mang[k], pt, dinhDangTien(theoDM[mang[k]]) + " · " + pt.toFixed(0) + "%");
        ganLoc(dongDM, "danhmuc", mang[k], "Danh mục " + mang[k]);
        khung.appendChild(dongDM);
    }
}

/**
 * đây là hàm vẽ top bán chạy và cảnh báo tồn kho
 * gom số lượng bán theo từng sản phẩm
 */
function veTopVaTonKho(dsDon) {
    var daBan = {};
    for (var i = 0; i < dsDon.length; i++) {
        for (var j = 0; j < dsDon[i].items.length; j++) {
            var it = dsDon[i].items[j];
            if (!daBan[it.id]) daBan[it.id] = { soLuong: 0, tien: 0 };
            daBan[it.id].soLuong += it.soLuong;
            daBan[it.id].tien += it.soLuong * it.gia;
        }
    }

    // Tất cả sản phẩm được bán, xếp theo số lượng bán giảm dần
    var top = Object.keys(daBan).sort(function(a, b) {
        return daBan[b].soLuong - daBan[a].soLuong;
    });
    document.getElementById("soSPBan").textContent = top.length + " sản phẩm";
    var khungTop = document.getElementById("topSanPham");
    khungTop.innerHTML = "";
    for (var k = 0; k < top.length; k++) {
        var sp = timSP(top[k]);
        var dong = document.createElement("div");
        dong.className = "dong-sp";
        dong.innerHTML = '<span class="hang"></span><img alt=""><div class="thong-tin"><p class="ten"></p><p class="phu"></p></div><b></b>';
        dong.querySelector(".hang").textContent = "#" + (k + 1);
        dong.querySelector("img").src = sp.image;
        dong.querySelector(".ten").textContent = sp.title;
        dong.querySelector(".phu").textContent = sp.category + " · đã bán " + daBan[top[k]].soLuong;
        dong.querySelector("b").textContent = dinhDangTien(daBan[top[k]].tien);
        ganLoc(dong, "sanpham", sp.id, sp.title);
        khungTop.appendChild(dong);
    }

    // Sản phẩm sắp hết hàng
    var canNhap = [];
    for (var m = 0; m < dsSP.length; m++) {
        var ban = daBan[dsSP[m].id] ? daBan[dsSP[m].id].soLuong : 0;
        var con = dsSP[m].tonKho - ban;
        if (con < 15) canNhap.push({ sp: dsSP[m], con: con });
    }
    canNhap.sort(function(a, b) {
        return a.con - b.con;
    });
    document.getElementById("soCanNhap").textContent = canNhap.length;
    var khungNhap = document.getElementById("canNhapHang");
    khungNhap.innerHTML = "";
    for (var n = 0; n < canNhap.length; n++) {
        var d = document.createElement("div");
        d.className = "dong-canh-bao";
        d.innerHTML = '<span class="ten"></span><span class="nhan"></span>';
        d.querySelector(".ten").textContent = canNhap[n].sp.title;
        var nhan = d.querySelector(".nhan");
        nhan.textContent = "Còn " + canNhap[n].con;
        nhan.className = canNhap[n].con < 10 ? "nhan nhan-do" : "nhan nhan-vang";
        ganLoc(d, "sanpham", canNhap[n].sp.id, canNhap[n].sp.title);
        khungNhap.appendChild(d);
    }
}

// Hiệu suất nhân viên: số đơn và doanh thu tại cửa hàng
function veHieuSuatNhanVien(dsDon) {
    var theoNV = {};
    var max = 0;
    for (var i = 0; i < dsDon.length; i++) {
        if (dsDon[i].kenh != "cuahang") continue;
        var nv = dsDon[i].employee;
        if (!theoNV[nv]) theoNV[nv] = { soDon: 0, tien: 0 };
        theoNV[nv].soDon++;
        theoNV[nv].tien += dsDon[i].total;
        max = Math.max(max, theoNV[nv].tien);
    }
    var khung = document.getElementById("hieuSuatNV");
    khung.innerHTML = "";
    var ten = Object.keys(theoNV).sort(function(a, b) {
        return theoNV[b].tien - theoNV[a].tien;
    });
    for (var k = 0; k < ten.length; k++) {
        var dongNV = taoThanhNgang(ten[k] + " (" + theoNV[ten[k]].soDon + " đơn)",
            theoNV[ten[k]].tien / max * 100, dinhDangTien(theoNV[ten[k]].tien));
        ganLoc(dongNV, "nhanvien", ten[k], "Nhân viên " + ten[k]);
        khung.appendChild(dongNV);
    }
}

// Hiển thị bảng đơn hàng
function hienThiDonHang(dsDon) {
    var tbody = document.getElementById("donBody");
    tbody.innerHTML = "";
    if (dsDon.length == 0) {
        tbody.innerHTML = '<tr><td colspan="8">Không có đơn phù hợp.</td></tr>';
        return;
    }
    for (var i = 0; i < dsDon.length; i++) {
        var d = dsDon[i];
        var row = document.createElement("tr");
        row.innerHTML = '<td class="ma"></td><td></td><td></td><td></td><td><span class="nhan"></span></td>' +
                        '<td></td><td class="so"></td><td><button class="lien-ket">Xem</button></td>';
        var td = row.children;
        td[0].textContent = d.id;
        td[1].textContent = ngayNgan(d.date);
        td[2].textContent = d.customer;
        td[3].textContent = d.employee;
        var nhan = td[4].firstChild;
        nhan.textContent = d.kenh == "online" ? "Online" : "Cửa hàng";
        nhan.className = d.kenh == "online" ? "nhan nhan-cam" : "nhan nhan-xam";
        td[5].textContent = demSoSP(d);
        td[6].textContent = dinhDangTien(d.total);
        // Bấm vào bất kỳ chỗ nào trên dòng cũng mở chi tiết đơn
        row.className = "dong-bam";
        row.setAttribute("onclick", "xemChiTietDon('" + d.id + "')");
        tbody.appendChild(row);
    }
}

// Lọc đơn theo ô tìm kiếm và kênh bán
function locDonHang() {
    var tuKhoa = document.getElementById("txtTimDon").value.trim().toLowerCase();
    var kenh = document.getElementById("selKenh").value;
    var kq = [];
    for (var i = 0; i < tatCaDon.length; i++) {
        var d = tatCaDon[i];
        if (kenh && d.kenh != kenh) continue;
        if (tuKhoa && (d.id + " " + d.customer).toLowerCase().indexOf(tuKhoa) === -1) continue;
        if (!hopBoLocPhu(d)) continue;
        kq.push(d);
    }
    // Hiện chip "Đang lọc: ..." có nút bỏ lọc
    var chip = document.getElementById("chipLoc");
    chip.innerHTML = "";
    if (boLocPhu) {
        chip.innerHTML = '<span class="chip">Đang lọc: <b></b> · ' + kq.length + ' đơn <button onclick="boLoc()">✕</button></span>';
        chip.querySelector("b").textContent = boLocPhu.nhan;
    }
    hienThiDonHang(kq);
}

// Hộp chi tiết 1 đơn hàng
function xemChiTietDon(maDon) {
    var d = null;
    for (var i = 0; i < tatCaDon.length; i++) {
        if (tatCaDon[i].id == maDon) d = tatCaDon[i];
    }
    var body = document.getElementById("chiTietDonBody");
    var html = "<h3>Đơn " + d.id + "</h3>" +
        '<p class="phu">Ngày ' + d.date + " · Khách: " + d.customer +
        (d.kenh == "online" ? " · Online · SĐT " + d.phone + " · " + d.address : " · Nhân viên: " + d.employee) + "</p>" +
        "<table><thead><tr><th>Sản phẩm</th><th>Biến thể</th><th>SL</th><th class=\"so\">Đơn giá</th><th class=\"so\">Thành tiền</th></tr></thead><tbody>";
    for (var j = 0; j < d.items.length; j++) {
        var it = d.items[j];
        var sp = timSP(it.id);
        html += '<tr><td><img class="anh-nho" src="' + sp.image + '"> ' + sp.title.substring(0, 40) + "</td><td>" +
                it.mau + (it.size ? " / " + it.size : "") + "</td><td>" + it.soLuong + '</td><td class="so">' +
                dinhDangTien(it.gia) + '</td><td class="so">' + dinhDangTien(it.gia * it.soLuong) + "</td></tr>";
    }
    html += '</tbody></table><p class="tong">Tổng cộng: <b>' + dinhDangTien(d.total) + "</b></p>";
    body.innerHTML = html;
    document.getElementById("hopChiTietDon").style.display = "flex";
}
