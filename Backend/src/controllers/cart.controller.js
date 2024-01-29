import cartService from "../services/cart.services.js";

export const cartController = async (req, res) => {
try{
  const { userId} = req.decodedAuthorization
  const {artworkId} = req.body;
  const message = await cartService.addToCart(userId,artworkId)
  return res.status(200).json({message})
}catch(error){
  res.status(500).json({ message: 'Internal Server Error' });
  
}
}