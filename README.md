# UEL Shop - Kiểm tra giữa kỳ Phát triển Web Kinh Doanh (Mã đề BW08)

Sinh viên: Vũ Sơn Trúc - MSSV: K244161819 - Lớp: 261BIE503002

Website bán hàng giả lập: dữ liệu sản phẩm lấy từ fakestoreapi, lưu bằng XML/JSON, giỏ hàng và đơn hàng lưu localStorage, có trang quản lý cho nhân viên.

## Link

- Trang web (GitHub Pages): https://trucvu0201.github.io/bw08-uelshop/
- Mã nguồn (GitHub): https://github.com/TrucVu0201/bw08-uelshop

## Cách chạy

Mở `index.html` bằng Live Server (VS Code). Không mở trực tiếp bằng file:// vì AJAX đọc file XML/JSON sẽ bị trình duyệt chặn.

Tài khoản thử:
- Quản lý: `admin` / `admin123`
- Khách hàng: `khach1` / `123456`

## Câu hỏi và file tương ứng

| Câu | Nội dung | File chính |
|---|---|---|
| 1 | Tạo products.xml, employees/customers.json, carts.xml | `html/taoproducts.html`, `js/taoproducts.js`, `dataset/` |
| 2 | Layout semantic + form tìm kiếm ở aside | `index.html`, `js/sanpham.js` |
| 3 | Grid 4/2/1 cột, Skeleton Loading | `css/main.css` |
| 4 | Event Delegation (1 listener trên `#dsSanPham`) | `js/sanpham.js` |
| 5 | reviews.xml, DOMParser, số sao trên ảnh, Rating Detail | `js/danhgia.js`, `dataset/reviews.xml` |
| 6 | Đối tượng GioHang, Mini-cart | `js/giohang.js` |
| 7 | Regex SĐT/email, API thanh toán giả lập, localStorage | `js/thanhtoan.js` |
| 8 | Đăng nhập, trang quản lý đơn hàng | `html/dangnhap.html`, `html/admin.html`, `js/admin.js` |
| 9 | GitHub Pages | link ở trên |
