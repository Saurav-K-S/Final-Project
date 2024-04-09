import React, { useState } from "react";
import EnterDetails from "./EnterDetails";
import OptionSelect from "./OptionSelect";
import FamilyJoin from "./FamilyJoin";
import CreateFamily from "./CreateFamily";
import FamilyHistory from "./FamilyHistory";
import UploadPhoto from "./UploadPhoto";

export default function FamilyJoinCreation() {
  const name = localStorage.getItem("name");
  const [familyName, setFamilyName] = useState("");
  const [fatherName, setFatherName] = useState();
  const [occupation, setOccupation] = useState();
  const [index, setIndex] = useState(1);
  switch (index) {
    //Vendaann CJ paranj
    // case 0:
    //   return (
    //     <EnterDetails
    //       name={name}
    //       indexFunc={setIndex}
    //       fatherFunc={setFatherName}
    //       occupationFunc={setOccupation}
    //     />
        
    //   );
    case 1:
      return <OptionSelect name={name} indexFunc={setIndex}/>;
    case 2:
      return <FamilyJoin name={name} />;
    case 3:
      return <CreateFamily name={name} familyNameFunc={setFamilyName} indexFunc={setIndex}/>;
    case 4:
      return <FamilyHistory name={name} familyName={familyName} indexFunc={setIndex}/>;
    case 5:
      return <UploadPhoto name={name} />;
  }
}
