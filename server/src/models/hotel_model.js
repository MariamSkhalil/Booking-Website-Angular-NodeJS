const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  isAvailable: { type: Boolean, default: true },
});

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rooms: [RoomSchema],
});

const Hotel = mongoose.model('Hotel', HotelSchema);

const createHotel = async () => {
  try {
    const sampleHotel = new Hotel({
      name: "Grand Plaza",
      rooms: [
        { name: "Deluxe Room", price: 150, description: "Spacious room with a sea view", isAvailable: true },
        { name: "Standard Room", price: 100, description: "Comfortable room with basic amenities", isAvailable: true }
      ]
    });
    await sampleHotel.save();
    console.log('Hotel created successfully:', sampleHotel);
  } catch (error) {
    console.error('Error creating hotel:', error);
  }
};

module.exports = { Hotel, createHotel };

