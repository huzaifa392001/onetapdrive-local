import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./VendorSidebar.scss";

function VendorSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    console.log("pathname=> ", `/vendor/${pathName.split("/")[2]}`);
  }, [pathName]);

  const toggleSubMenu = () => {
    setIsExpanded(!isExpanded);
  };

  // Define sidebar menu items with dividers
  const menuItems = [
    // { path: "/", label: "Go To Website", icon: "fas fa-globe-asia" },
    { path: "/vendor", label: "Dashboard", icon: "fas fa-home" },
    { path: "/vendor/trade-license", label: "Trade License", icon: "fas fa-id-badge" },
    { path: "/vendor/leads-management", label: "Leads Management", icon: "fas fa-file-alt" },
    // { path: "/vendor/inquiry-forms", label: "Inquiry Forms", icon: "fas fa-phone-alt" },
    { path: "/vendor/my-fleet", label: "My Fleet", icon: "fas fa-car" },
    { path: "/vendor/my-fleet-with-driver", label: "My Fleet With Driver", icon: "fas fa-taxi" },
    { path: "/vendor/manage-car-offers", label: "Manage Car Offers", icon: "fas fa-percentage" },
    
  ];
  return (
    <div className="vendorSidebar">
      <ul>
        {menuItems.map((item, index) => {
          // Check if the item is a divider
          if (item.type === "divider") {
            return (
              <li key={index} className="divider">
                <h4>{item?.label}</h4>
              </li>
            ); // You can style the divider with CSS
          }

          // Check if the current route starts with the menu item's path
          const vendorPath = pathName.split("/")[2]
            ? `/vendor/${pathName.split("/")[2]}`
            : "/vendor";
          const isActive = item.path === vendorPath;

          return item.isExpandable ? (
            <li key={index} onClick={toggleSubMenu}>
              <span>
                <i className={`${item.icon}`}></i>
                <span>{item.label}</span>
                <i
                  className={`fal fa-angle-${isExpanded ? "down" : "right"}`}
                />
              </span>
              {isExpanded && (
                <div className="vendorSubMenu expanded">
                  <ul>
                    {item.subMenu.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className={
                          pathName.startsWith(subItem.path) ? "active" : ""
                        }
                      >
                        <Link href={subItem.path}>
                          <i className={subItem.icon}></i>
                          <span>{subItem.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ) : (
            <li key={index}>
              <Link href={item.path} className={isActive ? "active" : ""}>
                <i className={`${item.icon} fa-lg`}></i>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default VendorSidebar;
