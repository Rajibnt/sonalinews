export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 mt-auto backdrop-blur-md bg-black/40">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} Sonalinews Clone. All rights reserved. Replicated with high-fidelity aesthetics.
        </p>
      </div>
    </footer>
  );
}
