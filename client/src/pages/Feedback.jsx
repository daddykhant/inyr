import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { facebook, kpay, telegram, viber } from "../assets";

const Feedback = () => {
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();
  const handleAdminClick = () => {
    setClickCount(clickCount + 1);
    console.log(clickCount);
    if (clickCount === 5) {
      navigate("/dashboard/login");
      setClickCount(0);
    }
  };
  return (
    <div className="h-[100vh] w-full rounded-s-xl overflow-y-auto text-black ">
      <div className="pe-3 ps-3 md:ps-5 md:pe-5 py-3 md:py-5 h-full text-white bg-gradient-to-br to-primary from-secondary grid grid-cols-1 md:grid-cols-2 md:gap-5">
        <div className="  flex justify-center items-center py-5 mb-3 md:mb-0">
          <div className="bg-zinc border rounded-xl p-5">
            <div
              className=" text-2xl font-semibold mb-3 text-black text-center cursor-pointer"
              onClick={handleAdminClick}
            >
              Buy me a coffee.
            </div>
            <div className=" text-center text-black mb-2">KBZ Pay</div>
            <div className=" w-48 rounded-xl object-cover overflow-hidden">
              <img src={kpay} alt="" className=" w-full h-full" />
            </div>
          </div>
        </div>
        <div className=" flex md:items-center">
          <div className="">
            <div className="px-5  ">
              <div className=" text-2xl font-semibold mb-2 ">
                Have more books to add? Contact us!
              </div>
              <p className="text-sm">
                If you have any more books you would like to add, please contact
                us.
              </p>
            </div>
            <div className=" px-5 py-5 ">
              <div className=" font-semibold mb-5">
                Start a conversation with :
              </div>
              <div className="flex">
                <a href="https://www.facebook.com/khantthiha.zaw.90663?mibextid=ZbWKwL">
                  <img src={facebook} alt="" className=" w-8 h-8 mr-5" />
                </a>
                <a href="https://t.me/@daddykhant">
                  <img src={telegram} alt="" className=" w-8 h-8 mr-5" />
                </a>
                <a href="viber://add?number=%2B959976359239">
                  <img src={viber} alt="" className=" w-8 h-8 mr-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
