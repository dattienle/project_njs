import userService from "../services/users.services.js"


export const loginController = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await userService.login(email, password)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
export const signupController = async (req, res) => {
  const { username, email, password } = req.body
  try{
const user = await userService.signup(username, email, password)
res.status(200).json(user)
  }catch(error){
    res.status(400).json({message: error.message})
  } 
}
