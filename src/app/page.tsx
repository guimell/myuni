"use client";

import { _collection } from "@/services/firebase";
import { getDocs, query, where } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { User } from "./matriz/[id]/page";
import { useRouter } from "next/navigation";
import { LoadingIcon } from "@/components/utility/svg";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [ra, setRa] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ra = localStorage.getItem("userRa");
    if (!ra) {
      setIsLoading(false);
      return;
    }
    router.push("/matriz/" + ra);
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    console.log("login");
    const usersCollection = _collection("users");
    const usersQueryDocs = (
      await getDocs(
        query(
          usersCollection,
          where("ra", "==", ra),
          where("password", "==", password)
        )
      )
    ).docs;

    if (usersQueryDocs.length === 0) {
      alert("No account found");
      setIsLoading(false);
      return;
    }
    console.log(usersQueryDocs[0].data());
    const user = usersQueryDocs[0].data() as User;
    localStorage.setItem("userRa", ra);
    router.push("/matriz/" + user.ra);
  }

  return (
    <main className="p-0">
      <dialog className="p-10 rounded-xl shadow-lg" open={isLoading}>
        <div className="flex flex-col justify-center item gap-4">
          {LoadingIcon}
          <p className="font-bold">LOADING... </p>
        </div>
      </dialog>

      <div className="flex flex-row w-full h-full bghome ">
        <div className="flex w-1/2 h-screen bghome text-white justify-center items-center "></div>
        <div className="flex flex-col w-1/2 h-screen  justify-center items-center bg-white bgborder">
          <div className="w-64">
            <h1 className="mb-2 font-bold text-lg text-gray-500">
              MYUNI: sua vida academica em um só lugar
            </h1>

            <div>
              <form className="flex flex-col" onSubmit={login}>
                <input
                  onChange={(event) => setRa(event.target.value)}
                  type="text"
                  placeholder="RA:"
                  value={ra}
                />
                <input
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  placeholder="Senha:"
                  value={password}
                />
                <button type="submit">ENTRAR</button>

                <div className="flex flex-row py-2 ">
                  <p className="text-blue-500 text-xs hover:underline cursor-pointer">
                    Esqueci minha senha
                  </p>
                  <p className="text-blue-500 text-xs pl-1 pr-1 ">|</p>
                  <Link href={"/signup"}>
                    <p className="text-blue-500 text-xs hover:underline cursor-pointer">
                      Pré matricula
                    </p>
                  </Link>
                  <p className="text-blue-500 text-xs pl-1 pr-1 ">|</p>
                  <p className="text-blue-500 text-xs hover:underline cursor-pointer">
                    Ex-aluno
                  </p>
                </div>
                <p className="text-blue-700 font-bold text-xs p-1 ">
                  PRECISA DE AJUDA? ACESSE NOSSA FAQ
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
