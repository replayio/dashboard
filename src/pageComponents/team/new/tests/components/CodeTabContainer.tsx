import { TabContainer } from "@/components/TabContainer";
import { CopyCode } from "@/pageComponents/team/new/tests/components/CopyCode";

export function CodeTabContainer({
  codeCJS,
  codeESM,
  codeTS,
}: {
  codeCJS: string;
  codeESM: string;
  codeTS: string;
}) {
  return (
    <TabContainer tabs={["TypeScript", "ESM", "CJS"]}>
      {(tab: string) => {
        let code = "";
        switch (tab) {
          case "CJS": {
            code = codeCJS;
            break;
          }
          case "ESM": {
            code = codeESM;
            break;
          }
          case "TypeScript": {
            code = codeTS;
            break;
          }
        }

        // Remove TypeScript directives
        code = code.replace(/[\r\n]\s+\/\/ @ts-.+/g, "");

        return <CopyCode code={code} />;
      }}
    </TabContainer>
  );
}
