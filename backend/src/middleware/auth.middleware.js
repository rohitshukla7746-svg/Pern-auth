// import jwt from "jsonwebtoken";
// import pool from "../lib/db.js";

// export const protect = async (req, res, next) => {
//   try {
//     const token = req.cookies?.token;

//     if (!token) {
//       return res.status(401).json({ message: "Not authorized, login again" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await pool.query(
//       "SELECT id, name, email FROM users WHERE id = $1",
//       [decoded.id]
//     );

//     if (user.rows.length === 0) {
//       return res.status(401).json({ message: "Not authorized, user not found" });
//     }

//     req.user = user.rows[0];

//     next();

//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({ message: "Not authorized, token failed" });
//   }
// };

// second

// import jwt from "jsonwebtoken";

// const middlewareAuth = async  (req, res, next) => {
//   const {token} =  req.cookies;

//   if (!token) {
//     return res.json({success: false, message: "Not authorized"})
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if(decoded.id) {
//       req.body.userId = decoded.id
//     }else {
//       return res.json({success: false, message: "Not authorized"})
//     }

//     next();
//   } catch (error) {
//     return res.json({success: false, message: error.message})
//   }
// }

import jwt from "jsonwebtoken";

export const middlewareAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // Attach verified user data
    req.user = { id: decoded.id };

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token verification failed",
    });
  }
};
