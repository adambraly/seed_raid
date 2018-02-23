import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import ButtonBase from 'material-ui/ButtonBase';
import Tooltip from 'material-ui/Tooltip';

const DiscordAvatar = (props) => {
  const {
    discriminator,
    nick,
    avatar,
    id,
    username,
    className,
  } = props;

  const discordName = (nickParam, usernameParam) => {
    if (nickParam) {
      return nickParam;
    }
    return usernameParam;
  };

  const avatarURL = (idParam, avatarParam, discriminatorParam) => {
    if (avatarParam) {
      return `https://cdn.discordapp.com/avatars/${idParam}/${avatarParam}.png?size=64`;
    }

    const defaultAvatar = discriminatorParam % 5;
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatar}.png?size=64`;
  };

  return (
    <Tooltip title={discordName(nick, username)} placement="bottom">
      <ButtonBase >
        <Avatar
          alt={discordName(nick, username)}
          src={avatarURL(id, avatar, discriminator)}
          className={className}
        />
      </ButtonBase>
    </Tooltip>
  );
};

DiscordAvatar.propTypes = {
  nick: PropTypes.string,
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
  discriminator: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};


DiscordAvatar.defaultProps = {
  nick: '',
  avatar: '',
  className: null,
};

export default DiscordAvatar;
