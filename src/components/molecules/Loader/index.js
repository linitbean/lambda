import React from "react";

import Container from "../../atoms/Container";
import Skeleton from "../../atoms/Skeleton";

const Loader = (props) => {
  return (
    <Container radius="8px" {...props} o="hidden">
      <Skeleton />
    </Container>
  );
};

export default Loader;

export { WalletPreviewLoader } from "./WalletPreviewLoader";
export { ActivitiesLoader } from "./ActivitiesLoader";
export { TransactionsLoader } from "./TransactionsLoader";
export {
  WalletItemLoader,
  WalletItemCardLoader,
  AdminWalletItemCardLoader,
  WalletItemFullCardLoader,
} from "./WalletItemLoader";
export { PaymentsLoader } from "./PaymentsLoader";
export { UsersLoader } from "./UsersLoader";
export { MessagesLoader } from "./MessagesLoader";
