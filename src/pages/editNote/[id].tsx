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
  
  const backToListAllNotes = () => {
    router.push('/')
  }
    return (
        <>
            <div id="space_Write_Note" className="flex flex-col w-screen h-screen bg-[#E5E1DA] p-3">
              <div className="flex flex-col justify-center items-center ">
                <div id="save_Or_Delete" className="flex justify-between w-full px-2">
                  <Button
                    onClick={backToListAllNotes}
                    value="All notes"
                  />
                  
                  <div>
                    <span
                      onClick={() => {
                        deleteNote({
                          id: noteId
                        })
                      }}
                      className="mr-3"
                    >...</span>
                    
                    <Button
                      onClick={handleUpdateNote} 
                      value="Save edition"
                    />

                  </div>
                </div>
                <div className="flex flex-col h-auto rounded-md p-1 bg-white w-full">
                  <input type="text" className="text-xl h-[50px] pl-3 border-b-2"
                    value={currentTitle}
                    onChange={(e) => setCurrentTitle(e.target.value)}
                  />
                  <textarea className="resize-none h-auto min-h-[300px] max-h-[630px] py-3 pl-3 pr-2"
                    value={currentContent}
                    onChange={(e) => {
                      setCurrentContent(e.target.value)
                      e.target.style.height = 'auto';
                      e.target.style.height = (e.target.scrollHeight) + 'px';
                    } }
                  ></textarea>
                </div>
              </div>
            </div>
        </>
    )
}