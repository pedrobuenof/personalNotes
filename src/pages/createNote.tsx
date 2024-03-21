import { useState } from "react"
import { api } from "~/utils/api";

export default function createNote(){

    const [inputTitle, setTitle] = useState<string>('')
    const [inputContent, setContent] = useState<string>('')
    const { mutate: noteDB } = api.create.createNote.useMutation();
    return (
        <>
            <div id="space_Write_Note" className="w-2/3">
                <div id="save_Or_Delete">
                  <button type='button'
                    onClick={
                      () => {
                        noteDB({
                          title: inputTitle,
                          content: inputContent
                        })
                      }
                    } 
                  >Save the note</button>
                  <span>...</span>
                </div>
                <input type="text" className="bg-blue-500"
                  value={inputTitle}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea className="bg-green-500"
                  value={inputContent}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
        </>
    )
}