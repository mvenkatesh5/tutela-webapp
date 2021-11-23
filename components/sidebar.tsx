import React from "react";
// next imports
import { useRouter } from "next/router";
import Link from "next/link";
// react bootstrap
import { OverlayTrigger, Tooltip } from "react-bootstrap";
// material icons
import { DynamicFeed } from "@styled-icons/material-rounded/";
import { Calendar, User } from "@styled-icons/boxicons-regular/";
import { Video } from "@styled-icons/boxicons-regular/Video";
import { Chat } from "@styled-icons/boxicons-regular/Chat";
import { ArchiveOut } from "@styled-icons/boxicons-regular/ArchiveOut";
import { ShoppingBag } from "@styled-icons/boxicons-solid/ShoppingBag";
import { MarkChatRead } from "@styled-icons/material/MarkChatRead";
import { Announcement } from "@styled-icons/zondicons/Announcement";
import { MeetingRoom } from "@styled-icons/material/MeetingRoom";
import { Folder } from "@styled-icons/boxicons-regular/Folder";
import { Assessment } from "@styled-icons/material-rounded/Assessment";
import { CollapseLeft } from "@styled-icons/open-iconic/CollapseLeft";
import { ExpandRight } from "@styled-icons/open-iconic/ExpandRight";
// global context provider
import { globalContext } from "@contexts/global";

const Sidebar = () => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const router = useRouter();

  const toggleSidebar = () => {
    globalDispatch({
      type: "SIDEBAR_TOGGLE",
      payload: !globalState.sidebarToggle,
    });
  };

  const sidebarOptions = [
    {
      label: "Calendar",
      icon: <Calendar />,
      href: "/calendar",
    },
    {
      label: "News",
      icon: <DynamicFeed />,
      href: "/news",
    },
    {
      label: "Adverts",
      icon: <Announcement />,
      href: "/adverts",
    },
    {
      label: "Users",
      icon: <User />,
      href: "/users",
    },
    {
      label: "Messages",
      icon: <MarkChatRead />,
      href: "/admin/messages",
    },
    {
      label: "Quick Meetings",
      icon: <MeetingRoom />,
      href: "/quick-meetings",
    },
    {
      label: "Zoom Integrations",
      icon: <Video />,
      href: "/zoom",
    },
    {
      label: "Channels",
      icon: <Chat />,
      href: "/channels",
    },
    {
      label: "Request Sessions",
      icon: <ArchiveOut />,
      href: "/admin/request-session",
    },
    {
      label: "Products",
      icon: <ShoppingBag />,
      href: "/products",
    },
    {
      label: "Resources",
      icon: <Folder />,
      href: "/resources",
    },
    {
      label: "Tests",
      icon: <Assessment />,
      href: "/tests",
    },
  ];

  return (
    <>
      {sidebarOptions &&
        sidebarOptions.length > 0 &&
        sidebarOptions.map((menuItems, index) => (
          <Link key={menuItems.href} href={menuItems.href}>
            <a>
              <OverlayTrigger
                key={`right`}
                placement={`right`}
                overlay={<Tooltip id={`tooltip-right`}>{menuItems.label}</Tooltip>}
              >
                <div
                  className={"item " + (router.pathname.includes(menuItems.href) ? "active" : "")}
                >
                  <div className="icon">{menuItems.icon}</div>
                  <div className="label">{menuItems.label}</div>
                </div>
              </OverlayTrigger>
            </a>
          </Link>
        ))}
      <OverlayTrigger
        key={`right`}
        placement={`right`}
        overlay={
          <Tooltip id={`tooltip-right`}>
            {!globalState.sidebarToggle ? "Collapse" : "Expand"}
          </Tooltip>
        }
      >
        <div className={"sidebar-item-container mt-auto"} onClick={toggleSidebar}>
          <div className="sidebar-icon">
            {!globalState.sidebarToggle ? <CollapseLeft /> : <ExpandRight />}
          </div>
          <div className="sidebar-label">{!globalState.sidebarToggle ? "Collapse" : "Expand"}</div>
        </div>
      </OverlayTrigger>
    </>
  );
};

export default Sidebar;
