"use client";
import { useState, useEffect } from "react";
import Select from "react-select";
import { apiHooks } from "@/redux/services";
import { useDispatch } from "react-redux";
import { actions } from "@/redux/slices";

const Selected_Groups = () => {
  // state react
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const groupId = selectedOption?.value ? +selectedOption.value : 0;

  // logic redux
  const dispatch = useDispatch();

  // Call API get all group
  const { data: dataAllGroup } = apiHooks.group.GetAllGroup();

  // Call API get all role by group id
  const { data: dataAllRole, refetch: refetchDataRole } =
    apiHooks.roles.GetAllRoleByIdGroup(groupId, {
      skip: groupId === 0,
    });

  // react select configures
  const options = dataAllGroup?.data.map((item) => ({
    value: String(item.id),
    label: item.name,
  }));

  // useEffect
  useEffect(() => {
    dispatch(actions.assignGroup.mapGroupId(groupId)); // save groupId in to redux
    dispatch(actions.assignGroup.getAllRoleWithIdGroup(dataAllRole?.data)); // save All data role from group Id
  }, [dispatch, groupId, dataAllRole]);

  useEffect(() => {
    if (refetchDataRole) {
      dispatch(actions.refetch.paginationAssign(refetchDataRole)); // save fuc in to state redux
    }
  }, [dispatch, refetchDataRole]);

  return (
    <div>
      <Select
        options={options}
        value={selectedOption}
        onChange={setSelectedOption}
        isClearable
      />
    </div>
  );
};
export default Selected_Groups;
