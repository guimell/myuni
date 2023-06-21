import TopNav from "@/components/topNav";
import { _doc } from "@/services/firebase";
import { getDoc } from "firebase/firestore";

export type User = {
  curso: string;
  name: string;
  password: string;
  ra: string;
  turno: string;
};
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
  return (
    <>
      <TopNav />
      <div className="flex radiante h-28 items-center justify-between text-white">
        <div className="m-3">MY UNIVERSIDADE</div>
        <div className="flex flex-row m-3 justify-center items-center">
          <div className="flex flex-col m-3">
            <h1>{user?.name}</h1>
            <p>RA:{user?.ra}</p>
            <p>Curso: {user?.curso}</p>
            <p>Turno: {user?.turno}</p>
          </div>
          <div className="border rounded-full h-20 w-20 "></div>
        </div>
      </div>
      <main>
        <p>teste</p>
      </main>
    </>
  );
}
