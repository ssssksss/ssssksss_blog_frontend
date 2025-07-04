import WorkflowEditor from "@component/workflow/WorkflowEditor";
import { firebaseDB } from "@utils/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Metadata } from "next";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "워크플로우",
  description: "워크플로우",
};


const Page = async () => {
  const docRef = doc(firebaseDB, "workflow", "ssssksssBlog");
  const docSnap = await getDoc(docRef);

  let json = "";
  if (docSnap.exists()) {
    const data = docSnap.data();
    json = JSON.stringify(data, null, 2);
  }

  return (
    <div className="mx-auto flex w-full flex-col gap-8 p-4">
      <WorkflowEditor json={json} />
    </div>
  );
};

export default Page;