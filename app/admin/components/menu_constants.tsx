import { RiAdminFill, RiCalendarEventFill } from "react-icons/ri";
import { SideNavItemGroup } from "./types/type";
import { BsBarChartFill, BsEnvelope, BsFillDiagram3Fill, BsGear, BsHouseDoor, BsKanban, BsListUl, BsQuestionCircle } from "react-icons/bs";
import { FaUser, FaWhatsapp } from "react-icons/fa";
import { MdLogout, MdManageAccounts } from "react-icons/md";
import { IoHelpBuoy } from "react-icons/io5";



export const SIDENAV_ITEMS: SideNavItemGroup[] = [

    {
        title: "Dashboard",
        menuList: [{
            title: 'Dashboard',
            path: '../admin',
            icon: <BsBarChartFill  size={20} />,            
        }]
    },
    {
        title: "Manage",
        menuList: [
            {
                title: 'Companies',
                path: '../admin/companies',
                icon: <BsFillDiagram3Fill size={20} />,
            },
            {
                title: 'Admins',
                path: '../admin/admins',
                icon: <RiAdminFill size={20} />,
            },
            {
                title: 'Clients',
                path: '../admin/clients',
                icon: <FaUser size={20} />,
            }
        ]
    },    
    {
        title: "Reminders",
        menuList: [
            {
                title: 'Events',
                path: '../admin/events',
                icon: <RiCalendarEventFill size={20} />,
            },
            {
                title: 'Reminders',
                path: '../admin/reminders',
                icon: <FaWhatsapp size={20} />,
            }
        ]
    },
    {
        title: "Settings",
        menuList: [
            {
                title: 'Profile',
                path: '../admin/profile',
                icon: <MdManageAccounts size={20} />,
            },
            {
                title: 'Help',
                path: '../admin/help',
                icon: <IoHelpBuoy size={20} />,
            },
            {
                title: 'Log out',
                path: '/',
                icon: <MdLogout size={20} />,
            }            
        ]
    }

];