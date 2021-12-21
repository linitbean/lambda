import React from "react";
import { useProfile } from "../../hooks/useProfile";
import Avatar from "../atoms/Avatar";
import Image from "../atoms/Image";

const ProfilePic = ({ size = "32px", user: customUser, demo, ...props }) => {
  const { profile } = useProfile();

  const user = customUser || profile;

  const url = user.avatar?.url && user.avatar.url.split("/");
  let newUrl;
  if (url) {
    url.splice(6, 0, "w_200,h_200,c_fill");
    newUrl = url.join("/");
  }

  return user.avatar?.url ? (
    <Image src={newUrl} w={size} h={size} radius="50%" alt={user.fullName} />
  ) : (
    <Avatar size={size} name={user.fullName} demo={demo} {...props} />
  );
};

export default ProfilePic;
