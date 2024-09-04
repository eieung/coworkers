import List from './List';
import Profile from './Profile';
import Logo from './Logo';
import MobileMenu from './MobileMenu';

export default function Header() {
  return (
    <header className="z-999 sticky top-0 flex h-[60px] w-full items-center justify-center border-b border-transparent border-b-bd-primary bg-bg-secondary px-4 py-5 md:px-6 md:py-5">
      <div className="flex w-[1200px] items-center justify-between md:h-5">
        <div className="flex items-center justify-between gap-x-4 md:gap-x-8 lg:gap-x-10">
          <MobileMenu />
          <Logo />
          <List />
        </div>
        <Profile />
      </div>
    </header>
  );
}
