import React from "react";
// next imports
import { useRouter } from "next/router";
import Link from "next/link";
// react bootstrap
import { OverlayTrigger, Tooltip } from "react-bootstrap";
// material icons
import { Dashboard } from "@styled-icons/boxicons-solid/Dashboard";
import { ClipboardNotes } from "@styled-icons/foundation/ClipboardNotes";
import { Calendar, User } from "@styled-icons/boxicons-regular/";
import { ArchiveOut } from "@styled-icons/boxicons-regular/ArchiveOut";
import { Folder } from "@styled-icons/boxicons-regular/Folder";
import { MeetingRoom } from "@styled-icons/material/MeetingRoom";
import { MarkChatRead } from "@styled-icons/material/MarkChatRead";
import { Users } from "@styled-icons/entypo/Users";
import { VideoRecording } from "@styled-icons/boxicons-regular/VideoRecording";
// cookie
import { getAuthenticationToken } from "@lib/cookie";

const UserSidebar = () => {
  const router = useRouter();

  const [tokenDetails, setTokenDetails] = React.useState<any>();
  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        setTokenDetails(details);
      }
    }
  }, []);

  return (
    <div>
      <div>
        {tokenDetails && tokenDetails.user && tokenDetails.user.role === 0 && (
          <Link href="/student">
            <a>
              <OverlayTrigger
                key={`right`}
                placement={`right`}
                overlay={<Tooltip id={`tooltip-right`}>Dashboard</Tooltip>}
              >
                <div
                  className={
                    "sidebar-item-container " +
                    (router.pathname.includes("/student") ? "active" : "")
                  }
                >
                  <div className="sidebar-icon">
                    <Dashboard />
                  </div>
                  <div className="sidebar-label">Dashboard</div>
                </div>
              </OverlayTrigger>
            </a>
          </Link>
        )}

        {tokenDetails && tokenDetails.user && tokenDetails.user.role === 0 && (
          <Link href="/profile">
            <a>
              <OverlayTrigger
                key={`right`}
                placement={`right`}
                overlay={<Tooltip id={`tooltip-right`}>My Profile</Tooltip>}
              >
                <div
                  className={
                    "sidebar-item-container " +
                    (router.pathname.includes("/profile") ? "active" : "")
                  }
                >
                  <div className="sidebar-icon">
                    <User />
                  </div>
                  <div className="sidebar-label">My Profile</div>
                </div>
              </OverlayTrigger>
            </a>
          </Link>
        )}
        {tokenDetails && tokenDetails.user && tokenDetails.user.role === 0 && (
          <Link href="/request-session">
            <a>
              <OverlayTrigger
                key={`right`}
                placement={`right`}
                overlay={<Tooltip id={`tooltip-right`}>Request Session</Tooltip>}
              >
                <div
                  className={
                    "sidebar-item-container " +
                    (router.pathname.includes("/request-session") ? "active" : "")
                  }
                >
                  <div className="sidebar-icon">
                    <ArchiveOut />
                  </div>
                  <div className="sidebar-label">Request Session</div>
                </div>
              </OverlayTrigger>
            </a>
          </Link>
        )}
        {tokenDetails && tokenDetails.user && tokenDetails.user.role === 0 && (
          <Link href="/user-resources">
            <a>
              <OverlayTrigger
                key={`right`}
                placement={`right`}
                overlay={<Tooltip id={`tooltip-right`}>My Resources</Tooltip>}
              >
                <div
                  className={
                    "sidebar-item-container " +
                    (router.pathname.includes("/user-resources") ? "active" : "")
                  }
                >
                  <div className="sidebar-icon">
                    <Folder />
                  </div>
                  <div className="sidebar-label">My Resources</div>
                </div>
              </OverlayTrigger>
            </a>
          </Link>
        )}
        {tokenDetails && tokenDetails.user && tokenDetails.user.role === 0 && (
          <Link href="/notes">
            <a>
              <OverlayTrigger
                key={`right`}
                placement={`right`}
                overlay={<Tooltip id={`tooltip-right`}>My Notes</Tooltip>}
              >
                <div
                  className={
                    "sidebar-item-container " + (router.pathname.includes("/notes") ? "active" : "")
                  }
                >
                  <div className="sidebar-icon">
                    <ClipboardNotes />
                  </div>
                  <div className="sidebar-label">My Notes</div>
                </div>
              </OverlayTrigger>
            </a>
          </Link>
        )}
        {tokenDetails && tokenDetails.user && tokenDetails.user.role === 0 && (
          <Link href="/videos">
            <a>
              <OverlayTrigger
                key={`right`}
                placement={`right`}
                overlay={<Tooltip id={`tooltip-right`}>My Videos</Tooltip>}
              >
                <div
                  className={
                    "sidebar-item-container " +
                    (router.pathname.includes("/videos") ? "active" : "")
                  }
                >
                  <div className="sidebar-icon">
                    <VideoRecording />
                  </div>
                  <div className="sidebar-label">My Videos</div>
                </div>
              </OverlayTrigger>
            </a>
          </Link>
        )}

        {/* teacher */}
        {tokenDetails && tokenDetails.user && tokenDetails.user.role === 1 && (
          <Link href="/dashboard">
            <a>
              <OverlayTrigger
                key={`right`}
                placement={`right`}
                overlay={<Tooltip id={`tooltip-right`}>Dashboard</Tooltip>}
              >
                <div
                  className={
                    "sidebar-item-container " +
                    (router.pathname.includes("/dashboard") ? "active" : "")
                  }
                >
                  <div className="sidebar-icon">
                    <Dashboard />
                  </div>
                  <div className="sidebar-label">Dashboard</div>
                </div>
              </OverlayTrigger>
            </a>
          </Link>
        )}
        {tokenDetails && tokenDetails.user && tokenDetails.user.role != 3 && (
          <Link href="/calendar">
            <a>
              <OverlayTrigger
                key={`right`}
                placement={`right`}
                overlay={<Tooltip id={`tooltip-right`}>My Calendar</Tooltip>}
              >
                <div
                  className={
                    "sidebar-item-container " +
                    (router.pathname.includes("/calendar") ? "active" : "")
                  }
                >
                  <div className="sidebar-icon">
                    <Calendar />
                  </div>
                  <div className="sidebar-label">My Calendar</div>
                </div>
              </OverlayTrigger>
            </a>
          </Link>
        )}

        {tokenDetails && tokenDetails.user && tokenDetails.user.role === 1 && (
          <Link href="/teacher-profile">
            <a>
              <OverlayTrigger
                key={`right`}
                placement={`right`}
                overlay={<Tooltip id={`tooltip-right`}>Profile</Tooltip>}
              >
                <div
                  className={
                    "sidebar-item-container " +
                    (router.pathname.includes("/teacher-profile") ? "active" : "")
                  }
                >
                  <div className="sidebar-icon">
                    <User />
                  </div>
                  <div className="sidebar-label">Profile</div>
                </div>
              </OverlayTrigger>
            </a>
          </Link>
        )}

        {/* teacher */}
        {tokenDetails && tokenDetails.user && tokenDetails.user.role === 1 && (
          <Link href="/users?t=1">
            <a>
              <OverlayTrigger
                key={`right`}
                placement={`right`}
                overlay={<Tooltip id={`tooltip-right`}>Students</Tooltip>}
              >
                <div
                  className={
                    "sidebar-item-container " +
                    (router.pathname.includes("/users?t=1") ? "active" : "")
                  }
                >
                  <div className="sidebar-icon">
                    <Users />
                  </div>
                  <div className="sidebar-label">Students</div>
                </div>
              </OverlayTrigger>
            </a>
          </Link>
        )}
        {tokenDetails && tokenDetails.user && tokenDetails.user.role === 1 && (
          <Link href="/admin/quick-meetings">
            <a>
              <OverlayTrigger
                key={`right`}
                placement={`right`}
                overlay={<Tooltip id={`tooltip-right`}>Quick Meetings</Tooltip>}
              >
                <div
                  className={
                    "sidebar-item-container " +
                    (router.pathname.includes("/admin/quick-meetings") ? "active" : "")
                  }
                >
                  <div className="sidebar-icon">
                    <MeetingRoom />
                  </div>
                  <div className="sidebar-label">Quick Meetings</div>
                </div>
              </OverlayTrigger>
            </a>
          </Link>
        )}
        {tokenDetails && tokenDetails.user && tokenDetails.user.role === 1 && (
          <Link href="/admin/messages">
            <a>
              <OverlayTrigger
                key={`right`}
                placement={`right`}
                overlay={<Tooltip id={`tooltip-right`}>Messages</Tooltip>}
              >
                <div
                  className={
                    "sidebar-item-container " +
                    (router.pathname.includes("/admin/messages") ? "active" : "")
                  }
                >
                  <div className="sidebar-icon">
                    <MarkChatRead />
                  </div>
                  <div className="sidebar-label">Messages</div>
                </div>
              </OverlayTrigger>
            </a>
          </Link>
        )}
        {tokenDetails && tokenDetails.user && tokenDetails.user.role === 1 && (
          <Link href="/resources">
            <a>
              <OverlayTrigger
                key={`right`}
                placement={`right`}
                overlay={<Tooltip id={`tooltip-right`}>Resources</Tooltip>}
              >
                <div
                  className={
                    "sidebar-item-container " +
                    (router.pathname.includes("/resources") ? "active" : "")
                  }
                >
                  <div className="sidebar-icon">
                    <Folder />
                  </div>
                  <div className="sidebar-label">Resources</div>
                </div>
              </OverlayTrigger>
            </a>
          </Link>
        )}

        {/* parent */}
        {tokenDetails && tokenDetails.user && tokenDetails.user.role === 3 && (
          <Link href="/parent/dashboard">
            <a>
              <OverlayTrigger
                key={`right`}
                placement={`right`}
                overlay={<Tooltip id={`tooltip-right`}>Dashboard</Tooltip>}
              >
                <div
                  className={
                    "sidebar-item-container " +
                    (router.pathname.includes("/parent/dashboard") ? "active" : "")
                  }
                >
                  <div className="sidebar-icon">
                    <Dashboard />
                  </div>
                  <div className="sidebar-label">Dashboard</div>
                </div>
              </OverlayTrigger>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default UserSidebar;
