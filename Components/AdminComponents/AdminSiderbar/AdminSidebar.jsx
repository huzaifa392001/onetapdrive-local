import React, { useEffect, useState } from "react";
import "./AdminSidebar.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AdminSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    console.log('pathname=> ', `/admin/${pathName.split('/')[2]}`);
  }, [pathName]);

  const toggleSubMenu = () => {
    setIsExpanded(!isExpanded);
  };

  // Define sidebar menu items with dividers
  const menuItems = [
    { path: "/", label: "Go To Website", icon: "fas fa-globe-asia" },
    { path: "/admin", label: "Dashboard", icon: "fas fa-home" },

    { type: "divider", label: "Website" },
    { path: "/admin/brands", label: "Brands", icon: "fad fa-star" },
    { path: "/admin/categories", label: "Categories", icon: "fas fa-clipboard-list" },
    { path: "/admin/packages-orders", label: "Packages Orders", icon: "fas fa-car" },
    { path: "/admin/social-links", label: "Social Links", icon: "fas fa-share-square" },
    // { path: "/admin/configurations", label: "Configurations", icon: "fas fa-cog" },

    { type: "divider", label: "Mobile App" },
    { path: "/admin/banners", label: "App Banners", icon: "fas fa-bold" },

    // Divider between general options and car management
    { type: "divider", label: "Car Management" },
    {
      label: "Car Management",
      icon: "fa fa-car fa-lg",
      isExpandable: true,
      subMenu: [
        { path: "/admin/car-management/brand-management", label: "Brand Management", icon: "fad fa-horizontal-rule" },
        { path: "/admin/car-management/car-brands-models", label: "Car Brands/Models", icon: "fad fa-horizontal-rule" },
      ],
    },
    { path: "/admin/car-listing", label: "Car Listing", icon: "fas fa-car" },
    { path: "/admin/car-with-driver-listing", label: "Car With Driver Listing", icon: "fas fa-car" },
    { path: "/admin/car-active-management", label: "Car Active Management", icon: "fas fa-check-square" },
    { path: "/admin/car-refresh-management", label: "Car Refresh Management", icon: "fas fa-sync-alt" },

    // Divider for other admin options
    { type: "divider", label: "Users Management" },

    { path: "/admin/vendor-management", label: "Vendor Management", icon: "fas fa-users" },
    { path: "/admin/user-management", label: "Users Management", icon: "fas fa-users" },
    { path: "/admin/leads-management", label: "Leads Management", icon: "fas fa-file-alt" },
    { path: "/admin/inquiry-management", label: "Inquiry Management", icon: "fas fa-phone-alt" },
    { path: "/admin/reviews-management", label: "Reviews Management", icon: "fas fa-comments" },
    { path: "/admin/subscription-email", label: "Subscription Email", icon: "fas fa-envelope" },
  ];

  return (
    <div className="adminSidebar">
      <ul>
        {menuItems.map((item, index) => {
          // Check if the item is a divider
          if (item.type === "divider") {
            return (
              <li key={index} className="divider">
                <h4>{item?.label}</h4>
              </li>
            ) // You can style the divider with CSS
          }

          // Check if the current route starts with the menu item's path
          const adminPath = pathName.split('/')[2] ? `/admin/${pathName.split('/')[2]}` : '/admin';
          const isActive = item.path === adminPath;

          return item.isExpandable ? (
            <li key={index} onClick={toggleSubMenu}>
              <span>
                <i className={`${item.icon}`}></i>
                <span>{item.label}</span>
                <i className={`fal fa-angle-${isExpanded ? "down" : "right"}`} />
              </span>
              {
                isExpanded && (
                  <div className="adminSubMenu expanded">
                    <ul>
                      {item.subMenu.map((subItem, subIndex) => (
                        <li key={subIndex} className={pathName.startsWith(subItem.path) ? "active" : ""}>
                          <Link href={subItem.path}>
                            <i className={subItem.icon}></i>
                            <span>{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              }
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

export default AdminSidebar;
