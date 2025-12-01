# Hướng dẫn Deploy Web lên Production

## Bước 1: Setup Google Sheets (Làm trước)

Làm theo file `GOOGLE_SHEETS_SETUP.md` để có 3 URL Apps Script.

## Bước 2: Deploy lên Vercel (Khuyến nghị)

### 2.1. Push code lên GitHub

```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### 2.2. Deploy trên Vercel

1. Truy cập: https://vercel.com
2. Sign in với GitHub
3. Click **"Add New Project"**
4. Chọn repository: `booking`
5. Configure Project:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 2.3. Thêm Environment Variables

Trong phần **Environment Variables**, thêm:

```
Name: VITE_GOOGLE_SHEETS_NIGHTMARE_URL
Value: https://script.google.com/macros/s/xxx1/exec

Name: VITE_GOOGLE_SHEETS_LAST_HOLIDAY_URL
Value: https://script.google.com/macros/s/xxx2/exec

Name: VITE_GOOGLE_SHEETS_DIE_HARD_URL
Value: https://script.google.com/macros/s/xxx3/exec
```

6. Click **Deploy**

## Bước 3: Test Production

1. Sau khi deploy xong, Vercel sẽ cho bạn URL (ví dụ: `booking-xxx.vercel.app`)
2. Truy cập URL đó
3. Thử đăng ký xem phim
4. Mở Google Sheet → Kiểm tra data có xuất hiện không

## Bước 4: Custom Domain (Optional)

1. Trong Vercel Dashboard, vào **Settings** > **Domains**
2. Thêm domain của bạn
3. Cập nhật DNS records theo hướng dẫn

## Cách hoạt động sau khi deploy:

```
User (Web Production)
    ↓ (Đăng ký xem phim)
Google Apps Script
    ↓ (Ghi data)
Google Sheets
    ↓ (Xem real-time)
Bạn (Quản lý đăng ký)
```

## Lợi ích của Google Sheets:

✅ **Real-time**: Data xuất hiện ngay khi user đăng ký
✅ **Miễn phí**: Không cần database server
✅ **Dễ quản lý**: Có thể edit, sort, filter trong Sheet
✅ **Chia sẻ**: Có thể share quyền xem/edit cho team
✅ **Export**: Dễ dàng export ra Excel, CSV
✅ **Thống kê**: Có thể tạo chart, pivot table ngay trong Sheet

## Theo dõi đăng ký:

Mở Google Sheets trên điện thoại/máy tính → Xem live data:
- Người đăng ký
- Loại vé (A/B)
- Số lượng
- Tổng tiền
- Thời gian đăng ký

## Cập nhật code sau khi deploy:

```bash
# Thay đổi code
git add .
git commit -m "Update features"
git push origin main

# Vercel tự động deploy lại
```

## Troubleshooting:

**Vấn đề**: Data không vào Google Sheet
**Giải pháp**:
1. Kiểm tra Environment Variables trong Vercel
2. Kiểm tra Google Apps Script đã deploy đúng chưa
3. Xem Console log trong browser (F12)

**Vấn đề**: Environment variables không work
**Giải pháp**:
1. Đảm bảo tên biến có prefix `VITE_`
2. Sau khi thêm env vars, phải **Redeploy**

## Deploy alternatives:

- **Netlify**: Tương tự Vercel
- **GitHub Pages**: Cần config thêm
- **Railway**: Support full-stack
