/**
 * đây là hàm đọc file dùng chung
 * dùng XMLHttpRequest để đọc file (JSON/XML) rồi trả nội dung text cho hàm xử lý
 * @param {*} dataset - đường dẫn file dữ liệu
 * @param {*} xuLy - hàm nhận nội dung text sau khi đọc xong
 */
function docFile(dataset, xuLy) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            xuLy(this.responseText);
        }
    };
    xhttp.open("GET", dataset, true);
    xhttp.send();
}

// Đọc file XML, dùng DOMParser chuyển text thành cây DOM
function docXML(dataset, xuLy) {
    docFile(dataset, function(text) {
        var parser = new DOMParser();
        xuLy(parser.parseFromString(text, "text/xml"));
    });
}

// Đọc file JSON
function docJSON(dataset, xuLy) {
    docFile(dataset, function(text) {
        xuLy(JSON.parse(text));
    });
}

// Lấy nội dung của thẻ con đầu tiên
function layText(node, tag) {
    var el = node.getElementsByTagName(tag)[0];
    return el ? el.textContent : "";
}

/**
 * đây là hàm chuyển products.xml thành mảng sản phẩm
 * @param {*} xml - cây DOM của file products.xml
 */
function docSanPham(xml) {
    var dsSanPham = [];
    var nodes = xml.getElementsByTagName("product");
    for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        var mauSac = [];
        var sizes = [];
        var cs = n.getElementsByTagName("color");
        for (var j = 0; j < cs.length; j++) {
            mauSac.push(cs[j].textContent);
        }
        var ss = n.getElementsByTagName("size");
        for (var k = 0; k < ss.length; k++) {
            sizes.push(ss[k].textContent);
        }
        var rating = n.getElementsByTagName("rating")[0];
        dsSanPham.push({
            id: n.getAttribute("id"),
            category: n.getAttribute("category"),
            title: layText(n, "title"),
            price: parseFloat(layText(n, "price")),
            description: layText(n, "description"),
            image: layText(n, "image"),
            rate: parseFloat(rating.getAttribute("rate")),
            mauSac: mauSac,
            sizes: sizes,
            tonKho: parseInt(layText(n, "stock"))
        });
    }
    return dsSanPham;
}

// Gom danh mục thành 3 nhóm để tô màu nền thẻ cho có ý nghĩa
function nhomDanhMuc(category) {
    if (category.indexOf("clothing") >= 0) return "thoitrang";
    if (category == "jewelery") return "trangsuc";
    return "congnghe";
}

// Định dạng tiền
function dinhDangTien(so) {
    return "$" + Number(so).toFixed(2);
}

// Mã màu để vẽ ô chọn màu
var MA_MAU = {
    "Đen": "#222222", "Trắng": "#f4f4f4", "Đỏ": "#d32f2f", "Xanh": "#1976d2",
    "Vàng": "#f2b705", "Bạc": "#b0bec5", "Hồng": "#ec6f9a", "Be": "#d8c3a5", "Xám": "#8a8f98",
    "Vàng hồng": "#e3a587"
};

// ===== Người dùng đăng nhập (lưu tạm trong localStorage) =====
function layNguoiDung() {
    var u = localStorage.getItem("nguoiDung");
    return u ? JSON.parse(u) : null;
}

function luuNguoiDung(u) {
    localStorage.setItem("nguoiDung", JSON.stringify(u));
}

// Đăng xuất rồi về trang đăng nhập
function dangXuat(trangDangNhap) {
    localStorage.removeItem("nguoiDung");
    window.location.href = trangDangNhap;
}

/**
 * đây là hàm hiển thị người dùng trên menu
 * @param {*} trangDangNhap - đường dẫn trang đăng nhập (khác nhau giữa index và thư mục html)
 */
function hienThiNguoiDung(trangDangNhap) {
    var box = document.getElementById("userBox");
    var u = layNguoiDung();
    box.innerHTML = "";
    if (u) {
        var span = document.createElement("span");
        span.textContent = "Xin chào, " + u.name + " | ";
        var a = document.createElement("a");
        a.href = "#";
        a.textContent = "Đăng xuất";
        a.onclick = function() {
            dangXuat(trangDangNhap);
        };
        box.appendChild(span);
        box.appendChild(a);
    } else {
        var dn = document.createElement("a");
        dn.href = trangDangNhap;
        dn.textContent = "Đăng nhập";
        box.appendChild(dn);
    }
}
