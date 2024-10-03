import React from "react";
import Img1 from "../../assets/women/p1.jpg";
import Img2 from "../../assets/women/p2.jpg";
import Img3 from "../../assets/women/p3.jpg";
import Img4 from "../../assets/women/p4.jpg";
import Img5 from "../../assets/women/p5.jpg";
import { FaStar } from "react-icons/fa6";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "iPhone 16 Pro",
    rating: 5.0,
    color: "Desert",
    aosDelay: "0",
  },
  {
    id: 2,
    img: Img2,
    title: "Galaxy S24 Ultra",
    rating: 4.8,
    color: "Blue",
    aosDelay: "200",
  },
  {
    id: 3,
    img: Img3,
    title: "Pixel 9 Pro",
    rating: 4.6,
    color: "Pink",
    aosDelay: "400",
  },
  {
    id: 4,
    img: Img4,
    title: "Nothing Phone 2",
    rating: 4.4,
    color: "Transparent",
    aosDelay: "600",
  },
  {
    id: 5,
    img: Img5,
    title: "OnePlus 12R",
    rating: 4.5,
    color: "Gray",
    aosDelay: "800",
  },
];

const Products = () => {
  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
          
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold text-violet-400">
            Товары
          </h1>
          <p data-aos="fade-up" className="text-sm violet-400">
          Самые продаваемые товары для вас
          </p>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {/* card section */}
            {ProductsData.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.id}
                className="space-y-3"
              >
                <img
                  src={data.img}
                  alt=""
                  className="h-[220px] w-[150px] object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{data.title}</h3>
                  <p className="text-sm text-gray-600">{data.color}</p>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{data.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* view all button */}
          <div className="flex justify-center">
            <button className="bg-gradient-to-r from-violet-300 to-violet-700 text-center mt-10 cursor-pointer  text-white py-1 px-5 rounded-md">
              Просмотреть все
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
