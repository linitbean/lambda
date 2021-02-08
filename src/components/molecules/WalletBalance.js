import React, { useState } from "react";
import { AiOutlineSwap } from "react-icons/ai";

import Container from "../atoms/Container";
import Text from "../atoms/Text";
import SubText from "../atoms/SubText";
import WalletIcon from "../atoms/WalletIcon";

import { useWalletBalance } from "../../hooks/useBalance";
import { useCoinValue } from "../../hooks/useCoinValue";

const WalletBalance = ({ wallet, ...props }) => {
  const [showTotal, setShowTotal] = useState(false);

  const { available, total } = useWalletBalance(wallet?.symbol);
  const { amount } = useCoinValue(
    wallet?.symbol,
    showTotal ? total : available
  );

  return (
    <Container wide {...props}>
      <Container p="12px 0 24px" flex="flex-start" wide>
        <WalletIcon symbol={wallet?.symbol} size="40px" />
        <Text m="0 0 0 12px" font="16px" p="0" bold>
          {wallet?.name} Wallet
        </Text>
      </Container>
      <Container p="12px 0" wide>
        <Container flex="space-between" wide>
          <Container wide>
            <Text p="0" m="0 0 12px" bold>
              {showTotal ? "Total" : "Available"} Balance
            </Text>
            <Text p="0 0 6px" font="28px" weight="400">
              {amount}
            </Text>
          </Container>
          <Text
            bg={showTotal ? "secondary" : "primary"}
            color="white"
            font="24px"
            multiline
            p="6px"
            radius="4px"
            pointer
            bold
            flexalign
            onClick={() => setShowTotal(!showTotal)}
          >
            <AiOutlineSwap />
          </Text>
        </Container>
        <Text p="0">
          <SubText p="0" font="12px" opacity="0.6" bold>
            Balance in USD:
          </SubText>{" "}
          <SubText p="0" font="14px" opacity="0.9" bold>
            {showTotal ? total : available} USD
          </SubText>
        </Text>
      </Container>
    </Container>
  );
};

export default WalletBalance;
