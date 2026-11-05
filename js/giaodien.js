// Header dùng chung cho mọi trang: menu theo vai trò, tài khoản, tùy chọn, ngôn ngữ VI/EN

// ===== Từ điển 2 ngôn ngữ =====
var TU_DIEN = {
    vi: {
        "menu.cuahang": "Cửa hàng", "menu.giohang": "Giỏ hàng", "menu.thanhtoan": "Thanh toán",
        "menu.donCuaToi": "Đơn của tôi", "menu.tongquan": "Tổng quan", "menu.donhang": "Đơn hàng",
        "menu.tonkho": "Tồn kho", "menu.dulieu": "Dữ liệu (Câu 1)", "menu.dangnhap": "Đăng nhập",
        "tk.hoso": "Hồ sơ", "tk.tuychon": "Tùy chọn", "tk.ngonngu": "Ngôn ngữ", "tk.dangxuat": "Đăng xuất",
        "tk.xemcuahang": "Xem cửa hàng", "vt.khach": "Khách hàng", "vt.admin": "Quản lý",
        "vt.staff": "Nhân viên", "vt.vanglai": "Khách", "vt.cheDoNV": "Bạn đang xem cửa hàng với vai trò nhân viên.",
        "vt.veQuanLy": "Về trang quản lý →",
        "tc.tieude": "Tùy chọn", "tc.giamHieuUng": "Giảm hiệu ứng chuyển động", "tc.ticker": "Hiện dải chữ chạy",
        "tc.soCot": "Số cột sản phẩm (máy tính)", "tc.luu": "Lưu tùy chọn", "tc.daLuu": "Đã lưu!",
        "hs.tieude": "Hồ sơ", "hs.ten": "Họ tên", "hs.vaitro": "Vai trò", "hs.user": "Tên đăng nhập",
        "hs.email": "Email", "hs.sdt": "Điện thoại", "hs.diachi": "Địa chỉ",
        "dc.tieude": "Đơn của tôi", "dc.trong": "Bạn chưa có đơn nào.", "dc.ma": "Mã đơn", "dc.ngay": "Ngày",
        "dc.sosp": "Số SP", "dc.tong": "Tổng tiền",
        "hero.tag": "Săn deal tháng 11", "hero.h1a": "Cần gì", "hero.h1b": "có nấy",
        "hero.p": "Quần áo, trang sức, ổ cứng, màn hình — đủ cả. Chọn màu, chọn size ngay trên thẻ, bấm là vào giỏ.",
        "hero.btn": "Xem hết 20 món", "luoi.tieude": "Đang bán",
        "tim.tieude": "Tìm kiếm nâng cao", "tim.ten": "Tên sản phẩm", "tim.danhmuc": "Danh mục",
        "tim.gia": "Khoảng giá ($)", "tim.mau": "Màu sắc", "tim.rating": "Rating tối thiểu",
        "tim.nut": "Tìm kiếm", "tim.xoa": "Xóa lọc", "tim.tatCaDM": "Tất cả danh mục", "tim.tatCaMau": "Tất cả màu",
        "sp.them": "Thêm vào giỏ hàng", "sp.xem": "Xem nhanh", "sp.rating": "Rating Detail", "sp.tonkho": "Tồn kho",
        "gio.tieude": "Giỏ hàng", "gio.tong": "Tổng tiền:", "gio.dong": "Đóng",
        "tt.tieude": "Thông tin giao hàng", "tt.hoten": "Họ tên", "tt.sdt": "Số điện thoại", "tt.email": "Email",
        "tt.diachi": "Địa chỉ giao hàng", "tt.tong": "Tổng thanh toán:", "tt.nut": "Xác nhận thanh toán",
        "dn.tieude": "Đăng nhập", "dn.user": "Tên đăng nhập", "dn.pass": "Mật khẩu",
        "ad.tieude": "Tổng quan bán hàng", "ad.doanhthu": "Doanh thu", "ad.sodon": "Số đơn hàng",
        "ad.tb": "Giá trị TB / đơn", "ad.dabán": "Sản phẩm đã bán", "ad.theongay": "Doanh thu theo ngày",
        "ad.theodm": "Doanh thu theo danh mục", "ad.top": "Sản phẩm được bán", "ad.cannhap": "Cần nhập hàng",
        "ad.nhanvien": "Hiệu suất nhân viên", "ad.donhang": "Đơn hàng",
        "ticker": "FREESHIP ĐƠN TỪ $50 ✦ ĐỔI TRẢ 7 NGÀY ✦ CHỌN MÀU CHỌN SIZE TRÊN THẺ ✦ THANH TOÁN KHI NHẬN HÀNG ✦",
        "tim.tu": "Từ", "tim.den": "Đến", "tim.vidu": "Ví dụ: shirt",
        "dm.thoitrang": "Thời trang", "dm.trangsuc": "Trang sức", "dm.congnghe": "Công nghệ",
        "sp.mau": "Màu", "sp.chiCon": "Chỉ còn"
    },
    en: {
        "menu.cuahang": "Shop", "menu.giohang": "Cart", "menu.thanhtoan": "Checkout",
        "menu.donCuaToi": "My orders", "menu.tongquan": "Dashboard", "menu.donhang": "Orders",
        "menu.tonkho": "Inventory", "menu.dulieu": "Data (Q1)", "menu.dangnhap": "Sign in",
        "tk.hoso": "Profile", "tk.tuychon": "Preferences", "tk.ngonngu": "Language", "tk.dangxuat": "Sign out",
        "tk.xemcuahang": "View shop", "vt.khach": "Customer", "vt.admin": "Manager",
        "vt.staff": "Staff", "vt.vanglai": "Guest", "vt.cheDoNV": "You are viewing the shop as staff.",
        "vt.veQuanLy": "Back to dashboard →",
        "tc.tieude": "Preferences", "tc.giamHieuUng": "Reduce motion", "tc.ticker": "Show scrolling ticker",
        "tc.soCot": "Product columns (desktop)", "tc.luu": "Save preferences", "tc.daLuu": "Saved!",
        "hs.tieude": "Profile", "hs.ten": "Full name", "hs.vaitro": "Role", "hs.user": "Username",
        "hs.email": "Email", "hs.sdt": "Phone", "hs.diachi": "Address",
        "dc.tieude": "My orders", "dc.trong": "You have no orders yet.", "dc.ma": "Order ID", "dc.ngay": "Date",
        "dc.sosp": "Items", "dc.tong": "Total",
        "hero.tag": "November deals", "hero.h1a": "Need it?", "hero.h1b": "Got it",
        "hero.p": "Clothing, jewelry, drives, monitors — all in one place. Pick colour and size right on the card, one tap to cart.",
        "hero.btn": "See all 20 items", "luoi.tieude": "On sale",
        "tim.tieude": "Advanced search", "tim.ten": "Product name", "tim.danhmuc": "Category",
        "tim.gia": "Price range ($)", "tim.mau": "Colour", "tim.rating": "Minimum rating",
        "tim.nut": "Search", "tim.xoa": "Clear", "tim.tatCaDM": "All categories", "tim.tatCaMau": "All colours",
        "sp.them": "Add to cart", "sp.xem": "Quick view", "sp.rating": "Rating Detail", "sp.tonkho": "In stock",
        "gio.tieude": "Cart", "gio.tong": "Total:", "gio.dong": "Close",
        "tt.tieude": "Shipping details", "tt.hoten": "Full name", "tt.sdt": "Phone number", "tt.email": "Email",
        "tt.diachi": "Shipping address", "tt.tong": "Amount due:", "tt.nut": "Confirm payment",
        "dn.tieude": "Sign in", "dn.user": "Username", "dn.pass": "Password",
        "ad.tieude": "Sales overview", "ad.doanhthu": "Revenue", "ad.sodon": "Orders",
        "ad.tb": "Avg. order value", "ad.dabán": "Items sold", "ad.theongay": "Revenue by day",
        "ad.theodm": "Revenue by category", "ad.top": "Products sold", "ad.cannhap": "Restock needed",
        "ad.nhanvien": "Staff performance", "ad.donhang": "Orders",
        "ticker": "FREE SHIPPING OVER $50 ✦ 7-DAY RETURNS ✦ PICK COLOUR & SIZE ON THE CARD ✦ CASH ON DELIVERY ✦",
        "tim.tu": "From", "tim.den": "To", "tim.vidu": "e.g. shirt",
        "dm.thoitrang": "Fashion", "dm.trangsuc": "Jewelry", "dm.congnghe": "Tech",
        "sp.mau": "Colour", "sp.chiCon": "Only left:"
    }
};

// ===== Tùy chọn người dùng (lưu localStorage) =====
function layCaiDat() {
    var macDinh = { lang: "vi", giamHieuUng: false, ticker: true, soCot: 4 };
    var c = JSON.parse(localStorage.getItem("caiDat") || "{}");
    for (var k in macDinh) {
        if (c[k] === undefined) c[k] = macDinh[k];
    }
    return c;
}

function luuCaiDat(c) {
    localStorage.setItem("caiDat", JSON.stringify(c));
}

// Lấy chữ theo ngôn ngữ đang chọn
function t(khoa) {
    var lang = layCaiDat().lang;
    return TU_DIEN[lang][khoa] || TU_DIEN.vi[khoa] || khoa;
}

// Dịch mọi phần tử có data-i18n / data-i18n-ph
function apDungNgonNgu() {
    var cacThe = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < cacThe.length; i++) {
        cacThe[i].textContent = t(cacThe[i].getAttribute("data-i18n"));
    }
    var cacO = document.querySelectorAll("[data-i18n-ph]");
    for (var j = 0; j < cacO.length; j++) {
        cacO[j].placeholder = t(cacO[j].getAttribute("data-i18n-ph"));
    }
    document.documentElement.lang = layCaiDat().lang;
}

// Áp dụng tùy chọn hiển thị
function apDungCaiDat() {
    var c = layCaiDat();
    document.body.classList.toggle("giam-hieu-ung", c.giamHieuUng);
    document.body.classList.toggle("an-ticker", !c.ticker);
    document.body.classList.toggle("luoi-3-cot", c.soCot == 3);
}

// Đổi ngôn ngữ rồi tải lại trang để mọi chữ (kể cả chữ do JS tạo) đổi theo
function doiNgonNgu(lang) {
    var c = layCaiDat();
    c.lang = lang;
    luuCaiDat(c);
    window.location.reload();
}

// Vai trò hiện tại: vanglai / khach / nhanvien
function layVaiTro() {
    var u = layNguoiDung();
    if (!u) return "vanglai";
    return u.loai;
}

// Chữ cái đầu để làm avatar, ví dụ "Nguyễn Văn An" -> "NA"
function chuCaiDau(ten) {
    var tu = ten.trim().split(" ");
    var kq = tu[0].charAt(0);
    if (tu.length > 1) kq += tu[tu.length - 1].charAt(0);
    return kq.toUpperCase();
}

function tenVaiTro(u) {
    if (!u) return t("vt.vanglai");
    if (u.loai == "khach") return t("vt.khach");
    return u.role == "admin" ? t("vt.admin") : t("vt.staff");
}

/**
 * đây là hàm vẽ header dùng chung
 * mỗi vai trò có menu riêng; trang nào cũng gọi hàm này nên menu luôn thống nhất
 * @param {*} trangHienTai - cuahang / admin / dangnhap / dulieu
 * @param {*} goc - "" nếu trang ở thư mục gốc, "../" nếu trang trong thư mục html
 */
function veHeader(trangHienTai, goc) {
    var u = layNguoiDung();
    var vaiTro = layVaiTro();
    var laTrangCuaHang = trangHienTai == "cuahang";

    // Logo + nhãn khu vực
    var logo = document.querySelector("header .logo");
    var laKhuQuanLy = vaiTro == "nhanvien" && !laTrangCuaHang;
    logo.innerHTML = '<a href="' + goc + (laKhuQuanLy ? "html/admin.html" : "index.html") + '">UEL<span>Shop</span></a>' +
                     (laKhuQuanLy ? ' <small>' + t("vt.admin") + '</small>' : "");
    document.querySelector("header").classList.toggle("header-quan-ly", laKhuQuanLy);

    // Menu chính theo vai trò
    var ds = [];
    if (laKhuQuanLy) {
        ds.push({ ten: t("menu.tongquan"), link: goc + "html/admin.html", trang: "admin" });
        ds.push({ ten: t("menu.donhang"), link: goc + "html/admin.html#khuDonHang" });
        ds.push({ ten: t("menu.tonkho"), link: goc + "html/admin.html#khuTonKho" });
        if (u.role == "admin") ds.push({ ten: t("menu.dulieu"), link: goc + "html/taoproducts.html", trang: "dulieu" });
    } else {
        ds.push({ ten: t("menu.cuahang"), link: goc + "index.html", trang: "cuahang" });
        if (laTrangCuaHang) {
            ds.push({ ten: t("menu.giohang") + " (", js: "batTatMiniCart()", dem: true });
            ds.push({ ten: t("menu.thanhtoan"), js: "moThanhToan()" });
        }
        if (vaiTro == "khach") ds.push({ ten: t("menu.donCuaToi"), js: "moDonCuaToi()" });
    }

    var nav = document.getElementById("menuChinh");
    nav.innerHTML = "";
    for (var i = 0; i < ds.length; i++) {
        var a = document.createElement("a");
        a.href = ds[i].link || "#";
        a.textContent = ds[i].ten;
        if (ds[i].dem) {
            var dem = document.createElement("span");
            dem.id = "soLuongGio";
            dem.textContent = "0";
            a.appendChild(dem);
            a.appendChild(document.createTextNode(")"));
        }
        if (ds[i].js) a.setAttribute("onclick", ds[i].js + "; return false;");
        if (ds[i].trang == trangHienTai) a.className = "dang-o";
        nav.appendChild(a);
    }

    veTaiKhoan(u, goc);
    taoHopChung(u);

    // Nhân viên xem cửa hàng: hiện thanh báo chế độ
    if (vaiTro == "nhanvien" && laTrangCuaHang) {
        var thanh = document.createElement("div");
        thanh.className = "thanh-che-do";
        thanh.innerHTML = '<span></span> <a href="html/admin.html"></a>';
        thanh.querySelector("span").textContent = t("vt.cheDoNV");
        thanh.querySelector("a").textContent = t("vt.veQuanLy");
        document.querySelector("header").appendChild(thanh);
    }

    apDungCaiDat();
    apDungNgonNgu();
}

// Nút VI | EN
function taoChonNgonNgu() {
    var lang = layCaiDat().lang;
    return '<span class="chon-lang">' +
        '<button class="' + (lang == "vi" ? "dang-chon-lang" : "") + '" onclick="doiNgonNgu(\'vi\')">VI</button>' +
        '<button class="' + (lang == "en" ? "dang-chon-lang" : "") + '" onclick="doiNgonNgu(\'en\')">EN</button></span>';
}

// Khu tài khoản bên phải header
function veTaiKhoan(u, goc) {
    var box = document.getElementById("userBox");
    if (!u) {
        box.innerHTML = taoChonNgonNgu() + '<a class="nut-dang-nhap" href="' + goc + 'html/dangnhap.html">' + t("menu.dangnhap") + "</a>";
        return;
    }
    var html = '<button class="nut-tai-khoan" onclick="batTatMenuTaiKhoan(event)">' +
        '<span class="avatar">' + chuCaiDau(u.name) + '</span>' +
        '<span class="ten-tk"><b></b><small>' + tenVaiTro(u) + '</small></span><span class="mui-ten">▾</span></button>' +
        '<div id="menuTaiKhoan" class="menu-tai-khoan">' +
        '<div class="dau-menu"><span class="avatar lon">' + chuCaiDau(u.name) + '</span><div><b></b><small>' +
        tenVaiTro(u) + " · " + (u.username || "") + '</small></div></div>' +
        '<a href="#" onclick="moHoSo(); return false;">👤 ' + t("tk.hoso") + "</a>";
    if (u.loai == "khach") {
        html += '<a href="#" onclick="moDonCuaToi(); return false;">🧾 ' + t("menu.donCuaToi") + "</a>";
    } else {
        html += '<a href="' + goc + 'index.html">🏪 ' + t("tk.xemcuahang") + "</a>";
    }
    html += '<a href="#" onclick="moTuyChon(); return false;">⚙ ' + t("tk.tuychon") + "</a>" +
        '<div class="dong-lang"><span>🌐 ' + t("tk.ngonngu") + "</span>" + taoChonNgonNgu() + "</div>" +
        '<a href="#" class="dang-xuat" onclick="dangXuat(\'' + goc + 'html/dangnhap.html\'); return false;">⏻ ' + t("tk.dangxuat") + "</a></div>";
    box.innerHTML = html;
    var cacTen = box.querySelectorAll("b");
    for (var i = 0; i < cacTen.length; i++) cacTen[i].textContent = u.name;
}

function batTatMenuTaiKhoan(e) {
    e.stopPropagation();
    document.getElementById("menuTaiKhoan").classList.toggle("mo");
}

// Bấm ra ngoài thì đóng menu tài khoản
document.addEventListener("click", function(e) {
    var menu = document.getElementById("menuTaiKhoan");
    if (menu && !menu.contains(e.target)) menu.classList.remove("mo");
});

// Tạo sẵn 3 hộp thoại dùng chung: Hồ sơ, Tùy chọn, Đơn của tôi
function taoHopChung(u) {
    var khung = document.createElement("div");
    khung.innerHTML =
        '<div id="hopHoSo" class="hop-thoai"><article class="noi-dung nho"><button class="dong" onclick="dongHopChung(\'hopHoSo\')">×</button>' +
        '<h3>' + t("hs.tieude") + '</h3><div id="hoSoBody"></div></article></div>' +
        '<div id="hopTuyChon" class="hop-thoai"><article class="noi-dung nho"><button class="dong" onclick="dongHopChung(\'hopTuyChon\')">×</button>' +
        '<h3>' + t("tc.tieude") + '</h3>' +
        '<label class="dong-tc"><span>' + t("tk.ngonngu") + "</span>" + taoChonNgonNgu() + "</label>" +
        '<label class="dong-tc"><span>' + t("tc.giamHieuUng") + '</span><input type="checkbox" id="chkGiamHieuUng"></label>' +
        '<label class="dong-tc"><span>' + t("tc.ticker") + '</span><input type="checkbox" id="chkTicker"></label>' +
        '<label class="dong-tc"><span>' + t("tc.soCot") + '</span><select id="selSoCot"><option value="4">4</option><option value="3">3</option></select></label>' +
        '<button class="btn" onclick="luuTuyChon()">' + t("tc.luu") + '</button> <span id="tcDaLuu" class="thanh-cong-nho"></span>' +
        '</article></div>' +
        '<div id="hopDonCuaToi" class="hop-thoai"><article class="noi-dung"><button class="dong" onclick="dongHopChung(\'hopDonCuaToi\')">×</button>' +
        '<h3>' + t("dc.tieude") + '</h3><div id="donCuaToiBody"></div></article></div>';
    while (khung.firstChild) document.body.appendChild(khung.firstChild);
}

function dongHopChung(id) {
    document.getElementById(id).style.display = "none";
}

function moHoSo() {
    var u = layNguoiDung();
    var dong = [[t("hs.ten"), u.name], [t("hs.vaitro"), tenVaiTro(u)], [t("hs.user"), u.username],
                [t("hs.email"), u.email], [t("hs.sdt"), u.phone]];
    if (u.address) dong.push([t("hs.diachi"), u.address]);
    var html = '<div class="the-ho-so"><span class="avatar rat-lon">' + chuCaiDau(u.name) + "</span><table>";
    for (var i = 0; i < dong.length; i++) {
        html += "<tr><th>" + dong[i][0] + "</th><td>" + (dong[i][1] || "-") + "</td></tr>";
    }
    document.getElementById("hoSoBody").innerHTML = html + "</table></div>";
    document.getElementById("hopHoSo").style.display = "flex";
}

function moTuyChon() {
    var c = layCaiDat();
    document.getElementById("chkGiamHieuUng").checked = c.giamHieuUng;
    document.getElementById("chkTicker").checked = c.ticker;
    document.getElementById("selSoCot").value = c.soCot;
    document.getElementById("tcDaLuu").textContent = "";
    document.getElementById("hopTuyChon").style.display = "flex";
}

function luuTuyChon() {
    var c = layCaiDat();
    c.giamHieuUng = document.getElementById("chkGiamHieuUng").checked;
    c.ticker = document.getElementById("chkTicker").checked;
    c.soCot = parseInt(document.getElementById("selSoCot").value);
    luuCaiDat(c);
    apDungCaiDat();
    document.getElementById("tcDaLuu").textContent = t("tc.daLuu");
}

// Đơn của khách đang đăng nhập (lấy từ localStorage "donHang")
function moDonCuaToi() {
    var u = layNguoiDung();
    var dsDon = JSON.parse(localStorage.getItem("donHang") || "[]");
    var html = "";
    var co = 0;
    for (var i = dsDon.length - 1; i >= 0; i--) {
        if (dsDon[i].customerId != u.id) continue;
        co++;
        var soSP = 0;
        for (var j = 0; j < dsDon[i].items.length; j++) soSP += dsDon[i].items[j].soLuong;
        html += "<tr><td>" + dsDon[i].id + "</td><td>" + dsDon[i].date + "</td><td>" + soSP +
                '</td><td class="so">' + dinhDangTien(dsDon[i].total) + "</td></tr>";
    }
    document.getElementById("donCuaToiBody").innerHTML = co == 0 ? "<p>" + t("dc.trong") + "</p>" :
        "<table><thead><tr><th>" + t("dc.ma") + "</th><th>" + t("dc.ngay") + "</th><th>" + t("dc.sosp") +
        '</th><th class="so">' + t("dc.tong") + "</th></tr></thead><tbody>" + html + "</tbody></table>";
    document.getElementById("hopDonCuaToi").style.display = "flex";
}

// ===== Đóng nhanh: bấm ra ngoài hoặc nhấn Esc =====
document.addEventListener("click", function(e) {
    // Bấm vào nền tối của hộp thoại thì đóng hộp thoại
    if (e.target.classList && e.target.classList.contains("hop-thoai")) {
        e.target.style.display = "none";
    }
    // Bấm ra ngoài mini-cart thì đóng mini-cart
    var mini = document.getElementById("miniCart");
    // Nút vừa bấm có thể đã bị vẽ lại (bảng giỏ hàng render lại) -> không tính là bấm ra ngoài
    if (!document.body.contains(e.target)) return;
    if (mini && mini.style.display == "block" && !mini.contains(e.target) &&
        !e.target.closest("#menuChinh") && !e.target.closest("[data-action=them]") &&
        !e.target.closest(".hop-thoai")) {
        mini.style.display = "none";
    }
});

document.addEventListener("keydown", function(e) {
    if (e.key != "Escape") return;
    var cacHop = document.querySelectorAll(".hop-thoai");
    for (var i = 0; i < cacHop.length; i++) cacHop[i].style.display = "none";
    var mini = document.getElementById("miniCart");
    if (mini) mini.style.display = "none";
    var menu = document.getElementById("menuTaiKhoan");
    if (menu) menu.classList.remove("mo");
});
