import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import banner from "../../assets/wishlist-banner.jpeg";
import { removeLike } from "../../redux/likeSlice";
import "../categories/Categories.scss";

const Wishlist = () => {
  const dispatch = useDispatch();
  const likedata = useSelector((state: any) => state.likes.likes);

  const removeFromLike = (product: any) => {
    dispatch(removeLike(product.id));
  };

  return (
    <div className="category-products">
      <div className="container">
        <h1 className="category-products__title">Wishlist</h1>
        <img className="category-products__banner" src={banner} alt="" />
        <div className="category-products__content">
          {likedata.map((product: any) => (
            <div className="item" key={product.id}>
              <Link to={`/products/${product.id}`}>
                {product.images && product.images.length > 0 && (
                  <img src={product.images[0]} alt="" />
                )}
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </Link>
              <div className="item-price">
                <strong>${product.price}</strong>
                <button onClick={() => removeFromLike(product)}>
                  Remove from wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
