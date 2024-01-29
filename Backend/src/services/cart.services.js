import Artwork from "../model/schema/artwork.schema.js"
import Cart from "../model/schema/cart.schema.js"
import Users from "../model/schema/user.schema.js"

class CartService{
  async addToCart(userId,artworkId){
    try{
      const user = await Users.findById({_id: userId})
      if(!user){
        return "User not found";
      }
      const artwork = await Artwork.findById({_id: artworkId})
      if(!artwork){
        return "Artwork not found";
      }
      const existingCart = await Cart.findOne({ user: userId, items: { $in: [artworkId] } });
      if (existingCart) {
        return "Artwork already in cart";
      }
      const cart = await Cart.findOne({user: userId})
      if(!cart){
        cart = await Cart.create({
          user: userId,
          items: [],
          totalPrice: 0
        })
        if(!cart){
          return "Cart creation failed";
        }
      }
       cart.items.push(artworkId);
        cart.totalPrice += artwork.price;
        await cart.save();
        return "Artwork added to cart successfully";
    }catch(error){
      console.error('Error during add to cart:', error);
            return error.message;
    }
  }
}

const cartService = new CartService()
export default cartService