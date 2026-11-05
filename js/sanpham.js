var dsSanPham = []; // giữ lại danh sách sản phẩm sau khi load để lọc

// Câu 3: hiện khung "Skeleton Loading" trong lúc chờ dữ liệu
function hienSkeleton(soKhung) {
    var luoi = document.getElementById("dsSanPham");
    luoi.innerHTML = "";
    for (var i = 0; i < soKhung; i++) {
        var khung = document.createElement("div");
        khung.className = "the-sp skeleton";
        khung.innerHTML = '<div class="sk-anh"></div><div class="sk-dong"></div>' +
                          '<div class="sk-dong ngan"></div><div class="sk-dong"></div>';
        luoi.appendChild(khung);
    }
}

/**
 * đây là hàm load sản phẩm
 * dùng để load products.xml, đổ dropdown danh mục và hiển thị lưới sản phẩm
 * @param {*} dataset - đường dẫn file products.xml
 */
function loadSanPham(dataset) {
    hienSkeleton(8);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            dsSanPham = docSanPham(this.responseXML);
            taoDropdownDanhMuc();
            veAnhHero();
            // Cho skeleton hiện thêm một chút để thấy hiệu ứng
            setTimeout(function() {
                hienThiSanPham(dsSanPham);
                loadDanhGia("dataset/reviews.xml");
            }, 800);
        }
    };
    xhttp.open("GET", dataset, true);
    xhttp.send();
}

// Hero: lấy sản phẩm đầu tiên của 3 danh mục khác nhau, xếp thành cụm ảnh nghiêng
function veAnhHero() {
    var khung = document.getElementById("heroAnh");
    var daCo = [];
    for (var i = 0; i < dsSanPham.length && daCo.length < 3; i++) {
        var dm = dsSanPham[i].category.indexOf("clothing") >= 0 ? "clothing" : dsSanPham[i].category;
        if (daCo.indexOf(dm) >= 0) continue;
        daCo.push(dm);
        var img = document.createElement("img");
        img.src = dsSanPham[i].image;
        img.alt = dsSanPham[i].title;
        img.className = "anh-hero-" + daCo.length;
        khung.appendChild(img);
    }
}

// Gom các danh mục không trùng nhau vào dropdown
function taoDropdownDanhMuc() {
    var select = document.getElementById("selDanhMuc");
    var danhMuc = [];
    for (var i = 0; i < dsSanPham.length; i++) {
        if (danhMuc.indexOf(dsSanPham[i].category) === -1) {
            danhMuc.push(dsSanPham[i].category);
        }
    }
    for (var j = 0; j < danhMuc.length; j++) {
        var option = document.createElement("option");
        option.value = danhMuc[j];
        option.textContent = danhMuc[j];
        select.appendChild(option);
    }
}

// Chữ hiển thị biến thể: "Màu: Đen · Size: M"
function taoNhanBienThe(mau, size) {
    return t("sp.mau") + ": " + mau + (size ? " · Size: " + size : "");
}

// Biến thể = màu + size đang chọn, ví dụ "Đen-M"
function taoBienThe(mau, size) {
    return size ? mau + "-" + size : mau;
}

/**
 * đây là hàm tạo thẻ sản phẩm
 * mỗi thẻ có data-id và data-variant để Câu 4 đọc lại khi click
 * @param {*} sp - đối tượng sản phẩm
 */
function taoTheSanPham(sp) {
    var the = document.createElement("article");
    the.className = "the-sp";
    var mauDau = sp.mauSac[0];
    var sizeDau = sp.sizes.length > 0 ? sp.sizes[0] : "";
    the.setAttribute("data-id", sp.id);
    the.setAttribute("data-color", mauDau);
    the.setAttribute("data-size", sizeDau);
    the.setAttribute("data-variant", taoBienThe(mauDau, sizeDau));
    the.setAttribute("data-nhom", nhomDanhMuc(sp.category)); // màu nền thẻ theo nhóm danh mục

    // Ảnh (Câu 5 sẽ chèn thẻ span số sao lên khung ảnh này)
    var khungAnh = document.createElement("div");
    khungAnh.className = "khung-anh";
    khungAnh.setAttribute("data-action", "xem"); // bấm vào ảnh cũng mở Xem nhanh
    var img = document.createElement("img");
    img.src = sp.image;
    img.alt = sp.title;
    khungAnh.appendChild(img);
    var nhanDM = document.createElement("span");
    nhanDM.className = "nhan-dm";
    nhanDM.textContent = t("dm." + nhomDanhMuc(sp.category));
    khungAnh.appendChild(nhanDM);
    the.appendChild(khungAnh);

    var ten = document.createElement("h3");
    ten.textContent = sp.title;
    ten.setAttribute("data-action", "xem"); // bấm vào tên cũng mở Xem nhanh
    the.appendChild(ten);

    var gia = document.createElement("p");
    gia.className = "gia";
    gia.textContent = dinhDangTien(sp.price);
    the.appendChild(gia);

    // Chọn màu
    var hangMau = document.createElement("div");
    hangMau.className = "hang-chon";
    for (var i = 0; i < sp.mauSac.length; i++) {
        var nutMau = document.createElement("button");
        nutMau.className = i == 0 ? "o-mau dang-chon" : "o-mau";
        nutMau.setAttribute("data-action", "mau");
        nutMau.setAttribute("data-value", sp.mauSac[i]);
        nutMau.title = sp.mauSac[i];
        nutMau.style.backgroundColor = MA_MAU[sp.mauSac[i]];
        hangMau.appendChild(nutMau);
    }
    the.appendChild(hangMau);

    // Chọn size (chỉ quần áo mới có)
    if (sp.sizes.length > 0) {
        var hangSize = document.createElement("div");
        hangSize.className = "hang-chon";
        for (var j = 0; j < sp.sizes.length; j++) {
            var nutSize = document.createElement("button");
            nutSize.className = j == 0 ? "o-size dang-chon" : "o-size";
            nutSize.setAttribute("data-action", "size");
            nutSize.setAttribute("data-value", sp.sizes[j]);
            nutSize.textContent = sp.sizes[j];
            hangSize.appendChild(nutSize);
        }
        the.appendChild(hangSize);
    }

    // Dòng ghi rõ biến thể đang chọn (ô màu không có chữ nên phải ghi ra)
    var nhanBT = document.createElement("p");
    nhanBT.className = "nhan-bien-the";
    nhanBT.textContent = taoNhanBienThe(mauDau, sizeDau);
    the.appendChild(nhanBT);

    var phu = document.createElement("p");
    phu.className = sp.tonKho < 10 ? "phu sap-het" : "phu";
    phu.textContent = sp.tonKho < 10 ? "🔥 " + t("sp.chiCon") + " " + sp.tonKho : t("sp.tonkho") + ": " + sp.tonKho;
    the.appendChild(phu);

    var hangNut = document.createElement("div");
    hangNut.className = "hang-nut";
    hangNut.innerHTML = '<button class="btn" data-action="them">' + t("sp.them") + '</button>' +
                        '<button class="btn btn-phu" data-action="xem">' + t("sp.xem") + '</button>' +
                        '<button class="lien-ket" data-action="danhgia">' + t("sp.rating") + '</button>';
    the.appendChild(hangNut);
    return the;
}

// Hiển thị danh sách sản phẩm lên lưới
function hienThiSanPham(ds) {
    var luoi = document.getElementById("dsSanPham");
    luoi.innerHTML = "";
    document.getElementById("soKetQua").textContent = "(" + ds.length + ")";
    if (ds.length == 0) {
        luoi.innerHTML = '<p class="trong">Không tìm thấy sản phẩm phù hợp.</p>';
        return;
    }
    for (var i = 0; i < ds.length; i++) {
        luoi.appendChild(taoTheSanPham(ds[i]));
    }
    hienThiSao(); // Câu 5: gắn lại số sao sau mỗi lần vẽ
}

// Tìm sản phẩm theo id
function timSanPham(id) {
    for (var i = 0; i < dsSanPham.length; i++) {
        if (dsSanPham[i].id == id) return dsSanPham[i];
    }
    return null;
}

/**
 * đây là hàm tìm kiếm nâng cao (Câu 2)
 * lọc theo tên, danh mục, khoảng giá, màu sắc và rating tối thiểu
 */
function timKiem() {
    var loi = document.getElementById("loiTimKiem");
    loi.textContent = "";
    var tuKhoa = document.getElementById("txtTuKhoa").value.trim().toLowerCase();
    var danhMuc = document.getElementById("selDanhMuc").value;
    var giaTu = document.getElementById("txtGiaTu").value;
    var giaDen = document.getElementById("txtGiaDen").value;
    var mau = document.getElementById("selMau").value;
    var rating = parseFloat(document.getElementById("rngRating").value);

    if (giaTu !== "" && giaDen !== "" && parseFloat(giaTu) > parseFloat(giaDen)) {
        loi.textContent = "Giá 'Từ' phải nhỏ hơn hoặc bằng giá 'Đến'.";
        return;
    }

    var ketQua = [];
    for (var i = 0; i < dsSanPham.length; i++) {
        var sp = dsSanPham[i];
        if (tuKhoa && sp.title.toLowerCase().indexOf(tuKhoa) === -1) continue;
        if (danhMuc != "all" && sp.category != danhMuc) continue;
        if (giaTu !== "" && sp.price < parseFloat(giaTu)) continue;
        if (giaDen !== "" && sp.price > parseFloat(giaDen)) continue;
        if (mau && sp.mauSac.indexOf(mau) === -1) continue;
        if (layDiemSao(sp) < rating) continue;
        ketQua.push(sp);
    }
    hienThiSanPham(ketQua);
}

// ===== Câu 4: Event Delegation - chỉ 1 listener trên container =====
document.getElementById("dsSanPham").addEventListener("click", function(e) {
    var the = e.target.closest(".the-sp");
    if (!the || the.classList.contains("skeleton")) return;
    var nut = e.target.closest("[data-action]");
    // Bấm khe hở giữa các ô màu/size hoặc giữa các nút thì bỏ qua cho khỏi bấm nhầm
    if (!nut && e.target.closest(".hang-chon, .hang-nut")) return;
    var id = the.getAttribute("data-id");
    // Bấm vào khoảng trống bất kỳ trên thẻ = Xem nhanh
    var hanhDong = nut ? nut.getAttribute("data-action") : "xem";

    if (hanhDong == "mau" || hanhDong == "size") {
        // Đổi màu/size thì cập nhật lại data-variant của thẻ
        var cacNut = nut.parentNode.children;
        for (var i = 0; i < cacNut.length; i++) {
            cacNut[i].classList.remove("dang-chon");
        }
        nut.classList.add("dang-chon");
        the.setAttribute(hanhDong == "mau" ? "data-color" : "data-size", nut.getAttribute("data-value"));
        the.setAttribute("data-variant", taoBienThe(the.getAttribute("data-color"), the.getAttribute("data-size")));
        the.querySelector(".nhan-bien-the").textContent = taoNhanBienThe(the.getAttribute("data-color"), the.getAttribute("data-size"));
        return;
    }

    // Trích xuất data-id và data-variant của sản phẩm được click
    var bienThe = the.getAttribute("data-variant");
    console.log("Click:", hanhDong, "data-id =", id, "data-variant =", bienThe);

    if (hanhDong == "them") {
        GioHang.them(timSanPham(id), the.getAttribute("data-color"), the.getAttribute("data-size"));
    } else if (hanhDong == "xem") {
        xemNhanh(timSanPham(id), the);
    } else if (hanhDong == "danhgia") {
        xemChiTietDanhGia(id);
    }
});

// Hộp Xem nhanh
function xemNhanh(sp, the) {
    var bienThe = the.getAttribute("data-variant");
    var mau = the.getAttribute("data-color");
    var size = the.getAttribute("data-size");
    var body = document.getElementById("xemNhanhBody");
    body.innerHTML = "";
    var img = document.createElement("img");
    img.src = sp.image;
    img.className = "anh-lon";
    var ten = document.createElement("h3");
    ten.textContent = sp.title;
    var info = document.createElement("p");
    info.innerHTML = "<b>Mã:</b> " + sp.id + " | <b>Biến thể đang chọn:</b> " + bienThe +
                     " | <b>Giá:</b> " + dinhDangTien(sp.price) + " | <b>Tồn kho:</b> " + sp.tonKho;
    // Đang xem nhanh thì mua luôn được, không phải đóng hộp
    var nutMua = document.createElement("button");
    nutMua.className = "btn nut-mua-xem-nhanh";
    nutMua.textContent = t("sp.them") + " (" + bienThe + ")";
    nutMua.onclick = function() {
        GioHang.them(sp, mau, size);
        dongHop("hopXemNhanh");
    };
    var moTa = document.createElement("p");
    moTa.textContent = sp.description;
    body.appendChild(img);
    body.appendChild(ten);
    body.appendChild(info);
    body.appendChild(nutMua);
    body.appendChild(moTa);
    document.getElementById("hopXemNhanh").style.display = "flex";
}

function dongHop(id) {
    document.getElementById(id).style.display = "none";
}
