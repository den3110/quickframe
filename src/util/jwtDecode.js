import { jwtDecode } from "jwt-decode";

/**
 * Hàm để giải mã JWT
 * @param {string} token - JWT token
 * @returns {Object} - Dữ liệu được giải mã từ JWT
 */
const decodeJWT = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    return null;
  }
};

export default decodeJWT;
