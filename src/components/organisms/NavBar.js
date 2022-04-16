import React from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import SubText from "../atoms/SubText";
import ProfilePic from "../molecules/ProfilePic";

const Wrapper = styled.aside`
  grid-area: navbar;
  height: 48px;
  width: 100%;

  margin: 0;
  padding: 0 80px;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 2;

  background-color: ${({ bg, theme, demo }) =>
    demo
      ? theme.colors.primary
      : theme.colors[bg] || bg || theme.colors.bgContrast};

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: space-between;
  align-items: center;

  /* display: none; */

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    padding: 0 12px;
  }
`;

const Menu = styled(FaBars)`
  font-size: 24px;
  width: 24px;
  display: none;
  color: ${({ demo, theme }) => (demo ? "white" : theme.colors.text)};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
  }
`;

const Heading = styled.h3`
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: ${({ demo, theme }) => (demo ? "white" : theme.colors.text)};

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    display: inline-block;
    margin-right: 8px;
  }
`;

const NavBar = ({ action, demo }) => {
  return (
    <Wrapper demo={demo}>
      <Menu onClick={action} demo={demo ? demo : undefined} />
      <Link to="/dashboard">
        <Heading demo={demo}>
          <Logo />
          {process.env.REACT_APP_NAME}
          {demo && (
            <SubText
              m="0 0 0 8px"
              p="2px 8px"
              bg="white"
              color="primary"
              bold
              radius="12px"
            >
              Demo
            </SubText>
          )}
        </Heading>
      </Link>
      <ProfilePic demo={demo} />
    </Wrapper>
  );
};

export default NavBar;
