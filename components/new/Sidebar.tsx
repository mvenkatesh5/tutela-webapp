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
import { Forum } from "@styled-icons/material/Forum";
import { Announcement as AnnouncementIcon } from "@styled-icons/material-rounded/Announcement";
import { Dashboard } from "@styled-icons/boxicons-solid/Dashboard";
// global context provider
import { globalContext } from "@contexts/global";

const Sidebar = () => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const router = useRouter();
  React.useEffect(() => {
    globalDispatch({
      type: "SIDEBAR_TOGGLE",
      payload: true,
    });
  }, []);

  const toggleSidebar = () => {
    globalDispatch({
      type: "SIDEBAR_TOGGLE",
      payload: !globalState.sidebarToggle,
    });
  };

  const sidebarOptions = [
    {
      label: "Dashboard",
      icon: <Dashboard />,
      href: "/new",
    },
    {
      label: "Concerns",
      icon: <DynamicFeed />,
      href: "/new/concern",
    },
    // {
    //   label: "Calendar",
    //   icon: <Calendar />,
    //   href: "/new/calendar",
    // },
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
                <div className={"item " + (router.pathname === menuItems.href ? "active" : "")}>
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
