import Error from "next/error";

function Page({ statusCode }: unknown) {
  return <Error statusCode={statusCode}></Error>;
}

Page.getInitialProps = ({ res, err }: unknown) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Page;
