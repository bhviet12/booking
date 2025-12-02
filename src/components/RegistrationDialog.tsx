import { useState } from 'react'
import type { Movie } from './MovieList'
import { sendToGoogleSheets } from '../config/api'
import menuPlaceholder from '../assets/logo không hình@4x.png'

interface RegistrationDialogProps {
  movie: Movie
  onClose: () => void
}

export default function RegistrationDialog({ movie, onClose }: RegistrationDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    socialMedia: '',
    phone: '',
    ticketType: 'Sofa' as 'Sofa' | 'Ghế thường',
    quantity: 1,
    drinks: ''
  })
  const [showMenu, setShowMenu] = useState(false)

  const selectedTicketType = movie.ticketTypes.find(t => t.type === formData.ticketType)
  const totalPrice = selectedTicketType ? selectedTicketType.price * formData.quantity : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check availability
    if (selectedTicketType && formData.quantity > selectedTicketType.availableSeats) {
      alert(`Chỉ còn ${selectedTicketType.availableSeats} ghế loại ${formData.ticketType}!`)
      return
    }

    const registrationData = {
      movie: movie.title,
      showDate: movie.showDate,
      name: formData.name,
      socialMedia: formData.socialMedia,
      phone: formData.phone,
      ticketType: formData.ticketType,
      quantity: formData.quantity,
      drinks: formData.drinks,
      totalPrice: totalPrice,
      timestamp: new Date().toISOString()
    }

    // Send to Google Sheets (specific sheet for this movie)
    const result = await sendToGoogleSheets(registrationData, movie.googleSheetUrl)

    if (result.success) {
      alert(`Đăng ký thành công!\n\nThông tin của bạn đã được ghi nhận.\n\nVui lòng chuyển khoản: ${totalPrice.toLocaleString('vi-VN')}đ\n\n${movie.bankInfo.bankName}\nSTK: ${movie.bankInfo.accountNumber}\nChủ TK: ${movie.bankInfo.accountName}\n\nNội dung: ${formData.name} ${movie.title}`)
    } else {
      // Even if Google Sheets fails, still show success to user
      console.warn('Google Sheets error:', result.message)
      alert(`Đăng ký thành công!\n\nVui lòng chuyển khoản: ${totalPrice.toLocaleString('vi-VN')}đ\n\n${movie.bankInfo.bankName}\nSTK: ${movie.bankInfo.accountNumber}\nChủ TK: ${movie.bankInfo.accountName}\n\nNội dung: ${formData.name} ${movie.title}`)
    }

    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'quantity' ? parseInt(value) : value
    })
  }

  return (
    <>
      {/* Dialog wrapper with backdrop */}
      <div
        className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold"
          >
            ×
          </button>

          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Đăng ký xem phim
          </h2>
          <p className="text-gray-600 mb-4">
            {movie.title}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Họ và tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Nhập họ và tên"
              />
            </div>

            <div>
              <label htmlFor="socialMedia" className="block text-sm font-semibold text-gray-700 mb-2">
                Facebook/Instagram
              </label>
              <input
                type="text"
                id="socialMedia"
                name="socialMedia"
                required
                value={formData.socialMedia}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="@username hoặc link profile"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="0912345678"
              />
            </div>

            {/* Drinks Selection */}
            <div>
              <label htmlFor="drinks" className="block text-sm font-semibold text-gray-700 mb-2">
                Đồ uống
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="drinks"
                  name="drinks"
                  value={formData.drinks}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Nhập đồ uống bạn muốn"
                />
                <button
                  type="button"
                  onClick={() => setShowMenu(true)}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 whitespace-nowrap"
                >
                  Xem Menu
                </button>
              </div>
            </div>

            {/* Ticket Type Selection */}
            <div>
              <label htmlFor="ticketType" className="block text-sm font-semibold text-gray-700 mb-2">
                Loại vé
              </label>
              <select
                id="ticketType"
                name="ticketType"
                required
                value={formData.ticketType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {movie.ticketTypes.map(ticket => (
                  <option key={ticket.type} value={ticket.type}>
                    {`${ticket.type} - ${ticket.description} - ${ticket.price.toLocaleString('vi-VN')}đ (Còn ${ticket.availableSeats}/${ticket.maxSeats} ghế)`}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Selection */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">
                Số lượng vé
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max={selectedTicketType?.availableSeats || 1}
                required
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Total Price Display */}
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Tổng tiền:</span>
                <span className="text-2xl font-bold text-red-600">
                  {totalPrice.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>

            {/* Bank Info */}
            <div className="bg-blue-50 p-4 rounded-lg text-sm">
              <p className="font-semibold text-gray-700 mb-2">Thông tin chuyển khoản:</p>
              <p className="text-gray-600">Ngân hàng: {movie.bankInfo.bankName}</p>
              <p className="text-gray-600">STK: {movie.bankInfo.accountNumber}</p>
              <p className="text-gray-600">Chủ TK: {movie.bankInfo.accountName}</p>
              <p className="text-red-600 font-semibold mt-2">Nội dung: [Tên] {movie.title}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Xác nhận đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Menu Dialog */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/90 z-[70] flex items-center justify-center p-4"
          onClick={() => setShowMenu(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowMenu(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold z-10"
            >
              ×
            </button>

            {/* Menu Header */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Menu Đồ Uống
            </h3>

            {/* Menu Image - Temporary placeholder */}
            <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4">
              <img
                src={menuPlaceholder}
                alt="Menu đồ uống"
                className="max-w-full max-h-[60vh] h-auto rounded-lg object-contain"
              />
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              (Thay ảnh menu thật vào src/assets/)
            </p>

            {/* Close button at bottom */}
            <button
              onClick={() => setShowMenu(false)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  )
}
