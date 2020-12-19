import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
// redux
import { Dispatch } from 'redux';
import { connect, MapDispatchToProps } from 'react-redux';
import {
  saveUsername as saveUsernameAction,
  saveUserMessage as saveUserMessageAction,
} from '../../store/user/UserActions';
import { IUser } from '../../store/user/UserTypes';
import { IHomeState } from '../../store/RootReducer';
// styles
import './Home.css';

interface IHomeOwnProps {
  username: string | undefined;
  userType: 'admin' | 'moderator' | 'user' | 'guest';
}

interface IHomeDispatchToProps {
  saveUsername: (user: IUser) => void;
  saveUserMessage: (user: IUser) => void;
}

const HomeUnconnected: React.FC<IHomeDispatchToProps & IHomeOwnProps> = ({
  userType, username, saveUsername, saveUserMessage
}): JSX.Element => {
  const [time, setTime] = useState<Date>(() => new Date(Date.now()));
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date(Date.now()));
    }, 1000);

    if (username) {
      saveUsername({ username, userMessage: undefined });
    }
    
    return () => {
      clearInterval(timer);
    }
  }, [username, saveUsername]);

  useEffect(() => {
    saveUserMessage({username: undefined, userMessage: message});
  }, [message, saveUserMessage]);

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  }

  return (
    <div className="Home">
      <p>
        Hi, {username ? username : 'Mysterious Entity'}, your user type is {username ? userType : 'irrelevant because I do not know you'}.
      </p>
      <p>{time.toUTCString()}</p>
      <input
        type='text'
        placeholder='Enter your message here'
        value={message}
        onChange={handleTextChange}
      />
      <p>Your message: {message || ''}</p>
      <Link to='/userlist'>User List</Link>
    </div>
  );
}

const mapDispatchToProps: MapDispatchToProps<
  IHomeDispatchToProps,
  IHomeOwnProps
> = (dispatch: Dispatch, ownProps: IHomeOwnProps): IHomeDispatchToProps => ({
  saveUsername: (user: IUser) => {
    dispatch(saveUsernameAction(user));
  },

  saveUserMessage: (user: IUser) => {
    dispatch(saveUserMessageAction(user));
  },
});

export const Home = connect<
  {},
  IHomeDispatchToProps,
  IHomeOwnProps,
  IHomeState
>(null, mapDispatchToProps)(HomeUnconnected);
