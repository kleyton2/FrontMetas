function Main() {
  return (
    <div>
      <div className="relative">
        <div
          style={{ top: "-500px" }}
          className="absolute    items-end text-white p-8"
        >
          <h1 className="text-4xl mb-4 text-violet-300">DayGoals</h1>
          <h2 className="text-2xl mb-4">Seu planejador de metas pessoais</h2>
          <p className="text-lg mb-6">Não perca tempo!</p>
        </div>
      </div>

      <section className="text-center bg-zinc-900 pt-12 h-[600px]">
        <h2 className="mb-5 text-3xl text-violet-300 ">
          Sobre <span className="">DayGoals</span>
        </h2>
        <p className="max-w-2xl mx-auto leading-8 text-base">
          Bem-vindo ao{" "}
          <span className="font-bold text-violet-300">DayGoals</span>, a sua
          plataforma de planejamento de metas que transforma sonhos em
          realizações! No
          <span className="font-bold text-violet-300"> DayGoals</span>,
          acreditamos que qualquer objetivo pode ser alcançado com as
          ferramentas certas e uma estratégia bem definida. Nossa missão é
          ajudar você a definir, acompanhar e alcançar suas metas pessoais e
          profissionais de maneira eficaz. Quer se trate de melhorar suas
          habilidades, alcançar objetivos de carreira, ou transformar sua vida
          pessoal, estamos aqui para fornecer o suporte e a motivação
          necessários. Com uma interface amigável e intuitiva, o
          <span className="font-bold text-violet-300"> DayGoals</span> permite
          que você:
          <br /> Comece agora e transforme seus sonhos em realidade com o
          <span className="font-bold text-violet-300"> DayGoals</span>. Estamos
          empolgados para fazer parte da sua jornada rumo ao sucesso!
        </p>
      </section>

      <section className="flex flex-row justify-center ">
        <div className="flex flex-row justify-center max-sm:flex-col">
          <div className="flex-1 text-center pt-14 pr-6 max-sm:pb-5">
            <img
              src="dayGols-cadastrar-metas.jpg"
              alt="cadastrar metas"
              className="h-96 w-80 p-3.5 mb-6 border-t border-l border-b-4 border-r-4 border-violet-300 inline"
            />
            <h3 className="text-violet-300 text-xl">Cadastrar Metas</h3>
            <p className="leading-6">
              Comece a cadastrar suas metas agora mesmo e transforme seus sonhos
              em realidade!
            </p>
            <p className="font-bold text-violet-300 mt-12 mb-3.5">Passos:</p>
            <p className="leading-6">1. Clique em "Cadastrar Meta".</p>
            <p className="leading-6">
              2. Preencha as informações que vai aparecer.
            </p>
            <p className="leading-6">3. Adicione suas metas.</p>
            <p className="leading-6">4. Acompanhe seu progresso.</p>
          </div>

          <div className=" flex-1 text-center pt-14 pr-6 sm:border-x-2 sm:border-zinc-200 max-sm:border-y-4 max-sm:border-zinc-200 max-sm:pb-5">
            <img
              src="dayGols-cadastrando-metas.jpg"
              alt="cadastrando metas"
              className="h-96 w-80 p-3.5 mb-6 border-t border-l border-b-4 border-r-4 border-violet-300 inline"
            />
            <h3 className="text-violet-300 text-xl">Criação de Metas</h3>
            <p className="leading-6">
              Defina o nome da sua meta e a frequência semanal.
            </p>
            <p className="font-bold text-violet-300 mt-12 mb-3.5">
              Instruções:
            </p>
            <p className="leading-6">1. Adicione o nome da meta.</p>
            <p className="leading-6">
              2. Defina quantas vezes por semana deseja trabalhar nela.
            </p>
            <p className="leading-6">
              3. Clique no botão "Salvar" para salvar sua meta.
            </p>
          </div>

          <div className="flex-1 text-center pt-14 pr-6">
            <img
              src="dayGols-meta-cadastrada-part2.jpg"
              alt="meta cadastrada"
              className="h-96 w-80 p-3.5 mb-6 border-t border-l border-b-4 border-r-4 border-violet-300 inline"
            />
            <h3 className="text-violet-300 text-xl">Meta Cadastrada</h3>
            <p className="leading-6">Sua meta foi cadastrada com sucesso.</p>
            <p className="font-bold text-violet-300 mt-12 mb-3.5">
              Próximos Passos:
            </p>
            <p className="leading-6">1. Acompanhe seu progresso.</p>
            <p className="leading-6">
              2. Ajuste suas metas conforme necessário.
            </p>
            <p className="leading-6">3. Alcance seus objetivos.</p>
          </div>
        </div>
              
      </section>
    </div>
  );
}

export default Main;
