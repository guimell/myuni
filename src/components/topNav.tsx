import Link from "next/link";

export default function TopNav() {
  return (
    <>
      <div className="flex bg-slate-300 h-14 items-center justify-between">
        <div className="p-1">
          <Link className="m-3" href={""}>
            <div className="flex flex-row justify-center items-center">
              <div className="flex flex-col justify-between">
                <div className="h-1 w-5 mb-1 bg-black rounded"></div>
                <div className="h-1 w-5 mb-1 mt-1 bg-black rounded"></div>
                <div className="h-1 w-5 mt-1 bg-black rounded"></div>
              </div>
              Menu
            </div>
          </Link>
        </div>
        <div className="p-1">
          <Link className="m-3" href={""}>
            Atendimento
          </Link>
          <Link className="m-3" href={""}>
            Meus dados
          </Link>
          <Link className="m-3" href={""}>
            Sair
          </Link>
        </div>
      </div>

      <div className="flex radiante h-28 items-center justify-between text-white">
        <div className="m-3">MY UNIVERSIDADE</div>
        <div className="flex flex-row m-3 justify-center items-center">
          <div className="flex flex-col m-3">
            <h1>Davi Guimell Pereila Landulfo Jorge</h1>
            <p>RA:12719191070</p>
            <p>Curso: Ciencias da computação</p>
            <p>Turno: Noturno</p>
          </div>
          <div className="border rounded-full h-20 w-20 "></div>
        </div>
      </div>
    </>
  );
}
