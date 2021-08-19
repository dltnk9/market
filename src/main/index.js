import './index.css';
import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';


function MainPage() {
 const [products, setProducts] = React.useState([]);
  React.useEffect(function(){  
    axios.get("https://f0c7de27-a13c-4ce3-8175-542458c520a3.mock.pstmn.io/products").then(function(result){
    const products = result.data.products;
    setProducts(products);
  
    }).catch(function(error){
      console.error("에러 발생: ", error);
      
    });

  }
, []);
 
  return (
    <div>

        <div id="banner">
          <img src="images/banners/banner1.png" />
        </div>
        <h1>판매되는 상품들</h1>
        <div id="product-list">

          {
            products.map(function(product, index){
                return (
                  <div className="product-card">
                    <Link className="product-link" to={`/product/${product.id}`}>
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
                  </Link>
                </div>
                )
            })
          }
         
        </div>

    </div>
  );
}

export default MainPage;