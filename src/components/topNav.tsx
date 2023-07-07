"use client";
import Link from "next/link";
import { Atendimento, Edit, Exit, Search } from "@/components/utility/svg";

export default function TopNav() {
  return (
    <>
      <div className="flex bg-slate-100 h-14 items-center justify-between">
        <div className="flex flex-row p-1 items-center">
          <Link className="m-3" href={""}>
            <div className="flex flex-row justify-center items-center md:px-4">
              <div className="flex flex-col justify-between pr-2">
                <div className="h-1 w-5 mb-1 bg-black rounded"></div>
                <div className="h-1 w-5 mb-1 mt-1 bg-black rounded"></div>
                <div className="h-1 w-5 mt-1 bg-black rounded"></div>
              </div>
              <p className="hidden md:flex"> MENU</p>
            </div>
          </Link>
          <div className="hidden md:flex input-group">
            <input
              className="w-96"
              type="text"
              name=""
              placeholder="Buscar..."
            />
            <button className="px-3" type="button">
              {Search}
            </button>
          </div>
        </div>

        <div className="flex flex-row p-1 ">
          <Link className="p-3" href={"/"}>
            <div className="flex flex-col justify-center items-center">
              {Atendimento}
              <p className="text-xs md:text-base"> Atendimento</p>
            </div>
          </Link>
          <Link className="p-3" href={"/"}>
            <div className="flex flex-col justify-center items-center">
              {Edit}
              <p className="text-xs md:text-base">Meus dados</p>
            </div>
          </Link>
          <Link className="p-3" href={"/"} onClick={() => localStorage.clear()}>
            <div className="flex flex-col justify-center items-center">
              {Exit}
              <p className="text-xs md:text-base">Sair</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
