import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';
import Home from '../Components/UserRoutes/Home/Home';
import Admin from '../Components/Admin/Admin';
import Product from '../Components/UserRoutes/Product/Product';
import ListUsers from '../Components/AdminRoutes/ListUsers/ListUers';
import ListProducts from '../Components/AdminRoutes/ListProducts/ListProducts';
import User from '../Components/UserRoutes/User/User';
import Search from '../Components/UserRoutes/Search/Search';
import Cart from '../Components/UserRoutes/Cart/Cart';
import Payment from '../Components/UserRoutes/Payment/Payment';
import Order from '../Components/UserRoutes/Order/Order';
import EditUser from '../Components/UserRoutes/EditUser/EditUser';
import OrdersNotification from '../Components/UserRoutes/OrdersNotification/OrdersNotification';
import ListOrders from '../Components/AdminRoutes/ListOrders/ListOrders';
import ListReports from '../Components/AdminRoutes/ListReports/ListReports';
import ListComments from '../Components/AdminRoutes/ListComments/ListComments';
import News from '../Components/UserRoutes/News/News';
import Introduce from '../Components/UserRoutes/Introduce/Introduce';
import Support from '../Components/UserRoutes/Support/Support';
import Recruitment from '../Components/UserRoutes/Recruitment/Recruitment';
import NewsDetail from '../Components/UserRoutes/NewsDetail/NewsDetail';
import ListNews from '../Components/AdminRoutes/ListNews/ListNews';

//public route chưa login
const publicRoutes = [
    { path: '/', component: Home, navbar: true, footer: true },
    { path: '/dang-nhap', component: Login, navbar: false, footer: false },
    { path: '/dang-ky', component: Register, navbar: false, footer: false },
    { path: '/san-pham/thong-tin-chi-tiet', component: Product, navbar: true, footer: true },
    // { path: '/danh-sach-san-pham', component: Search },
    { path: '/tin-tuc', component: News, navbar: true, footer: true },
    { path: '/tin-tuc/chi-tiet-bai-viet', component: NewsDetail, navbar: true, footer: true },
    { path: '/gioi-thieu', component: Introduce, navbar: true, footer: true },
    { path: '/cham-soc-khach-hang', component: Support, navbar: true, footer: true },
    { path: '/tuyen-dung', component: Recruitment, navbar: true, footer: true },
];

//private routes đã login
const privateRoutes = [
    { path: '/admin', component: Admin, navbar: false, footer: false },
    { path: '/quan-li-nguoi-dung', component: ListUsers, navbar: false, footer: false },
    { path: '/quan-li-san-pham', component: ListProducts, navbar: false, footer: false },
    { path: '/quan-li-don-hang', component: ListOrders, navbar: false, footer: false },
    { path: '/quan-li-thong-ke', component: ListReports, navbar: false, footer: false },
    { path: '/quan-li-danh-gia-binh-luan', component: ListComments, navbar: false, footer: false },
    { path: '/quan-li-tin-tuc', component: ListNews, navbar: false, footer: false },
    // { path: '/tai-khoan', component: User },
    { path: '/tai-khoan/tai-khoan-cua-toi', component: EditUser, navbar: true, footer: true },
    { path: '/tai-khoan/don-hang', component: Order, navbar: true, footer: true },
    { path: '/tai-khoan/thong-bao', component: OrdersNotification, navbar: true, footer: true },
    { path: '/gio-hang', component: Cart, navbar: true, footer: true },
    { path: '/gio-hang/thanh-toan', component: Payment, navbar: true, footer: true },
];

export { publicRoutes, privateRoutes };
