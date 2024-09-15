import { NextPageContext } from 'next';

interface PageProps {
  statusCode: number;
}

const Page = ({ statusCode }: PageProps) => {
  return <div>Status Code: {statusCode}</div>;
};

Page.getInitialProps = ({ res, err }: NextPageContext): PageProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Page;
