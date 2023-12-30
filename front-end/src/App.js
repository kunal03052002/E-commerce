import './App.css';
import Nav from './components/Nav'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/login';
import PrivateComponent from './components/privateComponent';
import AddProducts from './components/AddProducts';
import ProductList from './components/ProductList';
import UpgradeProduct from './components/UpdateProduct';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Nav />
      <Routes>
      
         <Route element = {<PrivateComponent/>}>
        <Route index path="/" element={<h1><ProductList/></h1>} />
        <Route path="/add" element={<h1><AddProducts/></h1>} />
        <Route path="/update/:id" element={<h1><UpgradeProduct/></h1>} />
        <Route path="/logout" element={<h1>Logout Product</h1>} />
        <Route path="/profile" element={<h1>Profile Component</h1>} />
        </Route>
         
        <Route path = "/login" element={ <Login/> } />
        <Route path = "/signup" element={ <SignUp/> } />

      </Routes>
    </BrowserRouter>
    <Footer/>
    </div>
  );
}


export default App;





// import './App.css';
// import Nav from './components/Nav';
// import Footer from './components/Footer';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import SignUp from './components/SignUp';
// import Login from './components/login';
// import PrivateComponent from './components/privateComponent';
// import ProductList from './components/ProductList';

// import AddProducts from './components/AddProducts';
// import UpgradeProduct from './components/UpdateProduct';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Nav />
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <PrivateComponent>
//                 <Route index element={<h1><ProductList/></h1>} />
//                 {/* Additional nested routes go here */}
//                 <Route path="/add" element={<h1><AddProducts/></h1>} />
//                 <Route path="/update/:id" element={<h1><UpgradeProduct/></h1>} />
//                 <Route path="/logout" element={<h1>Logout Product</h1>} />
//                 <Route path="/profile" element={<h1>Profile Component</h1>} />
//               </PrivateComponent>
//             }
//           />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//         </Routes>
//       </BrowserRouter>
//       <Footer />
//     </div>
//   );
// }

// export default App;
