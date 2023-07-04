import React from "react";
// next imports
import Link from "next/link";
// react bootstrap
import { OverlayTrigger, Tooltip, Image } from "react-bootstrap";
// icons
import { Dashboard } from "@styled-icons/boxicons-solid/Dashboard";
import { UserPin } from "@styled-icons/boxicons-regular/UserPin";
import { CommentDiscussion } from "@styled-icons/octicons/CommentDiscussion";
import { Books } from "@styled-icons/icomoon/Books";
import { SpeakerNotes } from "@styled-icons/material-twotone/SpeakerNotes";
import { Calendar } from "@styled-icons/boxicons-regular/Calendar";
import { ChatBubblesQuestion } from "@styled-icons/fluentui-system-regular/ChatBubblesQuestion";
import { CollapseLeft } from "@styled-icons/open-iconic/CollapseLeft";
import { ExpandRight } from "@styled-icons/open-iconic/ExpandRight";
import { Logout } from "@styled-icons/material-rounded/";
// api services
import { SignOut } from "@lib/services/authenticationservice";
// cookie
import { logout } from "@lib/cookie";
// global context provider
import { globalContext } from "@contexts/global";

const StudentSidebar = ({ page }: any) => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const toggleSidebar = () => {
    globalDispatch({
      type: "SIDEBAR_TOGGLE",
      payload: !globalState.sidebarToggle,
    });
  };

  const signOut = () => {
    SignOut()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    logout();
  };

  const StudentNavigationLinks = [
    { key: "dashboard", title: "Dashboard", href: "/student", icon: <Dashboard /> },
    { key: "my-profile", title: "My Profile", href: "/profile", icon: <UserPin /> },
    {
      key: "request-session",
      title: "Request Session",
      href: "/request-session",
      icon: <CommentDiscussion />,
    },
    { key: "my-resources", title: "My Resources", href: "/user-resources", icon: <Books /> },
    { key: "my-notes", title: "My Notes", href: "/notes", icon: <SpeakerNotes /> },
    { key: "my-calendar", title: "My Calendar", href: "/calendar", icon: <Calendar /> },
    { key: "doubts", title: "Doubts", href: "/doubts", icon: <ChatBubblesQuestion /> },
  ];

  return (
    <div className="tw-relative tw-w-full tw-h-full tw-flex tw-flex-col tw-shadow-sm">
      <div className="tw-overflow-hidden tw-flex-shrink-0 tw-h-[70px] tw-px-3 tw-py-1 tw-flex tw-justify-center tw-items-center tw-bg-gradient-to-r tw-from-[#11293a] tw-to-[#1f475f] ">
        {!globalState.sidebarToggle ? (
          <Image src="/logo.svg" alt="" className="tw-w-[100px]" />
        ) : (
          <Image src="/logo-small.svg" alt="" className="tw-w-[30px]" />
        )}
      </div>
      <div className="tw-overflow-hidden tw-w-full tw-h-full tw-border-r-0 tw-border-l-0 tw-border-t-0 tw-border-solid tw-border-gray-200 tw-py-2">
        {StudentNavigationLinks &&
          StudentNavigationLinks.length > 0 &&
          StudentNavigationLinks.map((link) => (
            <Link href={link?.href} key={`student-sidebar-${link?.key}`}>
              <a>
                <OverlayTrigger
                  placement={`right`}
                  overlay={<Tooltip id={`tooltip-right`}>{link?.title}</Tooltip>}
                >
                  <div
                    className={`tw-flex tw-items-center tw-px-3 tw-py-[10px] tw-gap-3 tw-rounded-r-md tw-cursor-pointer tw-group tw-mb-[2px] ${
                      page === link?.key ? `tw-bg-[#C9A060]` : `hover:tw-bg-[#E7D3B5]`
                    } ${globalState.sidebarToggle ? `tw-justify-center tw-mr-2` : `tw-mr-3`}`}
                  >
                    <div
                      className={`tw-w-[20px] tw-h-[20px] tw-flex-shrink-0 tw-flex tw-items-center tw-justify-center ${
                        page === link?.key ? `tw-text-[#0C2A3A]` : `tw-text-gray-900`
                      }`}
                    >
                      {link?.icon}
                    </div>
                    {!globalState.sidebarToggle && (
                      <div
                        className={`tw-font-medium tw-text-[#0C2A3A] tw-text-sm ${
                          page === link?.key ? `tw-font-bold` : `group-hover:tw-font-bold`
                        }`}
                      >
                        {link?.title}
                      </div>
                    )}
                  </div>
                </OverlayTrigger>
              </a>
            </Link>
          ))}
      </div>
      <div className="tw-overflow-hidden tw-flex-shrink-0 tw-py-2">
        {/* logout */}
        <OverlayTrigger
          placement={`right`}
          overlay={<Tooltip id={`tooltip-right`}>Logout</Tooltip>}
        >
          <div
            className={`tw-flex tw-items-center tw-px-3 tw-py-[10px] tw-gap-3 tw-rounded-r-md tw-cursor-pointer tw-group tw-mb-[2px] ${
              globalState.sidebarToggle ? `tw-justify-center tw-mr-2` : `tw-mr-3`
            }`}
            onClick={signOut}
          >
            <div className="tw-w-[20px] tw-h-[20px] tw-flex-shrink-0 tw-flex tw-items-center tw-justify-center tw-text-gray-900">
              <Logout />
            </div>
            {!globalState.sidebarToggle && (
              <div className="tw-font-medium group tw-text-[#0C2A3A] tw-text-sm group-hover:tw-font-bold">
                Logout
              </div>
            )}
          </div>
        </OverlayTrigger>
        {/* collapse */}
        <OverlayTrigger
          placement={`right`}
          overlay={<Tooltip id={`tooltip-right`}>Collapse</Tooltip>}
        >
          <div
            className={`tw-flex tw-items-center tw-px-3 tw-py-[10px] tw-gap-3 tw-rounded-r-md tw-cursor-pointer tw-group ${
              globalState.sidebarToggle ? `tw-justify-center tw-mr-2` : `tw-mr-3`
            }`}
            onClick={toggleSidebar}
          >
            <div className="tw-w-[14px] tw-h-[14px] tw-flex-shrink-0 tw-flex tw-items-center tw-justify-center tw-text-gray-900">
              {!globalState.sidebarToggle ? <CollapseLeft /> : <ExpandRight />}
            </div>
            {!globalState.sidebarToggle && (
              <div className="tw-font-medium group tw-text-[#0C2A3A] tw-text-sm group-hover:tw-font-bold">
                Collapse
              </div>
            )}
          </div>
        </OverlayTrigger>
      </div>
    </div>
  );
};

export default StudentSidebar;
