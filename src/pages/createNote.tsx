import { useState } from "react"
import { api } from "~/utils/api";
import Button from "~/components/button";

export default function createNote(){

    const [inputTitle, setTitle] = useState<string>('')
    const [inputContent, setContent] = useState<string>('')
    const { mutate: noteDB } = api.personalNote.createNote.useMutation();
    return (
        <>
            <div id="space_Write_Note" className="flex flex-col w-screen h-screen bg-blue-100">
              <div className=" m-3">
                <div id="save_Or_Delete">
                  <Button
                    onClick={() => {  
                      noteDB({
                        title: inputTitle,
                        content: inputContent
                      })
                    }} value="Save the note" className="bg-gray-500 border-2 w-48"
                  />

                  <span>...</span>
                </div>
                <div className="flex flex-col">
                  <input type="text" className="bg-blue-500 h-[50px]"
                    value={inputTitle}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea className="bg-green-500 resize-none h-[300.5px]"
                    value={inputContent}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
        </>
    )
}