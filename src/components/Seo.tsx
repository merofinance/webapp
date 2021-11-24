import { Helmet } from "react-helmet-async";

interface Props {
  title?: string;
  description?: string;
}

const Seo = ({ title, description }: Props): JSX.Element => {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
};

export default Seo;
