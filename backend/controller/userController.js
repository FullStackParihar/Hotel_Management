 
// const User = require('../model/userModel');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');
// const secretKey = process.env.secretKey || 'asdfghjkl';
// dotenv.config();

// // OTP store (in-memory, not persistent — replace with DB in production)
// const otpStore = new Map();

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const phoneRegex = /^\+?\d{10,12}$/;

// // Middleware to verify JWT
// // exports.verifyToken = async (req, res, next) => {
// //   try {
// //     const token = req.headers.authorization?.split(' ')[1];
// //     if (!token) return res.status(401).json({ message: 'No token provided' });

// //     if (! process.env.secretKey || 'defaultSecretKey') throw new Error('JWT secret key is not defined');

// //     const decoded = jwt.verify(token,  process.env.secretKey || 'defaultSecretKey');
// //     console.log('this is secretkey', process.env.secretKey || 'defaultSecretKey');
    
// //     req.user = decoded;
// //     next();
// //   } catch (error) {
// //     console.error('Token verification error:', error);
// //     if (error.name === 'TokenExpiredError') {
// //       return res.status(401).json({ message: 'Token expired' });
// //     }
// //     return res.status(401).json({ message: 'Invalid token' });
// //   }
// // };

// exports.verifyToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'No token provided' });
//     console.log('Signing token with secret:', process.env.secretKey);
//     // Use a consistent secret key
//     const secretKey = process.env.secretKey || 'asdfghjkl';
    
//     // Log the secret being used (remove in production)
//     console.log('Verifying token with secret:', secretKey);
    
//     const decoded = jwt.verify(token, secretKey);
    
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error('Token verification error:', error);
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: 'Token expired' });
//     }
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };

// // Signup for normal user
// exports.signup = async (req, res) => {
//   try {
//     const { firstname, lastname, email, phone, password, gender, age } = req.body;
//     if (!firstname || !lastname || !email || !phone || !password) {
//       return res.status(400).json({ message: 'Please provide all required fields' });
//     }
//     if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email format' });
//     if (!phoneRegex.test(phone)) return res.status(400).json({ message: 'Invalid phone number format' });
//     if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'Email already registered' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.email,
//         pass: process.env.pass,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.email,
//       to: email,
//       subject: 'TaskManagerPro - OTP for Signup',
//       text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
//     });

//     otpStore.set(email, {
//       otp,
//       expires: Date.now() + 10 * 60 * 1000,
//       userData: { firstname, lastname, email, phone, password: hashedPassword, gender, age, role: 'user' },
//     });

//     res.status(200).json({ message: 'OTP sent to your email' });
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Admin signup
// // exports.signupAdmin = async (req, res) => {
// //   try {
// //     const { firstname, lastname, email, phone, password, gender, age, adminSecret } = req.body;
// //     if (!firstname || !lastname || !email || !phone || !password || !adminSecret) {
// //       return res.status(400).json({ message: 'Please provide all required fields' });
// //     }
// //     if (adminSecret !== process.env.ADMIN_SECRET) {
// //       return res.status(403).json({ message: 'Invalid admin secret' });
// //     }

// //     if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email format' });
// //     if (!phoneRegex.test(phone)) return res.status(400).json({ message: 'Invalid phone number format' });
// //     if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });

// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) return res.status(400).json({ message: 'Email already registered' });

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const user = new User({ firstname, lastname, email, phone, password: hashedPassword, gender, age, role: 'admin' });
// //     await user.save();

// //     res.status(200).json({ message: 'Admin user created successfully' });
// //   } catch (error) {
// //     console.error('Signup admin error:', error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };

// // OTP Verification
// exports.verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     if (!email || !otp) {
//       return res.status(400).json({ message: 'Email and OTP are required' });
//     }

//     const stored = otpStore.get(email);
//     if (!stored || stored.otp !== otp || Date.now() > stored.expires) {
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//     const { firstname, lastname, phone, password, gender, age, role } = stored.userData;
//     const user = new User({ firstname, lastname, email, phone, password, gender, age, role });
//     await user.save();

//     otpStore.delete(email);

//     if (! process.env.secretKey || 'defaultSecretKey') throw new Error('JWT secret key is not defined');
//     const token = jwt.sign({ _id: user._id, email: user.email, role: user.role },  process.env.secretKey || 'defaultSecretKey', {
//       expiresIn: '7d',
//     });

//     console.log('Verify OTP - Token generated:', token, 'Role:', user.role);

//     res.json({
//       token,
//       user: {
//         _id: user._id,
//         email: user.email,
//         firstname: user.firstname,
//         lastname: user.lastname,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error('Verify OTP error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Login
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ message: 'Please provide email and password' });
//     if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email format' });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
// console.log("this is token secret key-----------------------",process.env.secretKey);

//     if (!process.env.secretKey) throw new Error('JWT secret key is not defined');
//     const token = jwt.sign({ _id: user._id, email: user.email, role: user.role },  process.env.secretKey || 'defaultSecretKey', {
//       expiresIn: '7d',
//     });

//     console.log('Login - Token generated:', token, 'Role:', user.role);

//     res.json({
//       token,
//       user: {
//         _id: user._id,
//         email: user.email,
//         firstname: user.firstname,
//         lastname: user.lastname,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Get current user
// exports.getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('firstname lastname email role');
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     console.log('GetMe - User role:', user.role);
//     res.json({ user });
//   } catch (error) {
//     console.error('Get user error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Get all users (Admin only)
// exports.getUsers = async (req, res) => {
//   try {
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Access denied. Admins only.' });
//     }
//     const users = await User.find().select('firstname lastname email isDisabled');
//     res.json({ userData: users });
//   } catch (error) {
//     console.error('getUsers error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Patch user
// exports.patch = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;

//     const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json({
//       user: {
//         _id: user._id,
//         email: user.email,
//         firstname: user.firstname,
//         lastname: user.lastname,
//         phone: user.phone,
//         gender: user.gender,
//         age: user.age,
//         role: user.role,
//         isDisabled: user.isDisabled,
//       },
//     });
//   } catch (error) {
//     console.error('Update user error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Forgot password
// exports.forgot = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) {
//       return res.status(400).json({ message: 'Email is required' });
//     }
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ message: 'Invalid email format' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     otpStore.set(email, { otp, expires: Date.now() + 10 * 60 * 1000, type: 'forgot' });

//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.email,
//         pass: process.env.pass,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.email,
//       to: email,
//       subject: 'TaskManagerPro - OTP for Password Reset',
//       text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`,
//     });

//     console.log(`Forgot - OTP sent to ${email}: ${otp}`);
//     res.status(200).json({ message: 'OTP sent to your email' });
//   } catch (error) {
//     console.error('Forgot password error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Reset password
// exports.resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;
//     if (!email || !otp || !newPassword) {
//       return res.status(400).json({ message: 'Email, OTP, and new password are required' });
//     }
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ message: 'Invalid email format' });
//     }
//     if (newPassword.length < 6) {
//       return res.status(400).json({ message: 'New password must be at least 6 characters' });
//     }

//     const stored = otpStore.get(email);
//     if (!stored || stored.otp !== otp || Date.now() > stored.expires || stored.type !== 'forgot') {
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     await user.save();

//     otpStore.delete(email);

//     console.log(`Reset Password - Password updated for ${email}`);
//     res.status(200).json({ message: 'Password reset successfully' });
//   } catch (error) {
//     console.error('Reset password error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const secretKey = process.env.secretKey || 'asdfghjkl';
dotenv.config();

// OTP store (in-memory, not persistent — replace with DB in production)
const otpStore = new Map();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{10,12}$/;

// Middleware to verify JWT
exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    console.log('Signing token with secret:', process.env.secretKey);
    // Use a consistent secret key
    const secretKey = process.env.secretKey || 'asdfghjkl';
    
    // Log the secret being used (remove in production)
    console.log('Verifying token with secret:', secretKey);
    
    const decoded = jwt.verify(token, secretKey);
    
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Signup for normal user
exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password, gender, age } = req.body;
    if (!firstname || !lastname || !email || !phone || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email format' });
    if (!phoneRegex.test(phone)) return res.status(400).json({ message: 'Invalid phone number format' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

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
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    });

    otpStore.set(email, {
      otp,
      expires: Date.now() + 10 * 60 * 1000,
      userData: { firstname, lastname, email, phone, password: hashedPassword, gender, age, role: 'user' },
    });

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// OTP Verification
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const stored = otpStore.get(email);
    if (!stored || stored.otp !== otp || Date.now() > stored.expires) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const { firstname, lastname, phone, password, gender, age, role } = stored.userData;
    const user = new User({ firstname, lastname, email, phone, password, gender, age, role });
    await user.save();

    otpStore.delete(email);

    const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, secretKey, {
      expiresIn: '7d',
    });

    console.log('Verify OTP - Token generated:', token, 'Role:', user.role);

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
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Please provide email and password' });
    if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email format' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, secretKey, {
      expiresIn: '7d',
    });

    console.log('Login - Token generated:', token, 'Role:', user.role);

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
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user
// exports.getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('firstname lastname email role');
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     console.log('GetMe - User role:', user.role);
//     res.json({ user });
//   } catch (error) {
//     console.error('Get user error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('firstname lastname email phone gender age role');
    if (!user) return res.status(404).json({ message: 'User not found' });
    console.log('GetMe - User role:', user.role);
    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users (Admin only)
exports.getUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const users = await User.find().select('firstname lastname email isDisabled');
    res.json({ userData: users });
  } catch (error) {
    console.error('getUsers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Patch user
exports.patch = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

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
};

// Forgot password
exports.forgot = async (req, res) => {
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

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, { otp, expires: Date.now() + 10 * 60 * 1000, type: 'forgot' });

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
};

// Reset password
exports.resetPassword = async (req, res) => {
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

    otpStore.delete(email);

    console.log(`Reset Password - Password updated for ${email}`);
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update current user
exports.updateMe = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, gender, age } = req.body;

    // Validate input
    if (!firstname || !lastname || !email || !phone) {
      return res.status(400).json({ message: 'Firstname, lastname, email, and phone are required' });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }
    if (gender && !['male', 'female', 'other'].includes(gender)) {
      return res.status(400).json({ message: 'Invalid gender. Must be male, female, or other' });
    }
    if (age && (isNaN(age) || age < 1 || age > 120)) {
      return res.status(400).json({ message: 'Invalid age. Must be between 1 and 120' });
    }

    // Check if email is already taken by another user
    const existingUser = await User.findOne({ email, _id: { $ne: req.user._id } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered by another user' });
    }

    // Prepare updates
    const updates = {
      firstname,
      lastname,
      email,
      phone,
      ...(gender && { gender }),
      ...(age && { age }),
    };

    // Update user
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('firstname lastname email phone gender age role');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        age: user.age,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Update me error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};