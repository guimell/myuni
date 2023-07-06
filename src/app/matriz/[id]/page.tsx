import TopNav from "@/components/topNav";
import { _doc } from "@/services/firebase";
import { getDoc } from "firebase/firestore";
import { Perfil, Atendimento } from "@/components/utility/svg";

export type User = {
  curso: string;
  name: string;
  password: string;
  ra: string;
  turno: string;
  periodo: string;
};

function capitalizeFirstLetters(str: string): string {
  const words = str.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const capitalizedString = capitalizedWords.join(" ");
  return capitalizedString;
}

export default async function Matriz({ params }: { params: { id: string } }) {
  const user = (await getDoc(_doc("users", params.id))).data() as
    | User
    | undefined;
  console.log(user);

  if (!user) {
    return (
      <>
        <h1>PAGE NOT FOUND!!</h1>
      </>
    );
  }
  const upperName = capitalizeFirstLetters(user?.name);
  const curso = capitalizeFirstLetters(user?.curso);
  const Turno = capitalizeFirstLetters(user?.turno);
  return (
    <>
      <TopNav />
      <div className="flex radiante h-32 items-center justify-between text-white">
        <div className="p-3">
          <p className="text-xs md:text-base">MY UNIVERSIDADE</p>
        </div>
        <div className="flex flex-row p-3 text-right justify-center items-center">
          <div className="flex flex-col p-0 sm:p-3">
            <h1 className="font-bold text-xs md:text-base">{upperName}</h1>
            <p className="text-xs md:text-sm">
              <span className="font-bold text-xs md:text-sm">RA: </span>
              {user?.ra}
            </p>
            <p className="text-xs md:text-sm">
              <span className="font-bold text-xs md:text-sm">Curso: </span>
              {curso}
            </p>
            <div className="flex flex-row w-full  justify-end">
              <p className="text-xs md:text-sm">
                <span className="font-bold text-xs md:text-sm">Turno: </span>
                {Turno} &nbsp;
              </p>
              <p className="text-xs md:text-sm">
                <span className="font-bold text-xs md:text-sm">Periodo: </span>
                {user?.periodo}
              </p>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center bg-slate-300 border rounded-full h-20 w-20 ">
            {Perfil}
          </div>
        </div>
      </div>
      <main></main>
    </>
  );
}
