import pool from "../lib/db.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    const user = result.rows[0];

    res.json({
      success: true,
      userData: {
        name: user.name,
        is_account_verified: user.is_account_verified,
      }
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};
