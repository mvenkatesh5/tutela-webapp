import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { fetchUserData } from "@components/meet-chime/helpers/auth";
// import { convertCookieStringToObject } from "lib/meet/cookie";

type userSchema = {
  id?: number;
  username?: string;
  email?: string;
  first_name?: string;
  is_active?: boolean;
};

const IndexPage: NextPage<userSchema | any> = ({ userInfo }) => {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [isCodeInValid, setIsCodeInValid] = useState(true);
  const [localUserInfo, setLocalUserInfo] = useState<any>(
    userInfo
      ? {
          userId: userInfo.id,
          userName: userInfo.username,
          userEmail: userInfo.email,
          firstName: userInfo.first_name,
          isActive: userInfo.is_active,
        }
      : null
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
    e.target.value.length < 6 ? setIsCodeInValid(true) : setIsCodeInValid(false);
  };

  const handleJoin = (roomId: string) => {
    router.push(`/meet/${roomId}`);
  };

  const generateRandomString = (length: number) => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  return (
    <div className="h-[100vh] w-full relative">
      {/* container */}
      <div className="h-full w-full">
        {/* navbar */}
        <nav className="h-[50px] w-full flex justify-start items-center p-8">
          <div>
            <button onClick={() => router.push("/")}>
              <h3 className="text-2xl font-medium">Tutela Connect</h3>
            </button>
          </div>
        </nav>
        {/* main */}
        <main className="flex flex-col justify-center items-center md:items-start gap-8 mt-12 md:mt-24  w-full px-4 md:px-8">
          <div>
            <h3 className="text-2xl md:text-3xl text-center">
              Welcome {localUserInfo ? localUserInfo.userName : ""} To Tutela Connect
            </h3>
            <p className="mt-2 text-sm md:text-md text-center">
              Start New Meeting Or Enter a Existing Meeting Code.
            </p>
          </div>
          <div className="flex flex-col-reverse md:flex-row gap-6">
            <div>
              <button
                className="w-full text-[16px] px-[24px] py-[8px] rounded-[4px] bg-blue-700 text-white font-bold outline-none "
                onClick={() => handleJoin(generateRandomString(8))}
              >
                New Meeting
              </button>
            </div>
            <div className="flex">
              <div className="relative">
                <input
                  className="flex box-border w-[200px] h-full px-4 py-2 rounded-[5px] border-[1px] border-[#e2e2e2] border-solid"
                  type="text"
                  placeholder="Enter a meeting code"
                  onChange={handleChange}
                />
                {isCodeInValid && roomId ? (
                  <span className="absolute text-xs text-center w-full mt-1 font-semibold text-red-900">
                    Enter Min 6 Character Code
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div>
                <button
                  id="joinBtn"
                  className="w-full text-[16px] px-[24px] py-[8px] rounded-[4px] text-blue-700  font-bold border-1 border-black "
                  onClick={() => handleJoin(roomId)}
                  disabled={isCodeInValid}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const userData = await fetchUserData(context);
  if (userData) {
    return { props: { userInfo: userData } };
  } else {
    return {
      redirect: {
        destination: "/signin?next=/",
      },
    };
  }
};

export default IndexPage;
