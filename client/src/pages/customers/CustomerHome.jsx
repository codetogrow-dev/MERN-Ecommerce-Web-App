import React from "react";
import Slider from "react-slick";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "green",
        fontSize: "2rem",
      }}
      onClick={onClick}
    />
  );
}
const CustomerHome = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    cssEase: "linear",
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const sliderArray = [
    {
      title:
        "Lorem ipsum dolor sit amet,consectetur adipisicing elit.Enim nemo ex itaque deserunt veritatis perferendis explicabo obcaecati voluptate cumque Possimus et modi doloribus Voluptatibus quia atque omnis adipisci perferendis numquam",
    },
    {
      title:
        "Lorem ipsum dolor sit amet,consectetur adipisicing elit.Enim nemo ex itaque deserunt veritatis perferendis explicabo obcaecati voluptate cumque Possimus et modi doloribus Voluptatibus quia atque omnis adipisci perferendis numquam",
    },
    {
      title:
        "Lorem ipsum dolor sit amet,consectetur adipisicing elit.Enim nemo ex itaque deserunt veritatis perferendis explicabo obcaecati voluptate cumque Possimus et modi doloribus Voluptatibus quia atque omnis adipisci perferendis numquam",
    },
    {
      title:
        "Lorem ipsum dolor sit amet,consectetur adipisicing elit.Enim nemo ex itaque deserunt veritatis perferendis explicabo obcaecati voluptate cumque Possimus et modi doloribus Voluptatibus quia atque omnis adipisci perferendis numquam",
    },
    {
      title:
        "Lorem ipsum dolor sit amet,consectetur adipisicing elit.Enim nemo ex itaque deserunt veritatis perferendis explicabo obcaecati voluptate cumque Possimus et modi doloribus Voluptatibus quia atque omnis adipisci perferendis numquam",
    },
    {
      title:
        "Lorem ipsum dolor sit amet,consectetur adipisicing elit.Enim nemo ex itaque deserunt veritatis perferendis explicabo obcaecati voluptate cumque Possimus et modi doloribus Voluptatibus quia atque omnis adipisci perferendis numquam",
    },
    {
      title:
        "Lorem ipsum dolor sit amet,consectetur adipisicing elit.Enim nemo ex itaque deserunt veritatis perferendis explicabo obcaecati voluptate cumque Possimus et modi doloribus Voluptatibus quia atque omnis adipisci perferendis numquam",
    },
    {
      title:
        "Lorem ipsum dolor sit amet,consectetur adipisicing elit.Enim nemo ex itaque deserunt veritatis perferendis explicabo obcaecati voluptate cumque Possimus et modi doloribus Voluptatibus quia atque omnis adipisci perferendis numquam",
    },
    {
      title:
        "Lorem ipsum dolor sit amet,consectetur adipisicing elit.Enim nemo ex itaque deserunt veritatis perferendis explicabo obcaecati voluptate cumque Possimus et modi doloribus Voluptatibus quia atque omnis adipisci perferendis numquam",
    },
  ];
  return (
    <div className="slider-container overflow-x-hidden flex flex-col justify-center min-h-screen w-full px-5">
      <Slider {...settings}>
        {sliderArray.map((item, index) => (
          <div className="border flex flex-col space-y-4 p-3" key={index}>
            <h1> Item {index + 1}</h1>
            <h3>{item.title} </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomerHome;
