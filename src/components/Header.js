import Link from "next/link";

export default function Header() {
    return (
        <header>
            <Link href={'/'}>Uzma&apos;s Art Shop</Link>
            <nav>
                <Link href={'/'}>Home</Link>
                <Link href={'/products'}>Products</Link>
                <Link href={'/categories'}>Categories</Link>
                <Link href={'/account'}>Account</Link>
                <Link href={'/cart'}>Cart (0)</Link>
            </nav> 
        </header>
    );
}