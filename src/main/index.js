// import './index.css';

// function MainPage() {
//     return (
//          <div>
//         <div id="header">
//         <div id="header-area">
//             <img src="images/icons/logo.png"/>
//         </div>
//         </div>
//         <div id="body">
//             <div id = "banner">
//             <img src="images/banners/banner1.png">
//         </div>
//         <h1>products</h1>
//             <div id="product-list">
//                 <div className="product-card">
//                     <div>
//                         <img className="product-img" src="images/products/keyboard1.jpg"/>

//                     </div>
//                     <div className ="product contents">
//                         <span className="product-name">
//                             키보드
//                         </span>
//                         <span className="product-price">
//                             50000원
//                         </span>

//                         <div className = "product-seller">
//                             <img className="product-avatar" src="images/icons/avatar.png"/>
//                             <span>그랩</span>
//                         </div>
//                     </div>


//                 </div>
               
    
           
           
         
//         </div>
//     </div>
    
//         <div id="footer"></div>
        
//         </div>

//         );
// }

// export default MainPage;

import './index.css';
import axios from 'axios';
import React from 'react';

function MainPage() {
 const [products, setProducts] = React.useState([]);
  React.useEffect(function(){  
    axios.get("https://f0c7de27-a13c-4ce3-8175-542458c520a3.mock.pstmn.io/product").then(function(result){
    const products = result.data.products;
    setProducts(products);
  
    }).catch(function(error){
      console.error("에러 발생: ", error);
      
    });

  }
, []);
 
  return (
    <div>
      <div id="header">
        <div id="header-area">
          <img src="images/icons/logo.png" />
        </div>
      </div>
      <div id="body">
        <div id="banner">
          <img src="images/banners/banner1.png" />
        </div>
        <h1>판매되는 상품들</h1>
        <div id="product-list">

          {
            products.map(function(product, index){
                return (
                  <div className="product-card">
                  <div>
                    <img
                      className="product-img"
                      src={product.imageUrl}
                    />
                  </div>
                  <div className="product-contents">
                    <span className="product-name">{product.name}</span>
                    <span className="product-price">{product.price}</span>
                    <div className="product-seller">
                      <img className="product-avatar" src="images/icons/avatar.png" />
                      <span>{product.seller}</span>
                    </div>
                  </div>
                </div>
                )
            })
          }
         
        </div>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default MainPage;