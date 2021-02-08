import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { FaWallet } from "react-icons/fa";

import Container from "../../../atoms/Container";
import Text from "../../../atoms/Text";
import SubText from "../../../atoms/SubText";
import Button from "../../../atoms/Button";

import { AdminWalletItemCard } from "../../../molecules/WalletItem";
import { AdminWalletItemCardLoader } from "../../../molecules/Loader";

import { useAdminUser } from "../../../../hooks/useUsers";
import { useAdminUserWallets, useWallets } from "../../../../hooks/useWallets";
import { useAdminBalance } from "../../../../hooks/useBalance";

const Wallets = () => {
  const { url } = useRouteMatch();
  const { userId } = useParams();

  const { user } = useAdminUser(userId);
  const { wallets, loading } = useWallets();
  const { total, bonus, profit, deposit } = useAdminBalance(userId);

  const {
    wallets: userWallets,
    loading: loadingUserWallets,
  } = useAdminUserWallets(userId);

  const mapWallets = wallets?.map((wallet) => {
    const custom = userWallets?.find((w) => w.symbol === wallet.symbol);
    if (custom) wallet.custom = true;
    return wallet;
  });

  return (
    <>
      <Container p="12px" wide>
        <Container bg="bg" p="12px" m="12px 0 0" radius="8px" wide>
          <Container flex="space-between" wide>
            <Container p="12px" flexCol="space-between" wide>
              <Text
                p="0"
                m="0 0 8px 0"
                font="10px"
                opacity="0.6"
                bold
                flexalign
              >
                <SubText font="14px" p="0" m="0 6px 0 0" flexalign>
                  <FaWallet />
                </SubText>
                {user.firstName}'s Total Balance
              </Text>
              <Text p="0" font="20px" bold>
                $ {total}
              </Text>
            </Container>
            <Container
              p="12px"
              radius="8px"
              flexCol="space-between"
              align="flex-end"
              wide
            >
              <Text p="0" m="0 0 8px 0" font="10px" opacity="0.6" bold>
                Bonus
              </Text>
              <Text p="0" font="14px" bold>
                $ {bonus}
              </Text>
            </Container>
          </Container>
          <Container flex="space-between" wide>
            <Container p="12px" flexCol="space-between" wide>
              <Text p="0" m="0 0 8px 0" font="10px" opacity="0.6" bold>
                Deposits
              </Text>
              <Text p="0" font="16px" bold>
                $ {deposit}
              </Text>
            </Container>
            <Container p="12px" flexCol="space-between" align="flex-end" wide>
              <Text p="0" m="0 0 8px 0" font="10px" opacity="0.6" bold>
                Profit
              </Text>
              <Text p="0" font="16px" bold>
                $ {profit}
              </Text>
            </Container>
          </Container>
          <Button
            p="8px"
            m="12px 0 0"
            bg="primary"
            full="true"
            bold="true"
            to="./transactions"
          >
            Add Transaction
          </Button>
        </Container>
        <Text
          p="12px 0"
          font="12px"
          opacity="0.6"
          align="center"
          bold
          multiline
        >
          View Wallet balance and add custom wallet addresses
        </Text>
      </Container>

      <Container p="12px" wide>
        {loading || loadingUserWallets ? (
          <AdminWalletItemCardLoader />
        ) : (
          mapWallets.map((wallet) => (
            <AdminWalletItemCard
              key={wallet._id}
              wallet={wallet}
              placeholder={wallet.custom ? "(Custom Address)" : ""}
              to={`${url}/${wallet.symbol.toLowerCase()}`}
            />
          ))
        )}
      </Container>
    </>
  );
};

export default Wallets;
