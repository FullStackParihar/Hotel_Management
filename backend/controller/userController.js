
// const User = require('../model/userModel');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const nodemailer = require('nodemailer');
// const { patch } = require('../routes/userRoutes');
// dotenv = require('dotenv');
// dotenv.config();

// // In-memory OTP store (use Redis or DB in production)
// const otpStore = new Map();

// const userController = {
//   signup: async (req, res) => {
//     try {
//       const { firstname, lastname, email, phone, password, gender, age } = req.body;
//       if (!firstname || !lastname || !email || !phone || !password) {
//         return res.status(400).json({ message: 'Please provide all required fields' });
//       }
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ message: 'Email already registered' });
//       }

//       // Generate OTP
//       const otp = Math.floor(100000 + Math.random() * 900000).toString();
//       otpStore.set(email, { otp, expires: Date.now() + 10 * 60 * 1000 }); // 10-minute expiry

//       // Send OTP via email (configure nodemailer)
//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: process.env.email,
//           pass: process.env.pass,
//         },
//       });

//       await transporter.sendMail({
//         from: process.env.email,
//         to: email,
//         subject: 'Hotel management - OTP for Signup',
//         text: `Your OTP for signup is ${otp}. It is valid for 10 minutes.`,
//       });

//       // Store user data temporarily (until OTP verification)
//       otpStore.set(email, {
//         ...otpStore.get(email),
//         userData: { firstname, lastname, email, phone, password, gender, age, role: 'user' },
//       });

//       res.status(200).json({ message: 'OTP sent to your email' });
//     } catch (error) {
//       console.error('Signup error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   },

//   verifyOtp: async (req, res) => {
//     try {
//       const { email, otp } = req.body;
//       if (!email || !otp) {
//         return res.status(400).json({ message: 'Email and OTP are required' });
//       }

//       const stored = otpStore.get(email);
//       if (!stored || stored.otp !== otp || Date.now() > stored.expires) {
//         return res.status(400).json({ message: 'Invalid or expired OTP' });
//       }

//       // Create user
//       const { firstname, lastname, phone, password, gender, age, role } = stored.userData;
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = new User({
//         firstname,
//         lastname,
//         email,
//         phone,
//         password: hashedPassword,
//         gender,
//         age,
//         role,
//       });
//       await user.save();

//       // Generate JWT
//       const token = jwt.sign(
//         { _id: user._id, email: user.email, role: user.role },
//         process.env.secretKey,
//         { expiresIn: '7d' }
//       );

//       // Clear OTP
//       otpStore.delete(email);

//       res.json({
//         token,
//         user: {
//           _id: user._id,
//           email: user.email,
//           firstname: user.firstname,
//           lastname: user.lastname,
//           role: user.role,
//         },
//       });
//     } catch (error) {
//       console.error('Verify OTP error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   },

//   login: async (req, res) => {
//     try {
//       const { email, password } = req.body;


//       if (!email || !password) {
//         return res.status(400).json({ message: 'Please provide email and password' });
//       }
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }
//       const token = jwt.sign(
//         { _id: user._id, email: user.email, role: user.role || 'user' },
//         process.env.secretKey,
//         { expiresIn: '7d' }
//       );
//       res.json({
//         token,
//         user: {
//           _id: user._id,
//           email: user.email,
//           firstname: user.firstname,
//           lastname: user.lastname,
//           role: user.role || 'user',
//         },
//       });
//     } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   },

//   getUsers: async (req, res) => {
//     try {
//       const users = await User.find().select('firstname lastname email isDisabled');
//       res.json({ userData: users });
//     } catch (error) {
//       console.error('getUsers error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   },
//   patch: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const updates = req.body;
//       const user = await User.findByIdAndUpdate(id, updates, { new: true });
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       res.json({ user });
//     } catch (error) {
//       console.error('Update user error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   },
//   forgot: async (req, res) => {
//     try {
//       const { email } = req.body;
//       if (!email) {
//         return res.status(400).json({ message: 'Email is required' });
//       }
//       if (!existingUser.test(email)) {
//         return res.status(400).json({ message: 'Invalid email format' });
//       }

//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
 
//       const otp = Math.floor(100000 + Math.random() * 900000).toString();
//       otpStore.set(email, { otp, expires: Date.now() + 10 * 60 * 1000, type: 'forgot' });
 
//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: process.env.email,
//           pass: process.env.pass,
//         },
//       });

//       await transporter.sendMail({
//         from: process.env.user,
//         to: email,
//         subject: 'hotel management - OTP for Password Reset',
//         text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`,
//       });

//       console.log(`Forgot - OTP sent to ${email}: ${otp}`);
//       res.status(200).json({ message: 'OTP sent to your email' });
//     } catch (error) {
//       console.error('Forgot password error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   },

// };

// module.exports = userController;

const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// In-memory OTP store (use Redis or DB in production)
const otpStore = new Map();

// Basic email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Basic phone validation regex (10-12 digits, optional +)
const phoneRegex = /^\+?\d{10,12}$/;

const userController = {
  signup: async (req, res) => {
    try {
      const { firstname, lastname, email, phone, password, gender, age } = req.body;
      if (!firstname || !lastname || !email || !phone || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: 'Invalid phone number format (10-12 digits)' });
      }
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Hash password early
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      otpStore.set(email, { otp, expires: Date.now() + 10 * 60 * 1000 });

      // Send OTP via email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.email,
          pass: process.env.pass,
        },
      });

      await transporter.sendMail({
        from: process.env.email,
        to: email,
        subject: 'TaskManagerPro - OTP for Signup',
        text: `Your OTP for signup is ${otp}. It is valid for 10 minutes.`,
      });

      // Store user data with hashed password
      otpStore.set(email, {
        ...otpStore.get(email),
        userData: { firstname, lastname, email, phone, password: hashedPassword, gender, age, role: 'user' },
      });

      console.log(`Signup - OTP sent to ${email}: ${otp}`);
      res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  verifyOtp: async (req, res) => {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
      }

      const stored = otpStore.get(email);
      if (!stored || stored.otp !== otp || Date.now() > stored.expires) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
      }

      // Create user
      const { firstname, lastname, phone, password, gender, age, role } = stored.userData;
      const user = new User({
        firstname,
        lastname,
        email,
        phone,
        password,  
        gender,
        age,
        role,
      });
      await user.save();

      // Generate JWT
      const token = jwt.sign(
        { _id: user._id, email: user.email, role: user.role },
        process.env.secretKey,
        { expiresIn: '7d' }
      );

      // Clear OTP
      otpStore.delete(email);

      console.log(`Verify OTP - User created: ${email}`);
      res.json({
        token,
        user: {
          _id: user._id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Verify OTP error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
      }
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const token = jwt.sign(
        { _id: user._id, email: user.email, role: user.role || 'user' },
        process.env.secretKey,
        { expiresIn: '7d' }
      );
      res.json({
        token,
        user: {
          _id: user._id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role || 'user',
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find().select('firstname lastname email isDisabled');
      res.json({ userData: users });
    } catch (error) {
      console.error('getUsers error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  patch: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({
        user: {
          _id: user._id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          phone: user.phone,
          gender: user.gender,
          age: user.age,
          role: user.role,
          isDisabled: user.isDisabled,
        },
      });
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  forgot: async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      otpStore.set(email, { otp, expires: Date.now() + 10 * 60 * 1000, type: 'forgot' });

      // Send OTP via email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.email,
          pass: process.env.pass,
        },
      });

      await transporter.sendMail({
        from: process.env.email,
        to: email,
        subject: 'TaskManagerPro - OTP for Password Reset',
        text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`,
      });

      console.log(`Forgot - OTP sent to ${email}: ${otp}`);
      res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;
      if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: 'Email, OTP, and new password are required' });
      }
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ message: 'New password must be at least 6 characters' });
      }

      const stored = otpStore.get(email);
      if (!stored || stored.otp !== otp || Date.now() > stored.expires || stored.type !== 'forgot') {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      // Clear OTP
      otpStore.delete(email);

      console.log(`Reset Password - Password updated for ${email}`);
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
};

module.exports = userController;