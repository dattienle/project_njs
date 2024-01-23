
import Users from '../model/schema/user.schema.js';
import bcrypt from 'bcrypt';

class UserService {
  async login(email, password) {
    console.log(email)
    const user = await Users.findOne({ "email": email })
    console.log(user)
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid password');
    }
    return user;
  }
  async signup(username, email, password) {
    const exsitingUser = await Users.findOne({ "email": email });
    if(exsitingUser){
      throw new Error('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
      avatar: '',
      bookmark: []
    })
    await newUser.save();
    return newUser;
  }
}

const userService = new UserService();
export default userService;
