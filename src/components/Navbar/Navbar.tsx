import { NavLink } from 'react-router-dom';
import { CurrentUser } from '../../types/userType';
import { InfoType } from '../../types/infoTypes';
import LogoutButton from '../LogoutButton/LogoutButton';
import Search from '../Search/Search';

type NavbarProps = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setAuthUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setInfo: (info: InfoType | null) => void;
};

export default function Navbar({
  token,
  setToken,
  setAuthUser,
  setIsAuth,
  setInfo,
}: NavbarProps) {
  return (
    <nav className="sticky top-0 right-0 h-68 md:h-16 w-full bg-sky-800 flex flex-col md:flex-row gap-1 md:gap-4 text-center">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive
            ? 'bg-amber-500 text-neutral-50 hover:text-neutral-50 p-1 md:p-4'
            : 'text-neutral-50 hover:text-amber-500 p-1 md:p-4'
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/posts"
        className={({ isActive }) =>
          isActive
            ? 'bg-amber-500 text-neutral-50 hover:text-neutral-50 p-1 md:p-4'
            : 'text-neutral-50 hover:text-amber-500 p-1 md:p-4'
        }
      >
        Posts
      </NavLink>
      <NavLink
        to="/polls"
        className={({ isActive }) =>
          isActive
            ? 'bg-amber-500 text-neutral-50 hover:text-neutral-50 p-1 md:p-4'
            : 'text-neutral-50 hover:text-amber-500 p-1 md:p-4'
        }
      >
        Polls
      </NavLink>
      <NavLink
        to="/users"
        className={({ isActive }) =>
          isActive
            ? 'bg-amber-500 text-neutral-50 hover:text-neutral-50 p-1 md:p-4'
            : 'text-neutral-50 hover:text-amber-500 p-2 md:p-4'
        }
      >
        Users
      </NavLink>
      <Search token={token} />
      <LogoutButton
        setToken={setToken}
        setAuthUser={setAuthUser}
        setIsAuth={setIsAuth}
        setInfo={setInfo}
      />
    </nav>
  );
}
