import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';

const DiscordAvatar = (props) => {
  const {
    discriminator,
    nick,
    avatar,
    id,
    username,
  } = props;

  const author = (nickParam, usernameParam) => {
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
    <Avatar
      alt={author(nick, username)}
      src={avatarURL(id, avatar, discriminator)}
    />
  );
};

DiscordAvatar.propTypes = {
  nick: PropTypes.string,
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
  discriminator: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};


DiscordAvatar.defaultProps = {
  nick: '',
  avatar: '',
};

export default DiscordAvatar;
