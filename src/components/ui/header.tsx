import { Button } from "./button";

interface HeaderProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
}

export function Header({ onLoginClick, onSignUpClick }: HeaderProps) {
  return (
    <header className="bg-[url('/img-paisagem.png')] bg-cover bg-center w-full h-[750px]">
      <nav className="relative sticky top-0 z-50">
        <ul className="flex justify-between items-center border-b-2 border-zinc-400 p-10 gap-5 bg-black/50 backdrop-blur-sm max-sm:pl-0">
          <div className="flex space-x-4">
            <li className="max-sm:hidden">
              <a
                href="#inicio"
                className="text-white text-sm leading-relaxed hover:text-zinc-400"
                aria-label="Ir para a Home"
              >
                Home
              </a>
            </li>
            <li className="max-sm:hidden">
              <a
                href="#contato"
                className="text-white text-sm leading-relaxed hover:text-zinc-400"
                aria-label="Ir para a seção Contato"
              >
                Contato
              </a>
            </li>
            <li className="max-sm:hidden">
              <a
                href="#metas"
                className="text-white text-sm leading-relaxed hover:text-zinc-400"
                aria-label="Ir para Criar Metas"
              >
                Metas
              </a>
            </li>
          </div>

          {/* Logo central */}
          <h1 className="text-4xl font-bold text-violet-300">DayGoals</h1>

          <div className="flex space-x-4">
            <li>
              <Button
                onClick={onLoginClick}
                className="text-white text-sm leading-relaxed hover:text-zinc-400"
                aria-label="Ir para Login"
              >
                Login
              </Button>
            </li>
            <li>
              <Button
                onClick={onSignUpClick}
                className="text-white text-sm leading-relaxed hover:text-zinc-400"
                aria-label="Ir para Register"
              >
                Register
              </Button>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
