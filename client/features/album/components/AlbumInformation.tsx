import React from "react";
import { Accordion } from "@chakra-ui/react";

import Album from "../types/album.interface";
import AccordionControl from "../../../components/widgets/AccordionControl";

interface Props {
  album: Album;
}

const AlbumInformation: React.FC<Props> = ({ album }) => {
  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple w={{ base: "full", sm: "70%" }} pb={2}>
        <AccordionControl
          heading={"Songs  / Track Listing"}
          body={album.trackListing}
          headingProps={{ fontWeight: 600 }}
          panelProps={{ whiteSpace: "pre-wrap", fontSize: { base: 16, sm: 15, md: 16 } }}
        />
        <AccordionControl
          heading={"Lineup / Musicians"}
          body={album.musicians}
          headingProps={{ fontWeight: 600 }}
          panelProps={{ whiteSpace: "pre-wrap", fontSize: { base: 16, sm: 15, md: 16 } }}
        />
      </Accordion>
    </>
  );
};

export default AlbumInformation;
