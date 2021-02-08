import React, { useState } from "react";

import Container from "../../atoms/Container";
import Text from "../../atoms/Text";
import Search from "../../atoms/Search";

import AddButton from "../../molecules/AddButton";
import UserItem from "../../molecules/UserItem";
import { UsersLoader } from "../../molecules/Loader";

import { useAdminUsers } from "../../../hooks/useUsers";
import { useDebounce } from "../../../hooks/useDebounce";

import { AdminDisplay } from "./common/AdminChecker";

const Users = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 1000);
  const handleSearch = (e) => setSearchValue(e.target.value);

  const { users, loading, error } = useAdminUsers(debouncedValue);

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
        <AddButton title="Add User" to="./users/add" />
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
    </>
  );
};

export default Users;
