/**
 * Google Apps Script để nhận dữ liệu booking từ web app và lưu vào Google Sheets
 *
 * HƯỚNG DẪN CÀI ĐẶT:
 *
 * 1. Mở Google Sheet của bạn:
 *    https://docs.google.com/spreadsheets/d/1W9812Sw2oFd7wCdhLx2sc3I-MMXIKuKDKngAD-I1_Pc/edit
 *
 * 2. Click "Extensions" > "Apps Script"
 *
 * 3. Xóa code mặc định và paste toàn bộ code này vào
 *
 * 4. Đổi tên sheet trong biến SHEET_NAMES bên dưới cho phù hợp với tên sheet của bạn
 *
 * 5. Click "Deploy" > "New deployment"
 *    - Click vào icon bánh răng > chọn "Web app"
 *    - Description: "Booking API"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    - Click "Deploy"
 *
 * 6. Copy URL được tạo ra và paste vào file .env.local của project:
 *    VITE_GOOGLE_SHEETS_NIGHTMARE_URL=<URL_của_bạn>
 *    VITE_GOOGLE_SHEETS_LAST_HOLIDAY_URL=<URL_của_bạn>
 *    VITE_GOOGLE_SHEETS_DIE_HARD_URL=<URL_của_bạn>
 */

// Cấu hình tên các sheet theo từng phim
const SHEET_NAMES = {
  'Die Hard': 'DieHard',
  'The Nightmare Before Christmas': 'Nightmare',
  'Love Actually': 'LoveActually',
  'Last Holiday': 'LastHoliday'
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
        'Facebook/Instagram',
        'Phone',
        'Drinks',
        'Ticket Type',
        'Quantity',
        'Total Price (VND)',
        'Status'
      ]);

      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 11);
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
      data.socialMedia,
      data.phone,
      data.drinks || '',
      data.ticketType,
      data.quantity,
      data.totalPrice,
      'Pending' // Status mặc định
    ]);

    // Format dòng vừa thêm
    const lastRow = sheet.getLastRow();
    const dataRange = sheet.getRange(lastRow, 1, 1, 11);
    dataRange.setBorder(true, true, true, true, false, false);

    // Format số tiền
    const priceCell = sheet.getRange(lastRow, 10);
    priceCell.setNumberFormat('#,##0');

    // Tự động điều chỉnh độ rộng cột
    sheet.autoResizeColumns(1, 11);

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
        movie: 'Die Hard',
        showDate: '08.12.2025',
        name: 'Nguyen Van A',
        socialMedia: '@nguyenvana',
        phone: '0912345678',
        drinks: 'Trà đào, Soda chanh',
        ticketType: 'Sofa',
        quantity: 2,
        totalPrice: 300000,
        timestamp: new Date().toISOString()
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}
