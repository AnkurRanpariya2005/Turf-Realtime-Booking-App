import React from "react";
import {
  List,
  Card,
  Alert,
  Avatar,
  ListItem,
  Accordion,
  Typography,
  AccordionBody,
  ListItemPrefix,
  AccordionHeader,
} from "@material-tailwind/react";
import {
  TicketIcon,
  UserGroupIcon,
  Square2StackIcon,
  RectangleGroupIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function OwnerSidebar() {

  const [open, setOpen] = useState(0);

  const navigate = useNavigate();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const LIST_ITEM_STYLES =
    "text-gray-200 hover:text-white focus:text-white active:text-black hover:bg-opacity-10 focus:bg-opacity-200 active:bg-opacity-20";

  return (
    <aside id="default-sidebar" className=" bg-gray-800 mt-12 fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <Card
      color="white"
      className="mt-12 bg-gray-800  h-[calc(100vh-2rem)] w-full max-w-[20rem]  p-6 shadow-md"
    >
    
      <List>
      
        {/* <Accordion open={open === 2}>
          <ListItem
            selected={open === 2}
            data-selected={open === 2}
            onClick={() => handleOpen(2)}
            className="px-3 py-[9px] hover:bg-opacity-20 text-gray-800 select-none focus:bg-opacity-20 active:bg-opacity-20 data-[selected=true]:bg-gray-50/20 hover:text-black focus:text-gray active:text-black data-[selected=true]:text-black"
          >
            <ListItemPrefix>
              <RectangleGroupIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography className="mr-auto font-normal text-inherit">
              Dashboard
            </Typography>
            <ChevronDownIcon
              strokeWidth={3}
              className={`ml-auto text-gray-500 h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                Analytics
              </ListItem>
              <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                Sales
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion> */}
        <ListItem className={LIST_ITEM_STYLES} onClick={()=>navigate("/add/turf")}>
          <ListItemPrefix>
            <Square2StackIcon className="h-5 w-5" />
          </ListItemPrefix>
          Add Turf
        </ListItem>
        <Link to="/my-venues">
        <ListItem className={LIST_ITEM_STYLES}>
          <ListItemPrefix>
            <TicketIcon className="h-5 w-5" />
          </ListItemPrefix>
          My Venues
        </ListItem>
        </Link>
        <ListItem className={LIST_ITEM_STYLES}>
          <ListItemPrefix>
            <UserGroupIcon className="h-5 w-5" />
          </ListItemPrefix>
          Customers
        </ListItem>
      </List>
      <hr className="my-2 border-gray-800" />
      <List>
        <ListItem className={LIST_ITEM_STYLES}>
          <ListItemPrefix>
            <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
          </ListItemPrefix>
          Help & Support
        </ListItem>
        <ListItem className={LIST_ITEM_STYLES}>
          <ListItemPrefix>
            <ArrowLeftStartOnRectangleIcon
              strokeWidth={2.5}
              className="h-5 w-5"
            />
          </ListItemPrefix>
          Sign Out
        </ListItem>
      </List>
      

    
    </Card>
    </aside>
  );
}


export default OwnerSidebar;