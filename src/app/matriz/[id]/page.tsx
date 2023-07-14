import TopNav from "@/components/topNav";
import { _doc } from "@/services/firebase";
import { getDoc } from "firebase/firestore";
import { Perfil } from "@/components/utility/svg";
import Image from "next/image";
import Footer from "@/components/footer";
import logo from "public/logo2.png";

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
        <div>
          <Image src={logo} width={200} alt={"logo do site"}></Image>
        </div>
        <div className="flex flex-row p-3 text-right justify-center items-center">
          <div className="flex flex-col p-0 sm:p-3">
            <h1 className="font-bold text-xs md:text-base">{upperName}</h1>
            <p className="text-xs md:text-sm">
              <span className="font-bold text-xs md:text-sm">RA: </span>
              <span className="text-gray-200">{user?.ra}</span>
            </p>
            <p className="text-xs md:text-sm">
              <span className="font-bold text-xs md:text-sm">Curso: </span>
              <span className="text-gray-200"> {curso}</span>
            </p>
            <div className="flex flex-row w-full  justify-end">
              <p className="text-xs md:text-sm">
                <span className="font-bold text-xs md:text-sm">Turno: </span>
                <span className="text-gray-200"> {Turno} | &nbsp;</span>
              </p>
              <p className="text-xs md:text-sm">
                <span className="font-bold text-xs md:text-sm">Periodo: </span>
                <span className="text-gray-200">{user?.periodo}</span>
              </p>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center bg-slate-300 border rounded-full h-20 w-20 ">
            {Perfil}
          </div>
        </div>
      </div>
      <div className="bg-gray-200 ">
        <p className="text-xs md:text-sm px-8 py-2">
          <span className="text-gray-400">Você está em: </span>
          <span className="text-gray-600 font-bold">&nbsp;Home</span>
        </p>
        <div className="w-full line "></div>
      </div>
      <main className="bg-gray-200 relative"></main>
      <Footer />
    </>
  );
}
