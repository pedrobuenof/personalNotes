import { Note } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "~/components/button";
import { api } from "~/utils/api";

interface NoteFormProps {
  isNewNote: boolean;
  initialNote?: Note;
}

export default function NoteForm(props: NoteFormProps) {
    const router = useRouter();
    const { isNewNote, initialNote} = props;

    const [inputTitle, setTitle] = useState<string>('');
    const [inputContent, setContent] = useState<string>('');

    const { data: saveNote, mutate: createNoteMutation, isSuccess: createSuccess} = api.personalNote.createNote.useMutation();
    const {mutate: updateNoteMutation, isSuccess: updateSuccess} = api.personalNote.updateNote.useMutation()
    const {mutate: deleteNoteMutation, isSuccess: deleteSuccess} = api.personalNote.deleteNote.useMutation()


    const noteDbMutation = isNewNote ? createNoteMutation : updateNoteMutation;

    const isSuccess = isNewNote ? createSuccess : updateSuccess;

    useEffect(() => {
        if (isSuccess && saveNote) {
        console.log(saveNote);
        alert('Nota salva com sucesso!');
        router.push(`/editNote/${saveNote.id}`);
        }
    }, [saveNote]);

    useEffect(() => {
        if (initialNote) {
        setTitle(initialNote.title);
        setContent(initialNote.content);
        }
    }, [initialNote]);

    useEffect(() => {
        if (deleteSuccess) {
        alert('Nota deletada!');
        router.push('/');
        }
    }, [deleteSuccess]);

    useEffect(() => {
        console.log("habbibs");
        if (updateSuccess) {
            console.log("dentro do habbibs");
            alert("Nota editada com sucesso")
        }
    }, [updateSuccess])

    const backToListAllNotes = () => {
        router.push('/');
    };

    const handleMutationNote = () => {
        if (noteDbMutation === createNoteMutation) {
            noteDbMutation({
                title: inputTitle,
                content: inputContent
            })
        } else if (noteDbMutation === updateNoteMutation){
            if (initialNote) {          
                noteDbMutation({
                    id: initialNote.id,
                    title: inputTitle,
                    content: inputContent
                });
            }
        }
    }
    const handleDelete = () => {
        if (initialNote) {
            deleteNoteMutation({
                id: initialNote.id
            })
        }
    }
    return (
        <>
            <div id="space_Write_Note" className="flex flex-col justify-start items-center w-screen h-screen bg-[#E5E1DA] p-3">
                <div className="flex flex-col justify-center items-center
                                sm:w-[400px]
                                lg:w-[700px] lg:p-3">
                    <div id="save_Or_Delete" className="flex justify-between w-full px-2">
                        <Button onClick={backToListAllNotes} value="All notes" />
                        {isNewNote ? (
                        <Button 
                            onClick={handleMutationNote}
                            value="Save"
                        />
                        ) : (
                            <>
                                <div>
                                    <Button onClick={handleDelete} value="..." className="mr-3"/>
                                    
                                    <Button onClick={handleMutationNote} value="Save edition" />
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex flex-col h-auto rounded-md p-1 bg-white w-full">
                        <input
                            type="text"
                            className="text-xl h-[50px] pl-3 border-b-2"
                            value={inputTitle}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                        />
                        <textarea
                            className="resize-none h-auto min-h-[300px] max-h-[630px] py-3 pl-3 pr-2"
                            value={inputContent}
                            onChange={(e) => {
                                setContent(e.target.value);
                                e.target.style.height = 'auto';
                                e.target.style.height = (e.target.scrollHeight) + 'px';
                            } }
                            placeholder="Note"
                        ></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}