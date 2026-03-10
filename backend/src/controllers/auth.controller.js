


import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../lib/db.js";
import transporter from "../lib/nodemailer.js";

// const cookieOptions = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "none",
//   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
// };


// const cookieOptions = {
//   httpOnly: true,
//   secure: true,
//   sameSite: "none",
//   path: "/",
//   maxAge: 30 * 24 * 60 * 60 * 1000
// };



const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // false on localhost, true on Render
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // lax on localhost
  path: "/",
  maxAge: 30 * 24 * 60 * 60 * 1000
};


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// ================= SIGNUP =================
// export async function signup(req, res) {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const userExists = await pool.query(
//       "SELECT * FROM users WHERE email = $1",
//       [email]
//     );

//     if (userExists.rows.length > 0) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await pool.query(
//       "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
//       [name, email, hashedPassword]
//     );

//     const token = generateToken(newUser.rows[0].id);

//     res.cookie("token", token, cookieOptions);
    
//      //sending welcome email

//     const mailOption = {
//       from: process.env.SENDER_EMAIL,
//       to: email,
//       subject: "Welcome to Wconnect",
//       text: `Welcome to Wconnect website. Your account has been created with email id: ${email} `
//     }

    

//     await transporter.sendMail(mailOption);

//     return res.status(201).json({ success: true, user: newUser.rows[0], });

    

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// }


export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    const token = generateToken(newUser.rows[0].id);

    res.cookie("token", token, cookieOptions);

    // sending welcome email (don't block signup if email fails)
    try {
      const mailOption = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Welcome to Wconnect",
        text: `Welcome to Wconnect website. Your account has been created with email id: ${email}`
      };
      await transporter.sendMail(mailOption);
    } catch (emailError) {
      console.error("Welcome email failed:", emailError.message);
    }

    return res.status(201).json({ success: true, user: newUser.rows[0] });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}




// ================= LOGIN =================
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const userData = user.rows[0];

    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(userData.id);

    res.cookie("token", token, cookieOptions);

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}



// ================= ME =================
// export async function onboarding(req, res) {
//   try {
//     const userId = req.user.id;

//     const { name, email, password } = req.body;

//     if (!name || !email || !password ) {
//       return res.status(400).json({
//         message: "All fields are required",
//         missingFields: [
//           !name && "fullName",
//           !email && "bio",
//           !password && "nativeLanguage",
//         ].filter(Boolean),
//       });
//     }

//     const updatedUser = await pool.query(
//       `UPDATE users 
//        SET name = $1,
//            password = $2,
//            email = $3,
//            is_onboarded = true
//        WHERE id = $5
//        RETURNING id, name, email, is_onboarded`,
//       [name, password, email]
//     );

//     if (updatedUser.rows.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     };
 
//      //updated
     
//      const user = updatedUser.rows[0];

//      // ✅ PLACE STREAM SYNC HERE
//      try {
//        await upsertStreamUser({
//          id: user.id.toString(), // Stream prefers string ID
//          name: user.name,
//          email: user.email,
//          password: user.password,
//        });
//      } catch (streamError) {
//        console.log("Error updating Stream user:", streamError.message);
//      }

     
//     res.status(200).json({
//       success: true,
//       user: updatedUser.rows[0],
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// }



// ================= LOGOUT =================
export function logout(req, res) {
  res.clearCookie("token", {...cookieOptions});
  
  return res.status(200).json({ 
    success: true,
    message: "Logged out successfully" 
  });
}

// send verify otp to user email

export async function sendVerifyOtp(req, res) {
  try {
    // const {userId} = req.body;
    const userId = req.user.id;


    if (!userId) {
      return res.status(400).json({success: false, message: "User ID is required",})
    };

    const userResult = await pool.query("SELECT * FROM users WHERE id = $1",[userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    };

    const user = userResult.rows[0];

    if (user.is_account_verified) {
      return res.status(400).json({
        success: false,
        message: "Account already verified",
      });
    };

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    await pool.query(`UPDATE users 
    SET verify_otp = $1,
        verify_otp_expire = $2
    WHERE id = $3`,
   [otp, expiry, userId]
   );


   const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: "Verify Your Account - OTP",
    text: `Your verification OTP is ${otp}. It expires in 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);

  return res.status(200).json({
    success: true,
    message: "Verification OTP sent successfully",
  });

    
  } catch (error) {

    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  
  }
}

//verify email

export async function verifyOtp(req, res) {
  try {
    // const { userId, otp } = req.body;
    const { otp } = req.body;
    const userId = req.user.id;

    if (!userId || !otp) {
      return res.status(400).json({
        success: false,
        message: "User ID and OTP are required",
      });
    }

    const userResult = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = userResult.rows[0];

    if (user.is_account_verified) {
      return res.status(400).json({
        success: false,
        message: "Account already verified",
      });
    }

    // Check OTP match
    if (user.verify_otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check expiry
    if (!user.verify_otp_expire || new Date() > user.verify_otp_expire) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // Mark verified & clear OTP
    await pool.query(
      `UPDATE users
       SET is_account_verified = true,
           verify_otp = NULL,
           verify_otp_expire = NULL
       WHERE id = $1`,
      [userId]
    );

    return res.status(200).json({
      success: true,
      message: "Account verified successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// to check authentication 
export async function isAuthenticated(req, res) {
  try {
    return res.json({ success: true});
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// send password reset otp


export async function sendResetOtp(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: "Email is required" });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      // return res.json({ success: false, message: "User not found" });
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
      
    }

    const user = result.rows[0];

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    await pool.query(
      `UPDATE users 
       SET reset_otp = $1,
           reset_otp_expire = $2
       WHERE email = $3`,
      [otp, expiry, email]
    );

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Reset your password",
      text: `Your OTP to reset password is ${otp}. It expires in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Reset OTP sent successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


// Reset password


export async function resetPassword(req, res) {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.json({
        success: false,
        message: "Email, otp and new password are required"
      });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = result.rows[0];

    if (user.reset_otp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (new Date(user.reset_otp_expire) < new Date()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `UPDATE users 
       SET password = $1,
           reset_otp = NULL,
           reset_otp_expire = NULL
       WHERE email = $2`,
      [hashedPassword, email]
    );

    return res.json({
      success: true,
      message: "Password reset successful"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

