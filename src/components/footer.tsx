import { Atendimento, AtendimentoFooter } from "./utility/svg";
import Image from "next/image";
import bot from "public/bot.png";
export default function Footer() {
  return (
    <div className="flex justify-center items-center fixed w-20 h-20 bottom-10 right-2  hover:animate-bounce transition-all cursor-pointer">
      {/* {AtendimentoFooter} */}
      <Image src={bot} alt={"teste"}></Image>
    </div>
  );
}
