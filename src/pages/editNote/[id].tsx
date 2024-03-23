import { Note } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { number } from "zod";
import Button from "~/components/button";
import { api } from "~/utils/api";

export default function editNote(props: any){

    // const { noteDb, setNoteDb} = useState()

    const router = useRouter()
    const id = +router.query.id

    // You should use the id here to fetch the specific note
    const { data, isLoading: dataIsLoading } = api.personalNote.showNoteById.useQuery({id});

    if (dataIsLoading) {
      return <div>Loading...</div>;
    }
    
    console.log(data);
    
    return (
        <>
            <div id="space_Write_Note" className="flex flex-col w-screen h-screen bg-blue-100">
              <div className=" m-3">
                <div id="save_Or_Delete">
                  <Button
                    // onClick={() => {  
                    //   noteDB({
                    //     title: inputTitle,
                    //     content: inputContent
                    //   })
                    // }} 
                    value="Edit the note" className="bg-gray-500 border-2 w-48"
                  />

                  <span>...</span>
                </div>
                <div className="flex flex-col">
                  <input type="text" className="bg-blue-500 h-[50px]"
                    value={data?.title}
                    // onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea className="bg-green-500 resize-none h-[300.5px]"
                    value={data?.content}
                    // onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
        </>
    )
}