"use client";
import FirebaseConfig, { _collection, _doc } from "@/services/firebase";
import { doc, getDocs, query, setDoc, where } from "firebase/firestore";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [ra, setRa] = useState("");
  const [curso, setCurso] = useState("");
  const [turno, setTurno] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [password, setPassword] = useState("");

  function isInputsGood(): boolean {
    let isGood = true;
    if (name === "") isGood = false;
    if (ra === "") isGood = false;
    if (curso === "") isGood = false;
    if (turno === "") isGood = false;
    if (periodo === "") isGood = false;
    if (password === "") isGood = false;
    if (!isGood) alert("BAD INPUT");
    return isGood;
  }

  async function creatUser(event: FormEvent) {
    event.preventDefault();
    console.log("creating user", name, ra, curso, turno, periodo, password);
    console.log(FirebaseConfig.db);

    //check name and password
    if (!isInputsGood()) return;

    const usersCollection = _collection("users");
    const usersQueryDocs = (
      await getDocs(query(usersCollection, where("ra", "==", ra)))
    ).docs;
    console.log(usersQueryDocs);
    if (usersQueryDocs.length > 0) {
      alert("Account already exist");
      return;
    }

    localStorage.setItem("userRa", ra);

    //creat new user doc
    setDoc(_doc("users", ra), {
      name: name,
      ra: ra,
      curso: curso,
      turno: turno,
      periodo: periodo,
      password: password,
    });
  }

  return (
    <main>
      <div className="bg-transparent shadow-2xl border p-2 rounded-lg w-full sm:w-80">
        <form className="flex flex-col" onSubmit={creatUser}>
          <p>Nome:</p>
          <input
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Ex: Jesus Maria José"
            value={name}
          />
          <p>RA:</p>
          <input
            onChange={(event) => setRa(event.target.value)}
            type="text"
            placeholder="Ex: 123456789"
            value={ra}
          />
          <p>Curso:</p>
          <input
            onChange={(event) => setCurso(event.target.value)}
            type="text"
            placeholder="Ex: Medicina"
            value={curso}
          />
          <p>Turno</p>
          <input
            onChange={(event) => setTurno(event.target.value)}
            type="text"
            placeholder="Ex: Noturno"
            value={turno}
          />
          <p>Periodo</p>
          <input
            onChange={(event) => setPeriodo(event.target.value)}
            type="text"
            placeholder="Ex: 7"
            value={periodo}
          />
          <p>Senha</p>
          <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Ex: bola123"
            value={password}
          />
          <div className="w-full">
            <button
              className=" p-1 w-full  bg-blue-700 text-white"
              type="submit"
            >
              Enviar
            </button>

            <Link href={"/"}>
              <button className="w-full">Voltar para pagina inicial</button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
