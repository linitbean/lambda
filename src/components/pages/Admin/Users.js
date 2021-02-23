import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

import Container from "../../atoms/Container";
import Text from "../../atoms/Text";
import SubText from "../../atoms/SubText";
import Search from "../../atoms/Search";

import UserItem from "../../molecules/UserItem";
import { UsersLoader } from "../../molecules/Loader";

import ConfirmationModal from "../../organisms/ConfirmationModal";

import { useAdminUsers } from "../../../hooks/useUsers";
import { useToggle } from "../../../hooks/useToggle";
import { useDebounce } from "../../../hooks/useDebounce";

import axiosInstance from "../../../utils/axios";

import { AdminDisplay } from "./common/AdminChecker";

const Users = () => {
  const { show, toggle } = useToggle();
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 1000);
  const handleSearch = (e) => setSearchValue(e.target.value);

  const { users, loading, error, mutate } = useAdminUsers(debouncedValue);

  const unverifiedUsers = users?.filter((user) => !user.meta.isEmailVerified);

  const clearUnverifiedUsers = async () => {
    try {
      const data = await axiosInstance.post("/users/clear-unverified");
      console.log(data);
      mutate();
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <>
      <Container p="12px" borderbottom="1px solid" wide>
        <Text font="16px" p="12px 0" bold>
          Users
        </Text>
        <Text p="12px 0" font="12px" opacity="0.6" bold multiline>
          Add and manage users
        </Text>
      </Container>

      <AdminDisplay>
        <Container p="12px" flex="flex-end" wide>
          {unverifiedUsers?.length ? (
            <Text
              p="6px 12px"
              m="0 12px 0 0"
              radius="4px"
              bg="danger"
              color="white"
              font="11px"
              bold
              flexalign
              pointer
              onClick={toggle}
            >
              Clear {unverifiedUsers?.length} Unverified Users
              <SubText p="0" m="0 0 0 8px" font="inherit" flexalign>
                <FaTrash />
              </SubText>
            </Text>
          ) : undefined}
          <Text
            p="6px 12px"
            radius="4px"
            bg="primary"
            color="white"
            font="11px"
            bold="true"
            flexalign="true"
            to="./users/add"
          >
            Add User
            <SubText p="0" m="0 0 0 8px" font="inherit" flexalign>
              <FaPlus />
            </SubText>
          </Text>
        </Container>
      </AdminDisplay>

      <Container p="12px" wide>
        <Search
          placeholder="Search Users by email, first name or last name"
          value={searchValue}
          onChange={handleSearch}
          m="0 0 12px 0"
        />

        {loading ? (
          <UsersLoader />
        ) : error ? (
          <Container minH="240px" flex="center">
            <Text opacity="0.6" bold>
              Something Went Wrong
            </Text>
          </Container>
        ) : users.length ? (
          users.map((user) => <UserItem key={user._id} user={user} />)
        ) : (
          <Container minH="240px" flex="center">
            <Text opacity="0.6" bold>
              No Users
            </Text>
          </Container>
        )}
      </Container>

      <ConfirmationModal
        open={show}
        title={`Clear ${unverifiedUsers?.length} Unverified User${
          unverifiedUsers?.length > 1 ? "s" : ""
        }`}
        message="Users that have not verified their email address would be removed permanently"
        action={clearUnverifiedUsers}
        dismiss={toggle}
      />
    </>
  );
};

export default Users;
