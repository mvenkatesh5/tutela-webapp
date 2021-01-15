// next imports
import { useRouter } from "next/router";
import Link from "next/link";
// material icons
import { Feedback, DynamicFeed } from "@styled-icons/material-rounded/";
import { Calendar, User } from "@styled-icons/boxicons-regular/";

const Sidebar = () => {
  const router = useRouter();

  const sidebarOptions = [
    {
      label: "Calendar",
      icon: <Calendar />,
      href: "/admin",
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
