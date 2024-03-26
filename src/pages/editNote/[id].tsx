import { Note } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { number } from "zod";
import Button from "~/components/button";
import { api } from "~/utils/api";

export default function editNote(props: any){

    
    
    // const { noteDb, setNoteDb} = useState()

    const router = useRouter()
    const {id}  = router.query
    const noteId = parseInt(id as string)
    
    

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [noteData, setNoteData] = useState<Note | null>(null);

    const [currentTitle, setCurrentTitle] = useState<string>('');
    const [currentContent, setCurrentContent] = useState<string>('');

    const { data: queryData } = api.personalNote.showNoteById.useQuery({ id: noteId});

    useEffect(() => {

      if (queryData) {
          const { id, title, content, createdAt, updatedAt } = queryData;

          setNoteData({
              id,
              title,
              content,
              createdAt,
              updatedAt
          });

          setCurrentTitle(title);
          setCurrentContent(content);
          setIsLoading(false);
      }

  }, [queryData]);

  if (isLoading) {
      return <div>Loading...</div>;
  }
    
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
                    value={currentTitle}
                    onChange={(e) => setCurrentTitle(e.target.value)}
                  />
                  <textarea className="bg-green-500 resize-none h-[300.5px]"
                    value={currentContent}
                    onChange={(e) => setCurrentContent(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
        </>
    )
}