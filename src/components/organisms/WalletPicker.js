import React, { useState, useEffect } from "react";

import Container from "../atoms/Container";
import Text from "../atoms/Text";
import Search from "../atoms/Search";

import { AdminWalletItem } from "../molecules/WalletItem";
import Modal from "../molecules/Modal";

import { useDebounce } from "../../hooks/useDebounce";

const WalletPicker = ({ title, wallets = [], action: cb, open, dismiss }) => {
  const [matchWallets, setMatchWallets] = useState(wallets);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => setSearchValue(e.target.value);

  const debouncedValue = useDebounce(searchValue, 600);

  useEffect(() => {
    const match = wallets.filter((wallet) => {
      return (
        wallet.name.toLowerCase().startsWith(debouncedValue.toLowerCase()) ||
        wallet.symbol.toLowerCase().startsWith(debouncedValue.toLowerCase())
      );
    });
    setMatchWallets(match);
  }, [debouncedValue, wallets]);

  useEffect(() => {
    setSearchValue("");
  }, [open]);

  const action = (selectedWallet) => {
    const selected = wallets.find(
      (wallet) =>
        wallet.symbol.toLowerCase() === selectedWallet.symbol.toLowerCase()
    );
    cb(selected);
    dismiss();
  };

  return (
    <Modal open={open} dismiss={dismiss}>
      <Container
        flexCol="center"
        w="95%"
        h="400px"
        maxW="480px"
        maxH="80vh"
        bg="bgContrast"
        p="12px"
        radius="12px"
      >
        <Text font="14px" p="8px 0 20px" bold>
          {title || "Select Wallet"}
        </Text>
        <Search
          placeholder="Search Wallets"
          value={searchValue}
          onChange={handleSearch}
          w="100%"
          p="0"
        />
        <Container h="calc(100% - 48px)" scroll>
          {matchWallets.map((wallet) => (
            <AdminWalletItem
              key={wallet.symbol}
              action={action}
              wallet={wallet}
              nolink
            />
          ))}
        </Container>
      </Container>
    </Modal>
  );
};

export default WalletPicker;
