// Câu 5: xử lý reviews.xml bằng DOMParser
var dsDanhGia = [];   // tất cả review
var diemTrungBinh = {}; // product_id -> { tong, soLuot }

/**
 * đây là hàm load đánh giá
 * đọc reviews.xml dạng text rồi dùng DOMParser chuyển thành DOM
 * @param {*} dataset - đường dẫn file reviews.xml
 */
function loadDanhGia(dataset) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var parser = new DOMParser();
            var xml = parser.parseFromString(this.responseText, "text/xml");
            tinhDiemTrungBinh(xml);
            hienThiSao();
        }
    };
    xhttp.open("GET", dataset, true);
    xhttp.send();
}

// Duyệt qua các node <review>, cộng điểm theo product_id
function tinhDiemTrungBinh(xml) {
    var reviews = xml.getElementsByTagName("review");
    dsDanhGia = [];
    diemTrungBinh = {};
    for (var i = 0; i < reviews.length; i++) {
        var r = reviews[i];
        var dg = {
            productId: layText(r, "product_id"),
            customerId: layText(r, "customer_id"),
            customerName: layText(r, "customer_name"),
            rating: parseInt(layText(r, "rating")),
            comment: layText(r, "comment"),
            date: layText(r, "date")
        };
        dsDanhGia.push(dg);
        if (!diemTrungBinh[dg.productId]) {
            diemTrungBinh[dg.productId] = { tong: 0, soLuot: 0 };
        }
        diemTrungBinh[dg.productId].tong += dg.rating;
        diemTrungBinh[dg.productId].soLuot++;
    }
}

// Điểm sao của 1 sản phẩm (dùng cho cả bộ lọc rating ở Câu 2)
function layDiemSao(sp) {
    var d = diemTrungBinh[sp.id];
    return d ? d.tong / d.soLuot : 0;
}

// Tạo mới thẻ <span> số sao, chèn lên ảnh của từng sản phẩm
function hienThiSao() {
    if (dsDanhGia.length == 0) return; // chưa load xong reviews.xml
    var cacThe = document.querySelectorAll("#dsSanPham .the-sp");
    for (var i = 0; i < cacThe.length; i++) {
        var khungAnh = cacThe[i].querySelector(".khung-anh");
        if (!khungAnh || khungAnh.querySelector(".sao")) continue;
        var d = diemTrungBinh[cacThe[i].getAttribute("data-id")];
        var span = document.createElement("span");
        span.className = "sao";
        span.setAttribute("data-action", "danhgia"); // bấm vào số sao mở Rating Detail
        if (d) {
            span.textContent = "★ " + (d.tong / d.soLuot).toFixed(1) + " (" + d.soLuot + ")";
        } else {
            span.textContent = "Chưa có đánh giá";
        }
        khungAnh.appendChild(span);
    }
}

// Bấm Rating Detail: hiện danh sách khách hàng đã đánh giá sản phẩm
function xemChiTietDanhGia(productId) {
    var sp = timSanPham(productId);
    document.getElementById("tieuDeDanhGia").textContent = "Đánh giá: " + sp.title;
    var tbody = document.getElementById("danhGiaBody");
    tbody.innerHTML = "";
    var coDanhGia = false;
    for (var i = 0; i < dsDanhGia.length; i++) {
        var dg = dsDanhGia[i];
        if (dg.productId != productId) continue;
        coDanhGia = true;
        var row = document.createElement("tr");
        var tdTen = document.createElement("td");
        tdTen.textContent = dg.customerName + " (" + dg.customerId + ")";
        var tdSao = document.createElement("td");
        tdSao.textContent = "★".repeat(dg.rating) + "☆".repeat(5 - dg.rating);
        var tdNhanXet = document.createElement("td");
        tdNhanXet.textContent = dg.comment;
        var tdNgay = document.createElement("td");
        tdNgay.textContent = dg.date;
        row.appendChild(tdTen);
        row.appendChild(tdSao);
        row.appendChild(tdNhanXet);
        row.appendChild(tdNgay);
        tbody.appendChild(row);
    }
    if (!coDanhGia) {
        tbody.innerHTML = '<tr><td colspan="4">Sản phẩm chưa có đánh giá.</td></tr>';
    }
    document.getElementById("hopDanhGia").style.display = "flex";
}
