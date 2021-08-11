import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Selector from "./Selector";

const StyledLanguageSelector = styled.button`
  display: flex;
`;

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const anchorRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);

  return (
    <StyledLanguageSelector onClick={() => setOpen(true)} ref={anchorRef}>
      {i18n.language}
      <Selector
        open={open}
        anchorRef={anchorRef}
        options={[
          {
            value: "en",
            label: "English",
          },
          {
            value: "jp",
            label: "日本語",
          },
        ]}
        selected={i18n.language}
        close={() => setOpen(false)}
        select={(v: string) => i18n.changeLanguage(v)}
      />
    </StyledLanguageSelector>
  );
};

export default LanguageSelector;
