import React from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Generate from "@/components/Generate";
import UploadFile from "@/components/UploadFile";

// export default function Upload() {
//   // ! check if the user exists
//   /*     const { currentUser } = useAuth();
//     console.log(currentUser);
//     if (!currentUser) {
//       redirect("/");
//     } */

//   return (
//     <div className="container flex flex-col items-center gap-8 pt-16 px-20 sm:gap-10 min-h-screen">
//       <Tabs defaultValue="generate" className="w-full">
//         <TabsList className="">
//           <TabsTrigger value="generate">Generate</TabsTrigger>
//           <TabsTrigger value="upload">Upload</TabsTrigger>
//         </TabsList>
//         <TabsContent value="generate">
//           {/* importing component  */}
//           <Generate />
//         </TabsContent>
//         <TabsContent value="upload">
//           <UploadFile />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

function Upload() {
  return (
      <div className="container flex flex-col items-center gap-8 pt-16 px-20 sm:gap-10 min-h-screen">
          <Tabs defaultValue="generate" className="w-full">
              <TabsList className="">
                  <TabsTrigger value="generate">Generate</TabsTrigger>
                  <TabsTrigger value="upload">Upload</TabsTrigger>
              </TabsList>
              <TabsContent value="generate">
                  {/* importing component  */}
                  <Generate />
              </TabsContent>
              <TabsContent value="upload">
                  <UploadFile />
              </TabsContent>
          </Tabs>
      </div>
  );
}

export default Upload