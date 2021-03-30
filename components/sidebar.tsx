// next imports
import { useRouter } from "next/router";
import Link from "next/link";
// material icons
import { Feedback, DynamicFeed } from "@styled-icons/material-rounded/";
import { Calendar, User } from "@styled-icons/boxicons-regular/";
import { Video } from "@styled-icons/boxicons-regular/Video";
import { Chat } from "@styled-icons/boxicons-regular/Chat";
import { ArchiveOut } from "@styled-icons/boxicons-regular/ArchiveOut";
import { ShoppingBag } from "@styled-icons/boxicons-solid/ShoppingBag";

const Sidebar = () => {
  const router = useRouter();

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
      icon: <Feedback />,
      href: "/adverts",
    },
    {
      label: "Users",
      icon: <User />,
      href: "/users",
    },
    {
      label: "Zoom",
      icon: <Video />,
      href: "/zoom",
    },
    {
      label: "Channels",
      icon: <Chat />,
      href: "/channels",
    },
    {
      label: "Channels",
      icon: <ArchiveOut />,
      href: "/admin/request-session",
    },
    {
      label: "Products",
      icon: <ShoppingBag />,
      href: "/products",
    },
  ];

  return (
    <div>
      <div>
        {sidebarOptions &&
          sidebarOptions.length > 0 &&
          sidebarOptions.map((menuItems, index) => (
            <Link key={menuItems.href} href={menuItems.href}>
              <a>
                <div
                  className={"item " + (router.pathname.includes(menuItems.href) ? "active" : "")}
                >
                  <div className="icon">{menuItems.icon}</div>
                  <div className="label">{menuItems.label}</div>
                </div>
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
