# Hướng dẫn setup Google Sheets API

## Quan trọng: Tạo riêng từng Google Sheet cho mỗi phim

Mỗi bộ phim sẽ có 1 Google Sheet riêng để quản lý đăng ký dễ dàng hơn.

## Bước 1: Tạo Google Sheet cho từng phim

### Sheet 1: The Nightmare Before Christmas
1. Truy cập https://sheets.google.com
2. Tạo sheet mới với tên: "Nightmare Before Christmas - Bookings"
3. Tạo các cột header ở hàng đầu tiên:
   - A1: Timestamp
   - B1: Movie Title
   - C1: Show Date
   - D1: Name
   - E1: Email
   - F1: Phone
   - G1: Ticket Type
   - H1: Quantity
   - I1: Total Price
   - J1: Status

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheet, click **Extensions** > **Apps Script**
2. Xóa code mặc định và paste code sau:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Add new row with registration data
    sheet.appendRow([
      data.timestamp,
      data.movie,
      data.showDate,
      data.name,
      data.email,
      data.phone,
      data.ticketType,
      data.quantity,
      data.totalPrice,
      'Pending' // Status
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Registration saved' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'API is working' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Deploy** > **New deployment**
4. Chọn type: **Web app**
5. Cấu hình:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**
7. Copy **Web app URL** (dạng: https://script.google.com/macros/s/xxx/exec)

### Lặp lại cho các phim khác:

Tạo 2 Google Sheets nữa với tên:
- "Last Holiday - Bookings"
- "Die Hard - Bookings"

Mỗi sheet có cấu trúc header giống nhau.

## Bước 3: Cập nhật file .env.local

Mở file `.env.local` và thêm URL của từng sheet:

```
# The Nightmare Before Christmas
VITE_GOOGLE_SHEETS_NIGHTMARE_URL=https://script.google.com/macros/s/xxx1/exec

# Last Holiday
VITE_GOOGLE_SHEETS_LAST_HOLIDAY_URL=https://script.google.com/macros/s/xxx2/exec

# Die Hard
VITE_GOOGLE_SHEETS_DIE_HARD_URL=https://script.google.com/macros/s/xxx3/exec
```

## Bước 4: Test

1. Restart dev server: `npm run dev`
2. Thử đăng ký cho từng phim
3. Kiểm tra từng Google Sheet tương ứng để thấy data mới

## Lợi ích của việc tạo riêng sheet:

- ✅ Dễ quản lý từng buổi chiếu
- ✅ Tránh nhầm lẫn giữa các phim
- ✅ Có thể share quyền truy cập riêng cho từng phim
- ✅ Dễ export data và thống kê

## Lưu ý:

- Mỗi lần thay đổi Apps Script phải deploy lại (New deployment)
- Có thể cần authorize quyền truy cập lần đầu
- Data sẽ tự động append vào cuối sheet
- Mỗi phim có URL riêng nên không bị trộn lẫn data
