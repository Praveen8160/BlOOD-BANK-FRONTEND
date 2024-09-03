import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import img from "../utils/Image.js";
function Home() {
  const [carouselImages, setCarouselImages] = useState([
    img.first,
    img.second,
    img.fourth,
    img.third,
  ]);
  return (
    <div className="w-auto z-0 overflow-hidden">
      <div className="w-auto">
        <Carousel
          showThumbs={false}
          autoPlay
          interval={2000}
          infiniteLoop
          showStatus={false}
        >
          {carouselImages.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Carousel slide ${index}`}
                className="w-screen object-fill lg:h-[40rem] h-[27rem]"
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="h-auto w-screen flex flex-col md:flex-row mt-10 justify-evenly items-center">
        <div className="bg-blue-500 h-36 md:w-96 w-64 flex flex-col justify-center items-center sticky border rounded-2xl mb-10 md:mb-0">
          <h1 className="font-semibold text-4xl">23244</h1>
          <h1 className="font-semibold text-xl">Donor Register</h1>
        </div>
        <div className="bg-indigo-600 h-36 md:w-96 w-64 flex flex-col justify-center items-center sticky border rounded-2xl">
          <h1 className="font-semibold text-4xl">23244</h1>
          <h1 className="font-semibold text-xl">Blood Bank Register</h1>
        </div>
      </div>
      <div className="flex flex-col mt-7">
        <div className="bg-red flex flex-col justify-center items-center my-5">
          <h1 className="text-3xl">Donation Process</h1>
          <img src={img.separator} alt="" />
          <h1 className="hidden md:flex text-lg">
            The donation process from the time you arrive center until the time
            you leave
          </h1>
        </div>
        <div className="h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 self-center">
          <div className="h-[34rem] max-w-[30rem] bg-gray-100 flex flex-col justify-evenly px-8 sticky">
            <img src={img.process_1} alt="" className="" />
            <h1 className="text-black text-3xl font-mono">Registration</h1>
            <p className="text-black">
              You need to complete a very simple registration form. Which
              contains all required contact information to enter in the donation
              process.
            </p>
          </div>
          <div className="h-[34rem] max-w-[30rem] bg-gray-100 flex flex-col justify-evenly px-8 sticky">
            <img src={img.process_2} alt="" className="" />
            <h1 className="text-black text-3xl font-mono">Screening</h1>
            <p className="text-black">
              A drop of blood from your finger will take for simple test to
              ensure that your blood iron levels are proper enough for donation
              process.
            </p>
          </div>
          <div className="h-[34rem] max-w-[30rem] bg-gray-100 flex flex-col justify-evenly px-8 sticky">
            <img src={img.process_3} alt="" className="" />
            <h1 className="text-black text-3xl font-mono">Donation</h1>
            <p className="text-black">
              After ensuring and passed screening test successfully you will be
              directed to a donor bed for donation. It will take only 6-10
              minutes.
            </p>
          </div>
          <div className="h-[34rem] max-w-[30rem] bg-gray-100 flex flex-col justify-evenly px-8 sticky">
            <img src={img.process_4} alt="" className="" />
            <h1 className="text-black text-3xl font-mono">Refreshment</h1>
            <p className="text-black">
              You can also stay in sitting room until you feel strong enough to
              leave our center. You will receive awesome drink from us in
              donation zone.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-red flex flex-col justify-center items-center my-5">
          <h1 className="text-3xl">Learn About Donation</h1>
          <img src={img.separator} alt="" />
        </div>
        <div className="h-auto w-screen flex flex-col md:flex-row justify-evenly items-center py-7">
          <div className="w-auto h-auto sticky">
            <img src={img.image} alt="" className="h-[20rem] w-[40rem]" />
          </div>
          <div>
            <table className="w-auto sticky mt-7 mx-4" cellpadding="5">
              <tr>
                <td
                  colspan="3"
                  className="border  bg-red-500 text-white-900 text-center font-bold"
                >
                  Blood Type Compatibility Matrix
                </td>
              </tr>
              <tr>
                <th className="border w-max text-lg text-center">Blood Type</th>
                <th className="border w-max text-lg text-center">
                  Compatible Donors
                </th>
                <th className="border w-max text-lg text-center">
                  Compatible Recipients
                </th>
              </tr>
              <tr>
                <td className="border w-max text-lg text-center">A+</td>
                <td className="border w-max text-lg text-center">A+, AB+</td>
                <td className="border w-max text-lg text-center">
                  A+, A-, O+, O-
                </td>
              </tr>
              <tr>
                <td className="border w-max text-lg text-center">O+</td>
                <td className="border w-max text-lg text-center">
                  O+, A+, B+, AB+
                </td>
                <td className="border w-max text-lg text-center">O+, O-</td>
              </tr>
              <tr>
                <td className="border w-max text-lg text-center">B+</td>
                <td className="border w-max text-lg text-center">B+, AB+</td>
                <td className="border w-max text-lg text-center">
                  B+, B-, O+, O-
                </td>
              </tr>
              <tr>
                <td className="border w-max text-lg text-center">AB+</td>
                <td className="border w-max text-lg text-center">AB+</td>
                <td className="border w-max text-lg text-center">Everyone</td>
              </tr>
              <tr>
                <td className="border w-max text-lg text-center">A-</td>
                <td className="border w-max text-lg text-center">
                  A+, A-, AB+, AB-
                </td>
                <td className="border w-max text-lg text-center">A-, O-</td>
              </tr>
              <tr>
                <td className="border w-max text-lg text-center">O-</td>
                <td className="border w-max text-lg text-center">Everyone</td>
                <td className="border w-max text-lg text-center">O-</td>
              </tr>
              <tr>
                <td className="border w-max text-lg text-center">B-</td>
                <td className="border w-max text-lg text-center">
                  B+, B-, AB+, AB-
                </td>
                <td className="border w-max text-lg text-center">B-, O-</td>
              </tr>
              <tr>
                <td className="border w-max text-lg text-center">AB-</td>
                <td className="border w-max text-lg text-center">AB+, AB-</td>
                <td className="border w-max text-lg text-center">
                  AB-, A-, B-, O-
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
