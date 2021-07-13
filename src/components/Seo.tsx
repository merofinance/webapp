import React from "react";
import Helmet from "react-helmet";

interface Props {
  title?: string;
  description?: string;
}

const Seo = ({ title, description }: Props) => {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
};

export default Seo;
