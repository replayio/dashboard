import { EmptyLayout } from "@/components/EmptyLayout";
import { COOKIES, HEADERS } from "@/constants";
import { ConfirmBrowserAuthentication } from "@/pageComponents/browser/authenticated/ConfirmBrowserAuthentication";
import { ConfirmCLIAuthentication } from "@/pageComponents/browser/authenticated/ConfirmCLIAuthentication";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useSearchParams } from "next/navigation";

export default function Page({
  browserAuth,
  userAgent,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const searchParams = useSearchParams();
  const source = searchParams?.get("source");

  if (source === "browser") {
    return <ConfirmBrowserAuthentication userAgent={userAgent} />;
  } else {
    return <ConfirmCLIAuthentication browserAuth={browserAuth} />;
  }
}

Page.Layout = EmptyLayout;

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const browserAuth = req.cookies[COOKIES.browserAuth];
  const userAgent = req?.headers?.[HEADERS.userAgent] as string;

  return {
    props: {
      browserAuth,
      userAgent,
    },
  };
}
