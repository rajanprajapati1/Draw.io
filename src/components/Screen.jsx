import {Excalidraw ,CenterLogo, Center, WelcomeScreen , Hint ,MenuHint ,Help, Heading ,MenuItemLink ,CenterDropDownMenu} from '../constants/Excalidraw'
import Ghost from '../assets/ghost.svg';
import Witch from '../assets/witch.svg';
import Paper from '../assets/paper.svg';
import Pumpkins from '../assets/pumpkins.svg';
import Hat from '../assets/hat.svg';
import Line from '../assets/line.webp';
import Image from "next/image";

const Screen = () => {
  return (
    <WelcomeScreen>
    <Center>
      <CenterLogo>
        <div className="l flex items-center justify-center font-bold gap-1">
        <Image src={Ghost} width={150} height={150} alt="logo"/>
        <h1 className="text-6xl">Draw.io</h1>
        </div>
        <div className="right_top right-8 top-8 absolute z-[99999]">
        <Image src={Line} width={80} height={80} alt="logo"/>
        <h1 className="text-base font-semibold flex items-center text-center w-[250px]">
        <Image src={Hat} width={80} height={80} alt="logo"/>
     <div> Unleash Your Creativity  
     generate stunning diagrams effortlessly!</div>
  </h1>
    </div>
      </CenterLogo>
      <Heading>Made By Rajan ❤️</Heading>
             </Center>
     <Hint>
      <p> Pick a tool & start drawing 🙌 </p>
    </Hint>
    <MenuHint>
        <h1>Export ,Save ,Change Bg Color & More.</h1>
        <Image src={Paper} width={80} height={80} alt="logo"/>
    </MenuHint>
    <Help>
    <Image src={Pumpkins} width={80} height={80} alt="logo"/>
        <h1>Shortcuts & help</h1>
    </Help>
   
           </WelcomeScreen>
  )
}

export default Screen