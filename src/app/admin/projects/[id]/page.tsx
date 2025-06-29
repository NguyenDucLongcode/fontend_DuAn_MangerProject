"use client";

import { GetProjectDetail } from "@/services/project.services/project.services";
import { RawProject } from "@/services/project.services/type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

const DetailGroup = () => {
  const params = useParams();
  const projectId = params.id;
  const [loading, setLoading] = useState(true);
  const [detailProject, setDetailProject] = useState<RawProject>();

  useEffect(() => {
    const fetchDetailUser = async () => {
      setLoading(true);
      try {
        if (projectId && typeof projectId === "string") {
          const res = await GetProjectDetail(projectId);
          if (res.statusCode === 200) {
            // set state
            setDetailProject(res.data.project);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetailUser();
  }, [projectId]);

  console.log("check data", detailProject);
  return (
    <>
      <div>iD user = {projectId} </div>
    </>
  );
};

export default DetailGroup;
