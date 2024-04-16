import { Select } from "@/components/Select";
import {
  DEFAULT_TEAM_TYPE_OPTION,
  TEAM_TYPE_OPTIONS,
} from "@/utils/test-suites";

function SelectTeamType({
  teamType,
  setTeamType,
}: {
  teamType: "testsuite" | "standard";
  setTeamType: (value: "testsuite" | "standard") => void;
}) {
  return (
    <>
      <label>Select your team type:</label>
      <Select
        className="w-full"
        onChange={(option) => setTeamType(option.value)}
        options={TEAM_TYPE_OPTIONS}
        value={
          TEAM_TYPE_OPTIONS.find((option) => option.value === teamType) ??
          DEFAULT_TEAM_TYPE_OPTION
        }
      />
      <div className="text-sm text-gray-200 text-wrap">
        {teamType === "standard"
          ? "Standard teams usually upload recordings manually. These recordings are not part of any test run."
          : "Test Suite teams upload recordings from a test runner. This type offers a dashboard view to check the health of your test suite and identify failing and flaky tests."}
      </div>
    </>
  );
}

export default SelectTeamType;
