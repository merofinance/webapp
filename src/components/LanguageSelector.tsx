import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import Selector, { SelectorOptionType } from "./Selector";
import globe from "../assets/ui/globe.svg";

const languageOptions: SelectorOptionType[] = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "ja",
    label: "日本語",
  },
];

const StyledLanguageSelector = styled.button`
  display: flex;
  align-items: center;
  height: 3.6rem;
  padding: 0 1.7rem;
  border-radius: 0.7rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 1rem;

  :hover {
    background-color: #271f4f;
  }
`;

const Globe = styled.img`
  height: 1.7rem;
`;

const Label = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0.15px;
  margin-left: 1.5rem;
`;

interface ArrowProps {
  open: boolean;
}

const Arrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin-left: 0.7rem;
  margin-right: 0.4rem;

  svg {
    transition: 0.3s;
    transform: ${(props: ArrowProps) => (props.open ? "rotate(180deg)" : "rotate(0deg)")};
  }
`;

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const url = useLocation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const { lang } = queryString.parse(url.search);
    if (lang && typeof lang === "string") i18n.changeLanguage(lang);
  }, [url]);

  const matchingLanguages = languageOptions.filter(
    (option: SelectorOptionType) => option.value === i18n.language.split("-")[0]
  );
  const activeLanguage = matchingLanguages.length > 0 ? matchingLanguages[0] : languageOptions[0];

  return (
    <>
      <StyledLanguageSelector id="language-selector" onClick={() => setOpen(true)} ref={anchorRef}>
        <Globe src={globe} />
        <Label>{activeLanguage.label}</Label>
        <Arrow open={open}>
          <ArrowDropDownIcon fontSize="inherit" />
        </Arrow>
      </StyledLanguageSelector>
      <Selector
        open={open}
        anchorRef={anchorRef}
        options={languageOptions}
        selected={activeLanguage.value}
        close={() => setOpen(false)}
        select={(v: string) => i18n.changeLanguage(v)}
        width={`${anchorRef.current?.getBoundingClientRect().width}px`}
      />
    </>
  );
};

export default LanguageSelector;
