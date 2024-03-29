import { useEffect, useState } from "react"
import { api } from "~/utils/api";
import Button from "~/components/button";
import { useRouter } from "next/router";

export default function createNote(){
  const router = useRouter()

  const [inputTitle, setTitle] = useState<string>('')
  const [inputContent, setContent] = useState<string>('')
  const { data: saveNote, mutate: noteDB, isSuccess} = api.personalNote.createNote.useMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log(saveNote)
      alert('nota salva com sucesso!')
      router.push(`/editNote/${saveNote.id}`)
    }
  }, [saveNote])

  const backToListAllNotes = () => {
    router.push('/')
  }
    return (
        <>
            <div id="space_Write_Note" className="flex flex-col w-screen h-screen bg-[#E5E1DA] p-3">
              <div className="flex flex-col justify-center items-center ">
                <div id="save_Or_Delete" className="flex justify-between w-full px-2">
                  <Button onClick={backToListAllNotes}
                    value="All notes"/>
                  <Button
                    onClick={() => {  
                      noteDB({
                        title: inputTitle,
                        content: inputContent
                      })
                    }} value="Save"
                  />
                </div>
                <div className="flex flex-col h-auto rounded-md p-1 bg-white w-full">
                  <input type="text" className="text-xl h-[50px] pl-3 border-b-2"
                    value={inputTitle}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                  />
                  <textarea className="resize-none h-auto min-h-[300px] max-h-[630px] py-3 pl-3 pr-2"
                    value={inputContent}
                    onChange={(e) => {
                      setContent(e.target.value)
                      e.target.style.height = 'auto';
                      e.target.style.height = (e.target.scrollHeight) + 'px';
                    }}
                    placeholder="Note"
                  ></textarea>
                </div>
              </div>
            </div>
        </>
    )
}