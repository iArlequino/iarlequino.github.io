import React from "react";
import Slider from "react-slick";

const TestimonialData = [
  {
    id: 1,
    name: "Victor",
    text: "Недавно приобрел новый телефон в этом интернет-магазине и остался полностью доволен покупкой! Сайт удобный и интуитивно понятный. Приятно удивила оперативная доставка.",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "Наталия Евгеньева",
    text: "Благодаря рекомендациям техноблогеров я решилась на покупку айфон 15 про в этом магазинчике и осталась очень довольна! Цена очень порадовала, а также предложенные аксессуары по промоакции.",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Александр Георгиев",
    text: "Заказ номер 28462. Заказывал свой первый Iphone , говорили что система ios куда стабильнее и шустрее, но не только. Красивый дизайн, освоился за пару дней. Конечно, я не любитель заказов техники с интернета, но друг порекомендовал этот магазин и он не прогадал.",
    img: "https://picsum.photos/104/104",
  },
  {
    id: 5,
    name: "ItGeek",
    text: "Из за рекламы блогеров, решил заказать телефон в данном магазине. Ассортимент товара достаточно обширный с приятными ценами.",
    img: "https://picsum.photos/103/103",
  },
];

const Testimonials = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10 mb-10">
      <div className="container">
        {/* header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary text-violet-400">
          Что говорят наши клиенты
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold text-violet-400">
            Отзывы
          </h1>
          <p data-aos="fade-up" className="text-xs text-violet-400">
          </p>
        </div>

        {/* Testimonial cards */}
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div className="my-6">
                <div
                  key={data.id}
                  className="text-violet-400 flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl bg-violet-400 dark:bg-violet-400 bg-primary/10 relative"
                >
                  <div className="mb-4">
                    <img
                      src={data.img}
                      alt=""
                      className="rounded-full w-20 h-20"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <p className="text-xs text-white">{data.text}</p>
                      <h1 className="text-white text-xl font-bold text-black/80 dark:text-light">
                        {data.name}
                      </h1>
                    </div>
                  </div>
                  <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                    ,,
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
