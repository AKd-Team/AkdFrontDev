import React, {useState} from 'react';
import {Frame, Stack,Page,Scroll} from "framer";
import {Button} from "@material-ui/core";

const Anunturi =()=>{
    const [crtAnunt,setCrtAnunt]=useState(1);
    const onTapNext = ()=>{
        if(crtAnunt+1<5)
            setCrtAnunt(crtAnunt+1);
    }
    const onTapPrevious=(e)=>{
        console.log("Tapped previous")
        if(crtAnunt-1>0)
            setCrtAnunt(crtAnunt-1);

    }
  return(
      <Stack
          //backgroundColor={"white"}
          style={{marginLeft:5}}
          width={"70%"}
      >
                <Scroll

                    position={"relative"}
                    width={"100%"}
                    height={"70%"}
                >
                    <Frame backgroundColor={"white"}>A</Frame>
                    <Frame backgroundColor={"white"}>B</Frame>
                    <Frame backgroundColor={"white"}>C</Frame>
                    <Frame backgroundColor={"white"}>D</Frame>
                    <Frame backgroundColor={"white"}>E</Frame>
                </Scroll>
          
      </Stack>
  )
};

export default Anunturi;