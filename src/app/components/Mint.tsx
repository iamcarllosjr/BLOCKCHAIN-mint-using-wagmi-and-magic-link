"use client";
import Image from "next/image";
import Rabbit from "../../../public/evil-rabbit-2.png";
import { motion } from "framer-motion";
import LegionOfRabbitsABI from "./utils/ABI.json";
import { useState } from "react";
import { useAccount, useConnect, useContractWrite, useDisconnect } from "wagmi"
import { BaseError, ContractFunctionRevertedError } from "viem";

//Mapiing de erro do smart-contract para usar no customError
//Record<string, string> é para dizer que o indice e valor vai ser um string
const errorMapping: Record<string, string> = {
  maxSupply: "Max Supply Exceeded",
  maxPerWallet: "Max per Wallet Exceeded",
  default: "Ops, there is some error",
}


const legionOfRabbitsAddress = "0x8FeB148B4F50aCb7311c1f17CE0404aC69B90a68";

const Mint = () => {
  const [message, setMessage] = useState("");
  const { connect, connectors, isLoading, isIdle } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const mintAmount = 1;

  const { 
    writeAsync: mint, //Passando novo nome "Alias" usa :
    data,
    isLoading: isMintLoading //Passando novo nome "Alias" usa :
   } = useContractWrite({
    address: legionOfRabbitsAddress,
    abi: LegionOfRabbitsABI.abi,
    functionName: 'safeMint',

  })

  if(data){
    //hash
    console.log("data =>", data);
  }

  const handleMint = async () => {
    if(!isConnected){
      connect({ connector: connectors[0] });
      return;
    }
    
    //Custom Error do smart-contract e Mint
    try {
      //Mint
    await mint ({
      //Os argumentos que a função safeMint espera receber, no caso, quantidade para mintar
      args: [mintAmount],
    })
    setMessage("NFT Mintado");
    } catch (error) {

      //Verificando se error é uma instancia de BaseError do Viem
      if(error instanceof BaseError){

        //função walk vai "andar" no erro
        const revertError = error.walk((err) => err instanceof ContractFunctionRevertedError);
        if(revertError instanceof ContractFunctionRevertedError){
          const errorName = revertError.data?.errorName ?? "default";
          console.log("revertCustomError :", errorName);
          alert(errorMapping[errorName]);//Ou pode ser num toast, ou estado para mostrar os erros
        }
      }
      
    }
  }

  return (
    <>
      {isConnected ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeIn", delay: 0.5 }}
          className="flex items-center justify-center pt-24"
        >
          <div className="w-1/2 h-auto bg-tranparent rounded-lg shadow-neon backdrop-blur-sm p-7">
            <div className="flex items-center justify-center gap-3">
              <div className="items-center hidden sm:inline-flex ">
                <Image
                  width={250}
                  src={Rabbit}
                  alt="Rabbit"
                  className="hover:scale-110 transition-all duration-300"
                ></Image>
              </div>

              <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-white text-2xl text-center tracking-wider font-semibold">
                  Legion Of Rabbits is a new coletion in Web3.
                </h1>
                <button onClick={handleMint}  className="button-mint">MINT NOW</button>
                <button
            onClick={() => disconnect()}
            className="button-neon"
          >
            Disconnect
          </button>
          <p className="text-white">{address}</p>
              </div>
            </div>
            <p className="text-center text-white tracking-widest">{message}</p>
          </div>
        </motion.div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeIn", delay: 0.6 }}
          className="mt-[70px] gap-1 flex items-center justify-center text-center text-3xl tracking-wider text-white font-bold"
        > You need to be logged in to mint
          <button onClick={() => connect({ connector: connectors[0] })} disabled={isLoading || isMintLoading} className="shadow-neon p-2 rounded-md ml-2">
          {isLoading || isMintLoading ? "Loading..." : isIdle ? "Connect Here" : "Connecting..."}
          </button>
        </motion.p>
      )}
    </>
  );
};

export default Mint;