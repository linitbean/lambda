import React from "react";

import Container from "../atoms/Container";
import Text from "../atoms/Text";

import Section from "../molecules/Section";
import { WalletItemCard } from "../molecules/WalletItem";
import { WalletItemCardLoader } from "../molecules/Loader";

import { useWallets } from "../../hooks/useWallets";

const MyWallets = (props) => {
  const { wallets, loading } = useWallets();

  const topWallets = wallets?.slice(0, 5);

  return (
    <Section
      heading="My Wallets"
      wide
      text={{
        name: "View All",
        color: "grey",
        p: "0",
        to: "/dashboard/wallets",
      }}
      {...props}
    >
      {loading ? (
        <WalletItemCardLoader />
      ) : (
        <Container minH="240px" scroll wide>
          {topWallets.length ? (
            topWallets.map((wallet) => (
              <WalletItemCard key={wallet._id} wallet={wallet} />
            ))
          ) : (
            <Container minH="240px" flex="center">
              <Text opacity="0.6" bold>
                No Wallets
              </Text>
            </Container>
          )}
        </Container>
      )}
    </Section>
  );
};

export default MyWallets;
