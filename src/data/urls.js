const baseUrl = "http://localhost:8000";
const urls = {
  REGISTER_URL: `${baseUrl}/register`,
  LOGIN_URL: `${baseUrl}/login`,
  ADMIN_URL: `${baseUrl}/admin/`,
  CARTS_URL: `${baseUrl}/store/carts/`,
  ORDERS_ALL_URL: `${baseUrl}/orders_all/`,
  USER_CART_URL: `${baseUrl}/cart/`,
  USER_ORDERS_URL: `${baseUrl}/orders/`,
  USER_ORDERS_POSITION_URL: `${baseUrl}/orders_position/`,
  USER_CART_COUNT_URL: `${baseUrl}/cart/count/`,
  USER_SETTINGS: `${baseUrl}/settings/`,
  TELEGRAM_ORDER_CREATE: `${baseUrl}/telegram_order_create/`,
  // --
  // REGISTER_URL: "https://cakes-node.onrender.com/register",
  // LOGIN_URL: "https://cakes-node.onrender.com/login",
  // ADMIN_URL: "https://cakes-node.onrender.com/admin/",
  // CARTS_URL: "https://cakes-node.onrender.com/store/carts/",
  // USER_CART_URL: "https://cakes-node.onrender.com/cart/",
  // USER_ORDERS_URL: "https://cakes-node.onrender.com/orders/",
  // USER_ORDERS_POSITION_URL: "https://cakes-node.onrender.com/orders_position/",
  // USER_CART_COUNT_URL: "https://cakes-node.onrender.com/cart/count/",
  // USER_SETTINGS: "https://cakes-node.onrender.com/settings/",
};
export default urls;
