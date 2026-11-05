// Câu 1: đọc API bằng AJAX, dùng mô hình DOM tạo file products.xml

// Màu sắc theo loại sản phẩm: mỗi sản phẩm lấy 3 màu khác nhau trong bảng màu của loại đó
function layMauSac(category, id) {
    var bang = ["Đen", "Trắng", "Đỏ", "Xanh", "Be", "Xám"];
    if (category == "electronics") bang = ["Đen", "Bạc", "Trắng", "Xanh"];
    if (category == "jewelery") bang = ["Vàng", "Bạc", "Vàng hồng"];
    var kq = [];
    for (var i = 0; i < 3; i++) {
        kq.push(bang[(id + i) % bang.length]);
    }
    return kq;
}

// Size chỉ có ở quần áo
function laySize(category) {
    if (category.indexOf("clothing") >= 0) return ["S", "M", "L", "XL"];
    return [];
}

// Tạo thẻ con có nội dung text rồi gắn vào thẻ cha
function themThe(doc, cha, tag, noiDung) {
    var el = doc.createElement(tag);
    el.textContent = noiDung;
    cha.appendChild(el);
    return el;
}

/**
 * đây là hàm tạo cây XML
 * dùng document.implementation.createDocument để dựng cây DOM từ mảng JSON
 * @param {*} dsSanPham - mảng sản phẩm đọc từ API
 */
function taoCayXML(dsSanPham) {
    var doc = document.implementation.createDocument("", "products", null);
    var root = doc.documentElement;

    for (var i = 0; i < dsSanPham.length; i++) {
        var sp = dsSanPham[i];
        var node = doc.createElement("product");
        node.setAttribute("id", sp.id);
        node.setAttribute("category", sp.category);
        themThe(doc, node, "title", sp.title);
        themThe(doc, node, "price", sp.price);
        themThe(doc, node, "description", sp.description);
        themThe(doc, node, "image", sp.image);

        var rating = doc.createElement("rating");
        rating.setAttribute("rate", sp.rating.rate);
        rating.setAttribute("count", sp.rating.count);
        node.appendChild(rating);

        // Bổ sung màu sắc
        var colors = doc.createElement("colors");
        var dsMau = layMauSac(sp.category, sp.id);
        for (var j = 0; j < dsMau.length; j++) {
            themThe(doc, colors, "color", dsMau[j]);
        }
        node.appendChild(colors);

        // Bổ sung size
        var sizes = doc.createElement("sizes");
        var dsSize = laySize(sp.category);
        for (var k = 0; k < dsSize.length; k++) {
            themThe(doc, sizes, "size", dsSize[k]);
        }
        node.appendChild(sizes);

        // Bổ sung tồn kho (giả lập)
        themThe(doc, node, "stock", (sp.id * 13) % 40 + 5);

        root.appendChild(node);
    }

    var text = new XMLSerializer().serializeToString(doc);
    // Xuống dòng mỗi sản phẩm cho dễ đọc
    text = text.replace(/<product /g, "\n  <product ").replace("</products>", "\n</products>");
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + text;
}

/**
 * đây là hàm tạo products.xml
 * dùng để load dữ liệu từ API, tạo XML rồi cho tải file về
 * @param {*} api - đường dẫn API fakestoreapi
 */
function taoProducts(api) {
    var trangThai = document.getElementById("trangThai");
    trangThai.textContent = "Đang tải dữ liệu từ API...";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var dsSanPham = JSON.parse(this.responseText);
            var xmlText = taoCayXML(dsSanPham);
            document.getElementById("ketQuaXML").value = xmlText;

            // Tạo link tải file products.xml
            var blob = new Blob([xmlText], { type: "text/xml" });
            var link = document.getElementById("lnkTai");
            link.href = URL.createObjectURL(blob);
            link.download = "products.xml";
            link.style.display = "inline-block";
            trangThai.textContent = "Đã tạo " + dsSanPham.length + " sản phẩm. Lưu file vào dataset/products.xml";
        }
    };
    xhttp.open("GET", api, true);
    xhttp.send();
}
