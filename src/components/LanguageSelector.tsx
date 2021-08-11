import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Selector, { SelectorOptionType } from "./Selector";

import globe from "../assets/ui/globe.svg";

const languageOptions: SelectorOptionType[] = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "jp",
    label: "日本語",
  },
];

const StyledLanguageSelector = styled.button`
  display: flex;
  align-items: center;
  height: 3.6rem;
  padding: 0 1.7rem;
  border: solid 1px white;
  border-radius: 0.7rem;
`;

const Globe = styled.img`
  height: 1.7rem;
`;

const Label = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0.15px;
  margin-left: 1.5rem;

  @media (max-width: 600px) {
    display: none;
  }
`;

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const anchorRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);

  const activeLanguage = languageOptions.filter(
    (option: SelectorOptionType) => option.value === i18n.language
  )[0].label;

  return (
    <StyledLanguageSelector onClick={() => setOpen(true)} ref={anchorRef}>
      <Globe src={globe} />
      <Label>{activeLanguage}</Label>
      <Selector
        open={open}
        anchorRef={anchorRef}
        options={languageOptions}
        selected={i18n.language}
        close={() => setOpen(false)}
        select={(v: string) => i18n.changeLanguage(v)}
      />
    </StyledLanguageSelector>
  );
};

export default LanguageSelector;
