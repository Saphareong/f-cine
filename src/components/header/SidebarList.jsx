import React, { useEffect, useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import { MdDashboard } from "react-icons/md";
import { BiMoviePlay, BiBuildings, BiDoorOpen } from "react-icons/bi";
import { RiSlideshow2Line } from "react-icons/ri";
import { FiActivity, FiUsers } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ListItemContainer = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active, theme }) => ({
  [theme.breakpoints.up("lg")]: {
    borderRadius: 12,
    padding: "16px",
    marginBottom: "12px",
    backgroundColor: active ? theme.palette.primary.light : "transparent",
    color: active ? theme.palette.primary.main : theme.palette.neutral[700],
    ":hover": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
    },
  },
}));

const linksManager = [
  {
    id: 1,
    to: "/",
    icon: <MdDashboard fontSize="24" />,
    text: "Dashboard",
  },
  {
    id: 2,
    to: "/show-time",
    icon: <RiSlideshow2Line fontSize="24" />,
    text: "Show Time",
  },
  {
    id: 3,
    to: "/rooms",
    icon: <BiDoorOpen fontSize="24" />,
    text: "Rooms",
  },
  {
    id: 4,
    to: "/analytics",
    icon: <FiActivity fontSize="24" />,
    text: "Analytics",
  },
];

const linksAdmin = [
  {
    id: 1,
    to: "/",
    icon: <MdDashboard fontSize="24" />,
    text: "Dashboard",
  },
  {
    id: 2,
    to: "/movies",
    icon: <BiMoviePlay fontSize="24" />,
    text: "Movies",
  },
  {
    id: 3,
    to: "/theaters",
    icon: <BiBuildings fontSize="24" />,
    text: "Theaters",
  },
  {
    id: 4,
    to: "/users",
    icon: <FiUsers fontSize="24" />,
    text: "Users",
  },
  {
    id: 5,
    to: "/analytics",
    icon: <FiActivity fontSize="24" />,
    text: "Analytics",
  },
];

export const SidebarList = ({ isCollapse }) => {
  const { Role } = useSelector((state) => state.auth.auth.user);
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  return (
    <List disablePadding sx={{ pt: "36px", width: "100%" }}>
      {Role === "Manager"
        ? linksManager.map((link) => (
            <ListItemContainer
              component={Link}
              to={link.to}
              key={link.text}
              active={active === link.to ? true : false}
              onClick={() => setActive(link.to)}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
                {link.icon}
              </ListItemIcon>
              <ListItemText
                sx={{ display: !isCollapse ? "block" : "none" }}
                primary={
                  <Typography whiteSpace="nowrap" variant="subtitle1SemiBold">
                    {link.text}
                  </Typography>
                }
              />
            </ListItemContainer>
          ))
        : linksAdmin.map((link) => (
            <ListItemContainer
              component={Link}
              to={link.to}
              key={link.text}
              active={active === link.to ? true : false}
              onClick={() => setActive(link.to)}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
                {link.icon}
              </ListItemIcon>
              <ListItemText
                sx={{ display: !isCollapse ? "block" : "none" }}
                primary={
                  <Typography whiteSpace="nowrap" variant="subtitle1SemiBold">
                    {link.text}
                  </Typography>
                }
              />
            </ListItemContainer>
          ))}
    </List>
  );
};
