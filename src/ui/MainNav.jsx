import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineHome,
  HiUserGroup,
  HiBanknotes,
  HiCurrencyDollar,
} from "react-icons/hi2";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import useUser from "../features/authentication/useUser";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const navAdminList = [
  {
    title: "Home",
    route: "dashboard",
    icon: <HiOutlineHome />,
  },
  {
    title: "Users",
    route: "user",
    icon: <HiUserGroup />,
  },
  {
    title: "Bookings",
    route: "booking",
    icon: <HiOutlineCalendarDays />,
  },
  {
    title: "Cabins",
    route: "cabin",
    icon: <HiOutlineCalendarDays />,
  },
  {
    title: "Fee",
    route: "fees",
    icon: <HiBanknotes />,
  },
  {
    title: "Salary",
    route: "salaries",
    icon: <HiCurrencyDollar />,
  },
  {
    title: "Profile",
    route: "users",
    icon: <HiOutlineUsers />,
  },
];
const navStudentList = [];
const navTeacherList = [];

function MainNav() {
  const { user } = useUser();

  let navList;
  if (user.user?.role === "admin") navList = navAdminList;
  return (
    <nav>
      <NavList>
        {navList?.map((navItem) => (
          <li key={navItem.title + navItem.route}>
            <StyledNavLink to={navItem.route}>
              {navItem.icon}
              <span>{navItem.title}</span>
            </StyledNavLink>
          </li>
        ))}
      </NavList>
    </nav>
  );
}

export default MainNav;
