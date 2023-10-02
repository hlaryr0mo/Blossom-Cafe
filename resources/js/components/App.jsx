//rafce
//#region imports
import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Signin from "./Signin";
import Signup from "./Signup";
import Error from "./Error";
import Dashboard from './Dashboard';

import ShowCategory from "./Category/ShowCategory";
import CreateCategory from "./Category/CreateCategory";
import EditCategory from "./Category/EditCategory";
import ViewCategory from "./Category/ViewCategory";
import ShowSubCategory from "./SubCategory/ShowSubCategory";
import CreateSubCategory from "./SubCategory/CreateSubCategory";
import EditSubCategory from "./SubCategory/EditSubCategory";
import ViewSubCategory from "./SubCategory/ViewSubCategory";
import ShowSale from "./Sales/ShowSales";
import ShowProducts from "./Products/ShowProducts";
import CreateProduct from './Products/CreateProducts';
import EditProduct from './Products/EditProduct';
import ViewProduct from './Products/ViewProducts';
import CreateSale from "./Sales/CreateSale";
import EditSale from "./Sales/EditSale";
import ViewSale from "./Sales/ViewSales";
import ShowSale_Details from './Sales_Details/ShowSales_Detail';
import CreateSale_Details from './Sales_Details/CreateSales_Details';
import EditSales_Details from './Sales_Details/EditSales_Details';

import '../../css/index.css';
import Pages from './MainMenu/Pages';
import MainMenu from './MainMenu/MainMenu';
import Cuisine from './MainMenu/Cuisine';
import Category from './MainMenu/Category';
import Searched from './MainMenu/Searched';
//#endregion

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/BlossomCafeFINAL/public/' element={<Home />} />
          <Route path='/BlossomCafeFINAL/public/signin' element={<Signin />} />
          <Route path='/BlossomCafeFINAL/public/signup' element={<Signup />} />
          
          <Route path='/error' element={<Error />} />
          
          <Route path='/BlossomCafeFINAL/public/dashboard' element={<Dashboard />} />
          
          <Route exat path='/BlossomCafeFINAL/public/categories' element={<ShowCategory />} />
          <Route path='/BlossomCafeFINAL/public/category' element={<CreateCategory />} />
          <Route path='/BlossomCafeFINAL/public/categories/edit/:id' element={<EditCategory />} />
          <Route path='/BlossomCafeFINAL/public/categories/view/:id' element={<ViewCategory />} />

          <Route exat path='/BlossomCafeFINAL/public/products' element={<ShowProducts />} />
          <Route path='/BlossomCafeFINAL/public/product/create' element={<CreateProduct/>} />
          <Route path='/BlossomCafeFINAL/public/product/update/:id' element={<EditProduct />} />
          <Route path='/BlossomCafeFINAL/public/product/view/:id' element={<ViewProduct />} />

          <Route exat path='/BlossomCafeFINAL/public/subcategories' element={<ShowSubCategory />} />
          <Route exat path='/BlossomCafeFINAL/public/subcategories/create' element={<CreateSubCategory />} />
          <Route exat path='/BlossomCafeFINAL/public/subcategory/update/:id' element={<EditSubCategory />} />
          <Route exat path='/BlossomCafeFINAL/public/subcategory/view/:id' element={<ViewSubCategory />} />

          <Route exat path='/BlossomCafeFINAL/public/sales' element={<ShowSale />} />
          <Route exat path='/BlossomCafeFINAL/public/sales/create' element={<CreateSale />} />
          <Route exat path='/BlossomCafeFINAL/public/sale/update/:id' element={<EditSale />} />
          <Route exat path='/BlossomCafeFINAL/public/sale/view/:id' element={<ViewSale />} />


          <Route exat path='/BlossomCafeFINAL/public/sales_details' element={<ShowSale_Details />} />
          <Route exat path='/BlossomCafeFINAL/public/sale_detail/create' element={<CreateSale_Details />} />
          <Route exat path='/BlossomCafeFINAL/public/sale_detail/update/:id' element={<EditSales_Details />} />
          
          <Route path='/BlossomCafeFINAL/public/Pages' element={<Pages />} />
          <Route path='/BlossomCafeFINAL/public/CategoryMenu' element={<Category />} />
          <Route path='/BlossomCafeFINAL/public/MainMenu' element={<MainMenu />} />
          <Route path='/BlossomCafeFINAL/public/cuisine/:type' element={<Cuisine />} />
          <Route path='/BlossomCafeFINAL/public/searched/:search' element={<Searched />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}