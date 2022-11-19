import Link from "next/link";

const Navbar = () => {
  return (
    <div className="nav">
      <img className="header-logo" src="/logo.svg" alt="" />
      <ul className="flex gap-5 text-white">
        <li><Link href={'/'}>Home</Link></li>
        <li><Link href={'/signin'}>Sign In</Link></li>
        <li><Link href={'/user'}>User</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;