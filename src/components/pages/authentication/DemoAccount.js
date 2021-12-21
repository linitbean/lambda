import React, { useState } from "react";
import { useHistory } from "react-router";
import { useProcess } from "../../../hooks/useProcess";
import { useProfile } from "../../../hooks/useProfile";
import axiosInstance from "../../../utils/axios";
import Button from "../../atoms/Button";
import Container from "../../atoms/Container";
import Spinner from "../../atoms/Spinner";
import Text from "../../atoms/Text";
import AuthLayout from "../../templates/Auth";

const DemoAccount = () => {
  const history = useHistory();
  const { profile, mutate } = useProfile();

  const [error, setError] = useState("");
  const { start, fail, complete, processing } = useProcess();

  const changeStatus = () => {
    try {
      start();
      setTimeout(async () => {
        await axiosInstance.post("/profile/demo");
        complete();
        mutate();
        history.push("/dashboard");
      }, 2000);
    } catch (err) {
      fail();
      setError(err?.response?.data?.message);
    }
  };

  return (
    <AuthLayout>
      <Container p="4px 0 12px" wide>
        <Text font="16px" p="0" m="0 0 012px 0" align="center" bold>
          Demo Account
        </Text>
        <Text font="12px" p="0" align="center" opacity="0.8" bold multiline>
          {profile.inDemoPeriod
            ? profile.demoMode
              ? "Opt out of Bittellar Demo Account"
              : "Opt in for a Bittellar Demo Account"
            : "Demo Trial Period Expired"}
        </Text>
      </Container>
      <Container wide>
        {profile.inDemoPeriod &&
          (profile.demoMode ? (
            <Text font="12px" align="center" opacity="0.6" bold multiline>
              Your account will be switched to a standard Trading Account.
              Please note that funds from your Demo account would not be
              persisted.
            </Text>
          ) : (
            <Text font="12px" align="center" opacity="0.6" bold multiline>
              You will be provided with an equivalent of{" "}
              {process.env.REACT_APP_DEMO_DEPOSIT || 1000} USD in your BTC
              wallet. Use these funds to trade within your Demo period (30 days
              after registration). Please note you will not be able to withdraw
              funds from your Demo account.
            </Text>
          ))}
        {error && (
          <Text font="12px" opacity="0.9" align="center" bold>
            {error}
          </Text>
        )}
        {profile.inDemoPeriod ? (
          <Button
            type="submit"
            bg="secondary"
            color="black"
            radius="2px"
            m="12px 0"
            full
            bold
            onClick={changeStatus}
          >
            {processing ? (
              <Spinner />
            ) : profile.demoMode ? (
              "Switch to Trading Account"
            ) : (
              "Switch to Demo Account"
            )}
          </Button>
        ) : (
          <Button
            bg="secondary"
            color="black"
            radius="2px"
            m="12px 0"
            full="true"
            bold="true"
            to="/dashboard"
          >
            Go to Dashboard
          </Button>
        )}
      </Container>
    </AuthLayout>
  );
};

export default DemoAccount;
