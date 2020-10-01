import React from "react";

import Chip from "@material-ui/core/Chip";

function UserprofileAvatarHeader({ Currentuser }) {
  return (
    <div>
      <Chip label={Currentuser} clickable color="primary" />
    </div>
  );
}

export default UserprofileAvatarHeader;
