# Hướng dẫn setup Google Sheets API

## Cách tiếp cận: Sử dụng 1 Spreadsheet với nhiều Sheets (Tabs)

Bạn sẽ sử dụng Google Spreadsheet hiện có và tạo các tabs/sheets riêng cho từng phim. Điều này dễ quản lý hơn so với việc tạo nhiều file riêng biệt.

**Spreadsheet của bạn:**
https://docs.google.com/spreadsheets/d/1W9812Sw2oFd7wCdhLx2sc3I-MMXIKuKDKngAD-I1_Pc/edit

## Bước 1: Chuẩn bị các Sheet (Tabs) trong Spreadsheet

1. Mở Google Spreadsheet của bạn (link trên)

2. Tạo 3 sheet/tab riêng (click vào dấu **+** ở góc dưới bên trái):
   - Tab 1: Đổi tên thành `Nightmare`
   - Tab 2: Đổi tên thành `LastHoliday`
   - Tab 3: Đổi tên thành `DieHard`

3. **KHÔNG CẦN** tạo header thủ công - script sẽ tự động tạo!

## Bước 2: Tạo Google Apps Script

1. Trong Spreadsheet, click **Extensions** > **Apps Script**

2. Xóa code mặc định và copy toàn bộ nội dung từ file `google-apps-script/Code.gs` vào

   **Hoặc** paste code sau:

```javascript
/**
 * Google Apps Script để nhận dữ liệu booking từ web app và lưu vào Google Sheets
 */

// Cấu hình tên các sheet theo từng phim
const SHEET_NAMES = {
  'The Nightmare Before Christmas': 'Nightmare',
  'LAST HOLIDAY (2006)': 'LastHoliday',
  'Die Hard': 'DieHard'
};

/**
 * Hàm xử lý POST request từ web app
 */
function doPost(e) {
  try {
    // Parse dữ liệu từ request
    const data = JSON.parse(e.postData.contents);

    // Log để debug (có thể xem trong View > Logs)
    Logger.log('Received data: ' + JSON.stringify(data));

    // Lấy sheet tương ứng với phim
    const sheetName = SHEET_NAMES[data.movie] || 'Bookings'; // Default sheet nếu không tìm thấy
    const sheet = getOrCreateSheet(sheetName);

    // Thêm headers nếu sheet mới
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Movie',
        'Show Date',
        'Name',
        'Email',
        'Phone',
        'Ticket Type',
        'Quantity',
        'Total Price (VND)',
        'Status'
      ]);

      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 10);
      headerRange.setBackground('#4CAF50');
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
    }

    // Thêm dữ liệu mới
    sheet.appendRow([
      new Date(data.timestamp),
      data.movie,
      data.showDate,
      data.name,
      data.email,
      data.phone,
      data.ticketType,
      data.quantity,
      data.totalPrice,
      'Pending' // Status mặc định
    ]);

    // Format dòng vừa thêm
    const lastRow = sheet.getLastRow();
    const dataRange = sheet.getRange(lastRow, 1, 1, 10);
    dataRange.setBorder(true, true, true, true, false, false);

    // Format số tiền
    const priceCell = sheet.getRange(lastRow, 9);
    priceCell.setNumberFormat('#,##0');

    // Tự động điều chỉnh độ rộng cột
    sheet.autoResizeColumns(1, 10);

    // Trả về response thành công
    return ContentService.createTextOutput(JSON.stringify({
      'success': true,
      'message': 'Booking saved successfully',
      'row': lastRow
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log lỗi
    Logger.log('Error: ' + error.toString());

    // Trả về response lỗi
    return ContentService.createTextOutput(JSON.stringify({
      'success': false,
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Hàm xử lý GET request (để test)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    'status': 'API is running',
    'message': 'Use POST method to submit booking data'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Lấy hoặc tạo sheet mới
 */
function getOrCreateSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  return sheet;
}

/**
 * Hàm test để kiểm tra script
 * Chạy hàm này để test (Run > testBooking)
 */
function testBooking() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        movie: 'The Nightmare Before Christmas',
        showDate: '08.12.2025',
        name: 'Nguyen Van A',
        email: 'test@example.com',
        phone: '0912345678',
        ticketType: 'A',
        quantity: 2,
        totalPrice: 300000,
        timestamp: new Date().toISOString()
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}
```

3. Click **Save** (icon đĩa mềm) và đặt tên project: "Booking API"

## Bước 3: Test Script (Optional nhưng nên làm)

1. Trong Apps Script editor, chọn function `testBooking` từ dropdown menu ở top bar

2. Click **Run** (icon play ▶)

3. **Lần đầu chạy** sẽ yêu cầu phân quyền:
   - Click **Review permissions**
   - Chọn Google account của bạn
   - Click **Advanced** > **Go to Booking API (unsafe)** (đừng lo, đây là app của bạn)
   - Click **Allow**

4. Kiểm tra tab `Nightmare` trong spreadsheet, nếu thấy dữ liệu test xuất hiện là thành công!

## Bước 4: Deploy Web App

1. Click **Deploy** > **New deployment**

2. Click vào icon **⚙️** (settings/bánh răng) bên cạnh "Select type"

3. Chọn **Web app**

4. Điền thông tin:
   - **Description**: "Booking API v1"
   - **Execute as**: **Me** (your-email@gmail.com)
   - **Who has access**: **Anyone**

5. Click **Deploy**

6. Có thể cần **Authorize access** lần nữa

7. **QUAN TRỌNG**: Copy **Web app URL** được tạo ra
   - Dạng: `https://script.google.com/macros/s/ABC123DEF456.../exec`
   - Click vào icon **Copy** để copy URL

## Bước 5: Cấu hình Web App

1. Tạo file `.env.local` trong thư mục root của project:
   ```bash
   cp .env.local.example .env.local
   ```

2. Mở file `.env.local` và paste URL vừa copy vào **CẢ 3 BIẾN**:
   ```env
   # Cả 3 phim dùng chung 1 URL vì cùng 1 spreadsheet
   # Script sẽ tự động phân loại vào đúng tab dựa trên tên phim
   VITE_GOOGLE_SHEETS_NIGHTMARE_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   VITE_GOOGLE_SHEETS_LAST_HOLIDAY_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   VITE_GOOGLE_SHEETS_DIE_HARD_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

3. Restart dev server:
   ```bash
   npm run dev
   ```

## Bước 6: Test Integration

1. Mở web app trong browser: `http://localhost:5173`

2. Click vào một phim và điền form đăng ký

3. Submit form

4. Kiểm tra Google Spreadsheet, dữ liệu sẽ xuất hiện trong tab tương ứng:
   - The Nightmare Before Christmas → tab `Nightmare`
   - LAST HOLIDAY → tab `LastHoliday`
   - Die Hard → tab `DieHard`

## Cấu trúc dữ liệu trong Google Sheets

Mỗi tab sẽ có các cột sau (tự động tạo):

| Timestamp | Movie | Show Date | Name | Email | Phone | Ticket Type | Quantity | Total Price (VND) | Status |
|-----------|-------|-----------|------|-------|-------|-------------|----------|-------------------|--------|
| 2025-12-02 | The Nightmare... | 08.12.2025 | Nguyen Van A | test@email.com | 0912345678 | A | 2 | 300,000 | Pending |

## Lợi ích của cách làm này:

- ✅ Chỉ cần 1 URL duy nhất cho cả 3 phim
- ✅ Dễ quản lý từng buổi chiếu với tabs riêng
- ✅ Tránh nhầm lẫn giữa các phim
- ✅ Tự động format đẹp (màu header, border, số tiền)
- ✅ Dễ export data và thống kê

## Troubleshooting

### Lỗi "Script function not found: doPost"
- Kiểm tra lại code trong Apps Script
- Đảm bảo function `doPost` tồn tại và không có lỗi syntax

### Dữ liệu không xuất hiện trong Sheet
- Kiểm tra tên tab trong spreadsheet: `Nightmare`, `LastHoliday`, `DieHard`
- Xem Logs trong Apps Script: **View** > **Execution log** hoặc **Logs**
- Kiểm tra URL trong `.env.local` có đúng không (phải có `/exec` ở cuối)

### Lỗi phân quyền
- Re-deploy script với quyền "Anyone"
- Xóa quyền cũ: Google Account > Security > Third-party apps with account access
- Deploy lại và authorize lại

### Muốn cập nhật script
1. Sửa code trong Apps Script editor
2. **Deploy** > **Manage deployments**
3. Click **✏️** (Edit) bên cạnh deployment hiện tại
4. Chọn **New version**
5. Click **Deploy**
6. URL sẽ giữ nguyên, không cần cập nhật `.env.local`

## Bảo mật

- Script chạy với quyền của bạn, chỉ bạn có quyền truy cập Spreadsheet
- URL được public nhưng chỉ có thể POST dữ liệu, không thể đọc
- Mode `no-cors` trong code frontend có nghĩa là không đọc được response, chỉ gửi dữ liệu
- Nếu muốn thêm authentication, có thể thêm API key vào request body

## Mở rộng

Nếu muốn thêm phim mới:

1. Tạo tab mới trong Spreadsheet (ví dụ: `HomeAlone`)
2. Thêm vào object `SHEET_NAMES` trong Apps Script:
   ```javascript
   const SHEET_NAMES = {
     'The Nightmare Before Christmas': 'Nightmare',
     'LAST HOLIDAY (2006)': 'LastHoliday',
     'Die Hard': 'DieHard',
     'Home Alone': 'HomeAlone'  // Thêm dòng này
   };
   ```
3. Deploy version mới (Deploy > Manage deployments > Edit > New version)
4. Thêm phim mới vào `MovieList.tsx` với cùng URL
5. Không cần tạo file `.env` mới vì dùng chung URL!
