import { useState } from "react";

import { Input } from "@/components/Input";

import { useWorkspaceRootCauseCategories } from "@/graphql/queries/useWorkspaceRootCauseCategories";
import { useCreateRootCauseCategory } from "@/graphql/queries/useRootCauseCategoryMutations";

import { RCACategoryRow } from "@/pageComponents/team/id/rca/RCACategoryRow";

export const RCACategoriesList = ({ workspaceId }: { workspaceId: string }) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const { categories } = useWorkspaceRootCauseCategories(workspaceId);

  // TODO sorting order? Name, creation, failures?
  const renderedCategories = categories.map(category => (
    <RCACategoryRow key={category.id} workspaceId={workspaceId} category={category} />
  ));

  const { createRootCauseCategory } = useCreateRootCauseCategory();

  const onCreateNewCategoryClick = async () => {
    await createRootCauseCategory(workspaceId, newCategoryName);
    setNewCategoryName("");
  };
  return (
    <>
      <h3 className="text-xl font-medium">Categorized Test Failures</h3>
      <div className="flex flex-row gap-4">
        <Input value={newCategoryName} onChange={name => setNewCategoryName(name)} />
        <button
          className="p-2 text-white rounded-md bg-sky-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={onCreateNewCategoryClick}
          disabled={!newCategoryName}
        >
          Create New Category
        </button>
      </div>
      <div className="mt-2 overflow-y-auto grow">{renderedCategories}</div>
    </>
  );
};
