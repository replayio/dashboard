import { Account } from "@/pageComponents/user/settings/Account";
import { Legal } from "@/pageComponents/user/settings/Legal";
import { SettingsLayout } from "@/pageComponents/user/settings/SettingsLayout";
import { Support } from "@/pageComponents/user/settings/Support";
import { UserApiKeys } from "@/pageComponents/user/settings/UserApiKeys";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ReactNode } from "react";

export default function Page({ route }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  let panel: ReactNode = null;
  switch (route) {
    case "account": {
      panel = <Account />;
      break;
    }
    case "api-keys": {
      panel = <UserApiKeys />;
      break;
    }
    case "legal": {
      panel = <Legal />;
      break;
    }
    case "support": {
      panel = <Support />;
      break;
    }
  }

  return (
    <div className="flex flex-col overflow-auto bg-slate-800 rounded grow relative m-2 px-2 py-1">
      {panel}
    </div>
  );
}

Page.Layout = SettingsLayout;

export async function getServerSideProps({ params }: GetServerSidePropsContext<{ route: string }>) {
  return {
    props: { route: params?.route as string },
  };
}
