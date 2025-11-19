"use client";
import Button from "@/components/custom-ui/Button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      this is initial page 

      <Button variant="primary">Nepal button</Button>
      <Button variant="danger" onClick={()=>alert("Are you want to delete")}>red button </Button>
      <Button variant="outline" >green button</Button>


    </div>
  );
}
