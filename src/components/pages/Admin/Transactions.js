import React from "react";
import { FaSearch } from "react-icons/fa";

import Container from "../../atoms/Container";
import Text from "../../atoms/Text";
import SubText from "../../atoms/SubText";

import { AdminTransactionItem } from "../../molecules/TransactionItem";
import { TransactionsLoader } from "../../molecules/Loader";

import { useAdminTransactions } from "../../../hooks/useTransactions";

const Transactions = () => {
  const { transactions, loading } = useAdminTransactions();

  return (
    <>
      <Container p="12px" borderbottom="1px solid" wide>
        <Text font="16px" p="12px 0" bold>
          Recent Transactions
        </Text>
        <Text p="12px 0" font="12px" opacity="0.6" bold multiline>
          Manage recent transactions
        </Text>
      </Container>

      <Container p="12px" flex="flex-end" wide>
        <Text
          p="6px 12px"
          m="0 12px 0 0"
          radius="4px"
          bg="primary"
          color="white"
          font="11px"
          bold="true"
          flexalign="true"
          to="./users/find"
        >
          Find User
          <SubText p="0" m="0 0 0 8px" font="inherit" flexalign>
            <FaSearch />
          </SubText>
        </Text>
        <Text
          p="6px 12px"
          radius="4px"
          bg="primary"
          color="white"
          font="11px"
          bold="true"
          flexalign="true"
          to="./transactions/find"
        >
          Find Transaction
          <SubText p="0" m="0 0 0 8px" font="inherit" flexalign>
            <FaSearch />
          </SubText>
        </Text>
      </Container>

      <Container p="12px" wide>
        {loading ? (
          <TransactionsLoader />
        ) : transactions.length ? (
          transactions.map((tx) => (
            <AdminTransactionItem key={tx._id} transaction={tx} showUsername />
          ))
        ) : (
          <Container minH="240px" flex="center">
            <Text opacity="0.6" bold>
              No Transactions
            </Text>
          </Container>
        )}
      </Container>
    </>
  );
};

export default Transactions;
