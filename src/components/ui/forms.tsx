import { Button } from "./button";
import { Input } from "./input";

export function MyFormComponent() {
  return (
    <div className="flex justify-center items-center mt-56">
      <form className="w-1/1 h-auto bg-zinc-900 flex justify-center items-center rounded-s-lg p-10">
        <div className="flex flex-col gap-10 w-1/2 ">
          <h2 aria-label="Formulário de Contato" className="text-violet-400">
            Formulário de Contato
          </h2>
          <p>
            Preencha o formulário abaixo para entrar em contato com os
            desenvolvedores:
          </p>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" placeholder="Digite seu E-mail" />
          <Button type="submit">Enviar</Button>
        </div>
      </form>
    </div>
  );
}
