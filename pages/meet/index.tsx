import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { fetchUserData } from "@components/meet-chime/helpers/auth";
import { v4 as uuid4 } from "uuid";
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
    <div className="tw-h-[100vh] tw-w-full tw-relative">
      {/* container */}
      <div className="tw-h-full tw-w-full">
        {/* navbar */}
        <nav className="tw-h-[50px] tw-w-full tw-flex tw-justify-start tw-items-center tw-p-8">
          <div>
            <button onClick={() => router.push("/")}>
              <h3 className="tw-text-2xl tw-font-medium">Tutela Connect</h3>
            </button>
          </div>
        </nav>
        {/* main */}
        <main className="tw-flex tw-flex-col tw-justify-center tw-items-center md:tw-items-start tw-gap-8 tw-mt-12 md:tw-mt-24  tw-w-full tw-px-4 md:tw-px-8">
          <div>
            <h3 className="tw-text-2xl md:tw-text-3xl tw-text-center">
              Welcome {localUserInfo ? localUserInfo.userName : ""} To Tutela Connect
            </h3>
            <p className="tw-mt-2 tw-text-sm md:tw-text-md tw-text-center">
              Start New Meeting Or Enter a Existing Meeting Code.
            </p>
          </div>
          <div className="tw-flex tw-flex-col-reverse md:tw-flex-row gap-6">
            <div>
              <button
                className="tw-w-full tw-text-[16px] tw-px-[24px] tw-py-[8px] tw-rounded-[4px] tw-bg-blue-700 tw-text-white tw-font-bold tw-outline-none "
                onClick={() => handleJoin(uuid4().toString())}
              >
                New Meeting
              </button>
            </div>
            <div className="tw-flex">
              <div className="tw-relative">
                <input
                  className="tw-flex tw-box-border tw-w-[200px] tw-h-full tw-px-4 tw-py-2 tw-rounded-[5px] tw-border-[1px] tw-border-[#e2e2e2] tw-border-solid"
                  type="text"
                  placeholder="Enter a meeting code"
                  onChange={handleChange}
                />
                {isCodeInValid && roomId ? (
                  <span className="tw-absolute tw-text-xs tw-text-center tw-w-full tw-mt-1 tw-font-semibold tw-text-red-900">
                    Enter Min 6 Character Code
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div>
                <button
                  id="joinBtn"
                  className="tw-w-full tw-text-[16px] tw-px-[24px] tw-py-[8px] tw-rounded-[4px] tw-text-blue-700  tw-font-bold tw-border-1 tw-border-black "
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
