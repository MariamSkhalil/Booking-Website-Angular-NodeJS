const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {Hotel} = require("../models/hotel_model")

router.post('/checkout', async (req, res) => {
  try {
    const { amount, hotelName, roomName, description } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }
    if (!hotelName || !roomName || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const hotel = await Hotel.findOne({ name: hotelName });
    if (!hotel) return res.status(404).json({ error: 'Hotel not found' });

    const room = hotel.rooms.find(r => r.name === roomName);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    if (!room.isAvailable) {
      return res.status(400).json({ error: 'Room is not available' });
    }


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: `${hotelName} - ${roomName}`, description },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://example.com/success',
      cancel_url: 'http://example.com/cancel',
    });
    room.isAvailable = false; // Mark room as unavailable after booking
    await hotel.save();

    res.status(200).json({ id: session.id , success:true});
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

module.exports = router;
