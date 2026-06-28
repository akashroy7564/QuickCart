import { createBrowserRouter, RouterProvider } from "react-router";
import Home from"./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Productdetails from "./pages/ProductDetails.jsx";
import AddProduct from "./admin/AddProduct.jsx";
import EditProduct from "./admin/EditProduct.jsx";
import ProductsList from "./admin/ProductList.jsx";
import Cart from "./pages/Cart.jsx";
import Product from "./pages/Product.jsx";
import DemoPage from "./pages/DemoPage.jsx";
import Admin from "./admin/AdminPage.jsx";
import CheckoutAddress from "./pages/checkAddress.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx"
import Orders from "./admin/Order.jsx";
import Contact from "./admin/Contact.jsx";
import About from "./pages/About.jsx";
import AdminRoute from "./component/AdminRoute.jsx";
import MyOrder from "./pages/myOrder.jsx";
import MyOrders from "./pages/myOrder.jsx";


const router = createBrowserRouter([
  // {path:"/", element: <DemoPage/>},
  {path:"/", element: <Home/>},
  {path:"/login", element: <Login/>},
  {path:"/Signup", element: <Signup/>},
  {path:"/product/:id", element: <Productdetails/>},
  {path:"/cart", element: <Cart/>},
  {path:"/products", element: <Product/>},
  {path:"/checkAddress", element: <CheckoutAddress/>},
  {path:"/checkout", element: <Checkout/>},
  {path:"/success/:id", element: <OrderSuccess/>},
  {path:"/about",element:<About/>},
  {path:"/my-order",element:<MyOrders/>},

  

  //admin panel
  {path:"/admin", element: (<AdminRoute> <Admin/> </AdminRoute >),
  children:[
  {path:"products", element:<ProductsList/>},
  {path:"products/add", element:<AddProduct/>},
  {path:"products/update/:id", element:<EditProduct/>},
  {path:"orders", element:<Orders/>},
  {path:"contact",element :<Contact/>}
  ]
}
  
])



export default function App(){
  return <RouterProvider router={router}/>
}