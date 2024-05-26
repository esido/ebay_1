import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import heart from "../../assets/single-product-heart.svg";
import "./singleProducts.scss";
import { useDispatch } from "react-redux";
import { likedProduct, Product } from "../../redux/likeSlice";
import { addProduct } from "../../redux/cartSlice";

interface SingleProduct {
  id: number;
  name: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const SingleProducts = () => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [thumbsSwiper, setThumbsSwiper] = useState<any | null>(null);
  const [singleProduct, setSingleProduct] = useState<SingleProduct | null>(
    null
  );

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data: SingleProduct) => {
        setSingleProduct(data);
        const savedLikes: SingleProduct[] = JSON.parse(
          localStorage.getItem("addedProducts") ?? "[]"
        ) as SingleProduct[];
        const isLiked = savedLikes.some(
          (likedProduct) => likedProduct.id === data.id
        );
        setLiked(isLiked);
      });
  }, [id]);

  const handleLikeProduct = () => {
    setLiked((prevLiked) => !prevLiked);
    if (singleProduct) {
      const product: Product = {
        id: singleProduct.id.toString(),
        name: singleProduct.title,
        images: singleProduct.images,
        title: singleProduct.title,
        description: singleProduct.description,
        price: singleProduct.price,
      };
      dispatch(likedProduct(product));
    }
  };

  const handleAddToCart = () => {
    if (singleProduct) {
      const product: Product = {
        id: singleProduct.id.toString(),
        name: singleProduct.title,
        images: singleProduct.images,
        title: singleProduct.title,
        description: singleProduct.description,
        price: singleProduct.price,
      };
      dispatch(addProduct(product));
    }
  };

  return (
    <div className="single-product">
      <div className="container">
        {singleProduct && (
          <div className="single-product__wrapper">
            <div className="single-produc__img">
              <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {singleProduct.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img width={500} src={image} alt={`Image ${index}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {singleProduct.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img width={100} src={image} alt="" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="single-product__content">
              <h1>{singleProduct.title}</h1>
              <ul>
                <li>
                  <strong>Desctiption:</strong>{" "}
                  <span>{singleProduct.description}</span>
                </li>
                <li>
                  <strong>Brand:</strong> <span>{singleProduct.brand}</span>
                </li>
                <li>
                  <strong>Category:</strong>{" "}
                  <span>{singleProduct.category}</span>
                </li>
                <li>
                  <strong>Rating:</strong> <span>{singleProduct.rating}/5</span>
                </li>
              </ul>
              <div className="single-product__block">
                <div className="single-product__price">
                  <strong>Price:</strong> <span>${singleProduct.price}</span>
                </div>
                <div className="single-product__buttons">
                  <button className="cart-btn" onClick={handleAddToCart}>
                    Add to cart
                  </button>
                  <button className="like-btn" onClick={handleLikeProduct}>
                    <img src={heart} alt="" />
                    {liked ? "Remove from Watchlist" : "Add to Watchlist"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProducts;
