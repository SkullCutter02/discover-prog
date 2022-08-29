import React from "react";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  BoxProps,
  AccordionPanelProps,
} from "@chakra-ui/react";

interface Props {
  heading: string;
  body: string;
  headingProps?: BoxProps;
  panelProps?: AccordionPanelProps;
}

const AccordionControl: React.FC<Props> = ({ heading, body, headingProps, panelProps }) => {
  return (
    <>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex={"1"} textAlign={"left"} {...headingProps}>
              {heading}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} {...panelProps}>
          {body}
        </AccordionPanel>
      </AccordionItem>
    </>
  );
};

export default AccordionControl;
