import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Total quantity calculation for navbar badge
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night and purifies air.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores and toxins.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114511_1280.jpg", description: "Restores moisture and purifies air.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/05/ficus-elastica-4850608_1280.jpg", description: "Large glossy leaves that absorb carbon monoxide.", cost: "$22" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/18/03/aloe-vera-3284620_1280.jpg", description: "Soothes skin and clears toxins.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2017/07/07/14/02/lavender-2481524_1280.jpg", description: "Calming scent that aids relaxation.", cost: "$20" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2018/06/21/20/22/jasmine-3489376_1280.jpg", description: "Sweet floral fragrance for indoor charm.", cost: "$18" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2016/08/25/16/02/rosemary-1619890_1280.jpg", description: "Aromatic herb ideal for home gardens.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2017/03/23/19/57/mint-2169334_1280.jpg", description: "Refreshing scent and easy growth.", cost: "$10" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2018/02/16/10/52/eucalyptus-3157388_1280.jpg", description: "Invigorating menthol aroma.", cost: "$25" },
        { name: "Gardenia", image: "https://cdn.pixabay.com/photo/2016/05/18/16/32/gardenia-1400827_1280.jpg", description: "Rich, fragrant white blooms.", cost: "$24" }
      ]
    },
    {
      category: "Low Maintenance Succulents",
      plants: [
        { name: "Echeveria", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/succulent-1846153_1280.jpg", description: "Rosette-shaped drought-tolerant succulent.", cost: "$8" },
        { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2021/01/14/09/29/jade-plant-5916298_1280.jpg", description: "Symbol of good luck and resilience.", cost: "$14" },
        { name: "Zebra Cactus", image: "https://cdn.pixabay.com/photo/2020/05/17/12/32/haworthia-5181462_1280.jpg", description: "Distinctive white striped succulent.", cost: "$11" },
        { name: "Pothos", image: "https://cdn.pixabay.com/photo/2020/03/09/17/28/pothos-4916490_1280.jpg", description: "Trailing vine that thrives on neglect.", cost: "$12" },
        { name: "ZZ Plant", image: "https://cdn.pixabay.com/photo/2020/04/28/10/18/zz-plant-5103774_1280.jpg", description: "Tolerates ultra-low light and low water.", cost: "$20" },
        { name: "String of Pearls", image: "https://cdn.pixabay.com/photo/2021/02/08/17/17/string-of-pearls-5995724_1280.jpg", description: "Unique bead-like foliage hanging plant.", cost: "$16" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isPlantInCart = (plantName) => {
    return cartItems.some((item) => item.name === plantName);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-logo" onClick={() => setShowCart(false)}>
          <h3>Paradise Nursery</h3>
        </div>
        <div className="nav-links">
          <button onClick={() => setShowCart(false)}>Plants</button>
          <button className="cart-icon-btn" onClick={() => setShowCart(true)}>
            🛒 <span className="cart-count">{totalQuantity}</span>
          </button>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid-container">
          {plantsArray.map((categoryGroup, index) => (
            <div key={index} className="category-section">
              <h2>{categoryGroup.category}</h2>
              <div className="plant-list">
                {categoryGroup.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-image" />
                    <h3>{plant.name}</h3>
                    <p className="description">{plant.description}</p>
                    <p className="cost">{plant.cost}</p>
                    <button
                      className="add-to-cart-btn"
                      disabled={isPlantInCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isPlantInCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;