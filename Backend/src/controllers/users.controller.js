import Users from "../model/schema/user.schema.js"
import userService from "../services/users.services.js"


export const loginController = async (req, res) => {
  try {
  const user = req.user
  const user_id = user._id
    const userResult = await userService.login(user_id)
    res.status(200).json(userResult)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
export const registerController = async (req, res) => {
  console.log(req.body)
  try{
    const result = await userService.signup(req.body)
    return res.json({
      message: 'Register success',
    result
    })
  }catch(error){
    res.status(400).json({ message: error.message })
  }
 
}
export const logoutController = async (req, res) => {
 
  try {
    const { refresh_token } = req.body
    const result = await userService.logout(refresh_token)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
export const getUserProfileController = async (req, res) => {
  // console.log(req.decodedAuthorization)
  
  try{
    const  {userId} = req.decodedAuthorization
    const user = await userService.getUserProfile(userId)
    res.status(200).json(user)
  }catch(error){
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
export const deleteUserProfileController = async (req, res) => {


  try {
    const { userId } = req.decodedAuthorization;
    const { userId: paramUserId  } = req.params;
  
    // Kiểm tra vai trò của người dùng từ cơ sở dữ liệu
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Kiểm tra nếu người dùng có vai trò admin mới được xóa
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied' });
    }

    // Xóa người dùng
    const deletedUser = await userService.deleteUserProfile(paramUserId);
    res.status(200).json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
export const updateMeController = async (req, res) => {

 try{
  const { userId } = req.decodedAuthorization;
  const {body} = req;
  const user = await userService.updateMe(userId, body)
  res.status(200).json(user)
 }catch(error){
  res.status(500).json({ message: 'Internal Server Error' });
 }

}