import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
    required: true
}],
totalPrice: {
    type: Number,
    default: 0
}
})

const Cart = mongoose.model('cart', cartSchema)
export default Cart