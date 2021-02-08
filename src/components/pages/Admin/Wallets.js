import React from "react";

import Container from "../../atoms/Container";
import Text from "../../atoms/Text";

import { AdminWalletItemCard } from "../../molecules/WalletItem";
import { AdminWalletItemCardLoader } from "../../molecules/Loader";
import AddButton from "../../molecules/AddButton";

import { useWallets } from "../../../hooks/useWallets";

import { AdminDisplay } from "./common/AdminChecker";

const Wallets = () => {
  const { wallets, loading } = useWallets();

  return (
    <>
      <Container p="12px" borderbottom="1px solid" wide>
        <Text font="16px" p="12px 0" bold>
          Wallets
        </Text>
        <Text p="12px 0" font="12px" opacity="0.6" bold multiline>
          Add and manage wallets
        </Text>
      </Container>

      <AdminDisplay>
        <AddButton title="Add Wallet" to="./wallets/add" />
      </AdminDisplay>

      <Container p="12px" wide>
        {loading ? (
          <AdminWalletItemCardLoader />
        ) : wallets.length ? (
          wallets.map((wallet) => (
            <AdminWalletItemCard key={wallet._id} wallet={wallet} />
          ))
        ) : (
          <Container minH="240px" flex="center">
            <Text opacity="0.6" bold>
              No Wallets
            </Text>
          </Container>
        )}
      </Container>
    </>
  );
};

export default Wallets;
