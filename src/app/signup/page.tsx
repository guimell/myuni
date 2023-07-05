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
  const [password, setPassword] = useState("");

  function isInputsGood(): boolean {
    let isGood = true;
    if (name === "") isGood = false;
    if (ra === "") isGood = false;
    if (curso === "") isGood = false;
    if (turno === "") isGood = false;
    if (password === "") isGood = false;
    if (!isGood) alert("BAD INPUT");
    return isGood;
  }

  async function creatUser(event: FormEvent) {
    event.preventDefault();
    console.log("creating user", name, ra, curso, turno, password);
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
      password: password,
    });
  }

  return (
    <main>
      <div className="bg-red-500 border p-2 rounded-lg">
        <form className="flex flex-col" onSubmit={creatUser}>
          <input
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Nome:"
            value={name}
          />
          <input
            onChange={(event) => setRa(event.target.value)}
            type="text"
            placeholder="RA:"
            value={ra}
          />
          <input
            onChange={(event) => setCurso(event.target.value)}
            type="text"
            placeholder="Curso:"
            value={curso}
          />
          <input
            onChange={(event) => setTurno(event.target.value)}
            type="text"
            placeholder="Turno:"
            value={turno}
          />
          <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Senha:"
            value={password}
          />
          <button
            className="m-1 p-1 rounded  bg-blue-700 text-white"
            type="submit"
          >
            send
          </button>
        </form>
      </div>
      <div className="py-10">
        <Link href={"/"}>
          <button>Voltar para pagina inicial</button>
        </Link>
      </div>
    </main>
  );
}
