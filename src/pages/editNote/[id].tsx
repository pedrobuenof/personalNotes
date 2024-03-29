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

    const [currentTitle, setCurrentTitle] = useState<string>('');
    const [currentContent, setCurrentContent] = useState<string>('');

    const { data: dbQueryNoteById, isSuccess: querySuccess } = api.personalNote.showNoteById.useQuery({ id: noteId});

    const {mutate: updateNote} = api.personalNote.updateNote.useMutation()

    const {mutate: deleteNote, isSuccess: deleteSuccess} = api.personalNote.deleteNote.useMutation()

    

    useEffect(() => {

      if (querySuccess && dbQueryNoteById) {
          const {title, content} = dbQueryNoteById

          setCurrentTitle(title);
          setCurrentContent(content);
      }

    }, [dbQueryNoteById]);

    useEffect(() => {
      if (deleteSuccess) {
        alert('Nota deletada!')
        router.push('/')
      }
    })

  const handleUpdateNote = () => {
    updateNote({
        id: noteId,
        title: currentTitle,
        content: currentContent
    });
  };
  
    return (
        <>
            <div id="space_Write_Note" className="flex flex-col w-screen h-screen bg-blue-100">
              <div className=" m-3">
                <div id="save_Or_Delete">
                  <Button
                    onClick={handleUpdateNote} 
                    value="Save edition" className="bg-gray-500 border-2 w-48"
                  />

                  <span onClick={() => {
                    deleteNote({
                      id: noteId
                    })
                  }}>...</span>
                </div>
                <div className="flex flex-col">
                  <input type="text" className="bg-blue-500 h-[50px] text-xl pl-3"
                    value={currentTitle}
                    onChange={(e) => setCurrentTitle(e.target.value)}
                  />
                  <textarea className="bg-green-500 resize-none h-[300.5px] pl-3"
                    value={currentContent}
                    onChange={(e) => setCurrentContent(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
        </>
    )
}